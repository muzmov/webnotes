# Webnotes GTD [![Build Status](https://travis-ci.org/muzmov/webnotes.svg?branch=master)](https://travis-ci.org/muzmov/webnotes) 

Попытка создать удобную систему для планирования задач по методике Getting Things Done, а заодно попрактиковаться в использовании различных технологий

## Локальный запуск

**Все вместе в докере** 

docker-compose up --build  
приложение доступно на localhost:8080


**Фронт на заглушках**

cd src/ui  
npm run dev 

**Тесты в докере**

docker build -t muzmov/webnotes-test -f Dockerfile.test .  
docker run muzmov/webnotes-test

## Установка в Elastic Beanstalk AWS

Автоматически при помощи Travis CI при коммите в мастер
