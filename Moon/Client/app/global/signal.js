"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var effect_1 = require("../objs/effect");
var mob_1 = require("../objs/mob");
var mmessagebox_1 = require("../ui/mmessagebox");
var chest_1 = require("../objs/chest");
var connlost_1 = require("../forms/connlost");
var quest_1 = require("../panels/quest");
var MoonSignal = /** @class */ (function () {
    function MoonSignal() {
    }
    MoonSignal.DoPointEffect = function (SpriteName, s, x, y) {
        if (app_1.App.Field && app_1.App.Field.MoonEffectList)
            new effect_1.MoonPointEffect(SpriteName, s, x, y);
    };
    MoonSignal.DoLineEffect = function (SpriteName, s, x1, y1, x2, y2) {
        if (app_1.App.Field && app_1.App.Field.MoonEffectList)
            new effect_1.MoonLineEffect(SpriteName, s, x1, y1, x2, y2);
    };
    MoonSignal.DoHitEffect = function (x, y, hit, crit, mobid) {
        if (app_1.App.Field && app_1.App.Field.MoonEffectList)
            new effect_1.MoonHitEffect(x, y, hit, crit, mobid);
    };
    MoonSignal.DoDashEffect = function (mobId, x2, y2) {
        if (app_1.App.Field && app_1.App.Field.MoonEffectList) {
            var mob = app_1.App.Field.MoonMobList.ItemList.filter(function (m) { return mobId == m.MobId; })[0];
            new effect_1.MoonDashEffect(mob, x2, y2);
        }
    };
    MoonSignal.DoTextChat = function (chatType, id, color, message) {
        app_1.App.Field.Chat.chats.forEach(function (c) {
            if (chatType.findIndex(function (ct) { return ct == c.ChatType; }) >= 0)
                c.AddLine(id, color, message);
        });
    };
    MoonSignal.DoInviteGroup = function (playerId) {
        var player = app_1.App.Field.MoonMobList.ItemList.filter(function (m) { return playerId == m.PlayerId; })[0];
        if (!app_1.App.Field.MessageBox) {
            var mbox = new mmessagebox_1.MMessageBox(300, 200, "Приглашение в группу", "Игрок " + player.Name + " хочет добавить вас в группу.", [mmessagebox_1.MessageBoxButton.mbOk, mmessagebox_1.MessageBoxButton.mbCancel]);
            mbox.ButtonClick = function (s, e) {
                app_1.App.Hub.InviteGroupResponse(app_1.App.PlayerGuid, playerId, e.Type);
            };
            mbox.Activate();
        }
    };
    MoonSignal.DoClientInfo = function (clientInfo) {
        if (app_1.App.Initialized) {
            var mob = mob_1.MoonMobList.FindMob(clientInfo.mobId);
            if (mob)
                mob.SetClientInfo(clientInfo);
            else
                mob = new mob_1.MoonMob(clientInfo);
        }
    };
    MoonSignal.DoChestInfo = function (chestInfo) {
        var chest = chest_1.MoonChestList.FindChest(chestInfo.chestId);
        if (!chest)
            chest = new chest_1.MoonChest();
        chest.SetInfo(chestInfo);
    };
    MoonSignal.Response = function (id, response) {
        var callback = app_1.App.Hub.Pull[id];
        delete app_1.App.Hub.Pull[id];
        if (callback)
            callback(response);
    };
    MoonSignal.SendNpcTalk = function (info) {
        (new quest_1.QuestPanel(mob_1.MoonMobList.FindMobByCode(info.itemCode), info)).Activate();
    };
    MoonSignal.RegisterSignalREvents = function () {
        app_1.App.Hub.Hub.onclose(function () {
            app_1.App.Game.ConnLostForm = new connlost_1.ConnectionLostForm();
            app_1.App.Game.SetActiveForm(app_1.App.Game.ConnLostForm);
        });
        // Логгирование
        app_1.App.Hub.Hub.on("DoLog", function (text) {
            console.log("Log: %s", text);
        });
        // Текущий пользователь зарегистрирован
        app_1.App.Hub.Hub.on("PlayerRegistered", function (playerInfo) {
            console.log("PlayerRegistered");
            app_1.App.Game.PlayerRegistered(playerInfo);
        });
        // Отображение эффекта в координате
        app_1.App.Hub.Hub.on("DoPointEffect", function (spriteName, s, x, y) {
            //console.log("Point effect: %s (%d, %d)", spriteName, x, y);
            MoonSignal.DoPointEffect(spriteName, s, x, y);
        });
        // Отображение двумерного эффекта
        app_1.App.Hub.Hub.on("DoLineEffect", function (spriteName, s, x1, y1, x2, y2) {
            //console.log("Point effect: %s (%d, %d)", spriteName, x, y);
            MoonSignal.DoLineEffect(spriteName, s, x1, y1, x2, y2);
        });
        app_1.App.Hub.Hub.on("DoHitEffect", function (x, y, hit, crit, mobid) {
            //console.log("Point effect: %s (%d, %d)", spriteName, x, y);
            MoonSignal.DoHitEffect(x, y, hit, crit, mobid);
        });
        app_1.App.Hub.Hub.on("DoDashEffect", function (mobId, x2, y2) {
            MoonSignal.DoDashEffect(mobId, x2, y2);
        });
        app_1.App.Hub.Hub.on("DoTextChat", function (chatType, id, color, message) {
            MoonSignal.DoTextChat(chatType, id, color, message);
        });
        app_1.App.Hub.Hub.on("DoInviteGroup", function (playerId) {
            MoonSignal.DoInviteGroup(playerId);
        });
        app_1.App.Hub.Hub.on("DoClienfInfo", function (clientInfo) {
            MoonSignal.DoClientInfo(clientInfo);
        });
        app_1.App.Hub.Hub.on("DoChestInfo", function (chestInfo) {
            MoonSignal.DoChestInfo(chestInfo);
        });
        app_1.App.Hub.Hub.on("Method_Response", function (id, response) {
            MoonSignal.Response(id, response);
        });
        app_1.App.Hub.Hub.on("SendNpcTalk", function (npcTalkInfo) {
            MoonSignal.SendNpcTalk(npcTalkInfo);
        });
    };
    return MoonSignal;
}());
exports.MoonSignal = MoonSignal;
//# sourceMappingURL=signal.js.map