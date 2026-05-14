import type { InboxItem } from "@/lib/schemas";

export const demoInboxItems: InboxItem[] = [
  {
    id: "msg-001",
    source: "E-mail zákazníka",
    from: "Petr Dvořák / RD Černý Most",
    subject: "Už 4 dny čekám na cenovou nabídku",
    receivedAt: "dnes 08:17",
    tone: "urgentní",
    body:
      "Dobrý den, minulý čtvrtek u nás byl váš technik kvůli opravě opěrné zídky a výměně dlažby u vstupu. Slíbil, že pošlete cenovou nabídku nejpozději v pondělí. Zatím nic nepřišlo. Potřebuji se rozhodnout tento týden, jinak oslovím jinou firmu."
  },
  {
    id: "msg-002",
    source: "Interní poznámka",
    from: "Lucie Nováková / kancelář",
    subject: "Ranní porada - nabídka pro pana Dvořáka",
    receivedAt: "dnes 09:05",
    tone: "věcný",
    body:
      "Pan Dvořák volal kvůli nabídce. Technik Martin zatím neposlal fotky ani rozměry z místa. Bez toho neumíme spočítat materiál ani práci. Lucie neví, jestli má zákazníkovi odepsat hned, nebo čekat na podklady."
  },
  {
    id: "msg-003",
    source: "Seznam úkolů",
    from: "Stavební servis Novák s.r.o.",
    subject: "Otevřené úkoly - zakázka Dvořák",
    receivedAt: "dnes 09:20",
    tone: "věcný",
    body:
      "1. Martin: poslat fotky opěrné zídky a vstupu. 2. Martin: doplnit rozměry dlažby a délku zídky. 3. Kancelář: připravit nabídku po dodání podkladů. 4. Jednatel: rozhodnout, zda zákazníkovi poslat omluvu a termín dodání nabídky."
  },
  {
    id: "msg-004",
    source: "Poptávka k nacenění",
    from: "Petr Dvořák / podklady k nabídce",
    subject: "Oprava zídky a dlažby u rodinného domu",
    receivedAt: "před 4 dny 14:32",
    tone: "klidný",
    body:
      "Prosím o nacenění opravy popraskané opěrné zídky u garáže a výměny části venkovní dlažby u vstupních dveří. Rozsah měl změřit technik na místě. Ideálně bych chtěl práci objednat do konce měsíce."
  }
];

export const combinedDemoInput = demoInboxItems
  .map(
    (item) =>
      `[${item.source}] ${item.from} - ${item.subject}\nPřijato: ${item.receivedAt}\n${item.body}`
  )
  .join("\n\n---\n\n");
