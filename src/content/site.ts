export const siteContent = {
  brand: {
    title: "ChangeReady",
    subtitle: "Sjálfsmat á breytingastíl",
    creditLead: "Hannað og þróað af",
    creditTargetLabel: "einarsson.io",
    creditHref: "https://einarsson.io",
  },
  navigation: {
    home: "Forsíða",
    assessment: "Mat",
    results: "Niðurstaða",
  },
  home: {
    eyebrow: "Premium sjálfsmat",
    title: "Skýr mynd af breytingastíl þínum",
    lead:
      "ChangeReady hjálpar þér að kortleggja hvernig þú tekur á breytingum — með einföldu flæði, skýrri framvindu og niðurstöðum sem eru hannaðar til að vera lesanlegar og nytsamlegar.",
    bullets: [
      "Eina spurning í einu, hraðvirkt og mobile-first",
      "24 atriði, sex víddir og skýr heildarmynd",
      "Niðurstöður sem styðja við næstu skref, ekki markaðssetningu",
    ],
    primaryCta: "Hefja mat",
    secondaryNote:
      "Matið tekur stuttan tíma, birtir eina spurningu í einu og skilar skýrri niðurstöðu á kvarðanum 10–50.",
  },
  assessment: {
    eyebrow: "ChangeReady mat",
    title: "Svaraðu eins heiðarlega og þú getur",
    intro:
      "Veldu svar við hverri spurningu. Þú getur farið til baka, endurstillt matið eða haldið áfram þar sem þú varst — allt er vistað í þessum vafra.",
    progressLabel: "Framvinda",
    answeredLabel: "svarað",
    likertLabels: {
      1: "Mjög ósammála",
      2: "Frekar ósammála",
      3: "Jafnvel",
      4: "Frekar sammála",
      5: "Mjög sammála",
    } as const,
    selectionRequired: "Veldu eitt svar áður en þú ferð áfram.",
    validationIncomplete: "Vinsamlegast svaraðu öllum spurningunum áður en niðurstaða er reiknuð.",
    previousLabel: "Til baka",
    nextLabel: "Áfram",
    finishLabel: "Skoða niðurstöðu",
    resetLabel: "Endurstilla mat",
    instructionsEyebrow: "Leiðbeiningar",
    instructionsIntro: "Stutt yfirlit yfir hvernig matið virkar.",
    instructions: [
      "Ein spurning birtist í einu til að halda athyglinni.",
      "Framvinda sýnir hversu mörg svör eru komin inn.",
      "Tvær spurningar eru andhverft skoraðar (#16 og #22).",
      "Þegar búið er að svara öllum 24 atriðum birtist heildarskor á kvarðanum 10–50.",
    ],
  },
  results: {
    eyebrow: "Niðurstaða",
    title: "Yfirlit yfir breytingastíl",
    incompleteTitle: "Mati er ekki lokið",
    incompleteBody:
      "Til að sjá niðurstöðu á kvarðanum 10–50 þarf að svara öllum 24 spurningum. Þú getur haldið áfram þar sem þú varst.",
    resumeCta: "Halda áfram með mati",
    restartCta: "Byrja aftur",
    totalScoreLabel: "Heildarskor (10–50)",
    rawSumLabel: "Hrásumma (eftir andhverfum)",
    bandLabel: "Niðurstöðuflokkur",
    dimensionLabel: "Víddir",
    dimensionHint:
      "Kúlurit sýnir hlutfall milli lágmarks og hámarks fyrir hverja vídd. Víðdaskor og heildarskor taka tillit til andhverfrar skorunar.",
    footnote:
      "Niðurstaðan er hugsuð sem sjálfsmat og umræðugrunnur, ekki klínísk greining.",
  },
} as const;
