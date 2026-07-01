# Further Development Roadmap

## Week 1: Core Enhancements
- **Webhooks & Streaming**: Swap polling for webhook/streaming sources where available to reduce latency and save API calls.
- **Authentication**: Add JWT-based user authentication.
- **Multi-Tenant Architecture**: Allow multiple users to have personalized topic and source lists instead of a global state.

## Week 2–3: Advanced Filtering
- **Vector-based Semantic Dedup**: Upgrade from token-overlap similarity to embedding-based deduplication (e.g., using `sentence-transformers` and a vector store like Pinecone or pgvector). This will catch paraphrased duplicate stories effectively.
- **Cost & Latency Monitoring**: Track token usage and API latency for LLM calls to prevent billing surprises and ensure snappy performance.

## Month 2: Pro Features
- **Notifications**: Add Slack/Email digest delivery via SendGrid or Slack Apps.
- **Data Visualization**: Include sentiment trend charts over time per topic using Recharts or Chart.js on the frontend.
- **Competitor Alerts**: Introduce specific alert thresholds when competitors are heavily featured in the news cycle.

## Ongoing Maintenance
- **Source Reliability Scoring**: Down-weight or auto-disable sources that produce high noise-classification rates over time.
- **Caching**: Implement a Redis caching layer for repeated FRED queries and frequent endpoint hits.
