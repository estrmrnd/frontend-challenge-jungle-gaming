# Kurio — NFT Marketplace

Implementação de um marketplace de NFTs desenvolvida como desafio técnico Front-End para a Jungle Gaming.

O projeto foi construído com React e TypeScript a partir do layout disponibilizado no Figma, com foco em responsividade, integração com APIs simuladas, gerenciamento de estado assíncrono, persistência de dados, tempo real, testes E2E e performance.

## Deploy

Aplicação:

https://frontend-challenge-jungle-gaming-sand.vercel.app/

Repositório:

https://github.com/estrmrnd/frontend-challenge-jungle-gaming

## Tecnologias

- React
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Axios
- Tailwind CSS
- shadcn/ui
- MSW (Mock Service Worker)
- Socket.IO
- Playwright
- Lighthouse

## Funcionalidades implementadas

### Catálogo

A página inicial possui catálogo de NFTs com dados simulados através do MSW.

Foram implementados:

- listagem de NFTs;
- filtros por categoria;
- filtros por rede;
- filtro de preço;
- ordenação;
- paginação;
- navegação para o detalhe do NFT;
- estados de carregamento;
- estado vazio;
- tratamento de erro;
- persistência dos filtros e paginação através da URL.

A fixture principal possui 36 NFTs, permitindo testar paginação e filtros.

### Detalhe do NFT

A tela de detalhe apresenta as informações do NFT selecionado e permite iniciar o fluxo de compra.

Também existe tratamento para acesso direto à rota e NFT inexistente.

### Carrinho

O carrinho permite:

- adicionar NFTs;
- alterar quantidade;
- remover itens;
- manter os dados após refresh;
- calcular subtotal;
- aplicar desconto;
- calcular taxa e total;
- aplicar e remover cupom.

O carrinho utiliza persistência local para manter os itens durante a navegação e após atualização da página.

### Cupons

A validação de cupons é realizada através da API simulada pelo MSW.

Cenários implementados:

| Cupom | Resultado |
| --- | --- |
| `KURIO10` | 10% de desconto |
| `EXPIRED10` | Cupom expirado |
| Outros códigos | Cupom inválido |

### Checkout

O fluxo principal implementado é:

```text
Catálogo
   ↓
Detalhe do NFT
   ↓
Carrinho
   ↓
Pagamento
   ↓
Confirmação
```

A confirmação da compra ocorre somente após resposta da API simulada.

Após a confirmação, os itens comprados são removidos do carrinho.

### Pagamento

A tela de pagamento possui:

- dados do colecionador;
- seleção de carteira;
- seleção de rede;
- resumo da compra;
- envio do pedido;
- tratamento da resposta da API.

A criação do pedido utiliza uma chave de idempotência para evitar a criação duplicada da mesma compra em reenvios equivalentes.

### Perfil

A interface de perfil do colecionador permite edição dos dados e apresenta feedback visual após a ação de salvar.

### Responsividade

A aplicação foi adaptada para desktop e dispositivos móveis seguindo os layouts disponibilizados no Figma.

Foram considerados principalmente os seguintes tamanhos:

- 390px;
- 768px;
- 1440px.

## Arquitetura

A aplicação foi organizada separando responsabilidades entre interface, acesso à API, estado remoto e mocks.

```text
src/
├── components/
│   ├── cart/
│   ├── home/
│   ├── nft/
│   ├── payment/
│   ├── profile/
│   └── ui/
│
├── features/
│   └── nfts/
│
├── mocks/
│   ├── fixtures/
│   └── handlers/
│
├── routes/
│
├── services/
│   ├── api/
│   └── socket/
│
└── types/
```

### TanStack Router

O TanStack Router é utilizado para gerenciamento das rotas da aplicação.

No catálogo, filtros, ordenação e paginação são refletidos na URL, permitindo refresh e navegação através do histórico sem perder o estado da consulta.

### TanStack Query

O TanStack Query é utilizado para gerenciamento do estado remoto.

As consultas possuem cache e são identificadas através de `queryKey`.

A configuração utilizada possui:

```text
staleTime: 30 segundos
retry: 1
```

As requisições dos NFTs também utilizam `AbortSignal`, permitindo cancelar consultas que ficaram obsoletas durante mudanças rápidas de parâmetros.

### Axios

Todas as chamadas REST da aplicação passam pelo cliente Axios.

A URL base utilizada pelos mocks é:

```text
/api
```

O timeout configurado é de 5 segundos.

## Mocking com MSW

O projeto utiliza MSW para interceptar as requisições HTTP e simular o backend.

Os mocks são utilizados tanto no desenvolvimento quanto na versão de demonstração.

### Ativação dos mocks

Durante desenvolvimento, os mocks são habilitados automaticamente.

Para habilitá-los explicitamente no build:

```env
VITE_ENABLE_MOCKS=true
```

### Cenários do catálogo

A API de NFTs possui cenários para testar diferentes estados da interface:

```text
normal
empty
error
slow
```

Esses cenários permitem validar:

- resposta normal;
- catálogo vazio;
- erro da API;
- resposta lenta.

Os handlers também retornam `404` quando um NFT inexistente é acessado.

## Socket.IO

O projeto utiliza `socket.io-client` para a comunicação em tempo real.

O cliente possui suporte aos eventos utilizados pela implementação para atualização de NFTs, incluindo alterações de preço e status.

A integração atual utiliza:

```text
nft:price-updated
nft:status-updated
```

As atualizações recebidas são integradas ao cache do TanStack Query.

No ambiente publicado, o endereço do servidor Socket.IO pode ser configurado através de:

```env
VITE_SOCKET_URL=https://kurio-socket-server.onrender.com
```

O servidor utilizado na demonstração está hospedado em uma instância gratuita e pode entrar em modo de suspensão quando fica sem uso. Por isso, a primeira conexão pode levar alguns segundos.

## Variáveis de ambiente

Crie um arquivo `.env` quando necessário:

```env
VITE_ENABLE_MOCKS=true
VITE_SOCKET_URL=https://kurio-socket-server.onrender.com
```

Não são necessárias credenciais reais para executar a aplicação.

Todos os dados utilizados no desafio são fictícios.

## Executando o projeto

Clone o repositório:

```bash
git clone https://github.com/estrmrnd/frontend-challenge-jungle-gaming.git
```

Entre no diretório:

```bash
cd frontend-challenge-jungle-gaming
```

Instale as dependências:

```bash
npm install
```

Execute em desenvolvimento:

```bash
npm run dev
```

Por padrão, o Vite disponibilizará a aplicação localmente.

## Build

Para gerar o build de produção:

```bash
npm run build
```

Para visualizar o build localmente:

```bash
npm run preview
```

## Testes E2E

Os testes automatizados foram implementados utilizando Playwright.

Execute com:

```bash
npx playwright test --workers=1
```

Para visualizar a execução:

```bash
npx playwright test --headed --workers=1
```

Para gerar/abrir o relatório:

```bash
npx playwright show-report
```

### Cobertura atual

A suíte atual possui **10 testes E2E**, cobrindo os principais fluxos implementados, incluindo:

- carregamento do catálogo;
- navegação para o detalhe do NFT;
- tratamento de NFT inexistente;
- filtros, ordenação, paginação e URL;
- persistência do carrinho;
- alteração de quantidade;
- remoção de itens;
- aplicação de cupom;
- fluxo carrinho → pagamento;
- fluxo pagamento → confirmação;
- validação da confirmação;
- idempotência da criação do pedido.

Na última execução antes da entrega:

```text
10 passed
```

## Lighthouse

Foram realizadas auditorias com Lighthouse no build otimizado, avaliando a Home e a página de detalhe do NFT nos perfis mobile e desktop.

Versão utilizada:

```text
Lighthouse 13.5.0
```

### Performance

Foram realizadas três medições durante a validação final.

| Página | Perfil | Execuções | Mediana |
| --- | --- | --- | ---: |
| Home | Mobile | 85 / 85 / 84 | **85** |
| Home | Desktop | 99 / 98 / 98 | **98** |
| Detalhe NFT | Mobile | 90 / 90 / 89 | **90** |
| Detalhe NFT | Desktop | 99 / 98 / 99 | **99** |

Accessibility, Best Practices e SEO também foram verificados durante as auditorias e ficaram dentro das metas esperadas nas execuções realizadas.

A principal diferença observada foi a performance da Home no perfil mobile, cuja mediana ficou em 85, abaixo da meta de 90. A página inicial concentra uma quantidade maior de elementos, imagens e componentes do catálogo, aumentando o custo inicial de carregamento em dispositivos simulados mais lentos.

Foram aplicadas otimizações como carregamento lazy de componentes específicos de desktop e redução de recursos desnecessários no carregamento inicial.

Os relatórios Lighthouse gerados durante a validação estão disponíveis no diretório:

```text
lighthouse/
```

## Decisões técnicas

### Estado remoto

Dados provenientes da API são tratados pelo TanStack Query, evitando duplicação do estado remoto dentro dos componentes.

### Estado do catálogo

Filtros e paginação são mantidos na URL para permitir compartilhamento, refresh e navegação pelo histórico.

### Carrinho

O carrinho utiliza persistência local para preservar o estado entre páginas e refresh.

### Compra

A confirmação depende da resposta da API simulada. O carrinho não é limpo antes da confirmação do pedido.

### Idempotência

A API simulada de pagamento mantém controle das tentativas processadas através de uma chave de idempotência, reduzindo o risco de criação duplicada do mesmo pedido.

## Limitações conhecidas

Devido ao tempo disponível para o desafio, alguns cenários descritos no enunciado não possuem cobertura completa.

A suíte Playwright possui 10 testes E2E funcionais, mas não cobre integralmente todos os 12 grupos de cenários sugeridos no desafio. Cenários avançados de sessão, favoritos, regressão visual, falhas de pagamento, reconexão e ordenação/versionamento de eventos Socket.IO não possuem cobertura E2E completa.

A implementação de tempo real utiliza eventos `nft:price-updated` e `nft:status-updated`, em vez dos contratos `nft.updated` e `order.updated` descritos no enunciado. A sincronização completa de pedidos pendentes após reconexão também não foi implementada.

As três execuções utilizadas para calcular as medianas do Lighthouse foram realizadas durante a validação manual. O diretório `lighthouse/` contém os relatórios HTML preservados da auditoria, mas não possui três arquivos HTML/JSON independentes para cada combinação de página e perfil.

Essas limitações foram mantidas explícitas para que a documentação represente o estado real da implementação entregue.

## Design

A interface foi desenvolvida com base no Figma fornecido para o desafio, buscando preservar:

- cores;
- tipografia;
- espaçamentos;
- hierarquia visual;
- cards;
- navegação;
- responsividade;
- fluxo entre as telas.

Alguns ajustes responsivos foram realizados para permitir que componentes funcionassem adequadamente em tamanhos intermediários não representados diretamente nos frames do Figma.

## Autor

Desenvolvido por Ester Miranda como desafio técnico Front-End para a Jungle Gaming.