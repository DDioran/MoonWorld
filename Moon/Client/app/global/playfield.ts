import { MControl, MAlign } from "../mlib/mcontrol";
import { MoonMobList, MoonMob } from "../objs/mob";
import { MoonEffectList } from "../objs/effect";
import { MoonChestList, MoonChest, ChestState } from "../objs/chest";
import { MChat } from "../main/chat";
import { MTargetHP } from "../main/targethp";
import { MParty } from "../main/party";
import { MContextFloat } from "../ui/mcontextfloat";
import { MMessageBox } from "../ui/mmessagebox";
import { App } from "./app";
import { PlayerInfo, MoonMobState, MoonMobType, SkillInfo, MoonObjectType, SkillState, ClientInfo } from "../service/moon-info";
import { JsPack, JsXImage } from "./resx";
import { MouseArgs, MouseExtArgs } from "../mlib/events";
import { Gpx } from "../mlib/mgfx";
import { MContextMenu } from "../ui/mcontextmenu";

export class MoonPlayField extends MControl {
  public layerZero: Array<Array<number>> = [];
  public zeroWidth: number;
  public zeroHeight: number;
  public zeroSize: number;

  public cx: number;
  public cy: number;

  public cursor: { x: number, y: number } = { x: 0, y: 0 };

  public playerx: number;
  public playery: number;

  public MoonMobList: MoonMobList;
  public MoonEffectList: MoonEffectList;
  public MoonChestList: MoonChestList;
  public MoonPlayer: MoonMob;

  public Chat: MChat;
  public TargetHP: MTargetHP;
  public Party: MParty;

  public ContextPanels: MContextFloat[];
  public MessageBox: MMessageBox = null;

  public UnderCursor: MoonMob | MoonChest;

  constructor() {
    super();
    App.Field = this;
    this.x = 0;
    this.y = 0;
    this.cx = 0;
    this.cy = 0;
    this.zeroWidth = 32;
    this.zeroHeight = 47;
    this.zeroSize = 192;
    this.playerx = 600;//Math.floor(this.zeroSize * this.zeroWidth / 2);
    this.playery = 600;//Math.floor(this.zeroSize * this.zeroHeight / 2);
    for (var j = 0; j < this.zeroHeight; j++) {
      this.layerZero[j] = [];
      for (var i = 0; i < this.zeroWidth; i++)
        this.layerZero[j][i] = 0;
    }
    this.MoonMobList = new MoonMobList();
    this.MoonEffectList = new MoonEffectList();
    this.MoonChestList = new MoonChestList();

    this.ContextPanels = [];

    this.Party = new MParty(20, 20);
    this.controls.Add(this.Party);

    this.TargetHP = new MTargetHP();
    this.TargetHP.Width = 600;
    this.TargetHP.Height = 60;
    this.TargetHP.Align = MAlign.Center;
    this.TargetHP.Y = 0;
    this.controls.Add(this.TargetHP);

    this.Chat = new MChat();
    this.Chat.Width = 560;
    this.Chat.Height = 300;
    this.controls.Add(this.Chat);
  }

  public InitializePlayer(playerInfo: ClientInfo): void {
    this.MoonPlayer = new MoonMob(playerInfo);
    this.playerx = this.MoonPlayer.X;
    this.playery = this.MoonPlayer.Y;
  }

  public Dispatch(): void {
    super.Dispatch();
    this.MoonChestList.Dispatcher();
    this.MoonMobList.Dispatcher();
    this.MoonEffectList.Dispatcher();
    //this.MoonPlayer.Dispatcher();
    if (this.MoonPlayer) {
      this.playerx = this.MoonPlayer.X;
      this.playery = this.MoonPlayer.Y;
      if (this.MoonPlayer.State == MoonMobState.Alive && this.MoonPlayer.PInstruction == "s" && this.MoonPlayer.SkillState == SkillState.Charge) {
        this.MoonPlayer.ChargeLeft += App.DeltaTime;
      }
      this.MoonPlayer.Skills.forEach(s => {
        if (s.cooldownTimeLeft < s.cooldownTime) s.cooldownTimeLeft += App.DeltaTime;
      });

    }
  }

  public Paint(): void {
    this.TargetHP.Visible = App.Field.MoonPlayer && App.Field.MoonPlayer.TargetId > 0;
    super.Paint();
    this.MoonChestList.Paint();
    this.MoonMobList.Paint();
    this.MoonEffectList.Paint();
    // minimap
    let mmw: number = 300;
    let mmh: number = 350;
    let mmox: number = App.Game.Width - mmw - 20;
    let mmoy: number = 20;
    let k: number = Math.min(mmw / (this.zeroSize * this.zeroWidth), mmh / (this.zeroSize * this.zeroHeight));
    var mmx = -(this.zeroSize * this.zeroWidth * k - mmw) / 2;
    var mmy = -(this.zeroSize * this.zeroHeight * k - mmh) / 2;
    Gpx.DrawFillRect("rgba(192, 192, 192, 0.4)", "rgba(255, 255, 255, 0.6)", mmox, mmoy, mmw, mmh);
    App.Field.MoonMobList.ItemList.forEach(i => {
      let mob: MoonMob = i as MoonMob;
      if (mob.State == MoonMobState.Await) return;
      if (mob.Type == MoonMobType.Player) {
        var cc = "red";
        if (mob.State == MoonMobState.Dead) cc = "gray";
        if (mob.PlayerId == App.PlayerGuid) cc = "green";
        Gpx.DrawFillCircle(cc, "yellow", mmox + mob.X * k + mmx, mmoy + mob.Y * k + mmy, 3);
      }
      if (mob.Type == MoonMobType.Mob) {
        var cc = "red";
        if (mob.State == MoonMobState.Dead) cc = "gray";
        Gpx.FillCircle(cc, mmox + mob.X * k + mmx, mmoy + mob.Y * k + mmy, 1.3);
      }
      if (mob.Type == MoonMobType.Npc) {
        var cc = "lightblue";
        Gpx.DrawFillCircle(cc, "yellow", mmox + mob.X * k + mmx, mmoy + mob.Y * k + mmy, 3);
      }
    });
    // ---------
    // ui-player
    if (this.MoonPlayer) {
      // ---------
      if (this.MoonPlayer.State == MoonMobState.Alive && this.MoonPlayer.PInstruction == "s" && this.MoonPlayer.SkillState == SkillState.Charge) {
        Gpx.DrawFillRect("gray", "#E0E000", this.cx - 100, App.Game.Height - 240, 200, 12, 1.5);
        Gpx.FillRect("yellow", this.cx - 99, App.Game.Height - 239, 198 * this.MoonPlayer.ChargeLeft / this.MoonPlayer.ChargeTime, 10);
      }
      // ---------
      var skills = App.Resx.GetPackResource("skills");
      var misc = App.Resx.GetPackResource("misc");
      var ct = this.MoonPlayer.ClassType;
      var nsk = 3;
      if (this.MoonPlayer.ClassType == 2) ct = 1;
      if (this.MoonPlayer.ClassType == 1) ct = 2;
      Gpx.DrawImage(skills.ss.s[0 + ct * nsk].img, this.cx - 65 * 4, App.Game.Height - 96);
      Gpx.DrawImage(skills.ss.s[1 + ct * nsk].img, this.cx - 65 * 3, App.Game.Height - 96);
      Gpx.DrawImage(skills.ss.s[2 + ct * nsk].img, this.cx - 65 * 2, App.Game.Height - 96);
      Gpx.DrawImage(misc.ii.n.empty_skill_slot.img, this.cx - 65 * 1, App.Game.Height - 96);
      Gpx.DrawImage(misc.ii.n.empty_skill_slot.img, this.cx + 65 * 0, App.Game.Height - 96);
      Gpx.DrawImage(misc.ii.n.empty_skill_slot.img, this.cx + 65 * 1, App.Game.Height - 96);
      Gpx.DrawImage(misc.ii.n.empty_skill_slot.img, this.cx + 65 * 2, App.Game.Height - 96);
      Gpx.DrawImage(misc.ii.n.empty_skill_slot.img, this.cx + 65 * 3, App.Game.Height - 96);

      for (var i = 0; i < this.MoonPlayer.Skills.length; i++) {
        var skill: SkillInfo = this.MoonPlayer.Skills[i];
        if (skill && skill.cooldownTime > skill.cooldownTimeLeft) {
          var centerX = this.cx - 65 * 4 + 32 + 65 * i;
          var centerY = App.Game.Height - 96 + 32;
          var radius = 32;
          var angle = (1 - skill.cooldownTimeLeft / skill.cooldownTime) * 2 * Math.PI;
          Gpx.FillSector("rgb(128, 128, 128, 0.7)", centerX, centerY, radius, 0 - Math.PI / 2, angle - Math.PI / 2);
        }
      }
      // ---------
    }
    // ---------
  }

  protected OnDispatch(): void {
    super.OnDispatch();

  }

  protected OnPaint(): void {
    let pack: JsPack = App.Resx.GetPackResource("layer-zero");
    let b: JsXImage = pack.GetImageByName("grass");
    for (var j = 0; j < this.zeroHeight; j++)
      for (var i = 0; i < this.zeroWidth; i++)
        Gpx.DrawImage(b.img, this.X + i * this.zeroSize - this.playerx + this.cx, this.Y + j * this.zeroSize - this.playery + this.cy);
  }

  public ResizeWindow(): void {
    this.width = App.Game.Width;
    this.height = App.Game.Height;
    this.cx = Math.floor(this.width / 2);
    this.cy = Math.floor(this.height / 2);

    this.Chat.X = 10;
    this.Chat.Y = this.height - this.Chat.Height - 10;
    this.Chat.ResizeWindow();

    if (this.MessageBox != null) this.MessageBox.ResizeWindow();
  }

  public DropContextPanels() {
    this.ContextPanels.forEach(cp => {
      cp.Deactivate();
      cp.Parent.Controls.Remove(cp);
    });
    this.ContextPanels = [];
  }

  protected OnMouseDown(e: MouseArgs): void {
    super.OnMouseDown(e);
    App.MBtns[e.Button] = e.X;
    if (e.Button == 0 || e.Button == 2)
      this.PlayerClick(e.Button, e.X - this.cx + this.playerx, e.Y - this.cy + this.playery);
  }

  protected OnMouseMove(e: MouseExtArgs): void {
    super.OnMouseMove(e);
    if (App.MBtns[0]) App.MBtns[0] = e.X;
    if (App.MBtns[1]) App.MBtns[1] = e.X;
    if (App.MBtns[2]) App.MBtns[2] = e.X;
    this.cursor.x = e.X;
    this.cursor.y = e.Y;
    this.PlayerMove(e.X - this.cx + this.playerx, e.Y - this.cy + this.playery);
  }

  public PlayerMove(x: number, y: number) {
  }

  public SetUnderCursor(x: number, y: number) {
    // Наведение на цель
    this.UnderCursor = null;
    for (var i = 0; i < this.MoonChestList.ItemList.length; i++) {
      let m: MoonChest = this.MoonChestList.ItemList[i] as MoonChest;
      if (m.State != ChestState.Restricted && m.State != ChestState.Available) continue;
      if (Math.sqrt((m.X - x) * (m.X - x) + (m.Y - y) * (m.Y - y)) < m.Info.radius) {
        this.UnderCursor = m;
        break;
      }
    }
    if (!this.UnderCursor)
      for (var i = 0; i < this.MoonMobList.ItemList.length; i++) {
        let m: MoonMob = this.MoonMobList.ItemList[i] as MoonMob;
        if (m.State == MoonMobState.Await) continue;
        if (m.Type == MoonMobType.Player && m.PlayerId == App.PlayerGuid) continue;
        if (Math.sqrt((m.X - x) * (m.X - x) + (m.Y - y) * (m.Y - y)) < m.Radius) {
          this.UnderCursor = m;
          break;
        }
      }
  }

  public SetCursor() {
    let x: number = this.cursor.x - this.cx + this.playerx;
    let y: number = this.cursor.y - this.cy + this.playery;
    this.SetUnderCursor(x, y);
    App.Canvas.style.cursor = this.UnderCursor ? "pointer" : "default";
  }

  public PlayerClick(button: number, x: number, y: number) {
    this.SetUnderCursor(x, y);
    if (this.UnderCursor) {
      // Ткнули в моба, игрока или сундук
      var ot: MoonObjectType = MoonObjectType.Mob;
      var oid: number;
      if (this.UnderCursor instanceof MoonChest) {
        ot = MoonObjectType.Chest;
        oid = (this.UnderCursor as MoonChest).Info.chestId;
      } else {
        oid = (this.UnderCursor as MoonMob).MobId;
      }
      App.Hub.PlayerSelectTo(App.PlayerGuid, ot, oid, button);
    }
    else
      // Ткнули на местность
      App.Hub.PlayerMoveTo(App.PlayerGuid, x, y, button);
  }

  protected OnPropagateMouseDown(Event: MouseArgs): void {
    this.DropContextPanels();
  }

  public ContextMenuTargetHP(x: number, y: number) {
    this.DropContextPanels();
    if (App.Field.MoonPlayer.TargetId > 0) {
      this.ContextObjectMenu(x, y, App.Field.MoonPlayer.TargetId);
    }
  }

  public ContextObjectMenu(x: number, y: number, objectId: number) {
    this.DropContextPanels();
    let mob: MoonMob = App.Field.MoonMobList.ItemList.filter(i => (i as MoonMob).MobId == objectId)[0] as MoonMob;
    if (mob.Type != MoonMobType.Player) return;
    if (mob.Party) return;
    var menu = new MContextMenu(x, y, mob, ['Добавить в группу', '', 'Написать игроку', 'Информация о персонаже']);
    menu.Activate();
    menu.ContextMenuClick = (s, e) => {
      if (e.Index == 0)
        App.Hub.InviteGroup(App.PlayerGuid, mob.PlayerId);
    };
  }

}