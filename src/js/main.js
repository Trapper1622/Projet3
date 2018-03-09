/* jshint esversion: 6 */

// var Slider = {
//     // Define current slide
//     currentIndex: 0,
//
//     init: function () {
//         // Slider.autoSlide();
//         // Slider.playAutoClick();
//         Slider.nextSlideOnClick();
//         Slider.prevSlideOnClick();
//         Slider.changeSlideOnKeypress();
//     },
//
//     // Display the current slide
//     activeSlide: function () {
//         var slides = $('.fade');
//         var slide = slides.eq(Slider.currentIndex);
//         slides.hide();
//         slide.css('display', 'flex');
//     },
//
//     // Define the next slide as the current slide
//     indexPlus: function () {
//         var slides = $('.fade');
//         var slidesNumber = slides.length;
//         Slider.currentIndex += 1;
//         if (Slider.currentIndex > slidesNumber - 1) {
//             Slider.currentIndex = 0;
//         }
//     },
//
//     // Define the previous slide as the the current slide
//     indexMinus: function () {
//         var slides = $('.fade');
//         var slidesNumber = slides.length;
//         Slider.currentIndex -= 1;
//         if (Slider.currentIndex < 0) {
//             Slider.currentIndex = slidesNumber - 1;
//         }
//     },
//
//     // next slide on click on the ">" button
//     nextSlideOnClick: function () {
//         var next = $('#flecheGauche');
//         next.click(function () {
//             Slider.indexPlus();
//             Slider.activeSlide();
//         });
//     },
//
//     // previous slide on click on the "<" button
//     prevSlideOnClick: function () {
//         var prev = $('#flecheDroite');
//         prev.click(function () {
//             Slider.indexMinus();
//             Slider.activeSlide();
//         });
//     },
//
//     // previous / next slide with keyboard
//     changeSlideOnKeypress: function () {
//         $('body').keydown(function (e) {
//             if (e.which === 39) {
//                 Slider.indexPlus();
//                 Slider.activeSlide();
//             } else if (e.which === 37) {
//                 Slider.indexMinus();
//                 Slider.activeSlide();
//             }
//         })
//     },
// }
//
// $(function () {
//     Slider.init();
// });


const slider = {
  //current slide
  currentIndex: 0,

  init: function () {
    slider.nextSlideOnClick();
    slider.prevSlideOnClick();
    // slider.changeSlideOnKeypress();
  },

  //activation slider
  activeSlide: function () {
      var slides = $('.fade');
      var slide = slides.eq(slider.currentIndex);
      slides.hide();
      slide.css('display', 'flex');
    },

  // diapositive suivante comme diapo actuelle
  indexPlus: function () {
    let slides = document.querySelector(".fade");
    let slidesNumber = slides.length;
    slider.currentIndex += 1;
    if (slider.currentIndex > slidesNumber - 1) {
        slider.currentIndex = 0;
    }
  },

  //diapositive précédente comme diapo actuelle
  indexMinus: function () {
    let slides = document.querySelector(".fade");
    let slidesNumber = slides.length;
    slider.currentIndex -= 1;
    if (slider.currentIndex < 0) {
        slider.currentIndex = slidesNumber - 1;
    }
  },

  //flèche droite
  nextSlideOnClick: function () {
    let next = document.querySelector("#flecheDroite");
    next.addEventListener("click", () => {
      slider.indexPlus();
      slider.activeSlide();
    });
  },

  //flèche gauche
  prevSlideOnClick: function() {
    let prev = document.querySelector("#flecheGauche");
    prev.addEventListener("click", () => {
      slider.indexMinus();
      slider.activeSlide();
    });
  },
};

document.addEventListener("DOMContentLoaded", function() {
    slider.init();
});





// const imageSlider = document.querySelector("#slider").querySelector("img");
// const flecheGauche = document.querySelector("#flecheGauche");
// const flecheDroite = document.querySelector("#flecheDroite");
//
// // Objet SLIDER
//
// const slider = {
//   index: 0,
//   image: ["images/slider1.png", "images/slider2.png", "images/slider3.png", "images/slider4.png", "images/slider5.png"],
//
// // fleche droite
//   suivant: function() {
//     this.index++;
//     if(this.index > this.image.length - 1) {
//       this.index = 0;
//     }
//     imageSlider.setAttribute("src", this.image[this.index]);
//   },
// //fleche gauche
//   precedent: function() {
//     this.index--;
//     if(this.index < 0) {
//       this.index = this.image.length - 1;
//     }
//     imageSlider.setAttribute("src", this.image[this.index]);
//   },
// // clavier
//   clavier: function(e) {
//     const code = e.keyCode;
//     switch(code) {
//       case 39:
//         this.suivant();
//         break;
//       case 37:
//         this.precedent();
//         break;
//     }
//   }
// };
//
// // Event fleches et clavier
//
// flecheDroite.addEventListener("click", () => {
//   slider.suivant();
// });
//
// flecheGauche.addEventListener("click", () => {
//   slider.precedent();
// });
//
// document.addEventListener("keydown", (e) => {
//   slider.clavier(e);
// });
