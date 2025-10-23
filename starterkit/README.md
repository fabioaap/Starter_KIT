# Starter Kit React + Next

Este repositório reúne um monorepo opinado para prototipagem rápida com documentação viva.

## Stack principal

- [Next.js 14](https://nextjs.org/) com diretório `app/`
- [Tailwind CSS](https://tailwindcss.com/) configurado com tokens de design compilados por Style Dictionary
- Componentes acessíveis do [shadcn/ui](https://ui.shadcn.com/) sobre [Radix UI](https://www.radix-ui.com/)
- [Storybook 8](https://storybook.js.org/) com builder Vite, Autodocs e suporte a importações absolutas
- [MSW v2](https://mswjs.io/) para mocks HTTP em tempo real e integração com `msw-storybook-addon`
- [Lucide](https://lucide.dev/) para ícones reutilizáveis
- Tokens em formato [DTCG](https://design-tokens.org/) processados com `@tokens-studio/sd-transforms`
- Publicação da documentação via GitHub Actions e GitHub Pages

## Requisitos

- Node.js 20 ou superior
- npm 9+ (incluído no Node 20)

## Primeiros passos

```bash
npm install
npm run build:tokens
npm run dev
```

O comando `npm run dev` delega para `apps/web` e inicia o Next.js com Tailwind carregando os tokens gerados.

## Storybook

```bash
npm run storybook
```

A configuração em `.storybook` usa o builder Vite, importa os estilos globais do Next e aplica o `msw-storybook-addon`. As histórias têm Autodocs habilitado por padrão através da tag `autodocs`.

### Criando stories para páginas

1. Crie sua página em `apps/web/app/...`.
2. Adicione um arquivo `*.stories.tsx` ao lado da página e use importações absolutas (`@/`) conforme necessário.
3. Para estados de dados, utilize `msw` com `http`, `HttpResponse` e `delay` como demonstrado em `apps/web/app/(dashboard)/dashboard/Dashboard.stories.tsx`.
4. Sempre defina handlers com delays finitos para simular latência de rede.

## Acessibilidade

- Utilize componentes baseados em Radix (como Button e Dialog do shadcn) para garantir suporte a teclado e foco visível.
- Mantenha contrastes mínimos seguindo os tokens `color.*`.
- Verifique cada história com o addon de acessibilidade (`@storybook/addon-a11y`) e adicione testes interativos (`play`) sempre que houver comportamento dinâmico.
- Preserve atributos ARIA nos componentes derivados.

## Design tokens

- Fonte da verdade: `packages/tokens/tokens.json` (formato DTCG com `$value`, `$type` e `$description`).
- Compilação: `npm run build:tokens` gera `packages/tokens/build/tokens.css` e `tokens.ts`.
- Os tokens em CSS são importados em `apps/web/app/globals.css` logo após o `@import "tailwindcss"`.

## Mocks de API

- MSW v2 está instalado com o worker em `public/mockServiceWorker.js`.
- Em Storybook, inicialize mocks via parâmetros `msw.handlers` conforme o exemplo do Dashboard.
- Para desenvolvimento Next.js, você pode reutilizar os mesmos handlers em setup próprio quando necessário.

## Publicação no GitHub Pages

1. Habilite **Settings → Pages** e selecione **GitHub Actions** como fonte.
2. O workflow `.github/workflows/deploy-storybook.yml` constrói os tokens, gera o Storybook e publica usando `upload-pages-artifact` + `deploy-pages`.
3. Após a execução, o ambiente `github-pages` exibirá a URL final em `Actions`.

## Estrutura relevante

```
starterkit/
  apps/web/               # Aplicação Next.js
  packages/ui/            # Componentes shadcn/ui compartilhados
  packages/tokens/        # Fonte e build dos design tokens
  .storybook/             # Configurações do Storybook
  public/                 # Worker do MSW
```

## Scripts úteis

- `npm run dev` – inicia o app Next.
- `npm run storybook` – abre a documentação interativa.
- `npm run build:tokens` – recompila tokens após qualquer alteração.
- `npm run build-storybook` – gera a saída estática em `storybook-static/` para publicação.

Mantenha este README como documentação viva: registre novos componentes, flows de dados e convenções de acessibilidade conforme o projeto evoluir.
