function e(elementti) {
  return document.createElement(elementti);
}

function i(id) {
  return document.getElementById(id);
}

function c(classname) {
  return document.getElementsByClassName(classname);
}


function a(elementti,vanhempi) {
  vanhempi.appendChild(elementti);
}



function luo_input(nimi,type) {
  const input = e("input");
  input.setAttribute("name",nimi);
  input.setAttribute("id",nimi);
  input.setAttribute("type",type);
  return input;
}

function luo_piiri(nro) {
  const div = e("div");
  div.setAttribute("class","piiri")
  const piiri = luo_input("piiri"+nro,"number");
  

  const alku = luo_input("alku"+nro,"time");
  const loppu = luo_input("loppu"+nro,"time");
  const alku_nyt = e("button");
  alku_nyt.textContent = "Nyt";
  const loppu_nyt = e("button");
  loppu_nyt.textContent = "Nyt";
  
  alku_nyt.addEventListener("click", (e) => {

  })

  loppu_nyt.addEventListener("click", (e) => {
    
  })

  alku.appendChild(alku_nyt);
  loppu.appendChild(loppu_nyt);
  


  const matka = luo_input("matka"+nro,"number");
  div.appendChild(piiri);
  div.appendChild(alku);
  div.appendChild(loppu);
  div.appendChild(matka);

  return div;
}

function leikepoydalle() {
  const piirit = c("piiri");
  const tanaan = new Date()
  let tuloste = `Tuukka P ${tanaan.getDate()}.${tanaan.getMonth()+1}.\n`;
  const kokomatka =0;
  tuloste+=`Koko matka: ${kokomatka} km\n\n`
  // TODO KOKO MATKA JA PVM
  for(let p of piirit) {
    const inputs = p.children;
    const piiri = inputs[0].value;
    const matka = inputs[3].value;

    // https://stackoverflow.com/questions/54658859/difference-between-two-html-time-inputs
    start = inputs[1].value.split(":");
    end = inputs[2].value.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    var diff =  (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
    //------------------------------------
    const aika = diff
    if (isNaN(minutes)) break;
    if (isNaN(hours)) break;
    if (piiri === "") break;
    if (matka === "") break;

    tuloste+=`${piiri}\n${matka} km\n${hours} h ${minutes} min\n`
  }
 
  navigator.clipboard.writeText(tuloste);
}

onload = (e) => {
  var div = i("piirit");
  var piireja = 0;
  //div.appendChild(luo_piiri(1));
  const lisaa_piiri = i("lisaa_piiri");
  lisaa_piiri.addEventListener("click", () => a(luo_piiri(piireja++),div))

  const kopioi = i("kopioi");
  kopioi.addEventListener("click", leikepoydalle);

  while(piireja < 4 ) {
    a(luo_piiri(piireja++),div);
  }
};