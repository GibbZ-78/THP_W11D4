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
    console.log(`*** Starting round #${this.round} (${myPlay.turnLeft} / ${this.totalRounds} remaining) ***`);
    this.managePlayerTurn(myDrawnNumbersTab);
  }

  // Within a given round(Turn), manage each player's turn
  managePlayerTurn(myPlayersOrder) {
    if (myPlayersOrder.length > 0) {
      let myOrder = myPlayersOrder.shift();
      this.displayCards(myOrder);
      if (this.players[myOrder].health > 0) {
        this.displayPanel(this.players[myOrder], myPlayersOrder);
        console.log("  > C'est au tour de "+this.players[myOrder].name+" d'attaquer...");
        // TO DO: Check for deaths and victory at each player's turn
      } else {
        console.log("Le joueur "+this.players[myOrder]+" est mort. On saute son tour !");
        this.managePlayerTurn(myPlayersOrder);
      }
    } else {
      myPlay.turnLeft--;
      console.log(`*** Ending round #${this.round} (${myPlay.turnLeft} / ${this.totalRounds} remaining) ***`);
      myPlay.newTurn(this.round + 1, myPlay.turnLeft, this.totalRounds);
      // TO DO: Check for victory before 10th turn
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
  displayPanel(myCurrentPlayer, myRemainingPlayersID) {
    document.getElementById("panel").innerHTML = "";
    let myHTML ="";
    myHTML += "<h4 class='text-dark text-center mb-3'>In-game display</h4>"
    myHTML += "<h5 class='text-dark text-center my-3'>Round #"+this.round+" / "+ this.totalRounds +"</h5>"
    myHTML += "<h6 class='text-dark text-center m-2'>Current player</h6>"
    myHTML += "<div class='d-flex rounded border border-primary p-2'>"
    myHTML += "<img class='rounded my-2' height='50px' src='./images/"+myCurrentPlayer.photo+"'/>"
    myHTML += "<span class='text-dark text-start m-2 fs-3'>"+myCurrentPlayer.name+"</span>"
    myHTML += "<span class='text-dark text-end my-2 ms-3 small' style='writing-mode: vertical-rl;'>"+myCurrentPlayer.status+"</span>"
    myHTML += "</div>"
    myHTML += "<select id='targetSelect' class='form-select form-select-sm small my-2'>";
    myHTML += "<option value='' class='small' selected>Choose opponent / target</option>";
    this.players.forEach(element => {
      if (element.id != myCurrentPlayer.id) {
        myHTML += "<option value='"+element.id+"' class='small fst-italic'> > "+element.name+"</option>"; 
      }
    });
    myHTML += "</select>";
    myHTML += "<button id='attackButton' class='btn btn-sm btn-primary mx-3'><i class='bi bi-heart-arrow'></i> Attack</button>";
    myHTML += "<button id='specialButton' class='btn btn-sm btn-warning mx-3'><i class='bi bi-radioactive'></i> Special</button>";
    document.getElementById("panel").innerHTML = myHTML;
    document.getElementById("attackButton").addEventListener("click", (event) => this.manageAttackEvent(myCurrentPlayer, document.getElementById("targetSelect").value, myRemainingPlayersID));
    document.getElementById("specialButton").addEventListener("click", (event) => this.manageSpecialEvent(myCurrentPlayer, document.getElementById("targetSelect").value, myRemainingPlayersID));
  }
  
  // Manage the mechanics behind the "attackButton" being pressed
  manageAttackEvent(myAttacker, myTargetID, myPlayersOrder) {
    if (myTargetID != "") {
      let myTarget = this.players[myTargetID-1];
      myAttacker.dealDamage(myTarget);
      this.managePlayerTurn(myPlayersOrder);
    }
  }

  // Manage the mechanics behind the "specialButton" being pressed
  manageSpecialEvent(myAttacker, myTargetID, myPlayersOrder) {
    if (myTargetID != "") {
      let myTarget = this.players[myTargetID-1];
      myAttacker.specialAttack(myTarget);
      this.managePlayerTurn(myPlayersOrder);
    }
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