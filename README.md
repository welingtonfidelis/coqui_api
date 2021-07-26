# COQUI
Este é o backend ([front] aqui) de um projeto que tem o objetivo de atender necessidades de cadastrar e manter usuários incluindo um chat em tempo real entre eles, além do cadastro e apresentação de informaçcões relevantes à empresa em um tipo de quadro de avisos. Esta API foi construída em [Node.js] com uso de [TypeScript], [Postgres] (através do ORM [Sequelize]), [MongoDB] (através da biblioteca [Mongoose]) e [SocketIO] para troca instantânea de mensagens e eventos.

## Arquitetura
Abaixo está o modelo entidade relacionamento do projeto, onde o banco Postgres foi utilizado para os dados que requeriam maior relacionamento e frequente alteração, ficando a parte de mensageria pro banco MongoDB, com maior uso de leitura e inserções de dados.

**Postgres** \
<img src="./docs/coqui_sql.png" alt="drawing" style="width: 400px; height: 550px;"/>

**MongoDB**\
<img src="./docs/coqui_nosql.png" alt="drawing" style="width: 600px; height:350px;"/>

___

## Requisitos
- [Node.js] - Node.js na versão 14 ou superior;
- [Postgres] - Instância do banco de dados Postgres;
- [Sendgrid] key - Para enviar emails de recuperação de senha, é necessário uma chave de acesso na plataforma Sendgrid;
- Cliente HTTP - Um aplicativo cliente para executar requisições HTTP, como [Postman];t
- [Docker] e [Docker-compose] (OPCIONAL) - O projeto possui possibilidade de ser executado em um container [Docker], juntamente com uma instância dos bancos [Postgres] e [MongoDB].

___

## Instalação
Após clonar este projeto, crie um arquivo chamado **.env** no diretório **/src/enviroments/**, usando como referência o arquivo .env.example localizado no diretório citado (caso pretenda utilizar o método Container Docker para subir o ambiente, ignore as variáveis do banco de dados). Em seguinda, existem duas formas de executar a API, descritas abaixo.

### Container Docker
Como apresentado na seção de Requisitos, este projeto possui a possibilidade de ser executado em um container docker. Para isso, na raíz deste projeto, através de seu terminal de comandos, execute o comando *docker-compose up -d* e aguarde até que os containers sejam construídos e executados, disponibilizando o acesso à API no endereço **http://localhost:3001/api**. Serão criados e executados 5 containers através deste compose: uma instância do banco Postgres, o cliente PgAdmin4 para acesso ao banco de dados, uma instância do banco MongoDB e seu cliente para acesso aos dados MongoClient e por fim, o servidor para dar acesso à API. Caso deseje criar apenas o container do servidor, pode executar o comando *docker build -t coqui-api .* para criar uma imagem do servidor e em seguida, o comando *docker run -it -p 3001:3001 coqui-api* para que seja criado e executado um container desta imagem.

### Em seu ambiente Node.js
Para executar o projeto em seu ambiente, através terminal de comandos apontando para a raíz do projeto, execute o comando *npm install* para que as dependências necessárias sejam baixadas e em seguida, execute o comando *npm run migrate:apply* para criação das tabelas no banco de dados e em seguida, execute *npm run dev* para que o projeto seja executado, disponibilizando o acesso à API no endereço **http://localhost:3001/api**.

É importante ressaltar que em ambas as formas de "subir" a API, não existem dados iniciais no banco, como empresas e usuários. Para facilitar o desenvolvimento e testes, há um conjunto de "seeds" neste projeto para popular o banco inicialmente. Para executá-los, execute o comando *npm run seed:apply*.

___

## Utilização
Caso esteja utilizando o cliente HTTP [Postman], pode acessar [este link] para baixar uma coleção que contém as rotas disponíveis nesta API.
Caso tenha executado os seeds descritos na seção de Instalação, pode-se logar com o usuário criado com as seguintes informações:

```json
{
    "user": "admmaster",
    "password": "1234"
}
```

**OBS.:** É importante ressaltar que para uso da mensageria e eventos em tempo real com esta API, o cliente/front do projeto precisa estar em execução e conectado ao servidor da API. Caso seja este seu desejo, lembre-se de clonar e executar o [front] deste projeto.

___

## Contato
welingtonfidelis@gmail.com
<br>
Sugestões e pull requests são sempre bem vindos 🤓 

License
----

MIT

**Free Software, Hell Yeah!**

[GitHub_API]: <https://docs.github.com/en/rest>
[Node.js]: <https://nodejs.org/en/>
[TypeScript]: <https://www.typescriptlang.org/>
[Postgres]: <https://www.postgresql.org/>
[MongoDB]: <https://www.mongodb.com/pt-br>
[Mongoose]: <https://mongoosejs.com/>
[SocketIO]: <https://socket.io/>
[Sequelize]: <https://sequelize.org/master/>
[Docker]: <https://docs.docker.com/get-started/>
[Docker-compose]: <https://docs.docker.com/compose/install/>
[Postman]: <https://www.postman.com/downloads/>
[Sendgrid]: <https://sendgrid.com/>
[este link]: <https://www.getpostman.com/collections/18054bbf9247b825eb6e>
[front]: <https://github.com/welingtonfidelis/coqui_front>