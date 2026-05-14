# AGENTS.md

Pokyny pro budoucí coding agenty v tomto projektu.

- Držte aplikaci jako demo-focused proof-of-work, ne jako produkční interní systém.
- Nepřidávejte databázi, pokud o ni uživatel výslovně nepožádá.
- Nepřidávejte autentizaci, pokud o ni uživatel výslovně nepožádá.
- V tomto MVP nepřidávejte reálné Gmail, Slack, Teams ani CRM integrace.
- UI udržujte česky, business-facing a jednoduché.
- Nedělejte z aplikace chatbot; výstup má být strukturovaný operations dashboard.
- AI výstupy musí být strukturované a validované přes Zod schema.
- Demo musí fungovat bez `OPENAI_API_KEY` pomocí záložního výstupu `sampleAIResult`.
- `/api/process` musí vždy vracet validní JSON.
- Před dokončením spusťte `npm run lint` a `npm run build` a opravte chyby.
