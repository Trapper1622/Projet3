/* jshint esversion: 6 */

//Exécute un appel ajaxGET
//Prend en paramètre l'URL cible et la fonction callback appelée en cas de succès
function ajaxGET(url, callback) {
  var req = new XMLHttpRequest();
  req.open("GET", url);
  req.addEventListener("load", function () {
    if (req.status >= 200 && req.status < 400) {
      //Appelle la fonction callback en lui passant la réponse de la requète
      callback(req.responseText);
    }
    else {
      console.error(req.status + " " + req.statusText + " " + url);
      // console.error(`${req.status} ${req.statusText} ${url}`);
    }
  });
  req.addEventListener("error", function () {
    console.error("Erreur réseau avec l'URL " + url);
    // console.error(`Erreur réseau avec l'URL ${url}`);
  });
  req.send(null);
}
