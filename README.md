# Backend

TypeScript backend for generating structured JSON responses from an LLM.

The server exposes a single `POST /ask` endpoint that accepts a user query and returns a typed JSON response with:

- `summary`: a short beginner-friendly summary
- `confidence`: a number from `0` to `1`

## Features

- Express API with JSON request parsing
- CORS enabled
- Structured output validation with Zod
- Multi-provider model selection

## Prerequisites

- Node.js 18+ recommended
- npm

## Install

```bash
npm install
```

## Environment Variables

Create a `.env` file in this folder.

```env
PORT=5000
PROVIDER=openai
OPENAI_API_KEY=your_openai_key
GOOGLE_API_KEY=your_google_api_key
GROQ_API_KEY=your_groq_api_key
```

### Provider selection

Set `PROVIDER` to force a specific provider:

- `openai`
- `gemini`
- `groq`

If `PROVIDER` is not set, the server uses the first available API key in this order:

1. OpenAI
2. Gemini
3. Groq

## Run

Development server:

```bash
npm run dev:server
```

## API

### `POST /ask`

Request body:

```json
{
  "query": "Explain what structured output means"
}
```

Response example:

```json
{
  "summary": "Structured output means the model returns data in a fixed format instead of free-form text.",
  "confidence": 0.97
}
```

### Error responses

- `400` when `query` is missing or empty
- `500` when the model request fails

## Project Structure

```text
src/
  ask_core.ts   - Builds the prompt and requests structured output
  env.ts        - Loads environment variables once
  mc_model.ts   - Chooses the active LLM provider
  schema.ts     - Zod schema and inferred TypeScript types
  server.ts     - Express server and `/ask` route
```

## Notes

- The Gemini provider currently uses `gemini-2.5-flash`.
- The backend returns structured JSON only; it does not return raw model text.
