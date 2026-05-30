# Mentorship Frontend (student / buddy)

SPA для ролей **student** и **buddy**. Vite-проект **в корне репозитория** (как `mentorship-frontend-admin`).

**Backend:** [mentorship-backend](../mentorship-backend) — локально `HTTP_PORT=8081`.  
**Общая раскладка:** [MENTORSHIP.md](../MENTORSHIP.md)

---

## Локальный запуск

```bash
npm install
cp .env.example .env    # VITE_API_BASE_URL=/api/v1
npm run dev             # http://localhost:5173
```

Прокси `/api` → `127.0.0.1:8081` (`vite.config.ts`). API:

```bash
cd ../mentorship-backend && make run
```

---

## Docker

Сборка: `Dockerfile` в корне. Полный compose — из **`../mentorship-backend`**.

---

## Стек

React 19, TypeScript, Vite, MUI, TanStack Query, Zustand, FSD.

## Тестовый вход

`student@example.com` / `buddy@example.com`, пароль **`changeme`**.
