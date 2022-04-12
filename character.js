class Character {
  
  constructor(name, health, damage, mana, status) {
    this.name = name;
    this.health = health;
    this.damage = damage;
    this.mana = mana;
    this.status = status;
  }

  takeDamage(stroke) {
    this.health = Math.max(0, this.health - stroke);
  }

  dealDamage(opponent) {
    opponent.takeDamage(this.damage);
  }

}

class Fighter extends Character {
  
  constructor(name, health, damage, mana, status = "playing") {
    super(name, health, damage, mana, status);
    this.special = "Dark Vision";
  }

  // Special Attack: "Dark Vision"
  // Damage to opponent: 5
  // Reduced damage to self till next round: -2
  // Cost: 20 mana 
  specialAttack(opponent) {
    opponent.takeDamage(5);
    this.mana -= 20;
    // To be completed
  }

}

class Paladin extends Character {
  
  constructor(name, health, damage, mana, status = "playing") {
    super(name, health, damage, mana, status);
    this.special = "Healing Lighting";
  }

  specialAttack () {

  }

}

class Monk extends Character {
  
  constructor(name, health, damage, mana, status = "playing") {
    super(name, health, damage, mana, status);
    this.special = "Regenerating Prayer";
  }

  specialAttack () {

  }

}

class Berserker extends Character {
  
  constructor(name, health, damage, mana, status = "playing") {
    super(name, health, damage, mana, status);
    this.special = "Ancients' Rage";
  }

  specialAttack () {

  }

}

class Assassin extends Character {
  
  constructor(name, health, damage, mana, status = "playing") {
    super(name, health, damage, mana, status);
    this.special = "Shadow Hit";
  }

  specialAttack () {

  }

}

let Grace = new Fighter("Grace");
let Ulder = new Paladin("Ulder");
let Moana = new Monk("Moana");
let Draven = new Berserker("Draven");
let Carl = new Assassin("Carl");