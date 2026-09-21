# docker/

No MVP, o Docker é usado apenas para **desenvolvimento local** — hoje, o PostgreSQL,
definido em `docker-compose.yml` na raiz.

As apps (`web` e `api`) rodam no host com `pnpm dev` para um ciclo de desenvolvimento mais rápido.
Dockerfiles das apps serão adicionados aqui quando criarmos **staging/produção**
(ver `docs/DECISIONS.md`, ADR-0009).

## Uso

```bash
cp .env.example .env
docker compose up -d      # sobe o Postgres
docker compose ps         # status
docker compose down       # para (mantém os dados no volume)
docker compose down -v    # para e APAGA os dados do volume
```
