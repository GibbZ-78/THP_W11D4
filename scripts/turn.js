class Turn {

  constructor(playersTab,roundNbr) {
    this.players = playersTab;
    this.round = roundNbr;
  }

  start() {
    this.displayCards();
    this.displayPanel();
    let myDrawnNumbersTab = [];
    for (let index = 1; index < this.players.length; index++) {
      myDrawnNumbersTab.push(this.getRandomIntInclusive(0, this.players.length - 1, myDrawnNumbersTab));
    }
    console.log(myDrawnNumbersTab);
  }

  displayCards(){
    document.getElementById("cards").innerHTML = "";
    this.players.forEach(element => {
      document.getElementById("cards").innerHTML += element.showCard(element.photo,element.special, element.type);
    });
  }

  displayPanel() {
    document.getElementById("panel").innerHTML = "";
    document.getElementById("panel").innerHTML = "<h5 class='text-light text-center'>In-game display</h5>";
  }
  
  // Returns an Integer between "min" (included) and "max" (included)
  // But excluding the (already drawn) values stored into "excluding"
  getRandomIntInclusive(myMin, myMax, myExclusions) {
    let min = Math.ceil(myMin);
    let max = Math.floor(myMax);
    let shouldstop = false;
    let draw = undefined;
    while (!shouldstop) {
      draw = Math.floor(Math.random() * (max - min +1)) + min;
      shouldstop = !myExclusions.includes(draw);
    }
   return draw;
  }

}