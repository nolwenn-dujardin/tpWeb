
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'

    this.xIni =0;
    this.yIni=0;
    this.xFin=0;
    this.yFin=0;
    this.clique = false;
    this.interactor = interactor

	// Developper les 3 fonctions gérant les événements
    this.dragStart = function(evt){

      let res = getMousePosition(canvas,evt);
      this.xIni = res.x;
      this.yIni = res.y;
      this.clique = true;
      console.log("Drag start : "+this.xIni+","+this.yIni);

      this.interactor.onInteractionStart(this);
    }.bind(this);

    this.drag = function(evt){
        if(this.clique){

            let res = getMousePosition(canvas,evt);
            this.xFin = res.x;
            this.yFin = res.y;
            console.log("Drag : "+this.xFin+","+this.yFin);

            this.interactor.onInteractionUpdate(this);
        }
    }.bind(this);

    this.dragEnd = function(evt){

      let res = getMousePosition(canvas,evt);
      this.xFin = res.x;
      this.yFin = res.y;
      this.clique = false;
      console.log("Drag end : "+this.xFin+","+this.yFin);

      this.interactor.onInteractionEnd(this);
    }.bind(this);

	// Associer les fonctions précédentes aux évènements du canvas.
    canvas.addEventListener('mousedown', this.dragStart, false);
    canvas.addEventListener('mousemove', this.drag, false);
    canvas.addEventListener('mouseup', this.dragEnd, false);
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



