
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

function Drawing(){
    this.shapes = new Map();
};

function Forme(xStart, yStart, size, color){
    this.xStart = xStart;
    this.yStart = yStart;
    this.color = color;
    this.size = size;
};

function Rectangle(xStart, yStart, height, width, size, color){
    Forme.call(this, xStart, yStart, size, color);
    this.height = height;
    this.width = width;
};

function Line(xStart, yStart, xEnd, yEnd, size, color){
    Forme.call(this, xStart, yStart, size, color);
    this.xEnd = xEnd;
    this.yEnd = yEnd;
};