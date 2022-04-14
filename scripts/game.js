/*****************************/
/*                           */
/*   WINTER'22 IS COMING...  */
/*                           */
/*   Coded with ♥ by GibbZ   */
/*           during          */
/*    THP Dev Winter 2022    */
/*****************************/

class Game {

  constructor(turnLeft = 10, playersTab) {
    this.turnLeft = turnLeft;
    this.players = playersTab;
  }

  // Once the Game created, launches it effectively by starting the 1st round
  newTurn(myRoundNbr, myTurnLeft, myTotalRounds) {
    if (myTurnLeft > 0) {
      let myTurn = new Turn(this.players, myRoundNbr, myTotalRounds);
      myTurn.start();
    } else {
      console.log (`Fin des ${myTotalRounds} tour(s) de jeu !`);
    }
  }

} // End of class Game

// Instantiating 7 players then storing them into a dedicated Array to be passed through classes (Game > Turn)
let figtherGrace = new Fighter(1,"Grace",undefined,undefined,undefined,undefined,"barbarian_girl.jpg");
let paladinKelly = new Paladin(2,"Kelly",undefined,undefined,undefined,undefined,"lady_knight.jpg");
let monkMoana = new Monk(3,"Moana",undefined,undefined,undefined,undefined,"priest.jpg");
let berserkerGutts = new Berserker(4,"ガッツ",undefined,undefined,undefined,undefined,"berserker.jpg");
let assassinZatoichi = new Assassin(5,"座頭市",undefined,undefined,undefined,undefined,"shinobi.jpg");
let wizardMerlin = new Wizard(6,"Merlin",undefined,undefined,undefined,undefined,"wizard.jpg");
let gibbzGibbz = new Gibbz(7,"Gibbz",undefined,undefined,undefined,undefined,"gibbz.jpg");

let myPlayersTab = [figtherGrace, paladinKelly, monkMoana, berserkerGutts, assassinZatoichi, wizardMerlin, gibbzGibbz];

// Instantiating a new Game and launching it
let myPlay = new Game(3, myPlayersTab);
myPlay.newTurn(1, myPlay.turnLeft, myPlay.turnLeft);

/*****************/
/*  End of code  */
/*****************/