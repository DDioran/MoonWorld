using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Moon
{
  public class MoonCharacteristicResult
  {
    public bool AttackSuccess = false;
    public bool DebuffSuccess = false;
    public bool CritSuccess = false;
    public double Damage;
  }
  public class MoonParameters
  {
    public double STR = 0;
    public double DEX = 0;
    public double CON = 0;
    public double INT = 0;
    public double WIT = 0;
    public double MAN = 0;
    public MoonParameters ShallowCopy()
    {
      return (MoonParameters)MemberwiseClone();
    }
  }
  public class MoonCharacteristic
  {
    public MoonParameters Params;
    public double PAttack;
    public double PCritPower;
    public double PAspd;
    public double PCrit;
    public double PEvasion;
    public double PAccurance;
    public double PAccuranceDebuff;
    public double HP;
    public double HPRecovery;
    public double PBlockDebuff;
    public double MAttack;
    public double MCritPower;
    public double MAspd;
    public double MCrit;
    public double MEvasion; // Отражение
    public double MAccurance;
    public double MAccuranceDebuff;
    public double MP;
    public double MPRecovery;
    public double MBlockDebuff;
    public double PDefence;
    public double MDefence;

    public void Calculate(MoonParameters pars)
    {
      // Копируем параметры персонажа
      Params = pars.ShallowCopy();
      // Добавляем параметры шмота
      // ...
      // Расчитываем характеристики персонажа
      PAttack = 10 + Params.STR * 10;
      PCritPower = 1.5;
      PAspd = 1.0 + Params.DEX * 0.02;
      PCrit = Params.DEX * 0.01;             // при dex=100 - 100% шанса крита на равного по лвл противника
      PEvasion = 0.1 + Params.DEX * 0.018;   // при dex=100 - 100% шанса уклонения на равного по лвл противника с dex = 0
      PAccurance = 0.9 + Params.DEX * 0.002; // при dex=100 - 100% шанса попасть по равному по лвл противнику с dex = 0, или 90
      PAccuranceDebuff = 0.8 + Params.DEX * 0.004; // при dex=100 - 100% шанса попасть физ дебафа по равному по лвл противнику с con = 0
      HP = Params.CON * 100;
      HPRecovery = Params.CON;               // Востановление HP 100 в секунду в бою (вне боя *3)
      PBlockDebuff = Params.CON;
      MAttack = 30 + Params.INT * 30;
      MCritPower = 2.0;
      MAspd = 1.0 + Params.WIT * 0.02;
      MCrit = Params.WIT * 0.01;
      MEvasion = 0.1 + Params.WIT * 0.018;
      MAccurance = 0.9 + Params.WIT * 0.002;
      MAccuranceDebuff = 0.8 + Params.WIT * 0.004;
      MP = Params.MAN * 20;
      MPRecovery = Params.MAN * 0.2;
      MBlockDebuff = Params.MAN;
      // Добавляем характеристики шмота
      // ...
      // расчет защиты от шмота
      PDefence = 0;
      MDefence = 0;
    }

    public static MoonCharacteristicResult Attack(MoonMob Attacker, MoonMob Defencer, MoonSkill Skill)
    {
      MoonCharacteristicResult result = new MoonCharacteristicResult();
      int dif = Attacker.Level - Defencer.Level;
      if (Attacker is MoonMob && Defencer is MoonMob)
      {
      }
      if (Attacker is MoonMob && Defencer is MoonPlayer)
      {
        double atk = Skill.Power;
        double def = Skill.TypeSkill.Physical ? (Defencer as MoonPlayer).Characts.PDefence : (Defencer as MoonPlayer).Characts.MDefence;
        result.Damage = atk * (Math.Atan((atk - def) / 100) / 2 / Math.PI + 0.5);
        double acc = 0.9 + dif * 0.05;
        double acd = 0.8 + dif * 0.08;
        double crt = 0.1 + dif * 0.05;
        double crp = Skill.TypeSkill.Physical ? 1.5 : 2.0;
        result.AttackSuccess = acc > MoonApplication.Random.NextDouble();
        result.DebuffSuccess = acd > MoonApplication.Random.NextDouble();
        result.CritSuccess = crt > MoonApplication.Random.NextDouble();
        if (result.CritSuccess) result.Damage *= crp;
      }
      if (Attacker is MoonPlayer && Defencer is MoonMob)
      {
        MoonCharacteristic ch = (Attacker as MoonPlayer).Characts;
        double atk = Skill.Power + (Skill.TypeSkill.Physical ? ch.PAttack : ch.MAttack);
        result.Damage = atk * (Math.Atan(atk / 100) / 2 / Math.PI + 0.5);
        double acc = (Skill.TypeSkill.Physical ? ch.PAccurance : ch.MAccurance) + dif * 0.05; // сдесь нужна гипербола
        double acd = (Skill.TypeSkill.Physical ? ch.PAccuranceDebuff : ch.MAccuranceDebuff) + dif * 0.08; // сдесь нужна гипербола
        double crt = (Skill.TypeSkill.Physical ? ch.PCrit : ch.MCrit) + dif * 0.05;
        double crp = Skill.TypeSkill.Physical ? ch.PCritPower : ch.MCritPower;
        result.AttackSuccess = acc > MoonApplication.Random.NextDouble();
        result.DebuffSuccess = acd > MoonApplication.Random.NextDouble();
        result.CritSuccess = crt > MoonApplication.Random.NextDouble();
        if (result.CritSuccess) result.Damage *= crp;
      }
      if (Attacker is MoonPlayer && Defencer is MoonPlayer)
      {
        MoonCharacteristic cha = (Attacker as MoonPlayer).Characts;
        MoonCharacteristic chd = (Attacker as MoonPlayer).Characts;
        double atk = Skill.Power + (Skill.TypeSkill.Physical ? cha.PAttack : cha.MAttack);
        double def = Skill.TypeSkill.Physical ? chd.PDefence : chd.MDefence;
        result.Damage = atk * (Math.Atan((atk - def) / 100) / 2 / Math.PI + 0.5);
        double acc = (Skill.TypeSkill.Physical ? cha.PAccurance : cha.MAccurance) + dif * 0.05; // сдесь нужна гипербола
        double acd = (Skill.TypeSkill.Physical ? cha.PAccuranceDebuff : cha.MAccuranceDebuff) + dif * 0.08; // сдесь нужна гипербола
        double crt = (Skill.TypeSkill.Physical ? cha.PCrit : cha.MCrit) + dif * 0.05;
        double crp = Skill.TypeSkill.Physical ? cha.PCritPower : cha.MCritPower;
        result.AttackSuccess = acc > MoonApplication.Random.NextDouble();
        result.DebuffSuccess = acd > MoonApplication.Random.NextDouble();
        result.CritSuccess = crt > MoonApplication.Random.NextDouble();
        if (result.CritSuccess) result.Damage *= crp;
      }
      return result;
    }
  }

}
