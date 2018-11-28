"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MCounter = /** @class */ (function () {
    function MCounter(Count, TimeSecs, Loop) {
        if (Loop === void 0) { Loop = true; }
        this.allTicks = 0;
        this.Count = Count;
        this.Loop = Loop;
        this.TimeSecs = TimeSecs;
        this.TimeTicks = Math.floor(TimeSecs * 10000000);
        this.ticksPerCount = this.TimeTicks / Count;
        this.LastIndex = 0;
    }
    MCounter.prototype.GetCurrentIndex = function () {
        return this.GetIndex(0);
    };
    MCounter.prototype.GetIndex = function (DifferenceTimeTick) {
        this.allTicks += 10000000 * DifferenceTimeTick;
        var index = Math.floor(this.allTicks / this.ticksPerCount);
        this.LastIndex = index;
        if (index < this.Count)
            return index;
        if (!this.Loop)
            return -1;
        index = index % this.Count;
        while (this.allTicks > this.TimeTicks)
            this.allTicks -= this.TimeTicks;
        return index;
    };
    MCounter.prototype.Reset = function () {
        this.allTicks = 0;
    };
    return MCounter;
}());
exports.MCounter = MCounter;
//# sourceMappingURL=mcounter.js.map