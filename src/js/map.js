/* jshint esversion: 6 */

ajaxGET(
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

        info.innerHTML = `
          <p>Adresse : <span>${api[i].address}</span></p>
          <p>Etat de la station: <span>${api[i].status}</span></p>
          <p>Vélo disponibles: <span>${api[i].available_bikes}</span></p>
          <p>Places disponibles: <span>${api[i].available_bikes_stands}</span></p>`;
      });
      markers = markers.concat(marker);
    }
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
