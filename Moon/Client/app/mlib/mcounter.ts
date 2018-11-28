export class MCounter {
  public Count: number;
  public TimeSecs: number;
  public TimeTicks: number;
  public Loop: boolean;
  public LastIndex: number;
  private allTicks: number;
  private ticksPerCount: number;
  constructor(Count: number, TimeSecs: number, Loop: boolean = true) {
    this.allTicks = 0;
    this.Count = Count;
    this.Loop = Loop;
    this.TimeSecs = TimeSecs;
    this.TimeTicks = Math.floor(TimeSecs * 10000000);
    this.ticksPerCount = this.TimeTicks / Count;
    this.LastIndex = 0;
  }
  public GetCurrentIndex(): number {
    return this.GetIndex(0);
  }
  public GetIndex(DifferenceTimeTick: number): number {
    this.allTicks += 10000000 * DifferenceTimeTick;
    var index: number = Math.floor(this.allTicks / this.ticksPerCount);
    this.LastIndex = index;
    if (index < this.Count)
      return index;
    if (!this.Loop)
      return -1;
    index = index % this.Count;
    while (this.allTicks > this.TimeTicks)
      this.allTicks -= this.TimeTicks;
    return index;
  }
  public Reset(): void {
    this.allTicks = 0;
  }
}
