# Firemní AI asistent pro provoz a administrativu

Praktické demo pro malé a střední české firmy. Aplikace ukazuje, jak může AI převést neuspořádané provozní vstupy na praktické shrnutí, úkoly, blokery, návrh odpovědi zákazníkovi a návrhy jednoduché automatizace.

## Co to je

Interní dashboard pro modelovou firmu Stavební servis Novák s.r.o. Není to chatbot. Cílem je ukázat jednoduchý, nasaditelný nástroj pro administrativu a provoz, kde AI připravuje výstupy a člověk je schvaluje.

## Průběh dema

1. Uživatel vidí firemní vstupy: e-mail zákazníka, interní poznámku, seznam úkolů a poptávku.
2. Klikne na `Zpracovat nové vstupy`.
3. AI vytvoří shrnutí situace, prioritu, blokery, akční kroky, návrh e-mailu a návrhy automatizace.
4. Pokud není dostupný OpenAI klíč nebo API selže, demo použije vzorový výstup a zobrazí české upozornění.

## Obchodní problém

Menší firmy často ztrácí zakázky kvůli opožděným odpovědím, chybějícím podkladům a nejasným odpovědnostem. Demo ukazuje, jak z těchto vstupů rychle vytvořit rozhodnutelný pracovní přehled.

## Co AI vytvoří

- krátké shrnutí situace
- prioritu podle obchodního rizika
- konkrétní úkoly s vlastníkem a termínem
- blokery a návrh řešení
- návrh odpovědi zákazníkovi
- návrhy bezpečných automatizací

## Technický základ

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Vercel AI SDK
- OpenAI provider
- Zod validace strukturovaného výstupu
- lucide-react ikony

## Lokální spuštění

```bash
npm install
cp .env.example .env.local
npm run dev
```

Volitelně doplňte `OPENAI_API_KEY` do `.env.local`. Bez klíče aplikace běží ve spolehlivém demo režimu se vzorovým výstupem.

## Nasazení na Vercel

1. Nahrajte projekt do GitHub repozitáře.
2. Ve Vercelu vytvořte nový projekt z repozitáře.
3. Nastavte framework preset `Next.js`.
4. Volitelně přidejte environment variable `OPENAI_API_KEY`.
5. Deploy.

Cloud varianta může běžet jako hostovaný dashboard na Vercelu. Citlivější části lze řešit hybridně: dashboard v cloudu, zpracování dokumentů a firemní znalostní báze lokálně.

## Jak by probíhal reálný pilot

1. Výběr jednoho procesu
2. Ukázková data a pravidla
3. AI asistent pouze pro návrhy
4. Schvalování člověkem
5. Integrace a automatizace
6. Nasazení do cloudu nebo lokálně

Možnosti nasazení:

- Cloud: Vercel / hostovaný dashboard
- Lokálně: Mac mini jako lokální worker pro dokumenty a firemní znalostní bázi
- Hybridně: dashboard v cloudu, citlivé zpracování lokálně

## Budoucí integrace

- Gmail / Outlook
- Slack / Teams
- Google Drive
- CRM
- fakturační systém
- interní znalostní báze

## Spolehlivost dema

Demo musí fungovat i bez `OPENAI_API_KEY`. `/api/process` proto při chybě nebo chybějícím klíči vrací validní vzorový výstup `sampleAIResult` s příznakem demo režimu. Reálná AI odpověď se používá pouze tehdy, když projde strukturou `operationsAnalysisSchema`.
