/* jshint esversion: 6 */

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
          <p>Places disponibles: <span>${api[i].available_bikes_stands}</span></p>
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
    buttonConfirm.addEventListener("click", function () {
      clearInterval(intervalID);
      reservation.style.diplay = "none";
      sectionTimer.scrollIntoView();
      const address = stationClick.address;
      time = 1200;

      // --------------- function timer réservation ---------------
      // ----------------------------------------------------------


    });
  }
);


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
