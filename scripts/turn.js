class Turn {

  constructor(playersTab,roundNbr) {
    this.players = playersTab;
    this.round = roundNbr;
  }

  start() {
    this.watchStats();
  }

  watchStats(){
    //console.table(this.players);
    document.getElementById("stats").innerHTML = "";
    this.players.forEach(element => {
      document.getElementById("stats").innerHTML += element.showCard(element.photo,element.special);
    });
  }
  
}