function supports_history_api() {
  return !!(window.history && history.pushState);
}

/*
En galery tengo los cachitos pequeños, esta utilizando ajax, la cosa que cuando falla, se va 
al otro lado y pide el estático

Biblio -> Control -> Dep III -> Dep I -> Biblio ...

Para ejecutarlo en mi oredenador, poner "http://localhost:8000/gallery/", ponerlo como http://saulibanez.github.io/X-Nav-5.7.18-HistoryAPI/gallery/
*/
function swapPhoto(href) {
  var req = new XMLHttpRequest();
  req.open("GET",
           "http://saulibanez.github.io/X-Nav-5.7.18-HistoryAPI/gallery/" +
             href.split("/").pop(),
           false);
  req.send(null);
  if (req.status == 200) {
    document.getElementById("gallery").innerHTML = req.responseText;
    setupHistoryClicks();
    return true;
  }
  return false;
}

function addClicker(link) {
  link.addEventListener("click", function(e) {
    if (swapPhoto(link.href)) {
      history.pushState(null, null, link.href);
      e.preventDefault();
    }
  }, true);
}

function setupHistoryClicks() {
  addClicker(document.getElementById("photonext"));
  addClicker(document.getElementById("photoprev"));
}

window.onload = function() {
  if (!supports_history_api()) { return; }
  setupHistoryClicks();
  window.setTimeout(function() {
    window.addEventListener("popstate", function(e) {
      swapPhoto(location.pathname);
    }, false);
  }, 1);
}

