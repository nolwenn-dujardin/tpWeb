
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.
Rectangle.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size;
    ctx.beginPath();
    ctx.rect(this.xStart, this.yStart, this.height, this.width, this.size, this.color);
    ctx.stroke();
};

Line.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size;
    ctx.beginPath();
    ctx.moveTo(this.xStart, this.yStart);
    ctx.lineTo(this.xEnd, this.yEnd);
    ctx.stroke();
};

Drawing.prototype.paint = function(ctx) {
//console.log(this.getForms());
    ctx.fillStyle = '#F0F0F0'; // set canvas' background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.shapes.forEach(function (eltDuTableau) {
// now fill the canvas
        eltDuTableau.paint(ctx);
    });
};

function updateShapeList(index, shape){
    document.getElementById('shapeList').insertAdjacentHTML('beforeend', toDom(index, shape))
}

function toDom(index, shape){
    let htmlText = `<li id="shape-${index}">`
    switch(shape.constructor) {
        case Rectangle: {
            htmlText += '■ Rectangle'
            break;
        }
        case Line: {
            htmlText += '/ Line'
            break;
        }
    }

    htmlText += `<button type="button" id="remove-${index}" class="btn btn-default"> 
        <span class="glyphicon glyphicon-remove-sign"></span> </button>` +
        '</li>'
    return htmlText
}
