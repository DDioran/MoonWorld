"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MoonHub = /** @class */ (function () {
    function MoonHub(Hub) {
        this.Hub = Hub;
        this.Pull = {};
        this.PullId = 1;
    }
    MoonHub.prototype.Request = function (Name, Data, Callback) {
        var id = this.PullId++;
        this.Pull[id] = Callback;
        this.Hub.invoke("Method_" + Name, id, Data)
            .catch(function (reason) { console.log(reason); });
    };
    MoonHub.prototype.RegisterClient = function (UserGuid, CharacterId) {
        this.Hub.invoke("RegisterClient", UserGuid, CharacterId)
            .catch(function (reason) { console.log(reason); });
    };
    MoonHub.prototype.DownloadAllObjects = function (PlayerId) {
        this.Hub.invoke("DownloadAllObjects", PlayerId)
            .catch(function (reason) { console.log(reason); });
    };
    MoonHub.prototype.PlayerSelectTo = function (PlayerId, ObjectType, ObjectId, Button) {
        this.Hub.invoke("PlayerSelectTo", PlayerId, ObjectType, ObjectId, Button)
            .catch(function (reason) { console.log(reason); });
    };
    MoonHub.prototype.PlayerMoveTo = function (PlayerId, X, Y, Button) {
        this.Hub.invoke("PlayerMoveTo", PlayerId, X, Y, Button)
            .catch(function (reason) { console.log(reason); });
    };
    MoonHub.prototype.KeyOperation = function (PlayerId, keycode, downkey) {
        this.Hub.invoke("KeyOperation", PlayerId, keycode, downkey)
            .catch(function (reason) { console.log(reason); });
    };
    MoonHub.prototype.MessageChat = function (PlayerId, ChatType, Message) {
        this.Hub.invoke("MessageChat", PlayerId, ChatType, Message)
            .catch(function (reason) { console.log(reason); });
    };
    MoonHub.prototype.InviteGroup = function (PlayerId, MemberId) {
        this.Hub.invoke("InviteGroup", PlayerId, MemberId)
            .catch(function (reason) { console.log(reason); });
    };
    MoonHub.prototype.InviteGroupResponse = function (PlayerId, MemberId, Button) {
        this.Hub.invoke("InviteGroupResponse", PlayerId, MemberId, Button)
            .catch(function (reason) { console.log(reason); });
    };
    MoonHub.prototype.LeaveGroup = function (PlayerId) {
        this.Hub.invoke("LeaveGroup", PlayerId)
            .catch(function (reason) { console.log(reason); });
    };
    MoonHub.prototype.RemoveFromGroup = function (PlayerId, MemberId) {
        this.Hub.invoke("RemoveFromGroup", PlayerId, MemberId)
            .catch(function (reason) { console.log(reason); });
    };
    MoonHub.prototype.SetLeaderGroup = function (PlayerId, MemberId) {
        this.Hub.invoke("SetLeaderGroup", PlayerId, MemberId)
            .catch(function (reason) { console.log(reason); });
    };
    return MoonHub;
}());
exports.MoonHub = MoonHub;
//# sourceMappingURL=hub.js.map