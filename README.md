# **Converse Muito**

## Projeto técnico para o seguinte desafio:

A empresa de telefonia ABCTel, especializada em chamadas de longa distância nacional, vai colocar um novo produto no mercado chamado ConverseMuito.
Normalmente um cliente ABCTel pode fazer uma chamada de uma cidade para outra pagando uma tarifa fixa por minuto, com o preço sendo pré-definido em uma lista com os códigos DDDs de origem e destino:

| Origem | Destino | $/min |
| ------ | :-----: | ----: |
| 011    |   016   |  1.90 |
| 016    |   011   |  2.90 |
| 011    |   017   |  1.70 |
| 017    |   011   |  2.70 |
| 011    |   018   |  0.90 |
| 018    |   011   |  1.90 |

Com o novo produto ConverseMuito da ABCTel o cliente adquire um plano e pode falar de graça até um determinado tempo (em minutos) e só paga os minutos excedentes. Os minutos excedentes tem um acréscimo de 10% sobre a tarifa normal do minuto. Os planos são ConverseMuito 30 (30 minutos), ConverseMuito 60 (60 minutos) e ConverseMuito 120 (120 minutos).
A ABCTel, preocupada com a transparência junto aos seus clientes, quer disponibilizar uma página na web onde o cliente pode calcular o valor da ligação. Ali, o cliente pode escolher os códigos das cidades de origem e destino, o tempo da ligação em minutos e escolher qual o plano ConverseMuito. O sistema deve mostrar dois valores: (1) o valor da ligação com o plano e (2) sem o plano. O custo inicial de aquisição do plano deve ser desconsiderado para este problema.

Exemplo de Valores:

| Origem | Destino | Tempo | Plano ConverseMuito | Com ConverseMuito | Sem ConverseMuito |
| ------ | :-----: | ----: | ------------------: | ----------------: | ----------------: |
| 011    |   016   |    20 |    ConverseMuito 30 |            $ 0,00 |           $ 38,00 |
| 011    |   017   |    80 |    ConverseMuito 60 |           $ 37,40 |          $ 136,00 |
| 018    |   011   |   200 |   ConverseMuito 120 |          $ 167,20 |          $ 380,00 |
| 018    |   017   |   100 |    ConverseMuito 30 |                 - |                 - |

## Tecnologias utilizadas e conceitos

### Backend

No back-end a plataforma utilizada foi o **NodeJS** utilizando o framework **NestJS**.

Essa stack foi utilizada pela maturidade e performance do ambiente do **NodeJS** e
o **NestJS** pelas possibilidade, estrutura, e produtividade do framework que cria uma camada de abstração
ao **Express** (podendo ser trocado por outras engines suportadas como o **Fastify**), além dele oferecer um mecanismo
de injeção de dependência bem interessante (inspirado no Angular) e todo um ecossistema de ferramentas (Typescript,Jest,SuperTest,RxJs) já integrado e configurado, podendo ser ampliado pelo seu sistema de **plugin**

Não foi utilizado nenhum banco de dados, porém no projeto foi utilizado o padrão **Repository** e é possível implementar
classe de acesso a banco de dados (relacionais ou não) pois a implementação é feita por interfaces, seguindo conceitos
de **Clean Architectures**

Os testes unitário foram construídos com **JEST** e os testes de integração foram implementados com **JEST** e **Super Test**

Além do uso intenso do superset **TypesScript**, também foi utilizada a programação reativa com o **RxJS**

### Front End

No front-end foi escolhido o framework **Angular** na versão 11 e como biblioteca de componentes foi utilizado o projeto
**open-source** [PO-UI](https://po-ui.io/)

Essa stack foi utilizada pois o Angular proporciona um rico ecossistema de ferramentas já integradas (Typescript,RXJS, WebPack,Jasmine,Karma) além de um avançado conjunto de abstrações e conceitos (Lazy Loading,Injeção de dependências,Otimização de build para browser novos e antigos e etc...)
A biblioteca **open-Source PO-UI** proporcionou ganho de produtividade com o uso de componentes responsivos e uma experíencia de uso agradáveis, fora a possibilidade de fácil customização de cores e fontes, utilizado para esse projeto.

Os testes unitário foram construídos com **JASMINE** e os testes de end to end foram implementados com **CYPRESS**

Além do uso intenso do superset **TypesScript**, também foi utilizada a programação reativa com o **RxJS**

### Como usar

#### Docker

Para executar todo o projeto de uma vez, utilizando o docker, basta executar o seguinte comando

```
docker-compose up
```

A documentação da api estará no endereço

```
http://localhost:3000/api/
```

A aplicação estará no endereço

```
http://localhost:4200/
```

Para utilizar basta preencher os campos e as informações serão atualizadas dinâmicamente.

#### Local

Para executar localmente para executar os testes, é preciso primeiro instalar as dependências utilizando o comando:

```
npm run install:all
```

Para executar manualmente utilize o comando:

```
npm start
```

#### Testes

Para executar o lint do projeto todo execute:

```
npm run lint:all
```

Para executar todos os testes unitários execute o comando

```
npm run test:unit:all
```

Para executar os testes de integração e testes e2e execute

```
npm run test:e2e:all
```

> No final é criado um vídeo do teste e2e na pasta \cypress\videos\fale-mais

Para executar o teste e2e manualmente execute

```
npm run cy:start
```
