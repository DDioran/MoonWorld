import { MCounter } from "../mlib/mcounter";
import { SObjectXY, SObjectList } from "../mlib/sobject";
import { MoonMobType, PlayerClassType, MoonMobState, MoonObjectType, SkillInfo, SkillState, MoonSkillType, MoonDebuffTable, PartyInfo, ClientInfo, ClientInfoType, PlayerInfo, QuestNpcInfo } from "../service/moon-info";
import { JsPack } from "../global/resx";
import { App } from "../global/app";
import { Gpx } from "../mlib/mgfx";

export class MoonMob extends SObjectXY {
  public Type: MoonMobType;
  public ClassType: PlayerClassType;
  public State: MoonMobState;
  public Level: number;
  public Exp: number;
  public MaxExp: number;
  public Name: string;
  public AwaitTime: number;
  public MobId: number;
  public ItemCode: string;
  public TargetId: number;
  public TargetType: MoonObjectType;
  public PlayerId: string;
  public Active: boolean;
  public RunSpeed: number;
  public WalkSpeed: number;
  public Speed: number;
  public Radius: number;
  public MaxHP: number;
  public HP: number;
  public DirectionView: number;
  public CounterView: MCounter;
  public CounterViewAction: any;
  public SpriteName: string;
  public SpriteOX: number;
  public SpriteOY: number;
  public IdleAniSpeed: number;
  public WalkAniSpeed: number;
  public RunAniSpeed: number;
  public SkillAniSpeed: number;
  public DeathAniSpeed: number;
  public Sprite: JsPack;
  public PInstruction: string;
  public PInstructionTime: number;
  public PInstructionAllTime: number;
  public PParam1: string
  public PParam2: number
  public PParam3: number
  public Skills: Array<SkillInfo>;
  public SkillState: SkillState;
  public CurrentSkillType: MoonSkillType;
  public CurrentSkillIndex: number
  public ChargeTime: number;
  public ChargeLeft: number;
  public AnimateName: string;
  public Debuffs: MoonDebuffTable;
  public Party: PartyInfo;
  public QuestNpc: Array<QuestNpcInfo>;
  protected respX: number;
  protected respY: number;
  protected storeX: number;
  protected storeY: number;
  protected deltaX: number;
  protected deltaY: number;
  protected paused: boolean = false;

  constructor(MobInfo: ClientInfo) {
    super(MobInfo.pointMobX, MobInfo.pointMobY);
    App.Field.MoonMobList.ItemList.push(this);
    switch (MobInfo.infoType) {
      case ClientInfoType.MobInfo: this.Type = MoonMobType.Mob; break;
      case ClientInfoType.PlayerInfo: this.Type = MoonMobType.Player; break;
      case ClientInfoType.NpcInfo: this.Type = MoonMobType.Npc; break;
    }
    this.DirectionView = 3;
    this.SetClientInfo(MobInfo);
  }

  public SetClientInfo(MobInfo: ClientInfo) {
    this.X = MobInfo.pointMobX;
    this.Y = MobInfo.pointMobY;
    this.Name = MobInfo.name;
    this.State = MobInfo.state;
    this.AwaitTime = MobInfo.awaitTime;
    this.MobId = MobInfo.mobId;
    this.ItemCode = MobInfo.itemCode;
    this.TargetId = MobInfo.targetId;
    this.TargetType = MobInfo.targetType;
    this.Level = MobInfo.level;
    if (this.Type == MoonMobType.Player) {
      this.PlayerId = (MobInfo as PlayerInfo).playerId;
      this.Active = (MobInfo as PlayerInfo).active;
      this.ClassType = (MobInfo as PlayerInfo).classType;
      this.Exp = (MobInfo as PlayerInfo).exp;
      this.MaxExp = (MobInfo as PlayerInfo).maxExp;
      this.QuestNpc = (MobInfo as PlayerInfo).questNpcInfo;
    }
    else {
      var a = 0;
    }
    this.SpriteName = MobInfo.sprite.spriteName;
    this.SpriteOX = MobInfo.sprite.spriteOX;
    this.SpriteOY = MobInfo.sprite.spriteOY;
    this.IdleAniSpeed = MobInfo.sprite.idleAniSpeed;
    this.WalkAniSpeed = MobInfo.sprite.walkAniSpeed;
    this.RunAniSpeed = MobInfo.sprite.runAniSpeed;
    this.SkillAniSpeed = MobInfo.sprite.skillAniSpeed;
    this.DeathAniSpeed = MobInfo.sprite.deathAniSpeed;
    this.respX = MobInfo.respMobX;
    this.respY = MobInfo.respMobY;
    this.deltaX = MobInfo.deltaMobX;
    this.deltaY = MobInfo.deltaMobY;
    this.storeX = MobInfo.storeMobX;
    this.storeY = MobInfo.storeMobY;
    this.RunSpeed = MobInfo.runSpeed;
    this.WalkSpeed = MobInfo.walkSpeed;
    this.Speed = MobInfo.speed;
    this.Radius = MobInfo.radius;
    this.MaxHP = MobInfo.maxHP;
    this.HP = MobInfo.hp;
    this.PInstruction = MobInfo.pInstruction;
    this.PInstructionTime = MobInfo.pInstructionTime;
    this.PInstructionAllTime = MobInfo.pInstructionAllTime;
    this.PParam1 = MobInfo.pParam1;
    this.PParam2 = MobInfo.pParam2;
    this.PParam3 = MobInfo.pParam3;
    this.DirectionView = MobInfo.directionView;
    this.Skills = MobInfo.skills;
    this.SkillState = MobInfo.skillState;
    this.CurrentSkillType = MobInfo.currentSkillType;
    this.CurrentSkillIndex = MobInfo.currentSkillIndex;
    this.Sprite = App.Resx.GetPackResource(this.SpriteName);
    this.ChargeTime = MobInfo.chargeTime;
    this.ChargeLeft = MobInfo.chargeLeft;
    this.AnimateName = MobInfo.animateName;
    this.Debuffs = MobInfo.debuffs;
    this.Party = MobInfo.party;
    if (this.PInstruction != "p" || this.Type == MoonMobType.Mob)
      this.paused = false;
    if (this.State == MoonMobState.Alive) {
      //var key = this.PInstruction + "+" + this.PParam1 + "+" + this.DirectionView;
      var repeat = true;
      var anispeed = this.IdleAniSpeed;
      //anispeed = App.MoonGame.value_speed; //TEST
      var action = this.Sprite.sow.spr.paused;
      if (!this.paused && this.PInstruction == "m") {
        if (this.PParam1 == "w") {
          action = this.Sprite.sow.spr.walking;
          anispeed = this.WalkAniSpeed;
        }
        if (this.PParam1 == "r") {
          action = this.Sprite.sow.spr.running;
          anispeed = this.RunAniSpeed;
        }
      }
      if (this.PInstruction == "s" && this.SkillState == SkillState.Run) {
        //console.log("s");
        anispeed = this.SkillAniSpeed;
        action = this.Sprite.sow.spr[this.AnimateName];
        if (!action)
          action = this.Sprite.sow.spr.attack;
        repeat = false;
      }
      //this.CalcDirection();
      //anispeed = App.MoonGame.value_speed; //TEST
      //if (!(this.CounterView && this.CounterView.Count == action[this.DirectionView].length && this.CounterView.TimeSecs == anispeed && this.CounterView.Loop == repeat)) {
      if (!(this.CounterView && this.CounterViewAction == action && this.CounterView.TimeSecs == anispeed)) {
        this.CounterView = new MCounter(action[this.DirectionView].length, anispeed, repeat);
        this.CounterViewAction = action;
      }
    }
    if (this.State == MoonMobState.Dead) {
      action = this.Sprite.sow.spr.defeat;
      var anispeed = this.DeathAniSpeed;
      //if (!(this.CounterView && this.CounterView.Count == action[this.DirectionView].length && this.CounterView.TimeSecs == 1.0 && this.CounterView.Loop == false)) {
      if (!(this.CounterView && this.CounterViewAction == action && this.CounterView.TimeSecs == anispeed)) {
        //anispeed = App.MoonGame.value_speed; //TEST
        this.CounterView = new MCounter(action[this.DirectionView].length, anispeed, false);
        this.CounterViewAction = action;
      }
    }
  }

  public NextInstruction() {
    if (!this.paused) {
      this.paused = true;
      var anispeed = this.IdleAniSpeed;
      if (!(this.CounterView && this.CounterViewAction == this.Sprite.sow.spr.paused && this.CounterView.TimeSecs == anispeed)) {
        //anispeed = App.MoonGame.value_speed; //TEST
        this.CounterView = new MCounter(this.Sprite.sow.spr.paused[this.DirectionView].length, anispeed, true);
        this.CounterViewAction = this.Sprite.sow.spr.paused;
      }
    }
    return;
    // --
  }

  public Dispatcher(): void {
    if (this.Type == MoonMobType.Player) {
      var a = 0;
    }
    if (this.CounterView)
      this.CounterView.GetIndex(App.DeltaTime);
    if (this.paused) return;
    if (this.State == MoonMobState.Alive) {
      this.PInstructionTime += App.DeltaTime;
      if (this.PInstruction == "p") {
        if (this.PInstructionTime >= this.PInstructionAllTime)
          this.NextInstruction();
        return;
      }
      if (this.PInstruction == "m") {
        if (this.PInstructionTime >= this.PInstructionAllTime) {
          this.X = this.storeX + this.PParam2;
          this.Y = this.storeY + this.PParam3;
          this.NextInstruction();
          return;
        }
        this.X = this.storeX + this.deltaX * this.PInstructionTime;
        this.Y = this.storeY + this.deltaY * this.PInstructionTime;
        return;
      }
      if (this.PInstruction == "s" && this.SkillState == SkillState.Run) {
        if (this.PInstructionTime >= this.PInstructionAllTime) {
          this.NextInstruction();
          return;
        }
        return;
      }
    }
    if (this.State == MoonMobState.Dead) {
      this.AwaitTime += App.DeltaTime;
    }
  }

  public Paint(): void {
    if (this.Type == MoonMobType.Player) {
      var a = 0;
    }
    if (this.State != MoonMobState.Await) {
      var action = this.Sprite.sow.spr.paused;
      if (this.State == MoonMobState.Alive) {
        if (!this.paused && this.PInstruction == "m") {
          if (this.PParam1 == "w") action = this.Sprite.sow.spr.walking;
          if (this.PParam1 == "r") action = this.Sprite.sow.spr.running;
        }
        if (this.PInstruction == "s" && this.SkillState == SkillState.Run) {
          action = this.Sprite.sow.spr[this.AnimateName];
          if (!action)
            action = this.Sprite.sow.spr.attack;
        }
      }
      if (this.State == MoonMobState.Dead)
        action = this.Sprite.sow.spr.defeat;

      var idx = this.CounterView.GetCurrentIndex();
      if (idx < 0) {
        idx = action[this.DirectionView].length - 1;
      }
      let spr = action[this.DirectionView][idx];
      if (!spr) {
        idx = action[this.DirectionView].length - 1; // Если кончились спрайты какой либо предыдущей фазы - показывать последний из них
        spr = action[this.DirectionView][idx];
      }
      var px = Math.floor(- App.Field.playerx + App.Field.cx + this.X - spr.cx);
      var py = Math.floor(- App.Field.playery + App.Field.cy + this.Y - spr.cy);
      //Gpx.DrawImage(spr.img, px + this.SpriteOX, py + this.SpriteOY);
      Gpx.DrawImage(spr.img, px, py);

      px -= this.SpriteOX;
      py -= this.SpriteOY;

      var color = "yellow";
      var font = "11px Roboto";
      if (this.Type == MoonMobType.Npc) {
        var color = "#ccff88";
        var font = "12px Roboto";
      }
      var width = Gpx.MeasureText(this.Name, font).width;
      Gpx.Text(color, this.Name, px + spr.cx - width / 2, py + spr.cy - 45, font);
      if (this.Type != MoonMobType.Npc) {
        color = "red";
        Gpx.DrawFillRect("gray", "yellow", px + spr.cx - 32, py + spr.cy - 40, 64, 5);
        Gpx.FillRect(color, px + spr.cx - 31, py + spr.cy - 39, 62 * this.HP / this.MaxHP, 3);
      } else {
        var npcInfo = App.Field.MoonPlayer.QuestNpc.find(n => n.npc == this.ItemCode);
        if (npcInfo && (npcInfo.offer || npcInfo.complete)) {
          var qText = `${npcInfo.offer ? '!' : ''}${npcInfo.complete ? '?' : ''}`;
          width = Gpx.MeasureText(qText, font).width;
          Gpx.Text("yellow", qText, px + spr.cx - width / 2, py + spr.cy - 45 - 16, "24px Roboto-Bold");
        }
      }
    }
  }
}


export class MoonMobList extends SObjectList {
  public counter: MCounter;
  constructor() {
    super();
    this.counter = new MCounter(60, 1, false);
  }
  public static FindMob(MobId: number) {
    return App.Field.MoonMobList.ItemList.find(m => (m as MoonMob).MobId == MobId) as MoonMob;
  }
  public static FindPlayer(PlayerId: string) {
    return App.Field.MoonMobList.ItemList.find(m => (m as MoonMob).PlayerId == PlayerId) as MoonMob;
  }
  public static FindMobByCode(ItemCode: string) {
    return App.Field.MoonMobList.ItemList.find(m => (m as MoonMob).ItemCode == ItemCode) as MoonMob;
  }

  public Dispatcher(): void {
    super.Dispatcher();
  }


}
