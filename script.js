// =====================================================
// 🎄 JULEGAVEIDÉ-GENERATOR
// =====================================================

// ===== 1. DATA =====

// Et objekt som kobler en kort nøkkel til en fin visningstekst.
const mottakere = {
  alle: "🌍 Hvem som helst",
  foreldre: "👨‍👩‍👧 Mamma / pappa",
  besteforeldre: "👵 Besteforeldre",
  sosken: "🧑‍🤝‍🧑 Søsken",
  venn: "🤝 Venn",
  kjaereste: "💕 Kjæreste",
  barn: "🧒 Barn",
  kollega: "💼 Kollega / lærer"
};

const kategorier = {
  alle: "🎁 Alle typer",
  hjemmelaget: "🛠️ Hjemmelaget",
  opplevelse: "🎟️ Opplevelse",
  mat: "🍫 Mat og drikke",
  ting: "📦 Ting"
};

// En array med objekter – hvert objekt er én gaveidé.
// "passerFor" er en array med mottakere gaven passer til.
const gaver = [
  { navn: "Hjemmelaget kakemiks på glass", emoji: "🍪", pris: 80, kategori: "hjemmelaget", passerFor: ["foreldre", "besteforeldre", "venn", "kollega"] },
  { navn: "Fotobok med felles minner", emoji: "📸", pris: 350, kategori: "hjemmelaget", passerFor: ["foreldre", "besteforeldre", "kjaereste", "sosken"] },
  { navn: "Kinobilletter med popcorn", emoji: "🎬", pris: 300, kategori: "opplevelse", passerFor: ["venn", "sosken", "kjaereste"] },
  { navn: "Gavekort på «en dag med meg»", emoji: "🎟️", pris: 0, kategori: "opplevelse", passerFor: ["foreldre", "besteforeldre", "sosken", "kjaereste", "barn"] },
  { navn: "Escape room for to", emoji: "🔐", pris: 700, kategori: "opplevelse", passerFor: ["venn", "kjaereste", "sosken"] },
  { navn: "Lokal honning og god te", emoji: "🍯", pris: 200, kategori: "mat", passerFor: ["besteforeldre", "kollega", "foreldre"] },
  { navn: "Hjemmelaget krydderblanding", emoji: "🌶️", pris: 60, kategori: "hjemmelaget", passerFor: ["foreldre", "venn", "kollega"] },
  { navn: "Et morsomt brettspill", emoji: "🎲", pris: 400, kategori: "ting", passerFor: ["foreldre", "sosken", "venn", "barn", "kjaereste"] },
  { navn: "Strikket lue eller skjerf", emoji: "🧶", pris: 150, kategori: "hjemmelaget", passerFor: ["foreldre", "besteforeldre", "sosken", "venn", "kjaereste", "barn"] },
  { navn: "Sjokoladeeske med favorittene", emoji: "🍫", pris: 120, kategori: "mat", passerFor: ["barn", "sosken", "venn", "kollega"] },
  { navn: "Plante i fin potte", emoji: "🪴", pris: 250, kategori: "ting", passerFor: ["foreldre", "kollega", "venn"] },
  { navn: "Bok av en favorittforfatter", emoji: "📚", pris: 300, kategori: "ting", passerFor: ["foreldre", "besteforeldre", "sosken", "venn", "kjaereste", "kollega"] },
  { navn: "Keramikk- eller matkurs", emoji: "🏺", pris: 1200, kategori: "opplevelse", passerFor: ["kjaereste", "foreldre", "venn"] },
  { navn: "Trådløse ørepropper", emoji: "🎧", pris: 1500, kategori: "ting", passerFor: ["sosken", "kjaereste", "barn"] },
  { navn: "Personlig spilleliste og et brev", emoji: "💌", pris: 0, kategori: "hjemmelaget", passerFor: ["kjaereste", "venn"] },
  { navn: "Lego-sett", emoji: "🧱", pris: 600, kategori: "ting", passerFor: ["barn", "sosken"] },
  { navn: "Konsertbilletter", emoji: "🎤", pris: 900, kategori: "opplevelse", passerFor: ["venn", "kjaereste", "sosken"] },
  { navn: "Kopp med eget design", emoji: "☕", pris: 180, kategori: "hjemmelaget", passerFor: ["foreldre", "besteforeldre", "kollega"] },
  { navn: "Pizzakveld-pakke med oppskrift", emoji: "🍕", pris: 150, kategori: "mat", passerFor: ["venn", "sosken", "foreldre"] },
  { navn: "Varme ullsokker", emoji: "🧦", pris: 200, kategori: "ting", passerFor: ["besteforeldre", "foreldre", "kollega"] }
];

// Her lagres gavene brukeren liker. Starter tom.
let favoritter = [];


// ===== 2. HENTE ELEMENTER FRA SIDEN =====
const mottakerValg = document.getElementById("mottaker");
const kategoriValg = document.getElementById("kategori");
const budsjettSlider = document.getElementById("budsjett");
const budsjettVerdi = document.getElementById("budsjettVerdi");
const tilfeldigKnapp = document.getElementById("tilfeldigKnapp");
const alleKnapp = document.getElementById("alleKnapp");
const resultat = document.getElementById("resultat");
const favorittListe = document.getElementById("favorittListe");
const antallFavoritter = document.getElementById("antallFavoritter");
const totalPris = document.getElementById("totalPris");
const visSkjulKnapp = document.getElementById("visSkjulKnapp");
const favorittInnhold = document.getElementById("favorittInnhold");


// ===== 3. FUNKSJONER =====

// Fyller en <select> med valg fra et objekt (f.eks. mottakere eller kategorier)
function fyllNedtrekksliste(selectElement, objekt) {
  for (const nokkel in objekt) {
    const option = document.createElement("option");
    option.value = nokkel;
    option.textContent = objekt[nokkel];
    selectElement.appendChild(option);
  }
}

// Går gjennom alle gavene og returnerer bare de som passer med valgene
function hentPassendeGaver() {
  const valgtMottaker = mottakerValg.value;
  const valgtKategori = kategoriValg.value;
  const maksPris = Number(budsjettSlider.value);

  const passende = [];

  for (let i = 0; i < gaver.length; i++) {
    const gave = gaver[i];

    // Sjekk hver betingelse for seg
    const riktigMottaker = valgtMottaker === "alle" || gave.passerFor.includes(valgtMottaker);
    const riktigKategori = valgtKategori === "alle" || gave.kategori === valgtKategori;
    const innenforBudsjett = gave.pris <= maksPris;

    if (riktigMottaker && riktigKategori && innenforBudsjett) {
      passende.push(gave);
    }
  }

  return passende;
}

// Gir tilbake et navn på prisnivået, som også brukes som CSS-klasse
function prisNiva(pris) {
  if (pris === 0) {
    return "gratis";
  } else if (pris < 200) {
    return "billig";
  } else if (pris < 600) {
    return "middels";
  } else {
    return "dyr";
  }
}

// Lager et HTML-kort for én gave og returnerer elementet
function lagGaveKort(gave) {
  const kort = document.createElement("div");
  kort.className = "gavekort";

  const emoji = document.createElement("span");
  emoji.className = "emoji";
  emoji.textContent = gave.emoji;

  const info = document.createElement("div");
  info.className = "info";

  const tittel = document.createElement("h3");
  tittel.textContent = gave.navn;

  const detaljer = document.createElement("p");
  const niva = prisNiva(gave.pris);
  const prisTekst = gave.pris === 0 ? "Gratis!" : "ca. " + gave.pris + " kr";
  detaljer.textContent = kategorier[gave.kategori] + " · " + prisTekst + " ";

  const etikett = document.createElement("span");
  etikett.className = "etikett " + niva;
  etikett.textContent = niva;
  detaljer.appendChild(etikett);

  const lagreKnapp = document.createElement("button");
  lagreKnapp.textContent = "❤️";
  lagreKnapp.title = "Lagre som favoritt";
  lagreKnapp.addEventListener("click", function () {
    leggTilFavoritt(gave);
  });

  // Sett sammen kortet
  info.appendChild(tittel);
  info.appendChild(detaljer);
  kort.appendChild(emoji);
  kort.appendChild(info);
  kort.appendChild(lagreKnapp);

  return kort;
}

// Viser en melding i resultatområdet (f.eks. når ingenting passer)
function visMelding(tekst) {
  resultat.innerHTML = "";
  const p = document.createElement("p");
  p.className = "melding";
  p.textContent = tekst;
  resultat.appendChild(p);
}

// Velger én tilfeldig gave blant de som passer
function visTilfeldigGave() {
  const passende = hentPassendeGaver();

  if (passende.length === 0) {
    visMelding("😕 Ingen ideer passer. Prøv å øke budsjettet eller velg en annen kategori!");
    return;
  }

  const tilfeldigIndeks = Math.floor(Math.random() * passende.length);
  const gave = passende[tilfeldigIndeks];

  resultat.innerHTML = "";
  resultat.appendChild(lagGaveKort(gave));
}

// Viser alle gavene som passer
function visAlleGaver() {
  const passende = hentPassendeGaver();

  if (passende.length === 0) {
    visMelding("😕 Ingen ideer passer. Prøv å øke budsjettet eller velg en annen kategori!");
    return;
  }

  resultat.innerHTML = "";

  const overskrift = document.createElement("p");
  overskrift.className = "melding";
  overskrift.textContent = "🎉 Fant " + passende.length + " ideer:";
  resultat.appendChild(overskrift);

  for (let i = 0; i < passende.length; i++) {
    resultat.appendChild(lagGaveKort(passende[i]));
  }
}

// Legger en gave til i favorittlisten (hvis den ikke er der fra før)
function leggTilFavoritt(gave) {
  if (favoritter.includes(gave)) {
    alert(gave.navn + " er allerede i favorittene dine!");
    return;
  }

  favoritter.push(gave);
  tegnFavoritter();
}

// Fjerner en favoritt basert på plassen den har i arrayen
function fjernFavoritt(indeks) {
  favoritter.splice(indeks, 1);
  tegnFavoritter();
}

// Tegner hele favorittlisten på nytt ut fra arrayen
function tegnFavoritter() {
  favorittListe.innerHTML = "";
  let sum = 0;

  for (let i = 0; i < favoritter.length; i++) {
    const gave = favoritter[i];
    sum = sum + gave.pris;

    const li = document.createElement("li");
    li.textContent = gave.emoji + " " + gave.navn + " (" + gave.pris + " kr)";

    const fjernKnapp = document.createElement("button");
    fjernKnapp.textContent = "✖";
    fjernKnapp.title = "Fjern";
    fjernKnapp.addEventListener("click", function () {
      fjernFavoritt(i);
    });

    li.appendChild(fjernKnapp);
    favorittListe.appendChild(li);
  }

  antallFavoritter.textContent = favoritter.length;

  if (favoritter.length === 0) {
    totalPris.textContent = "Trykk ❤️ på en idé for å lagre den her.";
  } else {
    totalPris.textContent = "💰 Totalt: ca. " + sum + " kr";
  }
}

// Viser eller skjuler favorittlisten
function visSkjulFavoritter() {
  favorittInnhold.classList.toggle("skjult");

  if (favorittInnhold.classList.contains("skjult")) {
    visSkjulKnapp.textContent = "Vis";
  } else {
    visSkjulKnapp.textContent = "Skjul";
  }
}

// Lager snøfnugg som faller over skjermen
function lagSnofnugg(antall) {
  for (let i = 0; i < antall; i++) {
    const fnugg = document.createElement("span");
    fnugg.className = "snofnugg";
    fnugg.textContent = "❄";

    // Tilfeldig plassering, størrelse og fart
    fnugg.style.left = Math.random() * 100 + "vw";
    fnugg.style.fontSize = 0.6 + Math.random() * 1.2 + "rem";
    fnugg.style.animationDuration = 6 + Math.random() * 10 + "s";
    fnugg.style.animationDelay = -Math.random() * 15 + "s";

    document.body.appendChild(fnugg);
  }
}


// ===== 4. HENDELSER (EVENT LISTENERS) =====

// Oppdater teksten når slideren flyttes
budsjettSlider.addEventListener("input", function () {
  budsjettVerdi.textContent = budsjettSlider.value;
});

tilfeldigKnapp.addEventListener("click", visTilfeldigGave);
alleKnapp.addEventListener("click", visAlleGaver);
visSkjulKnapp.addEventListener("click", visSkjulFavoritter);


// ===== 5. START =====
fyllNedtrekksliste(mottakerValg, mottakere);
fyllNedtrekksliste(kategoriValg, kategorier);
tegnFavoritter();
lagSnofnugg(30);