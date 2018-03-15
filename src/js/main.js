/* jshint esversion: 6 */

const imageSlider = document.querySelector("#slider").querySelector("img");
const flecheGauche = document.querySelector("#flecheGauche");
const flecheDroite = document.querySelector("#flecheDroite");

// Objet SLIDER

const slider = {
  index: 0,
  image: ["images/slider1.png", "images/slider2.png", "images/slider3.png", "images/slider4.png"],

// fleche droite
  suivant: function() {
    this.index++;
    if(this.index > this.image.length - 1) {
      this.index = 0;
    }
    imageSlider.setAttribute("src", this.image[this.index]);
  },
//fleche gauche
  precedent: function() {
    this.index--;
    if(this.index < 0) {
      this.index = this.image.length - 1;
    }
    imageSlider.setAttribute("src", this.image[this.index]);
  },
// clavier
  clavier: function(e) {
    const code = e.keyCode;
    switch(code) {
      case 39:
        this.suivant();
        break;
      case 37:
        this.precedent();
        break;
    }
  }
};

// Event fleches et clavier

flecheDroite.addEventListener("click", () => {
  slider.suivant();
});

flecheGauche.addEventListener("click", () => {
  slider.precedent();
});

document.addEventListener("keydown", (e) => {
  slider.clavier(e);
});
