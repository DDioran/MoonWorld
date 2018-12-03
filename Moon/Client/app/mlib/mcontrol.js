"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("./events");
var mgfx_1 = require("./mgfx");
var app_1 = require("../global/app");
var MessageType;
(function (MessageType) {
    MessageType[MessageType["MouseClick"] = 0] = "MouseClick";
    MessageType[MessageType["MouseMove"] = 1] = "MouseMove";
    MessageType[MessageType["MouseEnter"] = 2] = "MouseEnter";
    MessageType[MessageType["MouseLeave"] = 3] = "MouseLeave";
    MessageType[MessageType["MouseDown"] = 4] = "MouseDown";
    MessageType[MessageType["MouseUp"] = 5] = "MouseUp";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var MAlign;
(function (MAlign) {
    MAlign[MAlign["None"] = 0] = "None";
    MAlign[MAlign["Left"] = 1] = "Left";
    MAlign[MAlign["Center"] = 2] = "Center";
    MAlign[MAlign["Right"] = 3] = "Right";
})(MAlign = exports.MAlign || (exports.MAlign = {}));
var MVAlign;
(function (MVAlign) {
    MVAlign[MVAlign["None"] = 0] = "None";
    MVAlign[MVAlign["Top"] = 1] = "Top";
    MVAlign[MVAlign["Middle"] = 2] = "Middle";
    MVAlign[MVAlign["Bottom"] = 3] = "Bottom";
})(MVAlign = exports.MVAlign || (exports.MVAlign = {}));
var MessageItem = /** @class */ (function () {
    function MessageItem(Type, Object) {
        this.MessageType = Type;
        this.MessageObject = Object;
    }
    return MessageItem;
}());
exports.MessageItem = MessageItem;
var Margin = /** @class */ (function () {
    function Margin(Control) {
        this.control = Control;
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
    }
    Object.defineProperty(Margin.prototype, "Left", {
        get: function () {
            return this.left;
        },
        set: function (value) {
            this.left = value;
            this.control.AjustmentPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Margin.prototype, "Right", {
        get: function () {
            return this.right;
        },
        set: function (value) {
            this.right = value;
            this.control.AjustmentPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Margin.prototype, "Top", {
        get: function () {
            return this.top;
        },
        set: function (value) {
            this.top = value;
            this.control.AjustmentPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Margin.prototype, "Bottom", {
        get: function () {
            return this.bottom;
        },
        set: function (value) {
            this.bottom = value;
            this.control.AjustmentPosition();
        },
        enumerable: true,
        configurable: true
    });
    return Margin;
}());
exports.Margin = Margin;
var MControl = /** @class */ (function () {
    function MControl(x, y, width, height, text) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 100; }
        if (height === void 0) { height = 100; }
        if (text === void 0) { text = "object"; }
        this.controls = new ControlCollection(this);
        this.margin = new Margin(this);
        this.x = this.gx = x;
        this.y = this.gy = y;
        this.mouse_x = -1;
        this.mouse_y = -1;
        this.width = width;
        this.height = height;
        this.text = text;
        this.align = MAlign.None;
        this.valign = MVAlign.None;
        this.enabled = true;
        this.visible = true;
        this.parent = null;
        this.font = "10 CoreRhino-Regular";
        this.color = "white";
        this.backgroundColor = "black";
        this.transparent = true;
        this.canmousecapture = false;
        this.queue = [];
        this.AjustmentPosition();
        this.OnInit();
    }
    Object.defineProperty(MControl.prototype, "X", {
        get: function () {
            return this.x;
        },
        set: function (value) {
            this.x = value;
            this.AjustmentPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MControl.prototype, "Y", {
        get: function () {
            return this.y;
        },
        set: function (value) {
            this.y = value;
            this.AjustmentPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MControl.prototype, "GX", {
        get: function () {
            return this.gx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MControl.prototype, "GY", {
        get: function () {
            return this.gy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MControl.prototype, "Width", {
        get: function () {
            return this.width;
        },
        set: function (value) {
            this.width = value;
            this.AjustmentPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MControl.prototype, "Height", {
        get: function () {
            return this.height;
        },
        set: function (value) {
            this.height = value;
            this.AjustmentPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MControl.prototype, "Margin", {
        get: function () {
            return this.margin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MControl.prototype, "Align", {
        get: function () {
            return this.align;
        },
        set: function (value) {
            this.align = value;
            this.AjustmentPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MControl.prototype, "VAlign", {
        get: function () {
            return this.valign;
        },
        set: function (value) {
            this.valign = value;
            this.AjustmentPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MControl.prototype, "Text", {
        get: function () {
            return this.text;
        },
        set: function (value) {
            this.text = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MControl.prototype, "Enabled", {
        get: function () {
            return this.enabled;
        },
        set: function (value) {
            this.enabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MControl.prototype, "Visible", {
        get: function () {
            return this.visible;
        },
        set: function (value) {
            this.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MControl.prototype, "Font", {
        get: function () {
            return this.font;
        },
        set: function (value) {
            this.font = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MControl.prototype, "BackgroundColor", {
        get: function () {
            return this.backgroundColor;
        },
        set: function (value) {
            this.backgroundColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MControl.prototype, "Color", {
        get: function () {
            return this.color;
        },
        set: function (value) {
            this.color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MControl.prototype, "Transparent", {
        get: function () {
            return this.transparent;
        },
        set: function (value) {
            this.transparent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MControl.prototype, "Parent", {
        get: function () {
            return this.parent;
        },
        set: function (value) {
            this.parent = value;
            this.AjustmentPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MControl.prototype, "Controls", {
        get: function () {
            return this.controls;
        },
        enumerable: true,
        configurable: true
    });
    MControl.prototype.OnInit = function () {
    };
    MControl.prototype.AddQueue = function (mi) {
        if (!this.visible)
            return;
        if (!this.enabled)
            return;
        this.queue.push(mi);
    };
    MControl.prototype.Dispatch = function () {
        if (!this.visible)
            return;
        if (!this.enabled)
            return;
        this.controls.Dispatch();
        while (this.queue.length > 0) {
            var item = this.queue.shift();
            switch (item.MessageType) {
                case MessageType.MouseMove:
                    this.OnMouseMove(item.MessageObject);
                    break;
                case MessageType.MouseClick:
                    this.OnMouseClick(item.MessageObject);
                    break;
                case MessageType.MouseEnter:
                    this.OnMouseEnter(item.MessageObject);
                    break;
                case MessageType.MouseLeave:
                    this.OnMouseLeave(item.MessageObject);
                    break;
                case MessageType.MouseDown:
                    this.OnMouseDown(item.MessageObject);
                    break;
                case MessageType.MouseUp:
                    this.OnMouseUp(item.MessageObject);
                    break;
            }
        }
        this.OnDispatch();
    };
    MControl.prototype.BeforePaint = function () {
        if (!this.visible)
            return;
        this.controls.Items.forEach(function (i) { return i.BeforePaint(); });
    };
    MControl.prototype.Paint = function () {
        if (!this.visible)
            return;
        this.OnPaint();
        this.controls.Paint();
    };
    MControl.prototype.AfterPaint = function () {
        if (!this.visible)
            return;
        this.OnAfterPaint();
        this.controls.Items.forEach(function (i) { return i.AfterPaint(); });
    };
    MControl.prototype.AjustmentPosition = function () {
        this.gx = this.x;
        this.gy = this.y;
        if (this.parent) {
            if (this.align == MAlign.None)
                this.gx += this.margin.Left;
            if (this.align == MAlign.Left)
                this.gx = this.margin.Left;
            if (this.align == MAlign.Right)
                this.gx = this.parent.Width - this.width - this.margin.Right;
            if (this.align == MAlign.Center)
                this.gx = (this.parent.Width - this.width - this.margin.Right - this.margin.Left) / 2;
            if (this.valign == MVAlign.None)
                this.gy += this.margin.Top;
            if (this.valign == MVAlign.Top)
                this.gy = this.margin.Top;
            if (this.valign == MVAlign.Bottom)
                this.gy = this.parent.Height - this.height - this.margin.Bottom;
            if (this.valign == MVAlign.Middle)
                this.gy = (this.parent.Height - this.height - this.margin.Bottom - this.margin.Top) / 2;
        }
        if (this.parent) {
            this.gx += this.parent.GX;
            this.gy += this.parent.GY;
        }
        this.OnAjustmentPosition();
        this.controls.AjustmentPosition();
    };
    MControl.prototype.OnAjustmentPosition = function () {
    };
    MControl.prototype.OnPaint = function () {
        if (!this.transparent && this.visible)
            mgfx_1.Gpx.FillRect(this.backgroundColor, this.gx, this.gy, this.width, this.height);
    };
    MControl.prototype.OnAfterPaint = function () {
    };
    MControl.prototype.PropagateMouseMove = function (Event) {
        if (!this.visible)
            return;
        for (var v in this.controls.Items)
            this.controls.Items[v].PropagateMouseMove(Event);
        this.mouse_x = -1;
        this.mouse_y = -1;
        if (Event.X >= this.gx && Event.Y >= this.gy && Event.X < this.gx + this.width && Event.Y < this.gy + this.height) {
            var gmea = events_1.MouseExtArgs.CoordToControl(Event, this.gx, this.gy);
            var mi = new MessageItem(MessageType.MouseMove, gmea);
            this.AddQueue(mi);
            this.mouse_x = gmea.X;
            this.mouse_y = gmea.Y;
        }
        if (Event.X >= this.gx && Event.Y >= this.gy && Event.X < this.gx + this.width && Event.Y < this.gy + this.height)
            if (!(Event.PrevX >= this.gx && Event.PrevY >= this.gy && Event.PrevX < this.gx + this.width && Event.PrevY < this.gy + this.height)) {
                if (!this.mouseHover) {
                    this.AddQueue(new MessageItem(MessageType.MouseEnter, Event));
                    this.mouseHover = true;
                }
            }
        if (!(Event.X >= this.gx && Event.Y >= this.gy && Event.X < this.gx + this.width && Event.Y < this.gy + this.height))
            if (Event.PrevX >= this.gx && Event.PrevY >= this.gy && Event.PrevX < this.gx + this.width && Event.PrevY < this.gy + this.height) {
                if (this.mouseHover) {
                    this.AddQueue(new MessageItem(MessageType.MouseLeave, Event));
                    this.mouseHover = false;
                }
            }
    };
    MControl.prototype.PropagateMouseEnter = function (Event) {
        if (!this.visible)
            return;
        for (var v in this.controls.Items)
            this.controls.Items[v].PropagateMouseEnter(Event);
        if (!this.mouseHover && this.MouseInside2()) {
            this.AddQueue(new MessageItem(MessageType.MouseEnter, Event));
            this.mouseHover = true;
        }
    };
    MControl.prototype.PropagateMouseLeave = function (Event) {
        if (!this.visible)
            return;
        for (var v in this.controls.Items)
            this.controls.Items[v].PropagateMouseLeave(Event);
        if (this.mouseHover) {
            this.AddQueue(new MessageItem(MessageType.MouseLeave, Event));
            this.mouseHover = false;
        }
    };
    MControl.prototype.PropagateMouseDown = function (Event) {
        if (!this.visible)
            return;
        for (var v in this.controls.Items)
            this.controls.Items[v].PropagateMouseDown(Event);
        if (!Event.Propagate)
            return;
        if (Event.X >= this.gx && Event.Y >= this.gy && Event.X < this.gx + this.width && Event.Y < this.gy + this.height) {
            this.AddQueue(new MessageItem(MessageType.MouseDown, events_1.MouseArgs.CoordToControl(Event, this.gx, this.gy)));
            if (this.canmousecapture && !app_1.App.Game.MouseCaptured())
                app_1.App.Game.MouseCapture(this);
            this.mouseDown = true;
            this.OnPropagateMouseDown(Event);
        }
    };
    MControl.prototype.OnPropagateMouseDown = function (Event) {
    };
    MControl.prototype.PropagateMouseUp = function (Event) {
        if (!this.visible)
            return;
        for (var v in this.controls.Items)
            this.controls.Items[v].PropagateMouseUp(Event);
        if (!Event.Propagate)
            return;
        if (Event.X >= this.gx && Event.Y >= this.gy && Event.X < this.gx + this.width && Event.Y < this.gy + this.height ||
            app_1.App.Game.MouseCaptureObject() == this) {
            this.AddQueue(new MessageItem(MessageType.MouseUp, events_1.MouseArgs.CoordToControl(Event, this.gx, this.gy)));
            this.mouseDown = false;
            this.OnPropagateMouseUp(Event);
        }
    };
    MControl.prototype.OnPropagateMouseUp = function (Event) {
    };
    MControl.prototype.PropagateMouseClick = function (Event) {
        if (!this.visible)
            return;
        for (var v in this.controls.Items)
            this.controls.Items[v].PropagateMouseClick(Event);
        if (!Event.Propagate)
            return;
        if (Event.X >= this.gx && Event.Y >= this.gy && Event.X < this.gx + this.width && Event.Y < this.gy + this.height) {
            this.AddQueue(new MessageItem(MessageType.MouseClick, events_1.MouseArgs.CoordToControl(Event, this.gx, this.gy)));
            this.OnPropagateMouseClick(Event);
        }
    };
    MControl.prototype.OnPropagateMouseClick = function (Event) {
    };
    MControl.prototype.DetermineMouseHover = function (xypos) {
        if (!this.visible)
            return;
        for (var v in this.controls.Items)
            this.controls.Items[v].DetermineMouseHover(xypos);
        this.mouseHover = false;
        if (xypos)
            this.mouseHover = this.MouseInside3(xypos.X, xypos.Y);
    };
    MControl.prototype.OnMouseMove = function (e) {
        if (this.MouseMove)
            this.MouseMove(this, e);
    };
    MControl.prototype.OnMouseClick = function (e) {
        if (this.MouseClick)
            this.MouseClick(this, e);
    };
    MControl.prototype.OnMouseEnter = function (e) {
        if (this.MouseEnter)
            this.MouseEnter(this, e);
    };
    MControl.prototype.OnMouseLeave = function (e) {
        if (this.MouseLeave)
            this.MouseLeave(this, e);
    };
    MControl.prototype.OnMouseDown = function (e) {
        if (this.MouseDown)
            this.MouseDown(this, e);
    };
    MControl.prototype.OnMouseUp = function (e) {
        if (this.MouseUp)
            this.MouseUp(this, e);
    };
    MControl.prototype.MouseInside = function () {
        return !(this.mouse_x < 0 || this.mouse_y < 0 || this.mouse_x > this.width || this.mouse_y > this.height || !this.mouseHover);
    };
    MControl.prototype.MouseInside2 = function () {
        return !(this.mouse_x < 0 || this.mouse_y < 0 || this.mouse_x > this.width || this.mouse_y > this.height);
    };
    MControl.prototype.MouseInside3 = function (x, y) {
        return !(x < 0 || y < 0 || x > this.width || y > this.height);
    };
    MControl.prototype.OnDispatch = function () {
    };
    MControl.prototype.ResizeWindow = function () {
        this.AjustmentPosition();
    };
    MControl.prototype.Activate = function () {
        for (var v in this.controls.Items)
            this.controls.Items[v].Activate();
        this.OnActivate();
    };
    MControl.prototype.Deactivate = function () {
        for (var v in this.controls.Items)
            this.controls.Items[v].Deactivate();
        this.OnDeactivate();
    };
    MControl.prototype.OnActivate = function () {
    };
    MControl.prototype.OnDeactivate = function () {
    };
    MControl.prototype.SelfRemove = function () {
        if (this.parent)
            this.parent.controls.Remove(this);
    };
    return MControl;
}());
exports.MControl = MControl;
var ControlCollection = /** @class */ (function () {
    function ControlCollection(Control) {
        this.masterControl = Control;
        this.items = [];
    }
    Object.defineProperty(ControlCollection.prototype, "Items", {
        get: function () {
            return this.items;
        },
        enumerable: true,
        configurable: true
    });
    ControlCollection.prototype.Add = function (control) {
        this.items.push(control);
        control.Parent = this.masterControl;
        control.AjustmentPosition();
        return control;
    };
    ControlCollection.prototype.Remove = function (control) {
        control.Parent = null;
        var idx = this.items.findIndex(function (obj) { return obj === control; });
        if (idx >= 0)
            this.items.splice(idx, 1);
    };
    ControlCollection.prototype.Dispatch = function () {
        for (var v in this.items)
            this.items[v].Dispatch();
    };
    ControlCollection.prototype.Paint = function () {
        for (var v in this.items)
            this.items[v].Paint();
    };
    ControlCollection.prototype.AjustmentPosition = function () {
        for (var v in this.items)
            this.items[v].AjustmentPosition();
    };
    return ControlCollection;
}());
exports.ControlCollection = ControlCollection;
//# sourceMappingURL=mcontrol.js.map