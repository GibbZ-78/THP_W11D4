class Turn {

  constructor(playersTab,roundNbr) {
    this.players = playersTab;
    this.round = roundNbr;
  }

  // Launch a given round / turn
  start() {
    this.displayCards();
    this.displayPanel();
    let myDrawnNumbersTab = [];
    for (let index = 1; index <= this.players.length; index++) {
      myDrawnNumbersTab.push(this.getRandomIntInclusive(0, this.players.length - 1, myDrawnNumbersTab));
    }
    // TO DO : Manage actions during each turn. 
    // ForEach might be too fast. A breakpoint is needed to slow all down and enable humain players to make choices
    myDrawnNumbersTab.forEach(order => {
      this.multiClassToggle(document.getElementById("card_"+this.players[order].id),"border-danger","border-3", "border-1", "border-light");
      console.log(this.players[order].name + " is now playing...");
      this.multiClassToggle(document.getElementById("card_"+this.players[order].id),"border-danger","border-3", "border-1", "border-light");
    });
  }

  // Call the "showCard" method of each character to display its infos in Bootsrap cards
  displayCards(){
    document.getElementById("cards").innerHTML = "";
    this.players.map(element => {
      document.getElementById("cards").innerHTML += element.showCard(element.photo,element.special, element.type, element.id);
    });
  }

  // Display the in-game menu
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

  multiClassToggle(myElement, ...myArgs) {
    myArgs.map(e => myElement.classList.toggle(e));
  }

}