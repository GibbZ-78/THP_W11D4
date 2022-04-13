
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


let figtherGrace = new Fighter("Grace");
let paladinUlder = new Paladin("Ulder");
let monkMoana = new Monk("Moana");
let berserkerDraven = new Berserker("Draven");
let assassinZatoichi = new Assassin("Zatoichi");
let wizardMerlin = new Wizard("Merlin");
let gibbzGibbz = new Gibbz("Gibbz");

let myPlayersTab = [figtherGrace, paladinUlder, monkMoana, berserkerDraven, assassinZatoichi, wizardMerlin, gibbzGibbz];

let myPlay = new Game(undefined, myPlayersTab);
myPlay.launch();