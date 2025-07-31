# Falzoni Express API de Transações

API REST para registro e gerenciamento de transações financeiras desenvolvida com Node.js 20.17, Typescript 5x e Express 4x. A aplicação permite registrar transações, removê-las e calcular estatísticas em tempo real dos últimos 60 segundos.

Este projeto é baseado no desafio proposto pelo Itaú: https://github.com/rafaellins-itau/desafio-itau-vaga-99-junior

## 🚀 Tecnologias Utilizadas

- **Typescript 5x**: Linguagem de desenvolvimento base
- **Node.js 22.17**: Versão do ambiente
- **Express 4x**: Framework principal para desenvolvimento da API
- **Docker**: Containerização da aplicação
- **Jest**: Framework de testes unitários
- **Swagger**: Documentação interativa da API

## 📋 Funcionalidades

### Sistema de Registro de Transações

A API oferece um sistema completo para gerenciamento de transações financeiras com armazenamento em memória, proporcionando alta performance para cálculos estatísticos em tempo real.

## 📚 Endpoints da API

### 1. Registrar Transação
**POST** `/api/transacao`

Registra uma nova transação no sistema.

#### Payload de Entrada:
- **Valor**: Obrigatório, deve ser maior que zero
- **DataHora**: Obrigatória, deve ser uma data no passado (não pode ser futura)
- **Formato**: JSON válido seguindo padrão ISO 8601 para datas

#### Respostas:
- `201 Created`: Transação registrada com sucesso
- `400 Bad Request`: Payload inválido ou mal formatado
- `422 Unprocessable Entity`: Dados não atendem às regras de validação

### 2. Remover Todas as Transações
**DELETE** `/api/transacao`

Remove todas as transações armazenadas no sistema.

#### Respostas:
- `200 OK`: Todas as transações foram removidas com sucesso

### 3. Obter Estatísticas
**GET** `/api/estatistica`

Calcula e retorna estatísticas das transações registradas nos últimos 60 segundos.

#### Respostas:
- `200 OK`: Estatísticas calculadas com sucesso

#### Resposta de Sucesso - Campos Retornados:
- **Count**: Quantidade de transações nos últimos 60 segundos
- **Sum**: Soma total dos valores transacionados
- **Average**: Média dos valores das transações
- **Min**: Menor valor transacionado
- **Max**: Maior valor transacionado

## 🔧 Como Executar

### Pré-requisitos
- Java SDK 17
- Docker (opcional)

## Execução Local
## Execução via VS Code/Terminal com Node.js
No VS Code, abra um terminal. Na raiz do projeto e digite `npm install` para instalar as dependências e em seguinda digite `npm start` para iniciar o projeto.

## Docker
Para executar no Docker, execute o comando `docker build -t <nome-da-imagem> .`. Após a montagem da imagem, digite `docker run -p 3000:3000 <nome-da-imagem>`.

## 🏗️ Arquitetura

- **Controller Layer**: Gerencia requisições HTTP e respostas
- **Service Layer**: Contém lógica de negócio para processamento de transações
- **Model Layer**: Define estruturas de dados (Transaction, SummaryStatistics)
- **In-Memory Storage**: Armazenamento temporário para alta performance

## 🔍 Monitoramento

A API inclui:
- **Health Check**: Endpoint `/api/Health` para verificação do status da aplicação
- **Logging Estruturado**: Logs detalhados de todas as operações
- **Métricas de Performance**: Medição do tempo de cálculo das estatísticas

## ⚡ Performance

O sistema foi otimizado para:
- Cálculo de estatísticas em tempo real
- Armazenamento em memória para acesso rápido
- Validação eficiente de dados de entrada
- Logging não-bloqueante