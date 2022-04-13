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
    if (this.health == 0) { 
      this.status = "loser";
    }
  }

  dealDamage(opponent) {
    opponent.takeDamage(this.damage);
    // TO DO: manage the +20 mana gained when killing another player
  }

  showCard(illustration, combo) {
    let myHTML = "<div class='col-2 my-2 g-0'>"; 
    myHTML += "<div class='card' style='width: 10rem;'>";
    myHTML += "<img src='./images/"+illustration+"' class='card-img-top' alt='photo de "+ this.name +"'>";
    myHTML += "<div class='card-body'>";
    myHTML += "<h5 class='card-title'>"+ this.name +"</h5>";
    myHTML += "<p class='card-text'>Health: "+this.health+"</p>";
    myHTML += "<p class='card-text'>Damage: "+this.damage+"</p>";
    myHTML += "<p class='card-text'>Mana: "+this.mana+"</p>";
    myHTML += "<p class='card-text'>Special: "+combo+"</p>";
    myHTML += "</div>";
    myHTML += "</div>";
    myHTML += "</div>";
    return myHTML;
  }

}

class Fighter extends Character {
  
  constructor(name, health = 12, damage = 4, mana = 40, status = "playing", photo = "shinobi.png") {
    super(name, health, damage, mana, status);
    this.special = "Dark Vision";
    this.photo = photo;
  }

  // Combo name: "Dark Vision"
  // Damage to opponent: 5 hp
  // Cost: 20 mana 
  // NB: reduces received damages by -2 hp till next round
  specialAttack(opponent) {
    opponent.takeDamage(5);
    this.mana -= 20;
    // TO DO: manage damage reduction till next round
  }

}

class Paladin extends Character {
  
  constructor(name, health = 16, damage = 3, mana = 160, status = "playing", photo = "shinobi.png") {
    super(name, health, damage, mana, status);
    this.special = "Healing Lighting";
    this.photo = photo;
  }

  // Combo name: "Healing Lighting"
  // Damage to opponent: 4 hp
  // Self-healing: 5 hp
  // Cost to cast: 40 mana
  specialAttack(opponent) {
    opponent.takeDamage(4);
    this.health += 5;
    this.mana -= 40;
  }

}

class Monk extends Character {
  
  constructor(name, health = 8, damage = 2, mana = 200, status = "playing", photo = "shinobi.png") {
    super(name, health, damage, mana, status);
    this.special = "Regenerating Prayer";
    this.photo = photo;
  }

  // Combo name: "Regenerating Prayer"
  // Healing to target: 8 hp
  // Cost to cast: 25 mana
  specialAttack(target) {
    target.health += 8;
    this.mana -= 25;
  }

}

class Berserker extends Character {
  
  constructor(name, health = 8, damage = 4, mana = 0, status = "playing", photo = "shinobi.png") {
    super(name, health, damage, mana, status);
    this.special = "Ancients' Rage";
    this.photo = photo;
  }

  // Combo name: "Ancients' Rage"
  // Effect : add 1 to each damage he deals for the rest of the game
  // Cost to cast: 0 mana but 1 hp
  // NB: can be casted several times a game, increasing his damage rate by 1 each time but sucking his health as well.
  specialAttack() {
    this.damage += 1;
    this.health -=1;
    if (this.health == 0) { 
      this.status = "loser";
    }
  }

}

class Assassin extends Character {
  
  constructor(name, health = 6, damage = 6, mana = 20, status = "playing", photo = "shinobi.png") {
    super(name, health, damage, mana, status);
    this.special = "Shadow Hit";
    this.photo = photo;
  }

  // Combo name: "Shadow Hit"
  // Damage to opponent: 7 hp
  // Cost to cast: 20 mana
  // NB: Assassin then cannot be damaged during the following round
  specialAttack(opponent) {
    opponent.takeDamage(7);
    this.mana -= 20;
    // TO DO: manage invicibility till next round
  }

}

class Wizard extends Character {
  
  constructor(name, health = 10, damage = 2, mana = 200, status = "playing", photo = "shinobi.png") {
    super(name, health, damage, mana, status);
    this.special = "Magic Fireball";
    this.photo = photo;
  }

  // Combo name: "Magic Fireball"
  // Damage to opponent: 7 hp
  // Cost to cast: 25 mana
  specialAttack(opponent) {
    opponent.takeDamage(7);
    this.mana -= 25;
  }

}

class Gibbz extends Character {
  
  constructor(name, health = 10, damage = 4, mana = 150, status = "playing", photo = "shinobi.png") {
    super(name, health, damage, mana, status);
    this.special = "Fishbrain Rocket";
    this.photo = photo;
  }

  // Combo name: "Fishbrain Rocket"
  // Damage to opponent: 5 hp
  // Self healing: 2 hp
  // Cost to cast: 25 mana
  specialAttack(opponent) {
    opponent.takeDamage(5);
    this.health += 2;
    this.mana -= 25;
  }

}
