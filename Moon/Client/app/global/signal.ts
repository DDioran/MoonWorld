import { App } from './app';
import { MoonPointEffect, MoonLineEffect, MoonHitEffect, MoonDashEffect } from '../objs/effect';
import { MoonMob, MoonMobList } from '../objs/mob';
import { MChatType } from '../main/chat';
import { MMessageBox, MessageBoxButton } from '../ui/mmessagebox';
import { ChestInfo, MoonChestList, MoonChest } from '../objs/chest';
import { ConnectionLostForm } from '../forms/connlost';
import { ClientInfo } from '../service/moon-info';

export abstract class MoonSignal {
  public static DoPointEffect(SpriteName: string, s: number, x: number, y: number) {
    if (App.Field && App.Field.MoonEffectList)
      new MoonPointEffect(SpriteName, s, x, y);
  }
  public static DoLineEffect(SpriteName: string, s: number, x1: number, y1: number, x2: number, y2: number) {
    if (App.Field && App.Field.MoonEffectList)
      new MoonLineEffect(SpriteName, s, x1, y1, x2, y2);
  }
  public static DoHitEffect(x: number, y: number, hit: number, crit: number, mobid: number) {
    if (App.Field && App.Field.MoonEffectList)
      new MoonHitEffect(x, y, hit, crit, mobid);
  }
  public static DoDashEffect(mobId: number, x2: number, y2: number) {
    if (App.Field && App.Field.MoonEffectList) {
      let mob: MoonMob = App.Field.MoonMobList.ItemList.filter(m => mobId == (m as MoonMob).MobId)[0] as MoonMob;
      new MoonDashEffect(mob, x2, y2);
    }
  }
  public static DoTextChat(chatType: MChatType[], id: number, color: string, message: string) {
    App.Field.Chat.chats.forEach(c => {
      if (chatType.findIndex(ct => ct == c.ChatType) >= 0)
        c.AddLine(id, color, message);
    });
  }

  public static DoInviteGroup(playerId: string) {
    let player: MoonMob = App.Field.MoonMobList.ItemList.filter(m => playerId == (m as MoonMob).PlayerId)[0] as MoonMob;
    if (!App.Field.MessageBox) {
      let mbox: MMessageBox = new MMessageBox(300, 200, "Приглашение в группу", "Игрок " + player.Name + " хочет добавить вас в группу.", [MessageBoxButton.mbOk, MessageBoxButton.mbCancel]);
      mbox.ButtonClick = (s, e) => {
        App.Hub.InviteGroupResponse(App.PlayerGuid, playerId, e.Type);
      };
      mbox.Activate();
    }
  }

  public static DoClientInfo(clientInfo: ClientInfo) {
    if (App.Initialized) {
      let mob: MoonMob = MoonMobList.FindMob(clientInfo.mobId);
      if (mob)
        mob.SetClientInfo(clientInfo);
      else
        mob = new MoonMob(clientInfo);
    }
  }

  public static DoChestInfo(chestInfo: ChestInfo) {
    let chest: MoonChest = MoonChestList.FindChest(chestInfo.chestId);
    if (!chest) chest = new MoonChest();
    chest.SetInfo(chestInfo);
  }

  public static Response(id: number, response: any) {
    var callback = App.Hub.Pull[id];
    delete App.Hub.Pull[id];
    if (callback) callback(response);
  }

  public static RegisterSignalREvents() {
    App.Hub.Hub.onclose(() => {
      App.Game.ConnLostForm = new ConnectionLostForm();
      App.Game.SetActiveForm(App.Game.ConnLostForm);
    });
    // Логгирование
    App.Hub.Hub.on("DoLog", (text) => {
      console.log("Log: %s", text);
    });
    // Текущий пользователь зарегистрирован
    App.Hub.Hub.on("PlayerRegistered", (playerInfo) => {
      console.log("PlayerRegistered");
      App.Game.PlayerRegistered(playerInfo);
    });
    // Отображение эффекта в координате
    App.Hub.Hub.on("DoPointEffect", (spriteName, s, x, y) => {
      //console.log("Point effect: %s (%d, %d)", spriteName, x, y);
      MoonSignal.DoPointEffect(spriteName, s, x, y);
    });
    // Отображение двумерного эффекта
    App.Hub.Hub.on("DoLineEffect", (spriteName, s, x1, y1, x2, y2) => {
      //console.log("Point effect: %s (%d, %d)", spriteName, x, y);
      MoonSignal.DoLineEffect(spriteName, s, x1, y1, x2, y2);
    });
    App.Hub.Hub.on("DoHitEffect", (x, y, hit, crit, mobid) => {
      //console.log("Point effect: %s (%d, %d)", spriteName, x, y);
      MoonSignal.DoHitEffect(x, y, hit, crit, mobid);
    });

    App.Hub.Hub.on("DoDashEffect", (mobId, x2, y2) => {
      MoonSignal.DoDashEffect(mobId, x2, y2);
    });

    App.Hub.Hub.on("DoTextChat", (chatType, id, color, message) => {
      MoonSignal.DoTextChat(chatType, id, color, message);
    });

    App.Hub.Hub.on("DoInviteGroup", (playerId) => {
      MoonSignal.DoInviteGroup(playerId);
    });


    App.Hub.Hub.on("DoClienfInfo", (clientInfo) => {
      MoonSignal.DoClientInfo(clientInfo);
    });

    App.Hub.Hub.on("DoChestInfo", (chestInfo) => {
      MoonSignal.DoChestInfo(chestInfo);
    });

    App.Hub.Hub.on("Method_Response", (id, response) => {
      MoonSignal.Response(id, response);
    });



  }

}