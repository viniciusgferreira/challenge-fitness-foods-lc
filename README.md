# challenge-fitness-foods-lc

## Sobre o Desafio
Este é um desafio técnico de NodeJS do Coodesh, para ver todos os requisitos e detalhes do desafio -> [Desafio](https://github.com/viniciusgferreira/challenge-fitness-foods-lc/blob/master/Challenge.md)   

Processo de desenvolvimento e investigação foi documentado neste plano de ação -> [Action Plan](https://github.com/viniciusgferreira/challenge-fitness-foods-lc/blob/master/Action-Plan.md)   

## Sobre o Projeto
Este projeto é uma API REST, construída para dar suporte a equipe de nutricionistas da empresa Fitness Foods LC para que eles possam revisar de maneira rápida a informação nutricional dos alimentos que os usuários publicam pela aplicação móvel.   

### Tecnologias e bibliotecas utilizadas
Node.js
Express.js
MongoDb com drivers nativos
node-cron
dotenv

## Instruções de build e deploy

Download the repo ``` git clone git@github.com:viniciusgferreira/challenge-fitness-foods-lc.git```   
``` cd challenge-fitness-foods-lc```

```npm install ``` to install all depedencies   

Criar o arquivo ```.env``` com as credenciais do mongodb (veja mais em .env-example) ou faça o setup das varíaveis no ambiente de deploy   

Para iniciar o Servidor ```npm run start```

## API Endpoints
Todas as requisições do tipo JSON precisam do header Content-Type: application/json. A maioria das respostas, incluindo erros, estão também no formato JSON. 
Os URI endpoints estão sempre abaixo do endereço /api/v1/

### Estrutura do objeto Produto
O objeto produto tem os seguintes campos:
```
{
   "code": 8718215090854,
   "status": "published",
   "imported_t": "2020-02-07T16:00:00Z",
   "url": "https://world.openfoodfacts.org/product/20221126",
   "creator": "securita",
   "created_t": 1415302075,
   "last_modified_t": 1572265837,
   "product_name": "Madalenas quadradas",
   "quantity": "380 g (6 x 2 u.)",
   "brands": "La Cestera",
   "categories": "Lanches comida, Lanches doces, Biscoitos e Bolos, Bolos, Madalenas",
   "labels": "Contem gluten, Contém derivados de ovos, Contém ovos",
   "cities": "",
   "purchase_places": "Braga,Portugal",
   "stores": "Lidl",
   "ingredients_text": "farinha de trigo, açúcar, óleo vegetal de girassol, clara de ovo, ovo, humidificante (sorbitol), levedantes químicos (difosfato dissódico, hidrogenocarbonato de sódio), xarope de glucose-frutose, sal, aroma",
   "traces": "Frutos de casca rija,Leite,Soja,Sementes de sésamo,Produtos à base de sementes de sésamo",
   "serving_size": "madalena 31.7 g",
   "serving_quantity": 31.7,
   "nutriscore_score": 17,
   "nutriscore_grade": "d",
   "main_category": "en:madeleines",
   "image_url": "https://static.openfoodfacts.org/images/products/20221126/front_pt.5.400.jpg"
 }
```

### GET ```/products```
Lista todos os produtos cadastrados, inclui paginação com limite padrão de 10 produtos. Exemplo ```GET /products?limit=100&page=2```   
#### Parametros
limit - limite de produtos na resposta   
page - paginação   

### GET ```/products/:code```
Lista um produto cadastrado que corresponde codigo passado como parametro. Exemplo ```GET /products/8718215180180```   
#### Parametros   
code - código do produto a ser buscado, contendo 13 digitos   

### PUT ```/products/:code```
Edita um produto cadastrado que corresponde codigo passado como parametro. Exemplo ```PUT /products/8718215380313```   
#### Parametros   
code - código do produto a ser buscado, contendo 13 digitos  

### DELETE ```/products/:code```
Delete um produto cadastrado que corresponde codigo passado como parametro. Exemplo ```DELETE /products/8718215180173```   
#### Parametros   
code - código do produto a ser deletado, contendo 13 digitos 



