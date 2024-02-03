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
## Website
![slika1](https://github.com/anik0lic/jewelry-web-store/assets/47865126/ba5fb1e8-2c83-47bf-a73b-f444cd4c9409)
![slika2](https://github.com/anik0lic/jewelry-web-store/assets/47865126/ffbe8f6a-cde8-46d9-8f32-8f1527a56dc3)
![slika3](https://github.com/anik0lic/jewelry-web-store/assets/47865126/55abe15c-c9c1-4f81-aab6-0674c3811056)
![slika4](https://github.com/anik0lic/jewelry-web-store/assets/47865126/e25e0433-44b2-46a7-ba4b-e00708d05562)
