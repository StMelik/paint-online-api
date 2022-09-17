# Проект: Paint Онлайн (серверная часть)

## Описание
Серверная часть Paint Онлайн

## Функциональность
* Передача данных о рисунке между подключившимися к одной сессии пользователями
* Сохранение и раздача фото рисунков

## Технологии
* JavaScript
* NodeJS
* Express
* WebSocket

## Адреса
Сервер - [https://paint23.herokuapp.com/](https://paint23.herokuapp.com/)

Проект - [https://paint23.netlify.app/](https://paint23.netlify.app/)

## Установка и запуск сервера
1. Клонировать репозиторий:  
  `clone https://github.com/StMelik/paint-online-api.git`

2. Перейти в папку с сервером:  
  `cd paint-online-api`

3. Установить зависимости:  
  `npm install`

4. Запустить сервер:  
  `npm run start`

## Маршруты

* WebSocket  
  `/`

* Получить изображение  
  `GET /image`

* Загрузить изображение  
  `POST /image`
