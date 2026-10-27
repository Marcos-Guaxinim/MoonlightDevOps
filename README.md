# MoonlightDevOps

Repositório de infraestrutura e DevOps da aplicação **Moonlight**, organizada em containers Docker com proxy reverso, HTTPS local, testes end-to-end automatizados e validações no fluxo de versionamento.

---

## Sumário

- [Visão geral](#visão-geral)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Arquitetura da aplicação](#arquitetura-da-aplicação)
- [Orquestração com Docker Compose](#orquestração-com-docker-compose)
  - [Serviço database](#serviço-database)
  - [Serviço backend](#serviço-backend)
  - [Serviço frontend](#serviço-frontend)
  - [Serviço nginx](#serviço-nginx)
- [Redes Docker](#redes-docker)
- [Persistência de dados](#persistência-de-dados)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Nginx como proxy reverso](#nginx-como-proxy-reverso)
- [Isolamento e exposição de serviços](#isolamento-e-exposição-de-serviços)
- [Qualidade no fluxo de versionamento com Husky](#qualidade-no-fluxo-de-versionamento-com-husky)
- [Testes end-to-end](#testes-end-to-end)
- [Pipeline CI com GitHub Actions](#pipeline-ci-com-github-actions)
- [Como subir o projeto localmente](#como-subir-o-projeto-localmente)
- [Comandos úteis](#comandos-úteis)
- [Decisões de arquitetura](#decisões-de-arquitetura)

---

## Visão geral

Este projeto organiza a aplicação **Moonlight** em uma arquitetura baseada em containers com **Docker Compose**, separando responsabilidades entre frontend, backend, banco de dados e proxy reverso.

O objetivo é disponibilizar um ambiente de desenvolvimento padronizado, com:

- persistência de dados
- HTTPS local com host customizado
- isolamento de serviços por rede Docker
- automação de testes end-to-end
- validações no fluxo de versionamento (commits e push)

---

## Estrutura do projeto

```text
MoonlightDevOps/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── .husky/
│   ├── commit-msg
│   ├── pre-commit
│   └── pre-push
├── database_arquives/
│   └── moonlight.sql
├── Moonlight_Backend/
├── Moonlight_Frontend_React/
├── nginx/
│   ├── certs/
│   │   ├── moonlight.local.pem
│   │   └── moonlight.local-key.pem
│   └── nginx.conf
├── tests/
│   └── e2e/
│       ├── admin/
│       ├── auth/
│       └── helpers/
├── .env
├── .example.env
├── docker-compose.yml
├── docker-compose.override.yml
├── package.json
└── DevopsDocumentation.md
```

---

## Arquitetura da aplicação

O projeto é composto por quatro containers com responsabilidades bem definidas:

| Serviço    | Responsabilidade                                              |
|------------|---------------------------------------------------------------|
| `database` | Persistência dos dados da aplicação (MySQL 8)                 |
| `backend`  | Lógica de negócio e acesso ao banco                           |
| `frontend` | Interface React servida ao usuário                            |
| `nginx`    | Proxy reverso — único ponto de entrada externo da aplicação   |

### Fluxo de comunicação

```
Usuário
  └─▶ https://moonlight.local
        └─▶ Nginx
              ├─▶ /        → frontend
              └─▶ /api/    → backend
                              └─▶ database (rede interna)
```

Essa separação reproduz localmente uma estrutura próxima de produção: o acesso externo passa por um único ponto de entrada e os serviços internos permanecem isolados.

---

## Orquestração com Docker Compose

O arquivo `docker-compose.yml` centraliza toda a definição da infraestrutura:

- serviços e suas imagens ou builds
- variáveis de ambiente
- redes e volumes
- dependências entre containers

---

### Serviço database

Utiliza a imagem oficial do MySQL 8 e é responsável pela persistência dos dados.

**Responsabilidades:**
- armazenar os dados do sistema
- disponibilizar o banco para o backend via hostname `database`
- manter os dados persistidos mesmo após reinicialização dos containers
- executar a carga inicial do banco automaticamente na primeira inicialização

**Configuração:**
- imagem: `mysql:8`
- política de reinício: `always`
- volume nomeado para persistência (`db-data`)
- participação na rede `db_network`

**Variáveis de ambiente:**

| Variável              | Descrição                    |
|-----------------------|------------------------------|
| `MYSQL_ROOT_PASSWORD` | Senha do usuário root        |
| `MYSQL_DATABASE`      | Nome do banco criado         |
| `MYSQL_USER`          | Usuário da aplicação         |
| `MYSQL_PASSWORD`      | Senha do usuário da aplicação|

Todas preenchidas via `.env`, sem hardcode no Compose.

Para forçar uma nova carga inicial:

```bash
docker compose down -v
docker compose up -d --build
```

---

### Serviço backend

Responsável por buildar e executar a API a partir da pasta `Moonlight_Backend`.

**Responsabilidades:**
- expor a API da aplicação
- aplicar regras de negócio
- conectar-se ao banco MySQL via hostname `database`
- intermediar a comunicação entre frontend e banco

**Configuração:**
- build local com Dockerfile próprio
- container nomeado como `backend_service`
- política de reinício: `unless-stopped`
- participação nas redes `proxy_network` e `db_network`

**Variáveis de ambiente:**

| Variável                   | Descrição                        |
|----------------------------|----------------------------------|
| `DB_HOST`                  | Hostname do banco (`database`)   |
| `DB_USER`                  | Usuário do banco                 |
| `DB_DATABASE_NAME`         | Nome do banco                    |
| `DB_PASSWORD`              | Senha do banco                   |
| `JWT_SECRET`               | Chave para geração de tokens     |
| `MERCADOPAGO_ACCESS_TOKEN` | Token de integração Mercado Pago |
| `NGROK_URL`                | URL do túnel Ngrok               |

**Exposição da porta:**

```yaml
expose:
  - "3000"
```

A porta 3000 fica acessível apenas para outros containers na mesma rede Docker. O acesso externo ao backend ocorre exclusivamente via Nginx.

---

### Serviço frontend

Responsável por buildar e servir a interface React da pasta `Moonlight_Frontend_React`.

**Responsabilidades:**
- renderizar a interface da aplicação
- consumir a API do backend
- disponibilizar a aplicação web ao usuário final

**Configuração:**
- build local com Dockerfile próprio
- container nomeado como `frontend_service`
- política de reinício: `unless-stopped`
- participação na rede `proxy_network`

**Build arguments:**

| Argumento          | Descrição                                     |
|--------------------|-----------------------------------------------|
| `VITE_API_URL`     | URL da API consumida pelo frontend            |
| `VITE_USE_MOCK`    | Habilita ou desabilita dados mockados         |
| `VITE_MP_PUBLIC_KEY` | Chave pública do Mercado Pago              |

Esses valores são injetados no momento do build e controlam a comunicação com a API e as integrações do cliente.

---

### Serviço nginx

Atua como proxy reverso e é o **único ponto de entrada exposto diretamente ao host**.

**Responsabilidades:**
- expor a aplicação nas portas 80 e 443
- redirecionar HTTP para HTTPS
- encaminhar requisições ao frontend e ao backend
- aplicar cabeçalhos de segurança HTTP
- servir certificado local para HTTPS em desenvolvimento

**Configuração:**
- imagem: `nginx:1.31.1-alpine3.23`
- container nomeado como `nginx_service`
- portas publicadas: `80:80` e `443:443`
- participação na rede `proxy_network`

**Volumes montados:**

| Volume local                        | Destino no container                    | Modo |
|-------------------------------------|-----------------------------------------|------|
| `./nginx/nginx.conf`                | `/etc/nginx/conf.d/default.conf`        | `ro` |
| `./nginx/certs`                     | `/etc/nginx/certs`                      | `ro` |

---

## Redes Docker

O projeto utiliza duas redes bridge distintas para separar responsabilidades.

### proxy_network

Rede da camada de aplicação. Conecta os serviços que precisam atender requisições externas:

- `nginx`
- `frontend`
- `backend`

### db_network

Rede de acesso ao banco. Restringe o MySQL ao backend:

- `backend`
- `database`

### Benefício da separação

| Serviço    | Acessa frontend | Acessa backend | Acessa banco |
|------------|:---------------:|:--------------:|:------------:|
| `nginx`    | ✅              | ✅             | ❌           |
| `frontend` | —               | ✅ (via nginx) | ❌           |
| `backend`  | ❌              | —              | ✅           |
| `database` | ❌              | ❌             | —            |

Essa separação reduz acoplamento, melhora a organização da infraestrutura e restringe o acesso ao banco apenas ao serviço que realmente precisa dele.

---

## Persistência de dados

A persistência do banco é feita com o volume nomeado `db-data`, montado no serviço `database`:

```yaml
volumes:
  db-data:/var/lib/mysql
```

Sem o volume, os dados seriam perdidos sempre que o container fosse destruído. Com ele, a persistência fica desacoplada do ciclo de vida do container.

---

## Variáveis de ambiente

As configurações sensíveis e parâmetros de execução são externalizados via arquivo `.env`.

```env
DB_ROOT_PASSWORD=
DB_DATABASE_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
JWT_SECRET=
MERCADOPAGO_ACCESS_TOKEN=
NGROK_URL=
VITE_API_URL=
VITE_USE_MOCK=
VITE_MP_PUBLIC_KEY=
```

O repositório mantém um `.example.env` como modelo para criação do `.env` local.

**Motivos para usar `.env`:**
- evitar hardcode de credenciais no repositório
- facilitar configuração entre diferentes ambientes
- centralizar parâmetros de execução
- permitir reutilização do Compose com valores distintos

---

## Nginx como proxy reverso

### Redirecionamento HTTP → HTTPS

```nginx
server {
    listen 80;
    server_name moonlight.local;
    return 301 https://$host$request_uri;
}
```

Garante que todo acesso seja feito via HTTPS, mesmo quando o usuário tenta acessar por HTTP.

### HTTPS com host customizado

O projeto utiliza o host `moonlight.local` com certificados gerados pelo `mkcert`:

```nginx
listen 443 ssl;
server_name moonlight.local;

ssl_certificate     /etc/nginx/certs/moonlight.local.pem;
ssl_certificate_key /etc/nginx/certs/moonlight.local-key.pem;
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers HIGH:!aNULL:!MD5;
```

### Roteamento

**Frontend** — requisições para `/`:

```nginx
location / {
    proxy_pass http://frontend:80;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

**Backend** — requisições iniciadas com `/api/`:

```nginx
location /api/ {
    proxy_pass http://backend:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
}
```

### Cabeçalhos de segurança

| Cabeçalho                   | Valor configurado                        | Finalidade                                               |
|-----------------------------|------------------------------------------|----------------------------------------------------------|
| `X-Frame-Options`           | `SAMEORIGIN`                             | Previne clickjacking via iframe                          |
| `X-Content-Type-Options`    | `nosniff`                                | Impede inferência indevida de tipo de conteúdo           |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`        | Controla envio do header `Referer` entre origens         |
| `Content-Security-Policy`   | `default-src 'self'; ...`               | Restringe origens de scripts, estilos, fontes e imagens  |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains`    | Força HTTPS em acessos futuros                           |
| `X-XSS-Protection`          | `1; mode=block`                          | Proteção adicional em navegadores mais antigos           |

---

## Isolamento e exposição de serviços

### Exposição no Compose principal

| Serviço    | Publicação de porta        |
|------------|----------------------------|
| `nginx`    | `80:80`, `443:443` ✅      |
| `backend`  | `expose: 3000` (interno)   |
| `frontend` | nenhuma                    |
| `database` | nenhuma                    |

O único serviço com `ports` publicado para o host é o `nginx`. Os demais permanecem acessíveis apenas dentro da rede Docker.

### Acesso local ao banco via docker-compose.override.yml

Durante o desenvolvimento, pode ser útil acessar o banco por ferramentas como DBeaver ou MySQL Workbench. Para isso, o projeto utiliza um `docker-compose.override.yml` como configuração **opcional e local**:

```yaml
# docker-compose.override.yml
services:
  database:
    ports:
      - "3306:3306"
```

O Docker Compose carrega esse arquivo automaticamente quando está presente na mesma pasta, sem necessidade de flags adicionais. Para evitar que seja enviado ao repositório, o arquivo deve estar no `.gitignore`.

Também é possível mapear para outra porta no host:

```yaml
services:
  database:
    ports:
      - "3307:3306"  # host:container
```

Dessa forma, o `docker-compose.yml` principal permanece seguro e próximo de uma configuração de produção, enquanto a exposição do banco fica restrita ao ambiente de desenvolvimento local.

---

## Qualidade no fluxo de versionamento com Husky

O projeto utiliza **Husky** para automatizar validações antes de aceitar commits e pushes.

### Hook commit-msg

Valida se a mensagem de commit segue o padrão definido:

```
tipo(escopo opcional): descrição
```

**Tipos permitidos:** `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `hotfix`

**Exemplos válidos:**

```
feat: adiciona teste de login
fix(auth): corrige validação de senha
docs: atualiza README com instruções de setup
```

### Hook pre-push

Executa os testes end-to-end antes de permitir o envio ao repositório remoto.

```bash
echo "🧪 Rodando testes e2e..."

if [ -z "$(docker compose ps --status=running -q nginx 2>/dev/null)" ]; then
    echo "⚠️  Docker Compose não está rodando."
    echo "   Suba os containers com: docker compose up -d --build"
    exit 1
fi

npm run test:e2e
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo "❌ Testes e2e falharam! Push bloqueado." >&2
  exit 1
fi

echo "✅ Testes passaram!"
```

O push é bloqueado se os containers não estiverem rodando ou se algum teste falhar.

---

## Testes end-to-end

Os testes estão organizados em `tests/e2e` e cobrem fluxos críticos da aplicação:

```
tests/e2e/
├── auth/
│   ├── login.spec.ts
│   └── register.spec.ts
└── admin/
    ├── categories.spec.ts
    └── games.spec.ts
```

**Cobertura:**
- login com sucesso e com credenciais inválidas
- cadastro de usuário com sucesso e com dados inválidos
- operações de CRUD administrativas (cadastrar, editar, listar, excluir)
- integração completa entre frontend, backend e banco de dados

Os testes validam a aplicação em funcionamento completo, não funções isoladas.

---

## Pipeline CI com GitHub Actions

### Gatilhos

```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  workflow_dispatch:
```

### Etapas do pipeline

| Etapa                           | Descrição                                                         |
|---------------------------------|-------------------------------------------------------------------|
| Checkout                        | Clona o repositório                                               |
| Setup Node.js                   | Configura a versão LTS do Node                                    |
| Instalar dependências           | Executa `npm ci`                                                  |
| Instalar Playwright             | Instala o navegador Chromium                                      |
| Criar `.env`                    | Gera o arquivo a partir dos secrets do GitHub                     |
| Gerar certificados              | Instala `mkcert` e gera os certificados para `moonlight.local`    |
| Configurar `/etc/hosts`         | Adiciona entrada `127.0.0.1 moonlight.local`                      |
| Subir Docker Compose            | Executa `docker compose up -d --build`                            |
| Aguardar aplicação              | Faz polling em `https://moonlight.local` até a app responder      |
| Rodar testes Playwright         | Executa `npx playwright test`                                     |
| Upload do relatório             | Salva o `playwright-report/` como artifact por 30 dias            |

### Banco de dados no CI

O banco é inicializado automaticamente pelo mecanismo nativo da imagem MySQL via `/docker-entrypoint-initdb.d`. Por isso, **o pipeline não precisa executar import manual** do `moonlight.sql` — o próprio container cuida disso ao subir.

Os testes E2E acessam o banco de forma indireta, pelo fluxo completo da aplicação:

```
Playwright → Nginx → Backend → Database
```

O banco não precisa de porta exposta no CI.

---

## Como subir o projeto localmente

### 1. Criar o arquivo `.env`

Copie o `.example.env` e preencha com os valores do seu ambiente:

```bash
cp .example.env .env
```

### 2. Configurar o host local

Adicione a entrada no arquivo de hosts do sistema:

```
127.0.0.1 moonlight.local
```

- **Linux/macOS:** `/etc/hosts`
- **Windows:** `C:\Windows\System32\drivers\etc\hosts`

### 3. Gerar os certificados locais

Caso ainda não existam em `nginx/certs/`, gere-os com `mkcert`:

```bash
mkcert -install
mkcert -cert-file nginx/certs/moonlight.local.pem \
       -key-file  nginx/certs/moonlight.local-key.pem \
       moonlight.local
```

### 4. Subir os containers

```bash
docker compose up -d --build
```

Esse comando:
- builda frontend e backend
- sobe todos os containers (database, backend, frontend, nginx)
- cria redes e volumes necessários
- executa a carga inicial do banco, se o volume ainda estiver vazio

### 5. Acessar a aplicação

```
https://moonlight.local
```

---

## Comandos úteis

```bash
# Subir o ambiente
docker compose up -d --build

# Derrubar o ambiente
docker compose down

# Derrubar e remover volumes (força nova carga inicial do banco)
docker compose down -v

# Ver logs de todos os serviços
docker compose logs -f

# Ver logs de um serviço específico
docker compose logs -f nginx
docker compose logs -f backend
docker compose logs -f database

# Rodar testes e2e localmente
npm run test:e2e
```

---

## Decisões de arquitetura

| Decisão | Motivo |
|---|---|
| Banco não exposto por padrão | Reduz exposição desnecessária e reforça o isolamento entre serviços |
| Nginx como único ponto de entrada | Centraliza HTTPS, redirecionamento, proxy e cabeçalhos de segurança |
| Separação de redes (`proxy_network` / `db_network`) | Restringe o acesso ao banco apenas ao backend |
| Uso de `.env` | Evita hardcode de credenciais e facilita configuração entre ambientes |
| Inicialização automática do MySQL via `initdb.d` | Elimina import manual no fluxo local e no CI |
| `docker-compose.override.yml` para acesso local ao banco | Mantém o Compose principal seguro sem impedir o desenvolvimento |
| Validação com Husky | Garante commits padronizados e testes passando antes de cada push |
| Pipeline CI com GitHub Actions | Camada adicional de verificação automatizada além dos hooks locais |
