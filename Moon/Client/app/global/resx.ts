import { App } from "./app";

export enum JsPackType {
  Image,
  Images,
  Sprite,
  Sprites,
  SowSprites,
  Audio,
  Audios
}

export class JsPack {
  public ver: number = 0;
  public name: string;
  public type: JsPackType;
  public i: JsXImage;
  public ii: JsXImages;
  public s: JsXSprite;
  public ss: JsXSprites;
  public sow: JsXSowSprites;
  public a: JsXAudio;
  public aa: JsXAudios;

  public GetImageByName(imageName: string): JsXImage {
    var bb = this.ii.s.filter(s => s.n == imageName);
    if (bb.length == 0) return null;
    return bb[0];
  }
  public GetAudioByName(audioName: string): JsXAudio {
    var bb = this.aa.a.filter(s => s.n == audioName);
    if (bb.length == 0) return null;
    return bb[0];
  }

}

export class JsXImage {
  public n: string;
  public w: number;
  public h: number;
  public o: string;
  public img: HTMLImageElement;
}
export class JsXImages {
  public s: Array<JsXImage>;
  public n: { [index: string]: JsXImage };
}
export class JsXSprite {
  public w: number;
  public h: number;
  public cx: number;
  public cy: number;
  public o: string;
  public img: HTMLImageElement;
}
export class JsXSprites {
  public speed: number;
  public s: Array<JsXSprite>;
}
export class JsXSowSprites {
  public speed: number;
  public ss: Array<Array<Array<JsXSprite>>>;
  public sn: Array<string>;
  public spr: any;
}
export class JsXAudio {
  public n: string;
  public o: string;
  //public audio: SAudio;
}
export class JsXAudios {
  public a: Array<JsXAudio>;
}

export class JsXResInput {
  public JsonName: string;
  public JsonVersion: number;
}

export class ResX {
  public Packs: Array<JsPack>;
  public LoadPackNames: Array<string>;
  public CountAllResources: number = 0;
  public CountLoadedResources: number = 0;
  private CallbackAllLoaded: () => void;
  private ResourcesLoaded: boolean;

  constructor() {
    App.Resx = this;
    this.Packs = [];
    this.LoadPackNames = [];
    this.ResourcesLoaded = false;
  }

  public LoadAllResources(callback: () => void) {
    this.CallbackAllLoaded = callback;
    if (this.ResourcesLoaded) {
      window.setTimeout(() => {
        this.ResourcesIsLoaded();
      }, 1);
      return;
    }
    this.CountAllResources = this.LoadPackNames.length;
    this.CountLoadedResources = 0;
    this.LoadPackNames.forEach(sn => this.LoadPackResource(sn));
  }

  private ResourcesIsLoaded() {
    this.ResourcesLoaded = true;
    if (this.CallbackAllLoaded)
      this.CallbackAllLoaded();
  }

  private LoadPackResource(JsonName: string) {
    let input: JsXResInput = new JsXResInput();
    input.JsonName = JsonName;
    input.JsonVersion = 0;
    if (!App.IsMoonDb) {
      this.LoadPackResourceInternal(input, null);
      return;
    }
    App.MoonDb.getByKey('moonJson', JsonName).then((json) => {
      if (json) {
        input.JsonVersion = json.version;
        this.LoadPackResourceInternal(input, json.json);
      } else
        this.LoadPackResourceInternal(input, null);
    }, (error) => {
      console.log(error);
      this.LoadPackResourceInternal(input, null);
    });
  }

  private LoadPackResourceInternal(input, json) {
    App.Hub.Request("JsonPackResource", input, (res) => {
      if (res.errorCode == 0) {
        if (res.jsresx != "") {
          if (json)
            App.MoonDb.update('moonJson', { name: input.JsonName, version: res.version, json: res.jsresx }).then(() => { }, (error) => { console.log(error); });
          else
            App.MoonDb.add('moonJson', { name: input.JsonName, version: res.version, json: res.jsresx }).then(() => { }, (error) => { console.log(error); });
          json = res.jsresx;
        }
        let js: JsPack = Object.assign(new JsPack(), JSON.parse(json));
        switch (js.type) {
          case JsPackType.Image:
            js.i.img = new Image();
            js.i.img.src = js.i.o;
            js.i.o = null;
            break;
          case JsPackType.Images:
            js.ii.n = {};
            js.ii.s.forEach(s => {
              s.img = new Image();
              s.img.src = s.o;
              s.o = null;
              js.ii.n[s.n] = s;
            });
            break;
          case JsPackType.Sprite:
            js.s.img = new Image();
            js.s.img.src = js.s.o;
            js.s.o = null;
            break;
          case JsPackType.Sprites:
            js.ss.s.forEach(s => {
              s.img = new Image();
              s.img.src = s.o;
              s.o = null;
            });
            break;
          case JsPackType.SowSprites:
            js.sow.spr = {};
            for (var i = 0; i < js.sow.sn.length; i++) {
              js.sow.ss[i].forEach(ss => ss.forEach(s => {
                s.img = new Image();
                s.img.src = s.o;
                s.o = null;
              }));
              js.sow.spr[js.sow.sn[i]] = js.sow.ss[i];
            }
            js.sow.ss = null;
            js.sow.sn = null;
            break;
          case JsPackType.Audio:
            //js.a.audio = new SAudio(js.a.o, js.a.n == "");
            js.a.o = null;
            break;
          case JsPackType.Audios:
            js.aa.a.forEach(s => {
              //s.audio = new SAudio(s.o, s.n == "");
              s.o = null;
            });
            break;
        }
        this.Packs.push(js);
        this.CountLoadedResources++;
        console.log(`${this.CountLoadedResources}/${this.CountAllResources}`);
        if (this.CountLoadedResources == this.CountAllResources)
          this.ResourcesIsLoaded();
      }
    });
  }

  public GetPackResource(PackName: string): JsPack {
    var s = this.Packs.filter(s => s.name == PackName);
    return s.length == 0 ? null : s[0];
  }

}