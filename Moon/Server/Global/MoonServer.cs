using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace Moon
{
  public class MoonApplication
  {
    public static MoonServer Server;
    public static MoonCommandList Command;
    public static Random Random;
    public static IHubCallerClients Hub;
    public MoonApplication()
    {
      Random = new Random((int)DateTime.Now.Ticks);
      Server = new MoonServer();
      Command = new MoonCommandList();
      Server.Initialize();
    }
  }
  public partial class MoonServer
  {
    public List<MoonMap> MoonMaps;
    public List<MoonPlayer> MoonPlayers;
    public MoonObjectList MoonObjects;
    public List<ClientInfo> TriggerList;
    public Dictionary<string, MoonItem> MoonItemList;
    public Dictionary<string, MoonDrop> MoonDropList;
    public Dictionary<string, Quest> QuestList;
    public MoonDataBase Db;
    private Timer loopTimer;
    private DateTime lastTime;
    private double deltaTime;
    private double saveTime;
    private bool process = false;
    private object TriggerListLock = new object();
    public double DeltaTime
    {
      get
      {
        return deltaTime;
      }
    }
    public MoonServer()
    {
      MoonMaps = new List<MoonMap>();
      MoonPlayers = new List<MoonPlayer>();
      MoonObjects = new MoonObjectList();
      MoonItemList = new Dictionary<string, MoonItem>();
      MoonDropList = new Dictionary<string, MoonDrop>();
      QuestList = new Dictionary<string, Quest>();
      Db = new MoonDataBase();
    }

    public void Initialize()
    {
      MoonItem.LoadDbItems();
      MoonDrop.LoadDbItems();
      Quest.LoadDbItems();
      MoonMap map = new MoonMap(1, "Долина");
      MoonMaps.Add(map);

      InitializeTimer();
    }

    public void InitializeTimer()
    {
      saveTime = 0;
      lastTime = DateTime.Now;
      loopTimer = new Timer(func => { Loop(); }, null, 0, 16);
    }

    private void Loop()
    {
      if (process) return;
      process = true;
      DispatchCommand();
      DateTime now = DateTime.Now;
      deltaTime = (now - lastTime).TotalMilliseconds / 1000.0;
      lastTime = now;
      MoonMaps.ForEach(m => m.Dispatch());
      MoonPlayers.ForEach(m => m.Dispatch());
      MoonObjects.Dispatcher();
      saveTime += deltaTime;
      if (saveTime > 10)
      {
        SaveCharacters();
        saveTime = 0;
      }
      DisconnectCharacters();
      process = false;
    }
    // Игрок ткнул в местность
    public void PlayerMoveTo(Guid ClientId, double x, double y, int Button)
    {
      MoonPlayer player = MoonPlayers.FirstOrDefault(p => p.ClientId == ClientId);
      player.ResetTimeout();
      if (player.State == MoonMobState.Dead)
      {
        if (player.AwaitTime >= 2.0)
        {
          player.Target = null;
          player.ResetFromPlayerTarget(player);
          player.Initialize();
          player.PushToMap();
        }
        return;
      }
      player.CurrentSkillType = MoonSkillType.None;
      player.CurrentSkillIndex = -1;
      player.QueueCode = -1;
      player.QueueTarget = null;
      player.QueueCoords = null;
      if (Button == 2)
        player.Target = null;
      // Если бежать можно - вперед
      if (player.PlayerMoveTo(x, y))
        MoonApplication.Server.DoPointEffect(player, "moon-click", 1, x, y);
    }
    // Игрок ткнул в моба или другого игрока
    public void PlayerSelectTo(Guid ClientId, MoonObjectType ObjectType, int ObjectId, int Button)
    {
      MoonPlayer player = MoonPlayers.FirstOrDefault(p => p.ClientId == ClientId);
      player.ResetTimeout();
      if (player.State == MoonMobState.Dead)
      {
        if (player.AwaitTime >= 2.0)
        {
          player.Target = null;
          player.ResetFromPlayerTarget(player);
          player.Initialize();
          player.PushToMap();
        }
        return;
      }
      player.QueueCoords = null;
      if (ObjectType == MoonObjectType.Mob)
      {
        MoonPlayer playerTarget = MoonPlayers.FirstOrDefault(p => p.MobId == ObjectId);
        if (playerTarget != null)
        {
          // Выбран игрок
          player.Target = playerTarget;
          if (Button == 0)
          {
            if (player.PInstruction == "s" && player.SkillState == SkillState.Run)
            {
              player.QueueCode = -1;
              player.QueueCoords = null;
              player.QueueTarget = playerTarget;
              return;
            }
            player.CurrentSkillType = player.Skills.GetAASkill().SkillType;
            player.CurrentSkillIndex = player.Skills.GetIndexBySkill(player.CurrentSkillType);
            player.PlayerMoveTo(playerTarget);
          }
          else
            PushToClient(player, player); // Обновляем информация об игроке
          PushToClient(player, playerTarget); // Обновляем информация игорку об игроке
        }
        else
        {
          MoonMob mobTarget = player.Map.FindMob(ObjectId);
          MoonMob npcTarget = player.Map.FindNpc(ObjectId);
          if (mobTarget != null)
          {
            // Выбран моб
            player.Target = mobTarget;
            if (Button == 0)
            {
              if (player.PInstruction == "s" && player.SkillState == SkillState.Run)
              {
                player.QueueCode = -1;
                player.QueueCoords = null;
                player.QueueTarget = mobTarget;
                return;
              }
              player.CurrentSkillType = player.Skills.GetAASkill().SkillType;
              player.CurrentSkillIndex = player.Skills.GetIndexBySkill(player.CurrentSkillType);
              player.PlayerMoveTo(mobTarget);
            }
            else
              PushToClient(player, player); // Обновляем информация об игроке
            PushToClient(player, mobTarget); // Обновляем информация игроку о мобе
          }
          if (npcTarget != null)
          {
            // Выбран нпс, на данном этапе их атаковать нельзя
            player.Target = npcTarget;
            if (Button == 0)
            {
              if (player.PInstruction == "s" && player.SkillState == SkillState.Run)
              {
                player.QueueCode = -1;
                player.QueueCoords = null;
                player.QueueTarget = npcTarget;
                return;
              }
              player.CurrentSkillType = MoonSkillType.None;
              player.CurrentSkillIndex = -1;
              player.PlayerMoveTo(npcTarget);
            }
            else
              PushToClient(player, player); // Обновляем информация об игроке
            PushToClient(player, npcTarget); // Обновляем информация игроку о мобе
          }
        }
      }
      if(ObjectType == MoonObjectType.Chest)
      {
        MoonChest chestTarget = MoonChest.FindChest(ObjectId);
        if(chestTarget != null)
        {
          // Выбран сундук
          player.Target = chestTarget;
          if (Button == 0)
          {
            if (player.PInstruction == "s" && player.SkillState == SkillState.Run)
            {
              player.QueueCode = -1;
              player.QueueCoords = null;
              player.QueueTarget = chestTarget;
              return;
            }
            player.CurrentSkillType = MoonSkillType.None;
            player.CurrentSkillIndex = -1;
            player.PlayerMoveTo(chestTarget);
          }
          else
            PushToClient(player, player); // Обновляем информация об игроке
          PushChest2Client(player, chestTarget); // Обновляем информация игроку о сундук
        }
      }
    }
    public void KeyOperation(Guid clientId, int keyCode, bool downKey)
    {
      MoonPlayer player = MoonPlayers.FirstOrDefault(p => p.ClientId == clientId);
      player.ResetTimeout();
      if (player.State != MoonMobState.Alive) return; 
      if (downKey)
      {
        int idx = player.Skills.GetIndexSkillByKeyCode(keyCode);
        if (idx >= 0)
          player.InitiateSkill(idx);
      }
    }
    public void SaveCharacters()
    {
      Db.SaveAllCharacters(); // Асинхронный вызов сохранений
    }
    public void DisconnectCharacters()
    {
      //List<MoonPlayer> delPlayers = MoonPlayers.Where(p => p.Timeout >= 180).ToList();
      //MoonPlayers = MoonPlayers.Where(p => p.Timeout < 180).ToList();
      //DisconnectCharacters(delPlayers);
    }
    public void DisconnectCharacters(List<MoonPlayer> delPlayers)
    {
      delPlayers.ForEach(p =>
      {
        p.Active = false;
        // Здесь необходимо отключить пользователей от игры
      });
    }
  }

}
