# Processo e etapas de desenvolvimento do Projeto

## Antes de começar
[x] Levantar todas as etapas e criar o plano de ação (este Action-Plan)
[x] Criar o Repositório no Github com os requisitos
[ ] Configurar o ambiente de desenvolvimento no Vscode


## Criar o Banco de dados
[ ] Criar e configurar a conta no Atlas
[ ] Criar o DB e configurar acessos e links
[ ] .env com dados de acesso   
[ ] Criar o Model com base no formato disponibilizado
[ ] Importar os produtos

## API REST
[ ] Configurar o projeto npm e instalar as dependencias que serão usadas
[ ] Iniciar o Servidor com Express.js
[ ] Criar a conexão com o DB
[ ] Criar a estrutura de diretórios
[ ] Criar um router para controlar as URI's
[ ] Criar a rota GET (/) com: Detalhes da API, se conexão leitura e escritura com a base de dados está OK, horário da última vez que o CRON foi executado, tempo online e uso de memória
[ ] Criar a rota PUT /products/:code - para cadastrar atualizações do Projeto Web
[ ] Criar a rota DELETE /products/:code - para mudar o status do produto para trash
[ ] Criar a rota GET /products/:code - para listar as informações de um único produto
[ ] Criar a rota GET /products - Listar todos os produtos da base de dados, adicionar sistema de paginação para não sobrecarregar o REQUEST

## CRON
[ ] Criar Collection para historico de importacao
[ ] Criar cron job
[ ] Criar Model de importações
[ ] Limitar importação para 100 produtos
[ ] Testar com tempo de 1min
[ ] Configurar para importar a cada 24h - 3h da manhã onde o tráfego é baixo

## Documentação
[ ] Criar Readme com instruções de configuração e build do projeto

## Testes Unitários
[ ] Importar o Jest
[ ] Criar testes para cada Endpoint