/* jshint esversion: 6 */

// --------------- inistialisation google map  ---------------
// -----------------------------------------------------------
function initMap() {
  map = new google.maps.Map(document.querySelector("#map"), {
    center: {
      lat: 45.7616,
      lng: 4.8559
    },
    zoom: 13
  });
}

// --------------- donnée serveur jcdecaux et mise en place des boutons  ---------------
// -------------------------------------------------------------------------------------
ajaxGet(
  "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=1ee3867fba30e0756919f69563ad164308c25536",
  (reponse) => {
    const api = JSON.parse(reponse);
    let markers = [];
    let stationClick;
    for (let i = 0; i < api.length; i++) {
      const iconMarker = {
        url: "js/images/markerGreen.png",
        origins: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 20)
      };

      if (api[i].available_bikes === 0) {
        iconMarker.url = "js/images/markerOrange.png";
      }
      else if (api[i].status === "CLOSE") {
        iconMarker.url = "js/images/markerRed.png";
      }

      const marker = new google.maps.Marker( {
        position: api[i].position,
        map: map,
        title: api[i].address,
        icon: iconMarker
      });

      // --------------- listener sur les markers ---------------
      //---------------------------------------------------------

      google.maps.event.addListener(marker, "click", () => {
        stationClick = api[i];
        const reservation = document.querySelector("#reservation");
        const reserver = document.querySelector("#reserver");
        const confirmation = document.querySelector("#confirmation");

        reservation.style.display = "block";
        reserver.style.display = "block";
        confirmation.style.display = "none";
        reservation.scrollIntoView();

        if (api[i].status === "OPEN") {
          api[i].status = "OUVERTE";
        }
        else if (api[i].status === "CLOSE") {
          api[i].status = "FERMÉE";
        }

        infos.innerHTML = `
          <p>Adresse : <span>${api[i].address}</span></p>
          <p>Etat de la station: <span>${api[i].status}</span></p>
          <p>Vélo disponibles: <span>${api[i].available_bikes}</span></p>
          <p>Places disponibles: <span>${api[i].available_bike_stands}</span></p>
          `;
      });
      markers = markers.concat(marker);
    }
    // --------------- regroupement des markers ---------------
    // --------------------------------------------------------

    const markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    const reservation = document.querySelector("#reservation");
    const infos = document.querySelector("#informations");
    const buttonConfirm = document.querySelector("#valider");
    const sectionTimer = document.querySelector("#timer");
    const buttonReserver = document.querySelector("#buttonReservation").querySelector("button");
    const buttonAnnuler = document.querySelector("#annuler");

    // --------------- listener button réserver ---------------
    // --------------------------------------------------------

    buttonReserver.addEventListener("click", () => {
      if (stationClick.available_bikes > 0) {
        confirmation.style.display = "block";
        reserver.style.display = "none";
      }
      else {
        confirmation.style.display = "none";
        reserver.style.diplay = "block";
        alert("Aucun vélo disponible dans cette station");
      }
    });

    // --------------- listener button valider ---------------
    // -------------------------------------------------------

    let intervalID = 0;
    let time;
    const textTimer = document.querySelector("#time");
    buttonConfirm.addEventListener("click", () => {
        clearInterval(intervalID);
        reservation.style.display = "none";
        sectionTimer.scrollIntoView();
        const address = stationClick.address;
        time = 1200;


      // --------------- function timer réservation ---------------
      // ----------------------------------------------------------

      intervalID = setInterval( () => {
        sectionTimer.style.display = "block";
        sessionStorage.setItem("station", address);
        sessionStorage.setItem("timer", time);
        const {minutes, seconds} = getMinutesAndSeconds(time);
        textTimer.innerHTML = `Vous avez bien réservé un vélo <span>${address}</span> pour une durée de <span>${minutes}:${seconds}</span>`;
        time = time -1;
        if (time === 0) {
          clearInterval(intervalID);
          textTimer.innerHTML = `Votre réservation à la station <span>${address}</span> a expiré !`;
          sessionStorage.clear("station", "timer");
        }
      }, 1000);
    });

    // --------------- function storage timer ---------------
    // ----------------------------------------------------------

  function refresh() {
    const storageAdress = sessionStorage.getItem("station");
    let storageTime = sessionStorage.getItem("timer");
    time = storageTime;
    if (sessionStorage.length > 1) {
      sessionStorage.setItem("timer", storageTime);
      intervalID = setInterval(() => {
        sectionTimer.style.display = "block";
        sessionStorage.setItem("station", storageAdress);
        sessionStorage.setItem("timer", time);
        const {minutes,seconds} = getMinutesAndSeconds(time);
        textTimer.innerHTML =  `Vous avez bien réservé un vélo <span>${storageAdress}</span> pour une durée de <span>${minutes}:${seconds}</span>`;
        time = time - 1;
        if (time === 0) {
          clearInterval(intervalID);
          textTimer.innerHTML = `Votre réservation à la station <span>${storageAdress}</span> a expiré !`;
          sessionStorage.clear("station", "timer");
        }
      }, 1000);
    }
  }
  refresh();

  // --------------- Bouton annuler ---------------
  // ----------------------------------------------

  buttonAnnuler.addEventListener("click", () => {
    sessionStorage.clear("station", "timer");
    clearInterval(intervalID);
    textTimer.innerHTML = `Votre réservation a bien été annulée`;
    // disparition de la section timer au bout de 3 secondes
    setTimeout(function () {
      sectionTimer.style.display = "none";
    }, 3000);
  });

});


    // --------------- function convertion minutes  ---------------
    // ------------------------------------------------------------

    const getMinutesAndSeconds = (time) => {
      let minutes = Math.floor(time / 60);
      let seconds = time - minutes * 60;

    // en dessous de 10 secondes un 0 se met devant les minutes ou les secondes
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      return { minutes, seconds };
    };
