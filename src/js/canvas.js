/* jshint esversion: 6 */


const signature = {
  // signature
  canvas: document.querySelector("canvas"),
  context: this.canvas.getContext("2d"),

  //dernière position non définie
  lastPosi: null,

  position: function (posi) {
    let rect = signature.canvas.getBoundingClientRect(); //va chercherla position relative et la taille de l'élément par rapport à sa zone d'affichage
    posi.x = (posi.x - rect.left) / (rect.right - rect.left) * signature.canvas.width; //récupère la position de la souris en x
    posi.y = (posi.y - rect.top) / (rect.bottom - rect.top) * signature.canvas.height; //récupère la position de la souris en y
    return posi;
  },

  positionSouris: function (e) {
    return signature.position({
      x: e.clientX,
      y: e.clientY
    }); //récupère la position du clic dans le navigateur
  },

  positionToucher: function (e) {
    return signature.position({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }); //récupère la position du premier toucher dans le navigateur
  },

  dessiner: function (posi1, posi2) {
    signature.context.moveTo(posi1.x, posi1.y); //point de départ
    signature.context.lineTo(posi2.x, posi2.y); //point d'arrivée
    signature.context.stroke();
  },

  start: function (posi) {
    signature.lastPosi = posi; //prends la dernière position connue
  },

  stop: function (posi) {
    if (signature.lastPosi) { //si lastPosi n'est pas nul, on dessine et on arrete pour finir le dessin
      signature.dessiner(signature.lastPosi, posi);
      signature.lastPosi = null; //fin du dessin, empeche de lié à un nouveau tracé
    }
  },

  move: function (posi) {
    if (signature.lastPosi) {
      let newPost = posi;
      signature.dessiner(signature.lastPosi, newPost);
      signature.lastPosi = newPost; //relie la dernière position avec la nouvelle pour signifier le mouvement
    }
  },

  clear: function () {
    signature.canvas.width = signature.canvas.width;
  } //efface tout
};

signature.context.strokeStyle = "#000"; //couleur du trait
signature.context.lineWidth = 1.5; //dimension du trait
signature.context.lineCap = "round"; //arrondie du trait

//lien effacer signature avec le bouton
const buttonClear = document.querySelector("#effacer");
buttonClear.addEventListener("click", signature.clear);

// --------------- evenement de la souris ---------------
signature.canvas.addEventListener("mousedown", (e) => {
  if (e.buttons === 1) signature.start(signature.positionSouris(e));
});
signature.canvas.addEventListener("mouseup", (e) => {
  signature.stop(signature.positionSouris(e));
});
signature.canvas.addEventListener("mousemove", (e) => {
  signature.move(signature.positionSouris(e));
});
signature.canvas.addEventListener("mouseleave", (e) => {
  signature.stop(signature.positionSouris(e));
});
signature.canvas.addEventListener("mouseenter", (e) => {
  if (e.buttons === 1) signature.start(signature.positionSouris(e));
});

// --------------- evenement du toucher ---------------
signature.canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  if (e.touches.length > 0) signature.start(signature.positionToucher(e));
});
signature.canvas.addEventListener("touchend", (e) => {
  if (e.touches.length > 0) signature.stop(signature.positionToucher(e));
});
signature.canvas.addEventListener("touchmove", (e) => {
  if (e.touches.length > 0) signature.move(signature.positionToucher(e));
});
