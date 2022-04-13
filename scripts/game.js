
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


let figtherGrace = new Fighter("Grace",undefined,undefined,undefined,undefined,"barbarian_girl.jpg");
let paladinKelly = new Paladin("Kelly",undefined,undefined,undefined,undefined,"lady_knight.jpg");
let monkMoana = new Monk("Moana",undefined,undefined,undefined,undefined,"priest.jpg");
let berserkerGutts = new Berserker("ガッツ",undefined,undefined,undefined,undefined,"berserker.jpg");
let assassinZatoichi = new Assassin("座頭市",undefined,undefined,undefined,undefined,"shinobi.jpg");
let wizardMerlin = new Wizard("Merlin",undefined,undefined,undefined,undefined,"wizard.jpg");
let gibbzGibbz = new Gibbz("Gibbz",undefined,undefined,undefined,undefined,"gibbz.jpg");

let myPlayersTab = [figtherGrace, paladinKelly, monkMoana, berserkerGutts, assassinZatoichi, wizardMerlin, gibbzGibbz];

let myPlay = new Game(undefined, myPlayersTab);
myPlay.launch();