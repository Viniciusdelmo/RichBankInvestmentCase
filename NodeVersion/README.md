# 💰 RichBank Investment API (Node.js)

REST API for managing investment portfolios, assets, and buy/sell transactions. Built with Express, TypeScript, Prisma, and PostgreSQL.

---

## What it solves

- **Portfolios**: Create and list investment portfolios.
- **Assets**: Register tradable assets (stocks, ETFs, etc.) by ticker, with optional company name and sector.
- **Transactions**: Record BUY/SELL operations linked to a portfolio and an asset (quantity, price, date).
- **Position**: Get the aggregated position of a portfolio (holdings derived from transactions).

Useful for portfolio tracking, simple backtesting, or as a backend for an investment dashboard.

---

## Tech stack

| Layer        | Technology              |
|-------------|-------------------------|
| Runtime     | Node.js                 |
| Language    | TypeScript              |
| Framework   | Express 5               |
| ORM / DB    | Prisma + PostgreSQL     |
| Validation  | Zod                     |
| IDs         | UUID (via `uuid`)       |
| Env / config| dotenv                  |

---

## Prerequisites

- **Node.js** (LTS recommended, e.g. 20+)
- **PostgreSQL** (e.g. 16), or use Docker (see below)
- **npm** or **yarn**

---

## How to run

### 1. Clone and install

```bash
cd NodeVersion
npm install
```

### 2. Database

**Option A — Docker (recommended for local dev)**

```bash
docker compose up -d
```

This starts PostgreSQL 16 with:

- User: `dev`
- Password: `dev`
- Database: `richbank-node`
- Port: `5432`

**Option B — Existing PostgreSQL**

Create a database and set `DATABASE_URL` in `.env` (see step 3).

### 3. Environment

Copy the example env and set your database URL:

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL="postgresql://dev:dev@localhost:5432/richbank-node"
PORT=4000
```

- `DATABASE_URL`: PostgreSQL connection string (required).
- `PORT`: Server port (default: `4000`).

### 4. Prisma

Generate the client and run migrations:

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 5. Start the server

**Development (watch mode):**

```bash
npm run dev
```

**Production build and run:**

```bash
npm run build
npm start
```

Server runs at `http://localhost:4000` (or the port you set). Check health:

```bash
curl http://localhost:4000/health
# {"ok":true}
```

---

## API routes

Base URL: `http://localhost:4000` (or your `PORT`).

### Health

| Method | Path     | Description        |
|--------|----------|--------------------|
| `GET`  | `/health`| Service health check |

---

### Portfolios

| Method | Path                  | Description                    |
|--------|-----------------------|--------------------------------|
| `POST` | `/portfolios`         | Create a portfolio             |
| `GET`  | `/portfolios`         | List all portfolios            |
| `GET`  | `/portfolios/:id/position` | Get portfolio position (holdings) |

**Create portfolio — `POST /portfolios`**

Request body:

```json
{
  "name": "My Portfolio"
}
```

- `name` (string, required): Portfolio name.

---

### Assets

| Method | Path       | Description        |
|--------|------------|--------------------|
| `POST` | `/assets`  | Create an asset    |
| `GET`  | `/assets`  | List all assets    |

**Create asset — `POST /assets`**

Request body:

```json
{
  "ticker": "AAPL",
  "companyName": "Apple Inc.",
  "sector": "Technology"
}
```

- `ticker` (string, required): Unique symbol (e.g. AAPL, PETR4).
- `companyName` (string, optional): Company or fund name.
- `sector` (string, optional): Sector or category.

---

### Transactions

| Method | Path            | Description                    |
|--------|-----------------|--------------------------------|
| `POST` | `/transactions` | Create a BUY/SELL transaction  |
| `GET`  | `/transactions` | List transactions (paginated, optional filter by type) |

**Create transaction — `POST /transactions`**

Request body:

```json
{
  "portfolioId": "uuid-of-portfolio",
  "assetId": "uuid-of-asset",
  "type": "BUY",
  "quantity": 10,
  "price": 150.50,
  "date": "2025-03-11T12:00:00.000Z"
}
```

- `portfolioId` (UUID, required): Portfolio ID.
- `assetId` (UUID, required): Asset ID.
- `type` (required): `"BUY"` or `"SELL"`.
- `quantity` (number, required): Positive number of shares/units.
- `price` (number, required): Price per unit.
- `date` (ISO string, optional): Transaction date; defaults to now if omitted.

**List transactions — `GET /transactions`**

Query parameters:

- `page` (default: `1`): Page number.
- `limit` (default: `20`): Items per page.
- `type`: Filter by `BUY` or `SELL`.

Example: `GET /transactions?page=1&limit=10&type=BUY`

---

## Project structure (high level)

```
NodeVersion/
├── prisma/
│   ├── schema.prisma      # Data models (Portfolio, Asset, Transaction)
│   └── migrations/        # SQL migrations
├── src/
│   ├── app.ts             # Express app, routes, middlewares
│   ├── server.ts          # HTTP server entry
│   ├── database/
│   │   └── prismaClient.ts
│   ├── middlewares/
│   │   └── error.middleware.ts
│   └── modules/
│       ├── portfolio/     # controller, service, repository, schema
│       ├── asset/
│       └── transaction/
├── docker-compose.yml     # PostgreSQL for local dev
├── .env.example
└── package.json
```

---

## Scripts

| Script             | Command                    | Description                    |
|--------------------|----------------------------|--------------------------------|
| `npm run dev`      | `ts-node-dev`              | Run with hot reload            |
| `npm run build`    | `tsc`                      | Compile TypeScript to `dist/`  |
| `npm start`        | `node dist/server.js`      | Run production build           |
| `npm run prisma:generate` | `prisma generate`   | Generate Prisma client         |
| `npm run prisma:migrate`  | `prisma migrate dev` | Apply migrations (dev)         |

---

## License

ISC
