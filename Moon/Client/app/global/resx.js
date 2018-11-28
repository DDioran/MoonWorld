"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var JsPackType;
(function (JsPackType) {
    JsPackType[JsPackType["Image"] = 0] = "Image";
    JsPackType[JsPackType["Images"] = 1] = "Images";
    JsPackType[JsPackType["Sprite"] = 2] = "Sprite";
    JsPackType[JsPackType["Sprites"] = 3] = "Sprites";
    JsPackType[JsPackType["SowSprites"] = 4] = "SowSprites";
    JsPackType[JsPackType["Audio"] = 5] = "Audio";
    JsPackType[JsPackType["Audios"] = 6] = "Audios";
})(JsPackType = exports.JsPackType || (exports.JsPackType = {}));
var JsPack = /** @class */ (function () {
    function JsPack() {
        this.ver = 0;
    }
    JsPack.prototype.GetImageByName = function (imageName) {
        var bb = this.ii.s.filter(function (s) { return s.n == imageName; });
        if (bb.length == 0)
            return null;
        return bb[0];
    };
    JsPack.prototype.GetAudioByName = function (audioName) {
        var bb = this.aa.a.filter(function (s) { return s.n == audioName; });
        if (bb.length == 0)
            return null;
        return bb[0];
    };
    return JsPack;
}());
exports.JsPack = JsPack;
var JsXImage = /** @class */ (function () {
    function JsXImage() {
    }
    return JsXImage;
}());
exports.JsXImage = JsXImage;
var JsXImages = /** @class */ (function () {
    function JsXImages() {
    }
    return JsXImages;
}());
exports.JsXImages = JsXImages;
var JsXSprite = /** @class */ (function () {
    function JsXSprite() {
    }
    return JsXSprite;
}());
exports.JsXSprite = JsXSprite;
var JsXSprites = /** @class */ (function () {
    function JsXSprites() {
    }
    return JsXSprites;
}());
exports.JsXSprites = JsXSprites;
var JsXSowSprites = /** @class */ (function () {
    function JsXSowSprites() {
    }
    return JsXSowSprites;
}());
exports.JsXSowSprites = JsXSowSprites;
var JsXAudio = /** @class */ (function () {
    function JsXAudio() {
    }
    return JsXAudio;
}());
exports.JsXAudio = JsXAudio;
var JsXAudios = /** @class */ (function () {
    function JsXAudios() {
    }
    return JsXAudios;
}());
exports.JsXAudios = JsXAudios;
var JsXResInput = /** @class */ (function () {
    function JsXResInput() {
    }
    return JsXResInput;
}());
exports.JsXResInput = JsXResInput;
var ResX = /** @class */ (function () {
    function ResX() {
        this.CountAllResources = 0;
        this.CountLoadedResources = 0;
        app_1.App.Resx = this;
        this.Packs = [];
        this.LoadPackNames = [];
        this.ResourcesLoaded = false;
    }
    ResX.prototype.LoadAllResources = function (callback) {
        var _this = this;
        this.CallbackAllLoaded = callback;
        if (this.ResourcesLoaded) {
            window.setTimeout(function () {
                _this.ResourcesIsLoaded();
            }, 1);
            return;
        }
        this.CountAllResources = this.LoadPackNames.length;
        this.CountLoadedResources = 0;
        this.LoadPackNames.forEach(function (sn) { return _this.LoadPackResource(sn); });
    };
    ResX.prototype.ResourcesIsLoaded = function () {
        this.ResourcesLoaded = true;
        if (this.CallbackAllLoaded)
            this.CallbackAllLoaded();
    };
    ResX.prototype.LoadPackResource = function (JsonName) {
        var _this = this;
        var input = new JsXResInput();
        input.JsonName = JsonName;
        input.JsonVersion = 0;
        if (!app_1.App.IsMoonDb) {
            this.LoadPackResourceInternal(input, null);
            return;
        }
        app_1.App.MoonDb.getByKey('moonJson', JsonName).then(function (json) {
            if (json) {
                input.JsonVersion = json.version;
                _this.LoadPackResourceInternal(input, json.json);
            }
            else
                _this.LoadPackResourceInternal(input, null);
        }, function (error) {
            console.log(error);
            _this.LoadPackResourceInternal(input, null);
        });
    };
    ResX.prototype.LoadPackResourceInternal = function (input, json) {
        var _this = this;
        app_1.App.Hub.Request("JsonPackResource", input, function (res) {
            if (res.errorCode == 0) {
                if (res.jsresx != "") {
                    if (json)
                        app_1.App.MoonDb.update('moonJson', { name: input.JsonName, version: res.version, json: res.jsresx }).then(function () { }, function (error) { console.log(error); });
                    else
                        app_1.App.MoonDb.add('moonJson', { name: input.JsonName, version: res.version, json: res.jsresx }).then(function () { }, function (error) { console.log(error); });
                    json = res.jsresx;
                }
                var js_1 = Object.assign(new JsPack(), JSON.parse(json));
                switch (js_1.type) {
                    case JsPackType.Image:
                        js_1.i.img = new Image();
                        js_1.i.img.src = js_1.i.o;
                        js_1.i.o = null;
                        break;
                    case JsPackType.Images:
                        js_1.ii.n = {};
                        js_1.ii.s.forEach(function (s) {
                            s.img = new Image();
                            s.img.src = s.o;
                            s.o = null;
                            js_1.ii.n[s.n] = s;
                        });
                        break;
                    case JsPackType.Sprite:
                        js_1.s.img = new Image();
                        js_1.s.img.src = js_1.s.o;
                        js_1.s.o = null;
                        break;
                    case JsPackType.Sprites:
                        js_1.ss.s.forEach(function (s) {
                            s.img = new Image();
                            s.img.src = s.o;
                            s.o = null;
                        });
                        break;
                    case JsPackType.SowSprites:
                        js_1.sow.spr = {};
                        for (var i = 0; i < js_1.sow.sn.length; i++) {
                            js_1.sow.ss[i].forEach(function (ss) { return ss.forEach(function (s) {
                                s.img = new Image();
                                s.img.src = s.o;
                                s.o = null;
                            }); });
                            js_1.sow.spr[js_1.sow.sn[i]] = js_1.sow.ss[i];
                        }
                        js_1.sow.ss = null;
                        js_1.sow.sn = null;
                        break;
                    case JsPackType.Audio:
                        //js.a.audio = new SAudio(js.a.o, js.a.n == "");
                        js_1.a.o = null;
                        break;
                    case JsPackType.Audios:
                        js_1.aa.a.forEach(function (s) {
                            //s.audio = new SAudio(s.o, s.n == "");
                            s.o = null;
                        });
                        break;
                }
                _this.Packs.push(js_1);
                _this.CountLoadedResources++;
                console.log(_this.CountLoadedResources + "/" + _this.CountAllResources);
                if (_this.CountLoadedResources == _this.CountAllResources)
                    _this.ResourcesIsLoaded();
            }
        });
    };
    ResX.prototype.GetPackResource = function (PackName) {
        var s = this.Packs.filter(function (s) { return s.name == PackName; });
        return s.length == 0 ? null : s[0];
    };
    return ResX;
}());
exports.ResX = ResX;
//# sourceMappingURL=resx.js.map