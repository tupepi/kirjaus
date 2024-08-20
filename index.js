function e(elementti) {
  return document.createElement(elementti);
}

function i(id) {
  return document.getElementById(id);
}

function c(classname) {
  return document.getElementsByClassName(classname);
}

function a(elementti, vanhempi) {
  vanhempi.appendChild(elementti);
}

function muistiin() {
  const kokomatka = i("koko_matka").value;
  const piirit = c("piiri");
  const piirien_tiedot = { koko_matka: kokomatka };
  var index = 1;
  for (let p of piirit) {
    const inputs = p.children;
    const piiri = inputs[0].value;
    const matka = inputs[1].value;
    start = inputs[2].children[0].value;
    end = inputs[2].children[1].value;
    const piirin_tiedot = {
      piiri: piiri,
      matka: matka,
      alku: start,
      loppu: end,
    };
    piirien_tiedot["piiri" + index] = piirin_tiedot;
    index++;
  }
  localStorage.setItem("piirit", JSON.stringify(piirien_tiedot));
}

function muistista() {
  const piirien_tiedot = JSON.parse(localStorage.getItem("piirit"));
  if (piirien_tiedot === null) return;

  const piirit = c("piiri");
  var index = 1;
  for (let p of piirit) {
    const inputs = p.children;
    inputs[0].value = piirien_tiedot["piiri" + index]["piiri"];
    inputs[1].value = piirien_tiedot["piiri" + index]["matka"];
    inputs[2].children[0].value = piirien_tiedot["piiri" + index]["alku"];
    inputs[2].children[1].value = piirien_tiedot["piiri" + index]["loppu"];
    index++;
  }
}

function luo_input(nimi, type) {
  const input = e("input");
  input.addEventListener("change", (event) => {
    muistiin();
  });

  input.placeholder = nimi;
  input.setAttribute("name", nimi);
  input.setAttribute("id", nimi);
  input.setAttribute("type", type);
  return input;
}

function luo_piiri(nro) {
  const div = e("div");
  div.setAttribute("class", "piiri");
  div.setAttribute("id", "piiri_tiedot" + nro);
  div.style.display = "none";
  const piiri = luo_input("piiri" + nro, "number");
  const alku = luo_input("alku" + nro, "time");
  const loppu = luo_input("loppu" + nro, "time");
  const matka = luo_input("matka" + nro, "number");
  const ajat = e("div");
  a(alku, ajat);
  a(loppu, ajat);
  a(piiri, div);
  a(matka, div);
  a(ajat, div);
  return div;
}

function leikepoydalle() {
  const piirit = c("piiri");
  const tanaan = new Date();
  let tuloste = `Tuukka P ${tanaan.getDate()}.${tanaan.getMonth() + 1}.\n`;
  const kokomatka = i("koko_matka").value;
  tuloste += `Koko matka: ${kokomatka} km\n\n`;
  for (let p of piirit) {
    const inputs = p.children;
    const piiri = inputs[0].value;
    const matka = inputs[1].value;

    // https://stackoverflow.com/questions/54658859/difference-between-two-html-time-inputs
    start = inputs[2].children[0].value.split(":");
    end = inputs[2].children[1].value.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    var diff =
      (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
    //------------------------------------
    const aika = diff;
    if (isNaN(minutes)) break;
    if (isNaN(hours)) break;
    if (piiri === "") break;
    if (matka === "") break;

    const tunnit = hours === 0 ? "" : hours + " h ";

    tuloste += `${piiri}\n${matka} km\n${tunnit}${minutes} min\n\n`;
  }
  var textarea = i("tulos");
  textarea.textContent = tuloste;
  textarea.select();
  document.execCommand("copy");
  //navigator.clipboard.writeText(tuloste);
}

function lisaa_nav(nro) {
  const d = document.createElement("div");
  const nav = i("nav");
  d.textContent = nro;
  d.id = "nav" + nro;
  d.addEventListener("click", () => {
    nayta_piiri(nro);
    const nav = i("nav");
    Array.from(nav.children).forEach((n) => {
      n.style.backgroundColor = "white";
      if (n.id === "nav" + nro) {
        n.style.backgroundColor = "gray";
      }
    });
  });
  a(d, nav);
}

function nayta_piiri(nro) {
  const piirit = i("piirit");
  Array.from(piirit.children).forEach((p) => {
    p.style.display = "none";
    if (p.id === "piiri_tiedot" + nro) {
      p.style.display = "flex";
    }
  });
}

window.onload = (e) => {
  var div = i("piirit");
  var piireja = 0;
  const lisaa_piiri = i("lisaa_piiri");
  lisaa_piiri.addEventListener("click", () => {
    if (!window.confirm("Lisää?")) return;
    lisaa_nav(piireja);
    a(luo_piiri(piireja++), div);
  });

  const kopioi = i("kopioi");
  kopioi.addEventListener("click", leikepoydalle);

  const nollaa = i("nollaa");
  nollaa.addEventListener("click", () => {
    if (!window.confirm("Nollaa?")) return;
    localStorage.clear();
    location.reload();
  });

  while (piireja < 6) {
    lisaa_nav(piireja);
    a(luo_piiri(piireja++), div);
  }

  muistista();
  i("nav0").click();
};
