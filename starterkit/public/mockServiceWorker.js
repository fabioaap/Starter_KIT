/*
 * Este arquivo proxy carrega o worker oficial do MSW v2.2.4.
 * Para ambientes offline, execute `npx msw init public --save` para gerar a cópia local.
 */

try {
  importScripts("https://unpkg.com/msw@2.2.4/lib/mockServiceWorker.js");
} catch (error) {
  console.error(
    "Falha ao importar o mockServiceWorker remoto. Execute `npx msw init public --save` para gerar o arquivo local.",
    error
  );
}
