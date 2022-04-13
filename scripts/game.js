
class Game {

  constructor(turnLeft = 10, playersTab) {
    this.turnLeft = turnLeft;
    this.players = playersTab;
  }

  launch () {
    let myRoundNbr = 1;
    let myTotalRounds = this.turnLeft;
    while (this.turnLeft > 0) {
      console.log(`*** Starting round #${myRoundNbr} (${this.turnLeft} / ${myTotalRounds} remaining) ***`);
      let myTurn = new Turn(this.players, myRoundNbr);
      myTurn.start();
      this.turnLeft--;
      console.log(`*** Ending round #${myRoundNbr} (${this.turnLeft} / ${myTotalRounds} remaining) ***`);
      myRoundNbr++;
    }
  }

}

// Instantiating 7 players then storing them into a dedicated Array to be passed through classes (Game > Turn)
let figtherGrace = new Fighter(1,"Grace",undefined,undefined,undefined,undefined,"barbarian_girl.jpg");
let paladinKelly = new Paladin(2,"Kelly",undefined,undefined,undefined,undefined,"lady_knight.jpg");
let monkMoana = new Monk(3,"Moana",undefined,undefined,undefined,undefined,"priest.jpg");
let berserkerGutts = new Berserker(4,"ガッツ (Ga-tsu)",undefined,undefined,undefined,undefined,"berserker.jpg");
let assassinZatoichi = new Assassin(5,"座頭市 (Zatoïchi)",undefined,undefined,undefined,undefined,"shinobi.jpg");
let wizardMerlin = new Wizard(6,"Merlin",undefined,undefined,undefined,undefined,"wizard.jpg");
let gibbzGibbz = new Gibbz(7,"Gibbz",undefined,undefined,undefined,undefined,"gibbz.jpg");

let myPlayersTab = [figtherGrace, paladinKelly, monkMoana, berserkerGutts, assassinZatoichi, wizardMerlin, gibbzGibbz];

// Instantiating a new Game and launching it
let myPlay = new Game(2, myPlayersTab);
myPlay.launch();