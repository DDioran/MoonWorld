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
var base_response_1 = require("./base-response");
var MoonObjectType;
(function (MoonObjectType) {
    MoonObjectType[MoonObjectType["Mob"] = 0] = "Mob";
    MoonObjectType[MoonObjectType["Chest"] = 1] = "Chest";
    MoonObjectType[MoonObjectType["Npc"] = 2] = "Npc";
})(MoonObjectType = exports.MoonObjectType || (exports.MoonObjectType = {}));
var MoonMobType;
(function (MoonMobType) {
    MoonMobType[MoonMobType["Player"] = 0] = "Player";
    MoonMobType[MoonMobType["Mob"] = 1] = "Mob";
    MoonMobType[MoonMobType["Npc"] = 2] = "Npc";
})(MoonMobType = exports.MoonMobType || (exports.MoonMobType = {}));
var MoonMobState;
(function (MoonMobState) {
    MoonMobState[MoonMobState["Await"] = 0] = "Await";
    MoonMobState[MoonMobState["Alive"] = 1] = "Alive";
    MoonMobState[MoonMobState["Dead"] = 2] = "Dead";
})(MoonMobState = exports.MoonMobState || (exports.MoonMobState = {}));
var ClientInfoType;
(function (ClientInfoType) {
    ClientInfoType[ClientInfoType["MobInfo"] = 0] = "MobInfo";
    ClientInfoType[ClientInfoType["PlayerInfo"] = 1] = "PlayerInfo";
    ClientInfoType[ClientInfoType["NpcInfo"] = 2] = "NpcInfo";
})(ClientInfoType = exports.ClientInfoType || (exports.ClientInfoType = {}));
var MoonSkillType;
(function (MoonSkillType) {
    // General
    MoonSkillType[MoonSkillType["None"] = 0] = "None";
    // Mage
    MoonSkillType[MoonSkillType["MageAttack"] = 1] = "MageAttack";
    MoonSkillType[MoonSkillType["MageFireBall"] = 2] = "MageFireBall";
    MoonSkillType[MoonSkillType["MageFreeze"] = 3] = "MageFreeze";
    // Knight
    MoonSkillType[MoonSkillType["KnightAttack"] = 4] = "KnightAttack";
    MoonSkillType[MoonSkillType["KnightSwordStrike"] = 5] = "KnightSwordStrike";
    MoonSkillType[MoonSkillType["KnightDash"] = 6] = "KnightDash";
    // Archer
    MoonSkillType[MoonSkillType["ArcherAttack"] = 7] = "ArcherAttack";
    MoonSkillType[MoonSkillType["ArcherTripleShot"] = 8] = "ArcherTripleShot";
    MoonSkillType[MoonSkillType["ArcherSlowShot"] = 9] = "ArcherSlowShot";
    // Priest
    MoonSkillType[MoonSkillType["PriestAttack"] = 10] = "PriestAttack";
    MoonSkillType[MoonSkillType["PriestHeal"] = 11] = "PriestHeal";
    MoonSkillType[MoonSkillType["PriestRoot"] = 12] = "PriestRoot";
    // Mobs
    MoonSkillType[MoonSkillType["SkelBowAttack"] = 13] = "SkelBowAttack";
    MoonSkillType[MoonSkillType["WeakSkelBowAttack"] = 14] = "WeakSkelBowAttack";
    MoonSkillType[MoonSkillType["TerribleSkelBowAttack"] = 15] = "TerribleSkelBowAttack";
    MoonSkillType[MoonSkillType["SkelAttack"] = 16] = "SkelAttack";
    MoonSkillType[MoonSkillType["SwordSkelAttack"] = 17] = "SwordSkelAttack";
    MoonSkillType[MoonSkillType["PinkZombieAttack"] = 18] = "PinkZombieAttack";
})(MoonSkillType = exports.MoonSkillType || (exports.MoonSkillType = {}));
var SkillState;
(function (SkillState) {
    SkillState[SkillState["Await"] = 0] = "Await";
    SkillState[SkillState["Charge"] = 1] = "Charge";
    SkillState[SkillState["Run"] = 2] = "Run";
})(SkillState = exports.SkillState || (exports.SkillState = {}));
var PlayerClassType;
(function (PlayerClassType) {
    PlayerClassType[PlayerClassType["Mage"] = 0] = "Mage";
    PlayerClassType[PlayerClassType["Knight"] = 1] = "Knight";
    PlayerClassType[PlayerClassType["Archer"] = 2] = "Archer";
    PlayerClassType[PlayerClassType["Priest"] = 3] = "Priest";
})(PlayerClassType = exports.PlayerClassType || (exports.PlayerClassType = {}));
var MoonClientInfoResult = /** @class */ (function (_super) {
    __extends(MoonClientInfoResult, _super);
    function MoonClientInfoResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MoonClientInfoResult;
}(base_response_1.BaseResponse));
exports.MoonClientInfoResult = MoonClientInfoResult;
var DebuffType;
(function (DebuffType) {
    DebuffType[DebuffType["Slow"] = 0] = "Slow";
})(DebuffType = exports.DebuffType || (exports.DebuffType = {}));
var MoonDebuff = /** @class */ (function () {
    function MoonDebuff() {
    }
    return MoonDebuff;
}());
exports.MoonDebuff = MoonDebuff;
var MoonDebuffTable = /** @class */ (function () {
    function MoonDebuffTable() {
    }
    return MoonDebuffTable;
}());
exports.MoonDebuffTable = MoonDebuffTable;
var ClientSprite = /** @class */ (function () {
    function ClientSprite() {
    }
    return ClientSprite;
}());
exports.ClientSprite = ClientSprite;
var ClientInfo = /** @class */ (function () {
    function ClientInfo() {
    }
    return ClientInfo;
}());
exports.ClientInfo = ClientInfo;
var PlayerInfo = /** @class */ (function (_super) {
    __extends(PlayerInfo, _super);
    function PlayerInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PlayerInfo;
}(ClientInfo));
exports.PlayerInfo = PlayerInfo;
var SkillInfo = /** @class */ (function () {
    function SkillInfo() {
    }
    return SkillInfo;
}());
exports.SkillInfo = SkillInfo;
var PartyInfo = /** @class */ (function () {
    function PartyInfo() {
    }
    return PartyInfo;
}());
exports.PartyInfo = PartyInfo;
var MoonCharListResult = /** @class */ (function (_super) {
    __extends(MoonCharListResult, _super);
    function MoonCharListResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MoonCharListResult;
}(base_response_1.BaseResponse));
exports.MoonCharListResult = MoonCharListResult;
var MoonCharResult = /** @class */ (function (_super) {
    __extends(MoonCharResult, _super);
    function MoonCharResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MoonCharResult;
}(base_response_1.BaseResponse));
exports.MoonCharResult = MoonCharResult;
var MoonCharGuidResult = /** @class */ (function (_super) {
    __extends(MoonCharGuidResult, _super);
    function MoonCharGuidResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MoonCharGuidResult;
}(base_response_1.BaseResponse));
exports.MoonCharGuidResult = MoonCharGuidResult;
var MoonChar = /** @class */ (function () {
    function MoonChar() {
    }
    return MoonChar;
}());
exports.MoonChar = MoonChar;
var LogOnData = /** @class */ (function () {
    function LogOnData() {
    }
    return LogOnData;
}());
exports.LogOnData = LogOnData;
//# sourceMappingURL=moon-info.js.map