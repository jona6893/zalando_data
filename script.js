const data = "zalando-data.json";
let zalandoData;
let filter = "alle";

let visAlle = document.querySelectorAll(".visAlle");
let sorterPris = document.querySelectorAll(".lowToHigh");

document.addEventListener("DOMContentLoaded", () => {
  hentdata(data);
  
  sorterPris.forEach((knap) => {
    knap.addEventListener("click", filterPris);
  });

  visAlle.forEach((knap) => {
    knap.addEventListener("click", filterbrand);
  });
});

async function hentdata(data) {
  const resultat = await fetch(data);
  zalandoData = await resultat.json();
  vis();
  console.log(zalandoData);
}

function filterbrand() {
  console.log(this);
  filter = this.dataset.brand;
  document.querySelector("nav h3").textContent = this.textContent;
  console.log(filter);
  vis();
}

function filterPris() {
  console.log(this);
  filter = this.dataset.pris;
  document.querySelector("nav h3").textContent = "Mærke";
  console.log(filter);
  vis();
}

async function vis() {
  const container = document.querySelector("#container");
  const template = document.querySelector("template");

  container.innerHTML = "";

  if (filter == "low2high") {
    zalandoData.sort(function (a, b) {
      if (parseInt(a.price) > parseInt(b.price)) return 1;
      if (parseInt(a.price) < parseInt(b.price)) return -1;
      return 0;
    });
    console.log(zalandoData);
    zalandoData.forEach((produkt) => {
      let clone = template.cloneNode(true).content;
      clone.querySelector(".billede").src = produkt.image;
      clone.querySelector(".brand").textContent = produkt.brand;
      clone.querySelector(".name").textContent = produkt.name;
      clone.querySelector(".pris").textContent = produkt.price;
      container.appendChild(clone);
    });
  } else if (filter == "high2low") {
    zalandoData.sort(function (a, b) {
      if (parseInt(a.price) < parseInt(b.price)) return 1;
      if (parseInt(a.price) > parseInt(b.price)) return -1;
      return 0;
    });
    console.log(zalandoData);
    zalandoData.forEach((produkt) => {
      let clone = template.cloneNode(true).content;
      clone.querySelector(".billede").src = produkt.image;
      clone.querySelector(".brand").textContent = produkt.brand;
      clone.querySelector(".name").textContent = produkt.name;
      clone.querySelector(".pris").textContent = produkt.price;
      container.appendChild(clone);
    });
  } else {
    resultat = await fetch(data);
    zalandoData = await resultat.json();
    zalandoData.forEach((produkt) => {
      if (filter == produkt.brand || filter == "alle") {
        let clone = template.cloneNode(true).content;
        clone.querySelector(".billede").src = produkt.image;
        clone.querySelector(".brand").textContent = produkt.brand;
        clone.querySelector(".name").textContent = produkt.name;
        clone.querySelector(".pris").textContent = produkt.price;
        container.appendChild(clone);
      }
    });
  }
  /* let price = zalandoData.map((e) => e.pris).sort();
  //price.sort(); 
  console.log(price + " pris"); */

  // selects all the object properties with "brand".
  let brands = zalandoData.map((e) => e.brand);
  // Since there are more the one of the same brand, the "new set" makes an objekt where the is only one of each.
  let uniquebrands = new Set(brands);
  // converts the "set object" into a new array.
  const brandList = Array.from(uniquebrands);

  console.log(uniquebrands, brands);

  function buttonText() {
    brandList.forEach((brand, i) => {
      let bnt = document.createElement("button");
      bnt.setAttribute("data-brand", `${brandList[i]}`);
      bnt.setAttribute("class", `brandsort`);
      document.querySelector("nav div").appendChild(bnt);
      bnt.textContent = brand;
    });
  }


  buttonText();



let mærker = document.querySelectorAll(".brandsort");

  mærker.forEach((knap) => {
    knap.addEventListener("click", filterbrand);
  });
  /* function buttonText() {
    // Assigns a brand to each button using to index(i) of each button with the corrolation of the brandList index.
    mærker.forEach((button, i) => {
      button.textContent = brandList[i];
      // sets a new attribute in the DOM with the value of brandList[i]
      button.setAttribute("data-brand", `${brandList[i]}`);
    });
  } */
}
