export type ResultBand = {
  id: string;
  scoreMin: number;
  scoreMax: number;
  title: string;
  summary: string;
  characteristics: string[];
  strengths: string[];
  watchouts: string[];
};

export const resultBandsIs: ResultBand[] = [
  {
    id: "very-cautious",
    scoreMin: 10,
    scoreMax: 16,
    title: "Mjög varfærin(n) gagnvart breytingum",
    summary:
      "Þú upplifir breytingar oft sem krefjandi og sækir fremur í stöðugleika, fyrirsjáanleika og skýran ramma. Þegar breytingar eru hraðar eða illa útskýrðar getur það valdið óöryggi og auknu álagi.",
    characteristics: [
      "Þú vilt helst vita nákvæmlega hvað er að breytast og hvers vegna.",
      "Þú getur upplifað breytingar sem streituvaldandi eða óþarflega íþyngjandi.",
      "Þú þarft yfirleitt meiri tíma, meiri skýrleika og meira traust til að taka breytingum vel.",
    ],
    strengths: [
      "Næmi fyrir áhættu, óskýrleika og áhrifum breytinga á fólk og vinnu.",
      "Geta til að benda á það sem þarf að vera betur undirbúið.",
    ],
    watchouts: [
      "Að sterk þörf fyrir stöðugleika verði ekki til þess að hafna breytingum of snemma.",
      "Að fá nægar upplýsingar, samtal og stuðning svo breytingar verði viðráðanlegri.",
    ],
  },
  {
    id: "conservative",
    scoreMin: 17,
    scoreMax: 23,
    title: "Íhaldssamur / íhaldssöm",
    summary:
      "Þér líður yfirleitt betur með stöðugleika, skýrleika og fyrirsjáanleika en tíðar breytingar kalla á. Þú þarft oft meiri tíma, upplýsingar og stuðning til að taka breytingum vel.",
    characteristics: [
      "Þú vilt hafa hlutina skýra áður en breytingar fara af stað.",
      "Þú metur stöðugleika og traust verklag.",
      "Þú getur verið tregari til að taka breytingum nema þú sjáir skýran tilgang og góða umgjörð.",
    ],
    strengths: [
      "Raunsæi, varfærni og næmi fyrir því sem getur farið úrskeiðis.",
      "Geta til að minna á mikilvægi undirbúnings, skýrleika og stuðnings.",
    ],
    watchouts: [
      "Að breytingar upplifist ekki sjálfkrafa sem ógn eða rask.",
      "Að gefa nýjum leiðum sanngjarnt tækifæri þegar tilgangur og framkvæmd eru trúverðug.",
    ],
  },
  {
    id: "neutral-cautious",
    scoreMin: 24,
    scoreMax: 30,
    title: "Hlutlaus / varfærin(n)",
    summary:
      "Þú tekur breytingum hvorki sérstaklega vel né illa. Þú vilt yfirleitt sjá tilgang, samhengi og skýra stefnu áður en þú sannfærist. Í breytingaferlum getur þú verið mikilvægur stöðugleikapunktur.",
    characteristics: [
      "Þú metur breytingar með yfirvegun.",
      "Þú tekur þeim ekki gagnrýnislaust, en ert heldur ekki sjálfkrafa á móti þeim.",
      "Þú vilt skilja af hverju breyting er nauðsynleg og hvert hún á að leiða.",
    ],
    strengths: [
      "Róleg og yfirveguð afstaða.",
      "Geta til að draga úr óþarfa flýti og minna á mikilvægi skýrleika.",
    ],
    watchouts: [
      "Að festast ekki of lengi í bið eftir fullkomnum upplýsingum.",
      "Að stíga stundum fyrr inn í breytingar, jafnvel þótt ekki sé allt fullmótað.",
    ],
  },
  {
    id: "positive",
    scoreMin: 31,
    scoreMax: 37,
    title: "Jákvæð(ur) gagnvart breytingum",
    summary:
      "Þú ert almennt opin(n) fyrir breytingum og tekur yfirleitt vel í þær, sérstaklega þegar tilgangur þeirra er skýr og umgjörðin góð. Þú getur verið öflug(ur) þátttakandi í breytingum þegar samhengi og stuðningur eru til staðar.",
    characteristics: [
      "Þú ert fremur jákvæð(ur) gagnvart breytingum.",
      "Þú vilt skilja tilganginn og sjá hvernig breytingin skiptir máli.",
      "Þú vinnur vel með breytingum þegar þær eru vel kynntar og útfærðar.",
    ],
    strengths: [
      "Sveigjanleiki og vilji til að leggja þitt af mörkum.",
      "Góð blanda af opnun og yfirvegun.",
    ],
    watchouts: [
      "Að verða ekki of háð(ur) því að allt sé fullskýrt áður en þú ferð af stað.",
      "Að taka stundum virkari þátt í að móta breytingar, ekki bara fylgja þeim eftir.",
    ],
  },
  {
    id: "change-supporter",
    scoreMin: 38,
    scoreMax: 43,
    title: "Breytingasinni",
    summary:
      "Þú ert almennt jákvæð(ur) gagnvart breytingum og tilbúin(n) að styðja þær þegar þú sérð tilgang og ávinning. Þú tekur yfirleitt vel í nýjar áherslur og ert líkleg(ur) til að leggja þitt af mörkum þegar breytingar eru í gangi.",
    characteristics: [
      "Þér líður vel í breytingum og sérð gjarnan tækifæri í þeim.",
      "Þú ert tilbúin(n) að taka þátt, styðja framgang og vinna með öðrum.",
      "Þú nálgast breytingar af jákvæðni, en getur líka metið hvort þær séu raunhæfar.",
    ],
    strengths: [
      "Góður vilji til umbóta og heilbrigð breytingaorka.",
      "Hæfni til að aðlagast og styðja breytingar í verki.",
    ],
    watchouts: [
      "Að tryggja að breytingar séu ekki bara spennandi heldur líka vel undirbúnar.",
      "Að halda jafnvægi milli hraða og yfirvegunar.",
    ],
  },
  {
    id: "change-advocate",
    scoreMin: 44,
    scoreMax: 50,
    title: "Talsmaður breytinga",
    summary:
      "Þú ert mjög jákvæð(ur) gagnvart breytingum og sérð oft tækifæri þar sem aðrir sjá fyrst óvissu eða hindranir. Þér líður yfirleitt vel í breytingaumhverfi og þú ert líkleg(ur) til að hvetja aðra áfram.",
    characteristics: [
      "Þú tekur gjarnan vel í nýjar hugmyndir og nýjar leiðir.",
      "Þú hugsar frekar í lausnum en vandamálum þegar breytingar eiga sér stað.",
      "Þú getur haft jákvæð og hvetjandi áhrif á aðra í breytingaferlum.",
    ],
    strengths: [
      "Frumkvæði, jákvæðni og trú á framþróun.",
      "Hæfni til að halda orku og hreyfingu í breytingaverkefnum.",
    ],
    watchouts: [
      "Að fara ekki of hratt af stað áður en tilgangur, áhrif og framkvæmd hafa verið nægilega skýrð.",
      "Að gefa öðrum svigrúm sem þurfa meiri tíma, ramma eða öryggi.",
    ],
  },
];

export function pickResultBand(score: number): ResultBand | undefined {
  return resultBandsIs.find(
    (band) => score >= band.scoreMin && score <= band.scoreMax
  );
}
