/*****************************/
/*                           */
/*   WINTER'22 IS COMING...  */
/*                           */
/*   Coded with ♥ by GibbZ   */
/*           during          */
/*    THP Dev Winter 2022    */
/*****************************/

class Turn {

  constructor(playersTab,roundNbr,totalRounds) {
    this.players = playersTab;
    this.round = roundNbr;
    this.totalRounds = totalRounds;
  }

  // Launch a given round / turn with ALL players
  start() {
    let myDrawnNumbersTab = this.definePlayersTurns([]);
    this.managePlayerTurn(myDrawnNumbersTab);
  }

  managePlayerTurn(myPlayersOrder) {
    if (myPlayersOrder.length > 0) {
      let myOrder = myPlayersOrder.shift();
      let hasPlayed = false;
      this.displayCards(myOrder);
      this.displayPanel(this.players[myOrder], this.round);
      if (this.players[myOrder].health > 0) {
        //console.log(this.players[myOrder].name + " is now playing...");
        // WHERE ALL THE MAGIC HAPPEN (chose target, chose attack type, update heroes data...)

        // End of current player's turn >> check for victory and if not yet, switch to next player (if any)
        this.managePlayerTurn(myPlayersOrder);
      } else {
        this.managePlayerTurn(myPlayersOrder);
      }
    } else {
      // End of turn of ALL players >> Check for victory before 10th turn
    }
  }

  // Call the "showCard" method of each character to display its infos in Bootsrap cards
  displayCards(mySelectedCard){
    document.getElementById("cards").innerHTML = "";
    this.players.map(element => {
      document.getElementById("cards").innerHTML += element.showCard(element.photo,element.special, element.type, element.id);
      if (element.id == mySelectedCard + 1) {
        this.multiClassAdd(document.getElementById("card_"+element.id),"border-3", "border-primary", "opacity-100");
      } else {
        this.multiClassRemove(document.getElementById("card_"+element.id),"border-3", "border-primary", "opacity-100");
      }
    });
  }

  // Display the in-game menu
  displayPanel(myCurrentPlayer) {
    document.getElementById("panel").innerHTML = "";
    let myHTML ="";
    myHTML += "<h4 class='text-dark text-center mb-3'>In-game display</h4>"
    myHTML += "<h5 class='text-dark text-center my-3'>Round #"+this.round+" / "+ this.totalRounds +"</h5>"
    myHTML += "<h6 class='text-dark text-start m-2'>Current player: "+myCurrentPlayer.name+"</h6>"
    myHTML += "<select id='targetSelect' class='form-select form-select-sm small my-2'>";
    myHTML += "<option value='' class='small' selected>Who should "+myCurrentPlayer.name+" attack?</option>";
    this.players.forEach(element => {
      if (element.id != myCurrentPlayer.id) {
        myHTML += "<option value='"+element.id+"' class='small fst-italic'> > "+element.name+"</option>"; 
      }
    });
    myHTML += "</select>";
    myHTML += "<button id='attackButton' class='btn btn-sm btn-primary mx-3'><i class='bi bi-heart-arrow'></i> Attack</button>";
    myHTML += "<button id='specialButton' class='btn btn-sm btn-warning mx-3'><i class='bi bi-radioactive'></i> Special</button>";
    document.getElementById("panel").innerHTML = myHTML;
    document.getElementById("attackButton").addEventListener("click",);
    document.getElementById("specialButton").addEventListener("click",);
  }
  
  // Manage all the mechanics behind the "attackButton" being pressed
  manageAttackEvent() {

  }

  // Manage all the mechanics behind the "specialButton" being pressed
  manageSpecialEvent() {

  }

  // Generate a table including ID of each player (once only), in a randomized order
  definePlayersTurns(myTmpTab) {
    for (let index = 1; index <= this.players.length; index++) {
      myTmpTab.push(this.getRandomIntInclusiveExcluding(0, this.players.length - 1, myTmpTab));
    }
    return myTmpTab;
  }

  /*** UTILITY METHODS ***/

  // Returns an Integer between "min" (included) and "max" (included)
  // But excluding the (already drawn) values stored into "myExclusions"
  getRandomIntInclusiveExcluding(myMin, myMax, myExclusions) {
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

} // End of class Turn

/*****************/
/*  End of code  */
/*****************/