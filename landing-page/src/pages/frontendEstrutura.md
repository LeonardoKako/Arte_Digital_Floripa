# Estrutura de Páginas

Nesta pasta (`src/pages`), nós organizamos as páginas principais da nossa aplicação. 

Ao contrário dos "components", que são pequenas partes genéricas (como botões e barras), uma "Página" representa uma tela inteira que o usuário vê (e normalmente possui uma rota/URL específica).

## Padrão adotado
- Cada tela tem sua pasta (ex: `Home/` e `Obras/`).
- Dentro da pasta, unimos vários componentes para montar a tela final (ex: na Home, chamamos a Navbar, o Hero, os Cards, etc).
- Se a página possuir estilos específicos dela que não fazem parte de um componente genérico, o CSS dela deve ficar aqui.
