# back-end test saude-id

## Serviços

![](.github/services.png)

## Descrição

    O sistema tem como objetivo fornecer uma API que contenha rotas para criação/edição/cancelamento de pedidos.
    Além disso, existem dois microserviços que auxiliam no processo de atualização do estoque, o serviço stock,
    que contém um banco de dados MongoDb e recebe chamadas via Redis para atualização do estoque, e o serviço
    manager, que atua fazendo intermédio entre a api-gateway e o sistema de estoque, processando os pedidos e
    publicando eventos via Redis para o serviço de stock fazer as modificações necessárias.

## Tecnologias

- [NestJs](https://nestjs.com/)
- [Kafka](https://kafka.apache.org/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io/pt-BR/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [MongoDb](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## Rodando com Docker

### Buildar e subir containers

```bash
$ docker-compose -f docker-compose.yml up -d --build
```

### Rodando testes unitarios de cada serviço

##### instalar dependencias

```bash
$ yarn install
```

##### api-gateway

```bash
$ cd services/api-gateway
$ yarn test:unit
```

##### manager

```bash
$ cd services/manager
$ yarn tests
```

##### stock

```bash
$ cd services/stock
$ yarn tests
```

### Rodando testes de integração

##### Criar container postgres de teste

```bash
$ docker run --name database-test -e POSTGRES_PASSWORD=database-test-pass -e POSTGRES_USER=database-test -e POSTGRES_DATABASE=database-test -p 5433:5432 -d postgres
```

##### Rodar testes

```bash
$ cd services/api-gateway
$ yarn test:integration
```
