## Estrutura de pastas

### Regras
1. Cada component, screen, service deve funcionar por si só, logo deve ter seus estilos, imagens, translations e uma série de actions;
2. Um component pode definir outros componentes ou services aninhados mas não pode definir screens;
3. Uma screen pode definir components, screens ou services aninhados;
4. Um service pode definir outros mas não pode definir components nem screens;
5. Cada elemento só pode ser usado por um que tenha relação de Pai;
6. Todo arquivo ou pasta deve serguir a convenção camel case para nomes (ex: signingSteps.js).
- **Screen é cada tela da aplicação**;
- **Components são os próprios do React, na pasta /SharedComponents ficarão os de acesso global**;
- **Services é tudo aquilo que não é um Component propriamente dito e que deve conter as lógicas de negócio que são importantes para o Component ou Screen no qual ele será usado.**

```
/src
   /mainServices
   /sharedComponents
      /signingSteps
         index.js
   /screens
      /home
         index.js
         /components
             /accountController
                index.js
                actionButtons.js
             /searchLoanController
                index.js
                loanItem.js
                loanModal.js

```
