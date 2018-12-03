"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mcounter_1 = require("../mlib/mcounter");
var sobject_1 = require("../mlib/sobject");
var info_1 = require("../service/info");
var app_1 = require("../global/app");
var mgfx_1 = require("../mlib/mgfx");
var MoonMob = /** @class */ (function (_super) {
    __extends(MoonMob, _super);
    function MoonMob(MobInfo) {
        var _this = _super.call(this, MobInfo.pointMobX, MobInfo.pointMobY) || this;
        _this.paused = false;
        app_1.App.Field.MoonMobList.ItemList.push(_this);
        switch (MobInfo.infoType) {
            case info_1.ClientInfoType.MobInfo:
                _this.Type = info_1.MoonMobType.Mob;
                break;
            case info_1.ClientInfoType.PlayerInfo:
                _this.Type = info_1.MoonMobType.Player;
                break;
            case info_1.ClientInfoType.NpcInfo:
                _this.Type = info_1.MoonMobType.Npc;
                break;
        }
        _this.DirectionView = 3;
        _this.SetClientInfo(MobInfo);
        return _this;
    }
    MoonMob.prototype.SetClientInfo = function (MobInfo) {
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
        if (this.Type == info_1.MoonMobType.Player) {
            this.PlayerId = MobInfo.playerId;
            this.Active = MobInfo.active;
            this.ClassType = MobInfo.classType;
            this.Exp = MobInfo.exp;
            this.MaxExp = MobInfo.maxExp;
            this.QuestNpc = MobInfo.questNpcInfo;
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
        this.Sprite = app_1.App.Resx.GetPackResource(this.SpriteName);
        this.ChargeTime = MobInfo.chargeTime;
        this.ChargeLeft = MobInfo.chargeLeft;
        this.AnimateName = MobInfo.animateName;
        this.Debuffs = MobInfo.debuffs;
        this.Party = MobInfo.party;
        if (this.PInstruction != "p" || this.Type == info_1.MoonMobType.Mob)
            this.paused = false;
        if (this.State == info_1.MoonMobState.Alive) {
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
            if (this.PInstruction == "s" && this.SkillState == info_1.SkillState.Run) {
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
                this.CounterView = new mcounter_1.MCounter(action[this.DirectionView].length, anispeed, repeat);
                this.CounterViewAction = action;
            }
        }
        if (this.State == info_1.MoonMobState.Dead) {
            action = this.Sprite.sow.spr.defeat;
            var anispeed = this.DeathAniSpeed;
            //if (!(this.CounterView && this.CounterView.Count == action[this.DirectionView].length && this.CounterView.TimeSecs == 1.0 && this.CounterView.Loop == false)) {
            if (!(this.CounterView && this.CounterViewAction == action && this.CounterView.TimeSecs == anispeed)) {
                //anispeed = App.MoonGame.value_speed; //TEST
                this.CounterView = new mcounter_1.MCounter(action[this.DirectionView].length, anispeed, false);
                this.CounterViewAction = action;
            }
        }
    };
    MoonMob.prototype.NextInstruction = function () {
        if (!this.paused) {
            this.paused = true;
            var anispeed = this.IdleAniSpeed;
            if (!(this.CounterView && this.CounterViewAction == this.Sprite.sow.spr.paused && this.CounterView.TimeSecs == anispeed)) {
                //anispeed = App.MoonGame.value_speed; //TEST
                this.CounterView = new mcounter_1.MCounter(this.Sprite.sow.spr.paused[this.DirectionView].length, anispeed, true);
                this.CounterViewAction = this.Sprite.sow.spr.paused;
            }
        }
        return;
        // --
    };
    MoonMob.prototype.Dispatcher = function () {
        if (this.Type == info_1.MoonMobType.Player) {
            var a = 0;
        }
        if (this.CounterView)
            this.CounterView.GetIndex(app_1.App.DeltaTime);
        if (this.paused)
            return;
        if (this.State == info_1.MoonMobState.Alive) {
            this.PInstructionTime += app_1.App.DeltaTime;
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
            if (this.PInstruction == "s" && this.SkillState == info_1.SkillState.Run) {
                if (this.PInstructionTime >= this.PInstructionAllTime) {
                    this.NextInstruction();
                    return;
                }
                return;
            }
        }
        if (this.State == info_1.MoonMobState.Dead) {
            this.AwaitTime += app_1.App.DeltaTime;
        }
    };
    MoonMob.prototype.Paint = function () {
        var _this = this;
        if (this.Type == info_1.MoonMobType.Player) {
            var a = 0;
        }
        if (this.State != info_1.MoonMobState.Await) {
            var action = this.Sprite.sow.spr.paused;
            if (this.State == info_1.MoonMobState.Alive) {
                if (!this.paused && this.PInstruction == "m") {
                    if (this.PParam1 == "w")
                        action = this.Sprite.sow.spr.walking;
                    if (this.PParam1 == "r")
                        action = this.Sprite.sow.spr.running;
                }
                if (this.PInstruction == "s" && this.SkillState == info_1.SkillState.Run) {
                    action = this.Sprite.sow.spr[this.AnimateName];
                    if (!action)
                        action = this.Sprite.sow.spr.attack;
                }
            }
            if (this.State == info_1.MoonMobState.Dead)
                action = this.Sprite.sow.spr.defeat;
            var idx = this.CounterView.GetCurrentIndex();
            if (idx < 0) {
                idx = action[this.DirectionView].length - 1;
            }
            var spr = action[this.DirectionView][idx];
            if (!spr) {
                idx = action[this.DirectionView].length - 1; // Если кончились спрайты какой либо предыдущей фазы - показывать последний из них
                spr = action[this.DirectionView][idx];
            }
            var px = Math.floor(-app_1.App.Field.playerx + app_1.App.Field.cx + this.X - spr.cx);
            var py = Math.floor(-app_1.App.Field.playery + app_1.App.Field.cy + this.Y - spr.cy);
            //Gpx.DrawImage(spr.img, px + this.SpriteOX, py + this.SpriteOY);
            mgfx_1.Gpx.DrawImage(spr.img, px, py);
            px -= this.SpriteOX;
            py -= this.SpriteOY;
            var color = "yellow";
            var font = "11px CoreRhino-Regular";
            if (this.Type == info_1.MoonMobType.Npc) {
                var color = "#ccff88";
                var font = "12px CoreRhino-Regular";
            }
            var width = mgfx_1.Gpx.MeasureText(this.Name, font).width;
            mgfx_1.Gpx.Text(color, this.Name, px + spr.cx - width / 2, py + spr.cy - 45, font);
            if (this.Type != info_1.MoonMobType.Npc) {
                color = "red";
                mgfx_1.Gpx.DrawFillRect("gray", "yellow", px + spr.cx - 32, py + spr.cy - 40, 64, 5);
                mgfx_1.Gpx.FillRect(color, px + spr.cx - 31, py + spr.cy - 39, 62 * this.HP / this.MaxHP, 3);
            }
            else {
                var npcInfo = app_1.App.Field.MoonPlayer.QuestNpc.find(function (n) { return n.npc == _this.ItemCode; });
                if (npcInfo && (npcInfo.offer || npcInfo.complete)) {
                    var qText = "" + (npcInfo.offer ? '!' : '') + (npcInfo.complete ? '?' : '');
                    width = mgfx_1.Gpx.MeasureText(qText, font).width;
                    mgfx_1.Gpx.Text("yellow", qText, px + spr.cx - width / 2, py + spr.cy - 45 - 16, "24px CoreRhino-Bold");
                }
            }
        }
    };
    return MoonMob;
}(sobject_1.SObjectXY));
exports.MoonMob = MoonMob;
var MoonMobList = /** @class */ (function (_super) {
    __extends(MoonMobList, _super);
    function MoonMobList() {
        var _this = _super.call(this) || this;
        _this.counter = new mcounter_1.MCounter(60, 1, false);
        return _this;
    }
    MoonMobList.FindMob = function (MobId) {
        return app_1.App.Field.MoonMobList.ItemList.find(function (m) { return m.MobId == MobId; });
    };
    MoonMobList.FindPlayer = function (PlayerId) {
        return app_1.App.Field.MoonMobList.ItemList.find(function (m) { return m.PlayerId == PlayerId; });
    };
    MoonMobList.FindMobByCode = function (ItemCode) {
        return app_1.App.Field.MoonMobList.ItemList.find(function (m) { return m.ItemCode == ItemCode; });
    };
    MoonMobList.prototype.Dispatcher = function () {
        _super.prototype.Dispatcher.call(this);
    };
    return MoonMobList;
}(sobject_1.SObjectList));
exports.MoonMobList = MoonMobList;
//# sourceMappingURL=mob.js.map