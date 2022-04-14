/*****************************/
/*                           */
/*   WINTER'22 IS COMING...  */
/*                           */
/*   Coded with ♥ by GibbZ   */
/*           during          */
/*    THP Dev Winter 2022    */
/*****************************/

class Character {
  
  constructor(id, name, health, damage, mana, status) {
    this.id = id;
    this.name = name;
    this.health = health;
    this.damage = damage;
    this.mana = mana;
    this.status = status;
  }

  takeDamage(stroke) {
    this.health = Math.max(0, this.health - stroke);
    console.log("    > "+this.name+" encaisse "+stroke+" points de dégâts.");
    if (this.health == 0) { 
      this.status = "loser";
    }
  }

  dealDamage(opponent) {
    console.log("    > "+this.name+" attaque "+opponent.name+" avec une force de frappe de "+this.damage+".");
    opponent.takeDamage(this.damage);
    // TO DO: manage the +20 mana gained when killing another player
  }

  showCard(illustration, combo, comboDescr, type, id) {
    let deadOrAliveName = this.health > 0 ? this.name : "💀" + this.name + "💀";
    let myHTML = "";
    myHTML += "<div class='col-lg-2 col-md-4 m-2'>"; 
    myHTML += " <div class='card opacity-75' id='card_"+id+"'>";
    myHTML += "   <img src='./images/"+illustration+"' class='card-img-top' alt='photo de "+ this.name +"'>";
    myHTML += "   <div class='card-body'>";
    myHTML += "     <h5 class='card-title'>"+ deadOrAliveName +"</h5>";
    myHTML += "     <h6 class='card-subtitle mb-2 fst-italic text-muted'>"+type+"</h6>";
    myHTML += "     <div class='row justify-content-around'>";
    myHTML += "       <span class='card-text col-4'><small><i class='bi bi-heart-pulse-fill text-danger'></i> "+this.health+"</small></span>";
    myHTML += "       <span class='card-text col-4'><small><i class='bi bi-lightning-fill text-warning'></i> "+this.damage+"</small></span>";
    myHTML += "       <span class='card-text col-4'><small><i class='bi bi-magic text-primary'></i> "+this.mana+"</small></span>";
    myHTML += "     </div>";
    myHTML += "   </div>";
    myHTML += "   <div id='cardFooter' class='card-footer text-muted small text-center'>";
    myHTML += "     <span tabindex='0' data-bs-toggle='tooltip' title='"+comboDescr+"'>";
    myHTML += "       <i class='bi bi-stars'></i> "+combo+"<i class='bi bi-stars'></i>";
    myHTML += "     </span>";
    myHTML += "   </div>";
    myHTML += " </div>";
    myHTML += "</div>";
    return myHTML;
  }

}

class Fighter extends Character {
  
  constructor(id, name, health = 12, damage = 4, mana = 40, status = "playing", photo = "unknown_hero.jpg") {
    super(id, name, health, damage, mana, status);
    this.special = "Dark Vision";
    this.specialDescr = "Dark Vision deals 5⚡ to ennemies and costs 20✨ a cast.";
    this.photo = photo;
    this.type = "Fighter";
  }

  // Combo name: "Dark Vision"
  // Damage to opponent: 5 hp
  // Cost: 20 mana 
  // NB: reduces received damages by -2 hp till next round
  specialAttack(opponent) {
    opponent.takeDamage(5);
    this.mana -= 20;
    console.log("    > "+this.name+" a lancé son combo contre "+opponent.name+", infligeant 5 points de dégâts.");
    // TO DO: manage damage reduction till next round
  }

}

class Paladin extends Character {
  
  constructor(id, name, health = 16, damage = 3, mana = 160, status = "playing", photo = "unknown_hero.jpg") {
    super(id, name, health, damage, mana, status);
    this.special = "Healing Lighting";
    this.specialDescr = "Healing Lightening strikes any opponent with a 4⚡ blast, while healing the Paladin by 5💖. It costs 40✨ to cast.";
    this.photo = photo;
    this.type = "Paladin";
  }

  // Combo name: "Healing Lighting"
  // Damage to opponent: 4 hp
  // Self-healing: 5 hp
  // Cost to cast: 40 mana
  specialAttack(opponent) {
    opponent.takeDamage(4);
    this.health += 5;
    this.mana -= 40;
    console.log("    > "+this.name+" a lancé son combo contre "+opponent.name+", infligeant 4 points de dégâts.");
  }

}

class Monk extends Character {
  
  constructor(id, name, health = 8, damage = 2, mana = 200, status = "playing", photo = "unknown_hero.jpg") {
    super(id,name, health, damage, mana, status);
    this.special = "Phoenix Prayer";
    this.specialDescr = "The Phoenix Prayer is a pure healing spell giving back 8💖 to its beneficiary target. The Monk spends 25✨ per prayer.";
    this.photo = photo;
    this.type = "Monk";
  }

  // Combo name: "Regenerating Prayer"
  // Healing to target: 8 hp
  // Cost to cast: 25 mana
  // TO DO: Enable to heal oneself (not possible as for now, because DDL proposes only OTHER players)
  specialAttack(target) {
    target.health += 8;
    this.mana -= 25;
    console.log("    > "+this.name+" a guéri "+target.name+", restaurant 8 de ses points de vie.");
  }

}

class Berserker extends Character {
  
  constructor(id, name, health = 8, damage = 4, mana = 0, status = "playing", photo = "unknown_hero.jpg") {
    super(id, name, health, damage, mana, status);
    this.special = "Ancients' Rage";
    this.specialDescr = "When a Berserker switches to Ancients Rage mode, all following strokes will deal an extra +1⚡ damage. It, however, deals 1💖 damage to the warrior him/herself each time used.";
    this.photo = photo;
    this.type = "Berserker";
  }

  // Combo name: "Ancients' Rage"
  // Effect : add 1 to each damage he deals for the rest of the game
  // Cost to cast: 0 mana but 1 hp
  // NB 1: can be casted several times a game, increasing his damage rate by 1 each time but sucking his health as well.
  // NB 2: for genericity reasons, the Berserker method will also take a parameter but won't use it
  specialAttack(opponent) {
    this.damage += 1;
    this.health -=1;
    console.log("    > "+this.name+" est entrée en rage, s'infligeant 1 point de dégâts mais augmentant sa force frappe d'1 point.");
    if (this.health == 0) { 
      this.status = "loser";
      console.log("    > Ce faisant, "+this.name+" est mort... Bêtement. Sacré Berserker, tout en muscles...");
    }
    
  }

}

class Assassin extends Character {
  
  constructor(id, name, health = 6, damage = 6, mana = 20, status = "playing", photo = "unknown_hero.jpg") {
    super(id, name, health, damage, mana, status);
    this.special = "Shadow Hit";
    this.specialDescr = "As the ultimate ninja technique, the Shadow Hit deals a huge 7⚡ stroke to the opponent for a magic cost of 40✨ only.";
    this.photo = photo;
    this.type = "Assassin";
  }

  // Combo name: "Shadow Hit"
  // Damage to opponent: 7 hp
  // Cost to cast: 20 mana
  // NB: Assassin then cannot be damaged during the following round
  specialAttack(opponent) {
    opponent.takeDamage(7);
    this.mana -= 20;
    // TO DO: manage invincibility till next round
    console.log("    > "+this.name+" a lancé son combo contre "+opponent.name+", lui infligeant 7 points de dégâts.");
  }

}

class Wizard extends Character {
  
  constructor(id, name, health = 10, damage = 2, mana = 200, status = "playing", photo = "unknown_hero.jpg") {
    super(id, name, health, damage, mana, status);
    this.special = "Magic Fireball";
    this.specialDescr = "The wellknown Magic Fireball is a powerful spell yet mastered by a few magicians only. It strikes opponents with a 7⚡ power, sucking 40✨ from the caster.";
    this.photo = photo;
    this.type = "Wizard";
  }

  // Combo name: "Magic Fireball"
  // Damage to opponent: 7 hp
  // Cost to cast: 25 mana
  specialAttack(opponent) {
    opponent.takeDamage(7);
    this.mana -= 25;
    console.log("    > "+this.name+" a lancé son combo contre "+opponent.name+", lui infligeant 7 points de dégâts.");
  }

}

class Gibbz extends Character {
  
  constructor(id, name, health = 10, damage = 4, mana = 150, status = "playing", photo = "unknown_hero.jpg") {
    super(id, name, health, damage, mana, status);
    this.special = "Fishbrain Rocket";
    this.specialDescr = "The Fishbrain Rocket attack is as absurd as powerful - and surprising every time - dealing a 5⚡ hit to the ennemy AND revitalizing the GibbZ with 2💖. It cost 25✨ per cast.";
    this.photo = photo;
    this.type = "Gibbz";
  }

  // Combo name: "Fishbrain Rocket"
  // Damage to opponent: 5 hp
  // Self healing: 2 hp
  // Cost to cast: 25 mana
  specialAttack(opponent) {
    opponent.takeDamage(5);
    this.health += 2;
    this.mana -= 25;
    console.log("    > "+this.name+" a lancé son combo contre "+opponent.name+", lui infligeant 5 points de dégâts.");
  }

}

/*****************/
/*  End of code  */
/*****************/