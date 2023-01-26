# Processo e etapas de desenvolvimento do Projeto

## Antes de começar
[x] Levantar todas as etapas e criar o plano de ação (este Action-Plan)
[x] Criar o Repositório no Github com os requisitos
[x] Configurar o ambiente de desenvolvimento no Vscode


## Criar o Banco de dados
[x] Criar e configurar a conta no Atlas
[x] Criar o DB e configurar acessos e links
[x] .env com dados de acesso
[ ] Criar o Model com base no formato disponibilizado
[ ] Importar os produtos

## API REST
[x] Configurar o projeto npm e instalar as dependencias que serão usadas
[x] Iniciar o Servidor com Express.js
[x] Criar a conexão com o DB
[x] Criar a estrutura de diretórios
[x] Criar um router para controlar as URI's
[ ] Criar a rota GET (/) com: Detalhes da API, se conexão leitura e escritura com a base de dados está OK, horário da última vez que o CRON foi executado, tempo online e uso de memória
[X] Criar a rota PUT /products/:code - para cadastrar atualizações do Projeto Web
[x] Criar a rota DELETE /products/:code - para mudar o status do produto para trash
[x] Criar a rota GET /products/:code - para listar as informações de um único produto
[ ] Criar a rota GET /products - Listar todos os produtos da base de dados, adicionar sistema de paginação para não sobrecarregar o REQUEST

## CRON
[ ] Criar Collection para historico de importacao
[x] Criar processo de download dos arquivos
[x] Extrair os arquivos
[ ] Testar quais produtos têm atualizações
[ ] Add campos imported_t e status
[ ] Criar cron job
[ ] Criar Model de importações
[ ] Limitar importação para 100 produtos
[ ] Testar com tempo de 10min
[ ] Configurar para importar a cada 24h - 3h da manhã onde o tráfego é baixo

## Documentação
[ ] Criar Readme com instruções de configuração e build do projeto

## Testes Unitários
[ ] Importar o Jest
[ ] Criar testes para cada Endpoint
