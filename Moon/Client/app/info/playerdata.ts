import { PlayerClassType } from "../service/moon-info";

export class CharacterInfo {
  public CharacterId: string;
  public CharacterName: string;
  public ClassType: PlayerClassType;
  public Level: number;
}

export class PlayerData {
  public PlayerId: string;
  public CharacterList: CharacterInfo[] = [];
}
