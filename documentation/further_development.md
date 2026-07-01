# What I'd build next

This document captures the honest gaps in the current implementation and what I'd address given more time — roughly in priority order.

---

## Things that matter most

**Vector-based deduplication**

The current dedup uses token overlap (Jaccard similarity). It works, but it misses paraphrased articles that cover the same story with different wording. The fix is to embed article titles using something like `sentence-transformers` and compare cosine similarity instead. This would significantly reduce noise in a real production feed.

**Proper LLM summarization**

Right now the summarizer falls back to a simple sentence-extraction approach because there's no LLM key configured. In production this should always route through an LLM (Claude or Llama 3) to get properly structured summaries with accurate category and sentiment tags. The infrastructure is already in place — it just needs a key and some prompt tuning.

**Source reliability scoring**

Right now all sources are treated equally. Over time you'd want to track how often each source produces articles that actually pass the relevance filter versus noise. Sources with consistently low signal-to-noise ratios could be automatically flagged or down-weighted.

---

## Things that would make it more useful

**Sentiment trend charts**

The data is already there (every article has a sentiment field). A simple time-series chart per topic showing how sentiment has shifted over the past 30 days would make the dashboard much more useful than a flat list.

**Email or Slack digests**

The current setup requires you to actively check the dashboard. A daily digest — top 5 articles per topic, sent via email or Slack — would be a lot more practical for most users.

**Multi-country support**

Right now topics are free-form text. Adding a proper country/region selector with pre-built topic sets (e.g. "India: inflation, RBI policy, exports") would make it usable for people who don't know what to search for.

---

## Infrastructure changes for production

**Swap SQLite for Postgres**

SQLite is fine locally. For anything with more than one user or a higher article volume, Postgres makes more sense. The SQLAlchemy setup means this is a one-line config change.

**Add Redis for caching**

World Bank responses and frequently-hit news queries could be cached to reduce latency and avoid hitting rate limits.

**Authentication**

The current API has no auth. In production, all routes would need JWT-based authentication, and settings would be per-user rather than global.

**RSS feeds as a source**

Zenserp works but has request limits. Pulling directly from RSS feeds for major publications (Reuters, Bloomberg, FT) would be faster and more reliable for a subset of high-value sources.
