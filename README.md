
# Wefin Exchange

Projeto desenvolvido em Angular 19 para controle de taxas de câmbio e operações relacionadas. Este projeto faz parte de um desafio técnico da empresa **Wefin**.

## 📜 Descrição

Aplicação web que permite visualizar, editar e gerenciar taxas de câmbio. Possui uma interface intuitiva, construída com Angular e PrimeNG, além de utilizar Jest para testes e Biome para formatação e lint.

---

## 🚀 Tecnologias Utilizadas

- **Angular 19**
- **PrimeNG 19**
- **PrimeIcons**
- **PrimeFlex**
- **RxJS**
- **TypeScript 5**
- **Jest** (testes unitários)
- **BiomeJS** (formatador e linter)
- **JSON Server** (Mock de API)

---

## 🔧 Pré-requisitos

- **Node.js** versão `>=18.x` (recomendado)
- **Angular CLI** versão `^19.2.15` (ou superior)

---

## ⚙️ Instalação e Execução Local

1. Clone o repositório:

```bash
git clone git@github.com:fel-vitor/wefin-exchange.git
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o projeto localmente:

```bash
npm start
```

> Isso executará dois serviços em paralelo:
> - `ng serve` (servidor Angular)
> - `json-server` com a API fake (`json-server/db.json`)

O projeto estará disponível em: [http://localhost:4200](http://localhost:4200)

---

## 🧪 Rodando Testes

Execute os testes unitários com:

```bash
npm run test
```

> Framework de testes: **Jest** com configuração otimizada para Angular.

---

## 🏗️ Build para Produção

Gere o build otimizado para produção com:

```bash
npm run build
```

Os arquivos serão gerados na pasta:

```
dist/wefin-exchange
```

---

## 📝 Scripts Disponíveis

| Comando                     | Descrição                                      |
|-----------------------------|-------------------------------------------------|
| `npm start`                 | Executa o app + json-server                    |
| `npm run start:app`         | Executa somente o Angular                      |
| `npm run start:json-server` | Executa somente o JSON Server                  |
| `npm run test`              | Roda os testes unitários com Jest              |
| `npm run build`             | Gera o build de produção                       |
| `npm run format`            | Formata o código com Biome                     |
| `npm run lint`              | Faz lint do projeto com Biome                  |

---

## 🏗️ Configurações Especiais

- O projeto utiliza **Proxy** (`proxy.config.json`) para redirecionar chamadas HTTP durante desenvolvimento.
- As variáveis de ambiente estão nos arquivos padrão Angular:
  - `src/environments/environment.ts`
  - `src/environments/environment.prod.ts`
- Utiliza **Change Detection Strategy OnPush** por padrão nos componentes para melhorar a performance.

---

## 🤝 Contribuição

Este projeto foi desenvolvido exclusivamente para avaliação técnica e **não aceita contribuições externas** no momento.

---

## ⚖️ Licença

Este projeto é de uso interno para fins de avaliação técnica da empresa **Wefin**.

---

## 💡 Observações

- Caso tenha problemas com permissões ou versões, atualize suas dependências ou reinstale o Angular CLI:

```bash
npm install -g @angular/cli
```

- O projeto está organizado seguindo boas práticas de arquitetura Angular, utilizando divisão clara entre `core`, `shared` e `pages`.

---

## 📫 Contato

Desenvolvido por **Vitor Fel** como parte do desafio para **Wefin**.  
📧 Email: vitorfel2000@gmail.com

---
