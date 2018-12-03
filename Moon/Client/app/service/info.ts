export enum MoonObjectType {
  Mob,
  Chest,
  Npc
}

export enum MoonMobType {
  Player,
  Mob,
  Npc
}

export enum MoonMobState {
  Await = 0,
  Alive = 1,
  Dead = 2
}

export enum ClientInfoType {
  MobInfo,
  PlayerInfo,
  NpcInfo
}

export enum MoonSkillType {
  // General
  None,
  // Mage
  MageAttack,
  MageFireBall,
  MageFreeze,
  // Knight
  KnightAttack,
  KnightSwordStrike,
  KnightDash,
  // Archer
  ArcherAttack,
  ArcherTripleShot,
  ArcherSlowShot,
  // Priest
  PriestAttack,
  PriestHeal,
  PriestRoot,
  // Mobs
  SkelBowAttack,
  WeakSkelBowAttack,
  TerribleSkelBowAttack,
  SkelAttack,
  SwordSkelAttack,
  PinkZombieAttack
}

export enum SkillState {
  Await,
  Charge,
  Run
}

export enum PlayerClassType {
  Mage,
  Knight,
  Archer,
  Priest
}

export enum DebuffType {
  Slow
}

export class MoonDebuff {
  public debuffType: DebuffType;
  public debuffText: string;
  public level: number;
  public speed: number;
  public debuffTime: number;
  public debuffTimeLeft: number;
}

export class MoonDebuffTable {
  public items: Array<MoonDebuff>;
}

export class ClientSprite {
  public spriteName: string;
  public spriteOX: number;
  public spriteOY: number;
  public idleAniSpeed: number;
  public walkAniSpeed: number;
  public runAniSpeed: number;
  public skillAniSpeed: number;
  public deathAniSpeed: number;
}

export class ClientInfo {
  public infoType: ClientInfoType;
  public state: MoonMobState;
  public level: number;
  public awaitTime: number;
  public name: string;
  public mobId: number;
  public itemCode: string;
  public targetId: number;
  public targetType: MoonObjectType;
  public sprite: ClientSprite;
  public respMobX: number;
  public respMobY: number;
  public pointMobX: number;
  public pointMobY: number;
  public deltaMobX: number;
  public deltaMobY: number;
  public storeMobX: number;
  public storeMobY: number;
  public runSpeed: number;
  public walkSpeed: number;
  public speed: number;
  public radius: number;
  public maxHP: number;
  public hp: number;
  public pInstruction: string;
  public pInstructionTime: number;
  public pInstructionAllTime: number;
  public pParam1: string;
  public pParam2: number;
  public pParam3: number;
  public directionView: number;
  public skills: Array<SkillInfo>;
  public skillState: SkillState;
  public currentSkillType: MoonSkillType;
  public currentSkillIndex: number
  public chargeTime: number;
  public chargeLeft: number;
  public animateName: string;
  public debuffs: MoonDebuffTable;
  public party: PartyInfo;
}

export class PlayerInfo extends ClientInfo {
  public classType: PlayerClassType;
  public exp: number;
  public maxExp: number;
  public playerId: string;
  public active: boolean;
  public questNpcInfo: Array<QuestNpcInfo>;
}

export class SkillInfo {
  public skillType: MoonSkillType;
  public minDistance: number;
  public maxDistance: number;
  public cooldownTime: number;
  public cooldownTimeLeft: number;
  public chargeTime: number;
  public animateTime: number;
  public power: number;
  public autoAttack: boolean;
}

export class PartyInfo {
  public leader: string;
  public items: Array<string>;
}

export class QuestNpcInfo {
  public npc: string;
  public offer: boolean;
  public complete: boolean;
}

export class NpcTalkQuestInfo {
  public itemCode: string;
  public title: string;
  public description: string;
  public experience: number;
  public coins: number;
}
export class NpcTalkInfo {
  public itemCode: string;
  public name: string;
  public title: string;
  public description: string;
  public questOfferList: Array<NpcTalkQuestInfo>;
  public questCompleteList: Array<NpcTalkQuestInfo>;
}
