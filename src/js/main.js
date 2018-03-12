/* jshint esversion: 6 */

// const slider = {
//   //current slide
//   currentIndex: 0,
//
//   init: function () {
//     slider.nextSlideOnClick();
//     slider.prevSlideOnClick();
//     // slider.changeSlideOnKeypress();
//   },
//
//   //activation slider
//   activeSlide: function () {
//       // let slides = $('.fade');
//       let slides = document.querySelectorAll(".fade");
//       // let slide = slides.eq(slider.currentIndex);
//       let slide = slides[slider.currentIndex];
//       // slides.hide();
//       slides.style.display = "none";
//       // slide.css('display', 'flex');
//       slide.style.display = "flex";
//     },
//
//   // diapositive suivante comme diapo actuelle
//   indexPlus: function () {
//     let slides = document.querySelectorAll(".fade");
//     let slidesNumber = slides.length;
//     slider.currentIndex += 1;
//     if (slider.currentIndex > slidesNumber - 1) {
//         slider.currentIndex = 0;
//     }
//   },
//
//   //diapositive précédente comme diapo actuelle
//   indexMinus: function () {
//     let slides = document.querySelectorAll(".fade");
//     let slidesNumber = slides.length;
//     slider.currentIndex -= 1;
//     if (slider.currentIndex < 0) {
//         slider.currentIndex = slidesNumber - 1;
//     }
//   },
//
//   //flèche droite
//   nextSlideOnClick: function () {
//     let next = document.querySelector("#flecheDroite");
//     next.addEventListener("click", () => {
//       slider.indexPlus();
//       slider.activeSlide();
//     });
//   },
//
//   //flèche gauche
//   prevSlideOnClick: function() {
//     let prev = document.querySelector("#flecheGauche");
//     prev.addEventListener("click", () => {
//       slider.indexMinus();
//       slider.activeSlide();
//     });
//   },
// };
//
// document.addEventListener("DOMContentLoaded", function() {
//     slider.init();
// });


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
