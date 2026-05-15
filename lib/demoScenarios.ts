import type { DemoScenario, InboxItem } from "@/lib/schemas";

export const defaultScenarioId = "stavebni-firma";

export const demoScenarios: DemoScenario[] = [
  {
    id: defaultScenarioId,
    companyName: "Stavební servis Novák s.r.o.",
    industry: "Stavební firma",
    title: "Opožděná cenová nabídka",
    shortDescription: "Zákazník čeká čtvrtý den na nabídku, protože technik neposlal fotky a rozměry.",
    inputs: [
      {
        id: "stav-email",
        source: "E-mail zákazníka",
        from: "Petr Dvořák / RD Černý Most",
        subject: "Už 4 dny čekám na cenovou nabídku",
        receivedAt: "dnes 08:17",
        tone: "urgentní",
        body:
          "Dobrý den, minulý čtvrtek u nás byl váš technik kvůli opravě opěrné zídky a výměně dlažby. Slíbil nabídku nejpozději v pondělí. Zatím nic nepřišlo a potřebuji se rozhodnout tento týden."
      },
      {
        id: "stav-note",
        source: "Interní poznámka",
        from: "Lucie Nováková / kancelář",
        subject: "Ranní porada - nabídka Dvořák",
        receivedAt: "dnes 09:05",
        tone: "věcný",
        body:
          "Pan Dvořák volal kvůli nabídce. Technik Martin zatím neposlal fotky ani rozměry. Bez toho neumíme spočítat materiál ani práci."
      },
      {
        id: "stav-tasks",
        source: "Seznam úkolů",
        from: "Stavební servis Novák s.r.o.",
        subject: "Otevřené úkoly - zakázka Dvořák",
        receivedAt: "dnes 09:20",
        tone: "věcný",
        body:
          "1. Martin: doplnit fotky a rozměry. 2. Kancelář: připravit nabídku. 3. Jednatel: rozhodnout, co zákazníkovi slíbit dnes."
      },
      {
        id: "stav-request",
        source: "Poptávka",
        from: "Petr Dvořák / podklady",
        subject: "Oprava zídky a dlažby u domu",
        receivedAt: "před 4 dny 14:32",
        tone: "klidný",
        body:
          "Prosím o nacenění opravy popraskané opěrné zídky u garáže a výměny části venkovní dlažby u vstupu. Rozsah měl změřit technik na místě."
      }
    ]
  },
  {
    id: "ucetni-firma",
    companyName: "Účetní kancelář ProTax s.r.o.",
    industry: "Účetní firma",
    title: "Chybějící doklady před DPH",
    shortDescription: "Klient neposlal podklady k DPH a termín odevzdání je zítra.",
    inputs: [
      {
        id: "uct-email",
        source: "E-mail klienta",
        from: "Jana Havelková / Kavárna U Lípy",
        subject: "Doklady za čtvrtletí pošlu asi až večer",
        receivedAt: "dnes 07:54",
        tone: "klidný",
        body:
          "Dobrý den, účtenky a výpisy za poslední měsíc ještě nemám pohromadě. Zkusím je poslat dnes večer. Snad to na DPH ještě stihneme."
      },
      {
        id: "uct-note",
        source: "Interní poznámka",
        from: "Petra / účetní",
        subject: "DPH - Kavárna U Lípy",
        receivedAt: "dnes 08:30",
        tone: "urgentní",
        body:
          "Termín pro přiznání DPH je zítra. Chybí bankovní výpis, přijaté faktury a tržby za poslední týden. Bez toho nelze výpočet uzavřít."
      },
      {
        id: "uct-tasks",
        source: "Seznam úkolů",
        from: "Účetní kancelář ProTax s.r.o.",
        subject: "Doklady chybějící k DPH",
        receivedAt: "dnes 08:42",
        tone: "věcný",
        body:
          "1. Vyžádat bankovní výpis. 2. Zkontrolovat přijaté faktury. 3. Připravit upozornění na riziko pozdního podání. 4. Zavolat klientce po obědě."
      },
      {
        id: "uct-request",
        source: "Daňový požadavek",
        from: "Kavárna U Lípy",
        subject: "DPH za aktuální období",
        receivedAt: "před 6 dny 10:10",
        tone: "věcný",
        body:
          "Prosíme o zpracování přiznání k DPH za aktuální období. Podklady jsou částečně v e-mailu a část bude doplněna přes sdílenou složku."
      }
    ]
  },
  {
    id: "logisticka-firma",
    companyName: "Morava Logistics s.r.o.",
    industry: "Logistická firma",
    title: "Zpožděná zásilka bez jasné odpovědnosti",
    shortDescription: "Zásilka má zpoždění, dispečink a dopravce si předávají odpovědnost.",
    inputs: [
      {
        id: "log-email",
        source: "E-mail zákazníka",
        from: "Tomáš Krejčí / AgroPlus",
        subject: "Kde je naše zásilka?",
        receivedAt: "dnes 06:48",
        tone: "urgentní",
        body:
          "Dobrý den, palety měly dorazit včera do 16:00. Sklad na ně čeká a nemáme žádnou informaci, kde se auto nachází. Potřebuji přesný čas doručení."
      },
      {
        id: "log-note",
        source: "Interní poznámka",
        from: "Radek / dispečink",
        subject: "Zakázka AGP-2418",
        receivedAt: "dnes 07:15",
        tone: "věcný",
        body:
          "Dopravce tvrdí, že auto čekalo na nakládce o dvě hodiny déle. Sklad říká, že bylo připraveno. V systému není potvrzený čas odjezdu."
      },
      {
        id: "log-tasks",
        source: "Seznam úkolů",
        from: "Morava Logistics s.r.o.",
        subject: "Řešení zpoždění AGP-2418",
        receivedAt: "dnes 07:26",
        tone: "urgentní",
        body:
          "1. Ověřit GPS auta. 2. Získat potvrzení o nakládce. 3. Dát zákazníkovi nový čas doručení. 4. Rozhodnout, kdo komunikuje kompenzaci."
      },
      {
        id: "log-request",
        source: "Objednávka přepravy",
        from: "AgroPlus",
        subject: "Přeprava 8 palet Brno - Olomouc",
        receivedAt: "včera 09:00",
        tone: "věcný",
        body:
          "Přeprava 8 palet náhradních dílů z Brna do Olomouce. Dodání požadováno včera do 16:00. Kontakt skladu je pan Šimek."
      }
    ]
  },
  {
    id: "servisni-firma",
    companyName: "ServisTech Praha s.r.o.",
    industry: "Servisní firma",
    title: "Stížnost čeká příliš dlouho",
    shortDescription: "Zákazník čeká na vyřešení reklamace a servis nemá uzavřený další krok.",
    inputs: [
      {
        id: "serv-email",
        source: "E-mail zákazníka",
        from: "Lenka Malá / Fitness Studio Balance",
        subject: "Reklamace běžeckého pásu stále bez řešení",
        receivedAt: "dnes 09:10",
        tone: "urgentní",
        body:
          "Dobrý den, reklamaci pásu řešíme už druhý týden. Technik přijel, ale od té doby nemám žádnou zprávu. Stroj denně chybí klientům a potřebuji termín opravy."
      },
      {
        id: "serv-note",
        source: "Interní poznámka",
        from: "Marek / servis",
        subject: "Reklamace Balance",
        receivedAt: "dnes 09:35",
        tone: "věcný",
        body:
          "Technik zjistil vadnou řídicí jednotku. Díl není skladem a čekáme na potvrzení dodavatele. Zákazníkovi nikdo neposlal průběžnou informaci."
      },
      {
        id: "serv-tasks",
        source: "Seznam úkolů",
        from: "ServisTech Praha s.r.o.",
        subject: "Reklamace - otevřené body",
        receivedAt: "dnes 09:48",
        tone: "věcný",
        body:
          "1. Ověřit termín dodání dílu. 2. Poslat zákazníkovi stav reklamace. 3. Nabídnout náhradní řešení. 4. Nastavit připomínku dalšího kontaktu."
      },
      {
        id: "serv-request",
        source: "Servisní požadavek",
        from: "Fitness Studio Balance",
        subject: "Běžecký pás nefunguje",
        receivedAt: "před 12 dny 11:20",
        tone: "věcný",
        body:
          "Běžecký pás se po zapnutí zastavuje a hlásí chybu motoru. Požadujeme záruční opravu nebo výměnu vadného dílu."
      }
    ]
  },
  {
    id: "eshop",
    companyName: "UrbanHome.cz",
    industry: "E-shop",
    title: "Chybějící faktura a opožděná refundace",
    shortDescription: "Zákazník žádá fakturu a vrácení peněz, ale objednávka je rozpadlá mezi podporou a účetnictvím.",
    inputs: [
      {
        id: "eshop-email",
        source: "E-mail zákazníka",
        from: "Michaela Svobodová",
        subject: "Nemám fakturu ani vrácené peníze",
        receivedAt: "dnes 10:12",
        tone: "urgentní",
        body:
          "Dobrý den, před týdnem jsem vrátila lampu z objednávky UH-88421. Faktura mi nikdy nepřišla a refundace také ne. Prosím o vyřešení dnes."
      },
      {
        id: "eshop-note",
        source: "Interní poznámka",
        from: "Tereza / zákaznická podpora",
        subject: "Objednávka UH-88421",
        receivedAt: "dnes 10:30",
        tone: "věcný",
        body:
          "Vrácené zboží je ve skladu označené jako přijaté. Dobropis není vystavený a účetnictví nemá informaci, že se má refundace spustit."
      },
      {
        id: "eshop-tasks",
        source: "Seznam úkolů",
        from: "UrbanHome.cz",
        subject: "Refundace UH-88421",
        receivedAt: "dnes 10:38",
        tone: "urgentní",
        body:
          "1. Vystavit fakturu a dobropis. 2. Potvrdit stav vráceného zboží. 3. Spustit refundaci. 4. Poslat zákaznici potvrzení."
      },
      {
        id: "eshop-request",
        source: "Objednávka",
        from: "UrbanHome.cz",
        subject: "Objednávka UH-88421 - stolní lampa Oslo",
        receivedAt: "před 9 dny 16:04",
        tone: "věcný",
        body:
          "Objednávka obsahovala stolní lampu Oslo za 2 490 Kč. Zákaznice uplatnila vrácení ve 14denní lhůtě a zboží bylo doručeno zpět do skladu."
      }
    ]
  }
];

export function combineScenarioInputs(inputs: InboxItem[]) {
  return inputs
    .map(
      (item) =>
        `[${item.source}] ${item.from} - ${item.subject}\nPřijato: ${item.receivedAt}\n${item.body}`
    )
    .join("\n\n---\n\n");
}

export function getDemoScenario(scenarioId?: string) {
  return (
    demoScenarios.find((scenario) => scenario.id === scenarioId) ??
    demoScenarios.find((scenario) => scenario.id === defaultScenarioId) ??
    demoScenarios[0]
  );
}
