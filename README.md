# Painel Guardiões da Saúde

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Bem-vindo ao repositório do Painel do aplicativo mobile **[Guardiões Da Saúde](https://github.com/proepidesenvolvimento/guardioes-app)**.

Esse painel é a interface web do projeto que permite o gerenciamento dos dados exibidos no aplicativo.
Com ele, é possível visualizar gráficos, relatórios e informações organizadas para facilitar o processo de **vigilância ativa/participativa**.

Para saber mais sobre o projeto, visite nossa página oficial **[clicando aqui](https://proepidesenvolvimento.github.io/guardioes-api/)**.

---

## Tecnologias Utilizadas

As principais tecnologias utilizadas neste projeto são:

- **[Node.js](https://nodejs.org/en/):** Ambiente de execução para JavaScript no lado do servidor.
- **[NPM](https://www.npmjs.com/):** Gerenciador de pacotes para o Node.js.
- **[React](https://pt-br.reactjs.org/):** Biblioteca para construção de interfaces de usuário.

---

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

Antes de começar, certifique-se de que os seguintes softwares estão instalados em sua máquina:

1. **[Node.js](https://nodejs.org/en/):** Certifique-se de usar a versão **16.20.0**.
2. **[Docker](https://www.docker.com/):** Necessário para levantar o Metabase.
3. **NPM:** Instalado automaticamente junto com o Node.js.

---

### Levantando o Ambiente

#### Apenas o Painel

Levante apenas o painel para desenvolver no código.

1. **Instale as dependências:**

Este comando instalará todas as bibliotecas necessárias para rodar o painel:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

Use o comando a seguir para rodar o painel localmente:

```
npm start
```

#### Painel e Metabase

Levante ambos se a intenção for acessar as estatísticas e dados do Metabase.

1. **Build do projeto:**

Este comando instalará todas as dependências e criará o build:

```bash
docker-compose build
```

2. Levante o painel e Metabase:

```bash
docker-compose up
```

Acesse o painel:
O painel estará disponível no navegador em http://localhost:3000.

Para utilizar as funcionalidades do painel, você precisará levantar também a API via **[guardioes-api](https://proepidesenvolvimento.github.io/guardioes-api/)**.

## Solução de Problemas

Erros Comuns

1. Versões do Node.js e NPM  
   Problema: Conflitos entre versões podem causar erros durante a instalação de dependências.

   Solução:
   Verifique as versões instaladas:

   ```
   node -v
   npm -v
   ```

   Compare com as versões suportadas no link oficial de releases.
   Atualize ou faça downgrade para versões compatíveis, se necessário.

2. Erro ao Instalar Dependências (npm install)  
   Problema: Pode ocorrer erro ao executar npm install devido a problemas de cache ou permissões.

   Solução: Execute os seguintes comandos para resolver:

   ```
   sudo rm -rf node_modules
   npm cache clean --force
   ```

   Após isso, reinstale as dependências:

   ```
   npm install
   ```

   Certifique-se de que seu usuário tem permissões de administrador.

3. Erro ao Logar  
   Problema: Falhas ao logar no painel podem estar relacionadas à configuração incorreta do arquivo urls.js ou à falta da API.

   Solução:
   Verifique se o arquivo urls.js está configurado corretamente.
   Certifique-se de que a API está levantada e acessível.

## Testes Automatizados

Para garantir a estabilidade e a qualidade do código, você pode executar os testes do projeto:

Execute todos os testes com o comando:

```
npm test
```

Para rodar testes de um arquivo específico:

```
npm test -- [caminho_do_arquivo]
```

## Licença

ProEpi, Associação Brasileira de Profissionais de Epidemiologia de Campo  
Licensed under the [Apache License 2.0](LICENSE.md).

Se precisar de ajuda, abra uma issue no repositório ou entre em contato com a equipe de desenvolvimento!
