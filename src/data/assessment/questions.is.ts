import type { AssessmentQuestion, DimensionKey } from "@/types/assessment";

function createQuestion(
  order: number,
  prompt: string,
  dimensionKey: DimensionKey,
  reverseScored = false
): AssessmentQuestion {
  return {
    id: `cr-q${String(order).padStart(2, "0")}`,
    order,
    prompt,
    dimensionKey,
    reverseScored,
    required: true,
  };
}

export const assessmentQuestionsIs: AssessmentQuestion[] = [
  createQuestion(1, "Mér líður vel þegar hlutir breytast í vinnunni.", "d1"),
  createQuestion(2, "Ég næ fljótt tökum á nýju verklagi þegar því er komið á.", "d2"),
  createQuestion(
    3,
    "Ég kem gjarnan með tillögur að breytingum sem geta bætt vinnuna.",
    "d3"
  ),
  createQuestion(
    4,
    "Ég get unnið vel áfram þótt ekki sé allt fullmótað frá upphafi.",
    "d4"
  ),
  createQuestion(
    5,
    "Ég á auðvelt með að vinna með öðrum þegar breytingar hafa áhrif á teymið.",
    "d5"
  ),
  createQuestion(
    6,
    "Ég held fókus á verkefnum þótt breytingar séu í gangi í kringum mig.",
    "d6"
  ),
  createQuestion(7, "Ég sé breytingar sem tækifæri frekar en ógn.", "d1"),
  createQuestion(
    8,
    "Ég á auðvelt með að breyta vinnubrögðum mínum þegar aðstæður kalla á það.",
    "d2"
  ),
  createQuestion(
    9,
    "Ég tek gjarnan frumkvæði þegar ég sé tækifæri til umbóta.",
    "d3"
  ),
  createQuestion(
    10,
    "Mér líður ágætlega þótt ekki sé alveg ljóst í byrjun hvernig breyting mun þróast.",
    "d4"
  ),
  createQuestion(
    11,
    "Ég reyni að styðja aðra þegar breytingar valda óvissu eða álagi.",
    "d5"
  ),
  createQuestion(
    12,
    "Ég get fylgt breytingum eftir þannig að þær skili raunverulegum árangri.",
    "d6"
  ),
  createQuestion(
    13,
    "Ég hef jákvætt viðhorf til þess að hlutir séu ekki alltaf eins og áður.",
    "d1"
  ),
  createQuestion(
    14,
    "Ég sakna sjaldan gamla kerfisins eða aðferðanna þegar eitthvað nýtt kemur.",
    "d2"
  ),
  createQuestion(
    15,
    "Ég vil frekar taka þátt í að móta breytingar en bíða eftir að aðrir geri það.",
    "d3"
  ),
  createQuestion(
    16,
    "Ég er stundum of fljót(ur) að styðja breytingar áður en tilgangur þeirra hefur verið nægilega skýrður.",
    "d4",
    true
  ),
  createQuestion(
    17,
    "Ég legg mitt af mörkum til að skapa sameiginlegan skilning þegar breytingar eru í gangi.",
    "d5"
  ),
  createQuestion(
    18,
    "Ég legg áherslu á að breytingar fari ekki bara í umræður heldur nái líka í framkvæmd.",
    "d6"
  ),
  createQuestion(
    19,
    "Ekkert núverandi verklag eða hefðir eru mér sérstaklega heilög – allt má endurskoða.",
    "d1"
  ),
  createQuestion(20, "Ég aðlagast fljótt nýjum aðstæðum eða ferlum.", "d2"),
  createQuestion(
    21,
    "Ég hvet til breytinga ef ég sé að eitthvað má bæta og býðst til að aðstoða eða leiða þær.",
    "d3"
  ),
  createQuestion(
    22,
    "Mér finnst stundum best að hrinda breytingum í framkvæmd strax, jafnvel þótt ekki hafi gefist tími til að meta áhrif þeirra til fulls.",
    "d4",
    true
  ),
  createQuestion(
    23,
    "Ég á auðvelt með að ræða breytingar opinskátt og uppbyggilega við samstarfsfólk.",
    "d5"
  ),
  createQuestion(
    24,
    "Þegar breytingar eiga sér stað, leita ég lausna frekar en að einblína á vandamál.",
    "d6"
  ),
];
