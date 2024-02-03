# Jewelry Web Store
Web Store developed for University. **RESTful API Backend** is built in **Node.js** using the **Express framework** and **frontend application using Vue.js**.

There is three services:
1. **api_service**: communication with database
2. **auth_service**: responsible for authentication
3.  **app_service**: frontend that serves both user and admin application

## Database
![database](https://github.com/anik0lic/jewelry-web-store/assets/47865126/d082f155-159a-47ee-a366-c1ac6a4435c1)

## Running
Start MySQL and Apache Web Server on your computer.

In all services run commands:
```
npm install
```
In api_service run:
```
sequelize db:migrate
sequelize db:seed:all
```
Run all services with:
```
node app
```
Run frontend with:
```
npm run serve
```
