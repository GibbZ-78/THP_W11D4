class Turn {

  constructor(playersTab,roundNbr) {
    this.players = playersTab;
    this.round = roundNbr;
  }

  // Launch a given round / turn
  start() {
    let myDrawnNumbersTab = this.definePlayersTurns([]);
    // TO DO : Manage actions during each turn for each player. 
    // ForEach is "too fast" a loop. Breakpoints are needed to slow all down and enable human players to make choices
    while (myDrawnNumbersTab.length > 0) {
      let myOrder = myDrawnNumbersTab.shift();
      this.displayCards(myOrder);
      this.displayPanel(this.players[myOrder], this.round);
      console.log(this.players[myOrder].name + " is now playing...");
    }
  }

  // Call the "showCard" method of each character to display its infos in Bootsrap cards
  displayCards(mySelectedCard){
    document.getElementById("cards").innerHTML = "";
    this.players.map(element => {
      document.getElementById("cards").innerHTML += element.showCard(element.photo,element.special, element.type, element.id);
      if (element.id == mySelectedCard + 1) {
        //this.multiClassRemove(document.getElementById("card_"+element.id),"border");
        this.multiClassAdd(document.getElementById("card_"+element.id),"border", "border-danger");
      } else {
        this.multiClassRemove(document.getElementById("card_"+element.id),"border-danger");
        //this.multiClassAdd(document.getElementById("card_"+element.id),"border");
      }
    });
  }

  // Display the in-game menu
  displayPanel(myCurrentPlayer, myCurrentRound) {
    document.getElementById("panel").innerHTML = "";
    let myHTML ="";
    myHTML += "<h5 class='text-light text-center'>In-game display</h5>"
    myHTML += "<h6 class='text-light text-start'>Current player: "+myCurrentPlayer.name+"</h6>"
    myHTML += "<select class='form-select form-select-sm small my-2'>";
    myHTML += "<option value='' class='small' selected>Who should "+myCurrentPlayer.name+" attack?</option>";
    this.players.forEach(element => {
      if (element.id != myCurrentPlayer.id) {
        myHTML += "<option value='"+element.id+"' class='small fst-italic'> > "+element.name+"</option>"; 
      }
    });
    myHTML += "</select>";
    myHTML += "<button id='attackButton' class='btn btn-sm btn-primary mx-3'><i class='bi bi-heart-arrow'></i> Attack</button>";
    myHTML += "<button id='specialButton' class='btn btn-sm btn-warning mx-3'>Special</button>";
    document.getElementById("panel").innerHTML = myHTML;
  }
  
  // Returns an Integer between "min" (included) and "max" (included)
  // But excluding the (already drawn) values stored into "excluding"
  getRandomIntInclusive(myMin, myMax, myExclusions) {
    let min = Math.ceil(myMin);
    let max = Math.floor(myMax);
    let shouldstop = false;
    let draw = undefined;
    while (!shouldstop) {
      draw = Math.floor(Math.random() * (max - min + 1)) + min;
      shouldstop = !myExclusions.includes(draw);
    }
   return draw;
  }

  definePlayersTurns(myTmpTab) {
    for (let index = 1; index <= this.players.length; index++) {
      myTmpTab.push(this.getRandomIntInclusive(0, this.players.length - 1, myTmpTab));
    }
    return myTmpTab;
  }

  // Enable to TOGGLE several CSS classes (e.g. 'text-center', 'text-danger', 'border'...) of a DOM element "myElement" at once
  multiClassToggle(myElement, ...myArgs) {
    myArgs.map(e => myElement.classList.toggle(e));
  }

  // Enable to ADD several CSS classes (e.g. 'text-center', 'text-danger', 'border'...) of a DOM element "myElement" at once
  multiClassAdd(myElement, ...myArgs) {
    myArgs.map(e => myElement.classList.add(e));
  }

  // Enable to ADD several CSS classes (e.g. 'text-center', 'text-danger', 'border'...) of a DOM element "myElement" at once
  multiClassRemove(myElement, ...myArgs) {
    myArgs.map(e => myElement.classList.remove(e));
  }

}