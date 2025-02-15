# Executando a Aplicação com Docker

## Pré-requisitos
Para rodar a aplicação, certifique-se de que você tem o **Docker** instalado. Caso não tenha, siga as instruções para instalação no site oficial:

- [Instalar Docker](https://docs.docker.com/get-docker/)

## Passos para Executar

1. No terminal, navegue até o diretório do projeto.
2. Execute o seguinte comando para iniciar os containers:
```sh
   docker-compose up
```
3. Após a inicialização, acesse a aplicação no navegador através do endereço
```
  http://localhost:3000
```
4. Para interromper a execução, pressione Ctrl + C no terminal ou execute:
```sh
   docker-compose down
```