# Consulta da API do Reddit

> Consulta diária da api do reddit para cadastro no mysql e disponibilização de 3 endpointas para consulta na base sql.

## Build Setup

``` bash
# Abra um console do Mysql logado com um usuário com privilégios de grant
Copie e cole um bloco de código SQL por vez que se encontra em ./source/init.database.sql.
Isso irá criar o banco, o usuário da aplicação e  tabela para os posts.

# instale as dependências 
sudo npm install

# Irá rodar em localhost:30838
sudo npm run dev

# Funcionamento da aplicação:
A recuperação de dados e inserção, roda em um cronjob, através no Node diariamente às 08:00 da manhã.

> Em ./source/Consulta Reddit API.postman_collection.json existem uma collection do Postman para testar os endpoints abaixo. Basta importá-la.

> HOST: http://localhost::30838 
# OS endpoints da aplicação para consulta são:
Consulta ordenando pelos comentários
ENDPOINT: /api/v1/posts/type-order/comments

Consulta ordenando pelos ups
ENDPOINT: /api/v1/posts/type-order/ups

Consulta por um range de timestamp e o tipo de ordenação decrescente(ups ou comments).
Parâmetros enviados via header:
Headers: { 
            "x-access-dtStart":"2016-02-03 00:00:01",
            "x-access-dtEnd":"2016-02-10 00:00:01",
            "x-access-type-order":"ups"
        }
ou
Headers: { 
            "x-access-dtStart":"2016-02-03 00:00:01",
            "x-access-dtEnd":"2016-02-10 00:00:01",
            "x-access-type-order":"comments"
        }
ENDPOINT: /api/v1/posts/period/type-order
```

