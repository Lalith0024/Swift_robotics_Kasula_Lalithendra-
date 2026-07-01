# How EconWatch works

## The pipeline

When the app starts, a background scheduler kicks off every 15 minutes. Here's what happens in each cycle:

```
Zenserp Search API
      |
      v
  Raw Articles
      |
      v
  Deduplication  <-- drops articles already seen (exact hash + 75% token overlap)
      |
      v
  Relevance Filter  <-- keyword match against tracked topics
      |
      v
  Summarizer  <-- extracts title, summary, category, sentiment
      |
      v
  SQLite DB  <-- stored and served via FastAPI
```

The frontend polls the `/api/news/` endpoint every 60 seconds and re-renders automatically.

Economic indicators (GDP, inflation, unemployment) are fetched separately from the World Bank's public API — no key required — and shown at the top of the dashboard.

---

## Database

SQLite with SQLAlchemy. Three main tables:

- **articles** — everything that passes the filter. Stores title, summary, source, url, category, sentiment, published_at, and a dedup hash.
- **topics** — what you're tracking. Soft-deleted (is_active = false) when removed so historical articles aren't orphaned.
- **sources** — where to fetch from (Zenserp, FRED, etc.)
- **competitors** — tracked the same way as topics but shown separately in settings.

Soft-delete is used across the board. Nothing gets hard-deleted from the database.

---

## Deduplication

Two-pass approach:

1. **Exact hash** — SHA-256 of normalized title + source name. Catches identical reposts.
2. **Token overlap** — Jaccard similarity between the word sets of two titles. Anything above 0.75 is treated as a duplicate. This catches slightly reworded versions of the same story.

---

## Summarization

The summarizer doesn't call an LLM by default (to keep the MVP free to run). It uses a simple extraction approach: takes the first 3 sentences of the article content and derives category and sentiment from keyword matching.

If you add an `ANTHROPIC_API_KEY` or `GROQ_API_KEY` to your `.env`, the code will route through Claude or Llama 3 instead and produce proper structured JSON summaries.

---

## Design choices worth explaining

**Why polling and not webhooks?**
Webhooks require a public URL and event subscriptions per source. For a local MVP that needs to demo in an interview, polling is simpler to set up and just as effective at this scale.

**Why SQLite?**
Zero configuration. No separate process to run. The whole database is a single file. For a monitoring tool tracking a few hundred articles a day, SQLite handles it fine. Moving to Postgres later would be a one-line change in the config.

**Why Zenserp?**
It's a general-purpose search API that works across any topic without requiring source-by-source integrations. The tradeoff is that it's slower than direct RSS feeds and has request limits — but for an MVP it's the right call.
