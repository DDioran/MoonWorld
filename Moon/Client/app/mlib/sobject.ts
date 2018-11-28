export class SObject {
  public Deleted: boolean;
  constructor() {
    this.Deleted = false;
  }
  public Dispatcher(): void {
  }
  public PaintBefore(): void {
  }
  public Paint(): void {
  }
  public PaintAfter(): void {
  }
}

export class SObjectXY extends SObject{
  public X: number;
  public Y: number;
  public Deleted: boolean;
  constructor(X: number, Y: number) {
    super();
    this.X = X;
    this.Y = Y;
  }
  public Dispatcher(): void {
  }
  public PaintBefore(): void {
  }
  public Paint(): void {
  }
  public PaintAfter(): void {
  }
}

export class SObjectRect extends SObjectXY {
  public W: number;
  public H: number;
  constructor(X: number, Y: number, W: number, H: number) {
    super(X, Y);
    this.W = W;
    this.H = H;
  }
  public Dispatcher(): void {
  }
  public PaintBefore(): void {
  }
  public Paint(): void {
  }
  public PaintAfter(): void {
  }
}

export class SObjectList {
  protected items: Array<SObject>;
  protected deletedItems: Array<SObject>;
  constructor() {
    this.items = [];
  }
  public Add(obj: SObject): SObject {
    this.items.push(obj);
    return obj;
  }
  public Clear(): void {
    this.items = [];
  }
  public get ItemList(): Array<SObject> {
    return this.items;
  }
  public Dispatcher(): void {
    for (var v in this.items)
      this.items[v].Dispatcher();
    this.deletedItems = [];
    var newitems: Array<SObject> = [];
    for (var v in this.items)
      if (!this.items[v].Deleted)
        newitems.push(this.items[v]);
      else
        this.deletedItems.push(this.items[v]);
    this.items = newitems;
  }
  public Paint(): void {
    for (var v in this.items)
      this.items[v].PaintBefore();
    for (var v in this.items)
      this.items[v].Paint();
    for (var v in this.items)
      this.items[v].PaintAfter();
  }
}