import type { DemoScenario, OperationsAnalysis } from "@/lib/schemas";

export const sampleAIResult: OperationsAnalysis = {
  company: "Stavební servis Novák s.r.o.",
  summary:
    "Zákazník Petr Dvořák čeká čtvrtý den na cenovou nabídku na opravu opěrné zídky a výměnu dlažby. Nabídka nejde připravit, protože technik Martin neposlal fotky ani rozměry z místa. Kancelář neví, zda má zákazníkovi odpovědět bez kompletních podkladů, a hrozí, že zákazník osloví konkurenci.",
  priority: "high",
  actionItems: [
    {
      owner: "Martin / technik",
      task: "Poslat fotky opěrné zídky, vstupu a všechny naměřené rozměry.",
      dueDate: "dnes do 11:00",
      reason: "Bez fotek a rozměrů nejde spočítat materiál ani rozsah práce."
    },
    {
      owner: "Lucie / kancelář",
      task: "Poslat zákazníkovi omluvu a slíbit konkrétní čas dalšího vyjádření.",
      dueDate: "dnes do 10:00",
      reason: "Zákazník už čeká 4 dny a zvažuje konkurenci."
    },
    {
      owner: "Jednatel",
      task: "Rozhodnout, zda nabídku připravit jako orientační, pokud technik podklady nestihne dodat.",
      dueDate: "dnes do 12:30",
      reason: "Firma potřebuje zákazníkovi ukázat další krok i při chybějících podkladech."
    },
    {
      owner: "Kancelář",
      task: "Po obdržení podkladů připravit cenovou nabídku a poslat ji zákazníkovi.",
      dueDate: "dnes do 16:00",
      reason: "Rychlé dodání nabídky snižuje riziko ztráty zakázky."
    }
  ],
  blockers: [
    {
      issue: "Chybí fotky a rozměry od technika.",
      risk: "Nabídka může být nepřesná nebo ji nepůjde připravit včas.",
      suggestedFix: "Zavolat technikovi a nastavit pevný termín dodání podkladů ještě dopoledne."
    },
    {
      issue: "Kancelář nemá instrukci, zda zákazníkovi odpovědět bez nabídky.",
      risk: "Zákazník může mít pocit, že firma nereaguje, a vybere konkurenci.",
      suggestedFix: "Poslat krátkou omluvu, vysvětlit chybějící podklady a dát konkrétní čas dalšího updatu."
    }
  ],
  customerReply: {
    subject: "Cenová nabídka na opravu zídky a dlažby",
    body:
      "Dobrý den, pane Dvořáku,\n\nomlouváme se, že cenová nabídka ještě neodešla. Podklady z návštěvy technika dnes dopoledne urgentně doplňujeme, abychom nabídku neposlali nepřesně.\n\nNejpozději dnes do 15:00 Vám pošleme buď hotovou cenovou nabídku, nebo jasné potvrzení, co ještě chybí a kdy ji dokončíme.\n\nDěkujeme za trpělivost.\n\nStavební servis Novák s.r.o."
  },
  recommendedNextStep:
    "Ihned poslat zákazníkovi omluvu s konkrétním časem dalšího vyjádření a paralelně získat chybějící podklady od technika.",
  automationSuggestions: [
    {
      name: "Hlídání opožděných nabídek",
      trigger: "Poptávka nemá odeslanou nabídku do 48 hodin od návštěvy technika.",
      action: "Vytvořit urgentní úkol pro technika a upozornění pro kancelář.",
      businessValue: "Firma neztrácí zakázky kvůli tichu v komunikaci."
    },
    {
      name: "Kontrola povinných podkladů",
      trigger: "Technik označí návštěvu jako hotovou.",
      action: "Zkontrolovat, zda jsou vyplněné fotky, rozměry a stručný popis rozsahu.",
      businessValue: "Kancelář může rychleji připravit přesnou nabídku."
    },
    {
      name: "Automatická omluva při zpoždění",
      trigger: "Zákazník čeká déle než slíbený termín.",
      action: "Připravit krátký e-mail s omluvou, stavem věci a časem dalšího updatu.",
      businessValue: "Zákazník ví, že se zakázka řeší, i když nabídka ještě není hotová."
    }
  ]
};

export function createFallbackAIResult(scenario: DemoScenario): OperationsAnalysis {
  const primaryInput = scenario.inputs[0];
  const internalOwner =
    scenario.inputs
      .find((item) => item.source.toLowerCase().includes("poznámka"))
      ?.from.split("/")[0]
      .trim() || "Odpovědná osoba";

  return {
    company: scenario.companyName,
    summary: `${scenario.shortDescription} Vstupy ukazují, že firma potřebuje rychle potvrdit stav, určit odpovědnou osobu a poslat zákazníkovi jasný termín dalšího kroku.`,
    priority: "high",
    actionItems: [
      {
        owner: internalOwner,
        task: "Ověřit aktuální stav případu a doplnit chybějící podklady.",
        dueDate: "dnes do 11:00",
        reason: "Bez jasného stavu nelze dát zákazníkovi důvěryhodnou odpověď."
      },
      {
        owner: "Zákaznická komunikace",
        task: "Poslat zákazníkovi krátké potvrzení s konkrétním časem dalšího vyjádření.",
        dueDate: "dnes do 12:00",
        reason: "Zákazník už čeká a potřebuje vidět, že se případ aktivně řeší."
      },
      {
        owner: "Vedoucí provozu",
        task: "Rozhodnout, kdo je odpovědný za další krok a případnou kompenzaci.",
        dueDate: "dnes do 13:00",
        reason: "Nejasná odpovědnost prodlužuje reakční dobu a zvyšuje riziko eskalace."
      }
    ],
    blockers: [
      {
        issue: "Chybí potvrzený stav a odpovědná osoba.",
        risk: "Případ může zůstat bez reakce nebo se bude přesouvat mezi lidmi.",
        suggestedFix: "Přiřadit vlastníka případu a nastavit pevný čas další kontroly."
      },
      {
        issue: "Zákazník nemá konkrétní termín dalšího kroku.",
        risk: "Roste nespokojenost a pravděpodobnost eskalace.",
        suggestedFix: "Poslat stručnou odpověď se stavem, omluvou a přesným termínem updatu."
      }
    ],
    customerReply: {
      subject: `Vyřešení požadavku: ${primaryInput.subject}`,
      body: `Dobrý den,\n\nomlouváme se, že váš požadavek zatím není uzavřený. Právě ověřujeme aktuální stav a doplňujeme chybějící informace, abychom Vám neposlali neúplnou odpověď.\n\nNejpozději dnes do 15:00 Vám pošleme konkrétní další krok a termín vyřešení.\n\nDěkujeme za trpělivost.\n\n${scenario.companyName}`
    },
    recommendedNextStep:
      "Nejdřív určit vlastníka případu, ověřit chybějící informace a ještě dnes zákazníkovi poslat konkrétní termín dalšího kroku.",
    automationSuggestions: [
      {
        name: "Hlídání čekajících požadavků",
        trigger: "Požadavek nemá odpověď nebo vlastníka déle než nastavený limit.",
        action: "Vytvořit interní upozornění a návrh odpovědi zákazníkovi.",
        businessValue: "Firma snižuje počet přehlédnutých požadavků a pozdních reakcí."
      },
      {
        name: "Kontrola chybějících podkladů",
        trigger: "Případ je otevřený, ale chybí informace nutné pro uzavření.",
        action: "Připravit seznam chybějících bodů a přiřadit odpovědné osobě.",
        businessValue: "Tým rychleji ví, co přesně brání dokončení práce."
      },
      {
        name: "Návrh zákaznické odpovědi",
        trigger: "Zákazník se ptá na stav nebo eskaluje čekající požadavek.",
        action: "Připravit krátkou odpověď s omluvou, stavem a termínem dalšího updatu.",
        businessValue: "Komunikace je rychlá, konzistentní a schvalovaná člověkem."
      }
    ]
  };
}

export function createCustomFallbackAIResult(): OperationsAnalysis {
  return {
    company: "Vlastní firemní vstup",
    summary:
      "Vložený firemní kontext vyžaduje rychlé roztřídění situace, určení odpovědnosti a přípravu dalšího kroku. AI výstup je v demo režimu nahrazen bezpečným vzorovým výsledkem.",
    priority: "medium",
    actionItems: [
      {
        owner: "Odpovědná osoba",
        task: "Ověřit hlavní požadavek, aktuální stav a chybějící informace.",
        dueDate: "dnes",
        reason: "Bez ověření kontextu nelze bezpečně rozhodnout další krok."
      },
      {
        owner: "Zákaznická komunikace",
        task: "Připravit stručnou odpověď s potvrzením přijetí a termínem dalšího vyjádření.",
        dueDate: "dnes",
        reason: "Rychlá reakce snižuje riziko eskalace a nejasností."
      },
      {
        owner: "Vedoucí procesu",
        task: "Přiřadit vlastníka případu a nastavit kontrolu dokončení.",
        dueDate: "dnes nebo zítra",
        reason: "Případ nesmí zůstat bez odpovědnosti."
      }
    ],
    blockers: [
      {
        issue: "Není potvrzený vlastník a další krok.",
        risk: "Požadavek se může zdržet nebo rozpadnout mezi více lidí.",
        suggestedFix: "Přiřadit odpovědnou osobu a určit nejbližší konkrétní termín."
      },
      {
        issue: "Část informací může být neúplná nebo neověřená.",
        risk: "Odpověď zákazníkovi může být nepřesná.",
        suggestedFix: "Nejdřív ověřit chybějící fakta a v odpovědi jasně oddělit potvrzené informace."
      }
    ],
    customerReply: {
      subject: "Potvrzení přijetí požadavku",
      body:
        "Dobrý den,\n\npotvrzujeme přijetí Vašeho požadavku. Aktuálně ověřujeme dostupné informace a doplňujeme chybějící podklady, abychom Vám mohli dát přesnou odpověď.\n\nNejpozději dnes Vám pošleme další postup nebo konkrétní termín vyřešení.\n\nDěkujeme za trpělivost."
    },
    recommendedNextStep:
      "Určit vlastníka případu, ověřit chybějící informace a připravit krátkou odpověď s konkrétním termínem dalšího kroku.",
    automationSuggestions: [
      {
        name: "Třídění vlastních vstupů",
        trigger: "Uživatel vloží nový e-mail, poznámku nebo směs firemního kontextu.",
        action: "Vytvořit shrnutí, blokery, úkoly a návrh odpovědi ke schválení.",
        businessValue: "Tým rychleji přechází od neuspořádaného textu k rozhodnutí."
      },
      {
        name: "Hlídání chybějících informací",
        trigger: "AI ve vstupu rozpozná neúplné podklady nebo nejasnou odpovědnost.",
        action: "Navrhnout otázky a interní úkoly pro doplnění.",
        businessValue: "Snižuje se riziko pozdních nebo nepřesných odpovědí."
      }
    ]
  };
}
