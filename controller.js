
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
	document.getElementById("butLine").onclick = (_) => this.currEditingMode = editingMode.line
	document.getElementById("butRect").onclick = (_) => this.currEditingMode = editingMode.rect
	document.getElementById("spinnerWidth").onchange = (e) => this.currLineWidth = e.target.value
	document.getElementById("colour").onchange = (e) => this.currColour = e.target.value


	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
	this.onInteractionStart = function(dnd) {
		console.log("color", this.currColour, "width", this.currLineWidth)
		switch(this.currEditingMode){
			case editingMode.rect: {
				this.currentShape = new Rectangle()
				break;
			}
			case editingMode.line: {
				this.currentShape = new Line()
				break;
			}
		}
	}.bind(this)

	this.onInteractionUpdate = function(dnd) {
		let xIni = dnd.xIni
		let yIni = dnd.yIni
		let xFin = dnd.xFin
		let yFin = dnd.yFin
		console.log('update')
		switch(this.currEditingMode) {
			case editingMode.rect: {
				let height = xFin - xIni
				let width = yFin - yIni

				this.currentShape = new Rectangle(xIni, yIni, height, width, this.currLineWidth, this.currColour)
				drawing.paint(ctx)
				this.currentShape.paint(ctx)
				break;
			}
			case editingMode.line: {
				this.currentShape = new Line(xIni, yIni, xFin, yFin, this.currLineWidth, this.currColour)
				drawing.paint(ctx)
				this.currentShape.paint(ctx)
				break;
			}
		}
	}.bind(this)

	this.onInteractionEnd = function(dnd) {
		var uuid = uuidv4()
		console.log(uuid)

		drawing.shapes.set(uuid, this.currentShape)
		drawing.paint(ctx)
		updateShapeList(uuid, this.currentShape)
		document.getElementById("remove-"+uuid).onclick = (e) =>
			remove(drawing, uuid, ctx)

	}.bind(this)
};

function remove(drawing, index, ctx){
	console.log("remove index ", index)
	drawing.shapes.delete(index)
	document.getElementById("shape-" + index).remove()
	drawing.paint(ctx)
}

function uuidv4() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
}


