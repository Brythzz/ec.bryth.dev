# ec.bryth.dev

Web app to calculate grade averages using *EcoleDirecte* credentials  
Built with [Vue.js](https://vuejs.org) and [Express.js](https://expressjs.com)

## Setup
```sh
npm install

#Node
node src/server
#PM2
pm2 start src/server --name ec.bryth.dev
```

By default, the app will start on port `3000`

### Nginx config
```nginx
server {
  listen           80;
  server_name      ec.bryth.dev;
  root             /var/www/ec.bryth.dev/public;

  location / {
    error_page     500 502 503 504 =200 @error_page;
    proxy_pass     http://127.0.0.1:3000/;
  }

  location @error_page {
    try_files      $uri error-page.html =503;
  }
}
```

## `.env` file
```
MONGO_URI=mongodb+srv://user:password@cluster_name.mongodb.net/database?retryWrites=true&w=majority
PORT=3000
```

## Database

The app uses a MongoDB (document) database to store usage analytics

School document:
```js
{
  _id: ObjectId,
  name: String,
  uniqueLogins: Int
}
```

User document:
```js
{
  _id: Int, // EcoleDirecte "idLogin"
  logins: Int
}
```
 
## Changelog

### 2.2.2
Improve accessibility  
Optimize performance  
Add analytics (backend)

### 2.2.1
Theme experiment instant refresh

### 2.2.0
Remove axios

### 2.1.9
Ducky santa hat for Christmas

### 2.1.8
Bugfix (experiments tab showing `[]` when disabled)

### 2.1.7
Fix trimester dates

### 2.1.6
Routing improvements

### 2.1.5
Pink theme experiment (`pinkTheme`)

### 2.1.4
General improvements

### 2.1.3
Bugfix (remove optional chaining for older browsers)

### 2.1.2
Bugfix (ignore subjects with no grades)

### 2.1.1
Improve inputs styling

### 2.1.0
Experiments system  
Ignore computer science grades experiment (`ignoreCs`)

## Screenshots

### Version 2 (May 2021)
![v2_login](https://user-images.githubusercontent.com/62302815/158897934-a38ee3a4-e8b8-473c-8b5f-e6e383a1e28d.png)
![v2_grades](https://user-images.githubusercontent.com/62302815/158897933-39ed3420-d4e8-4b8a-8914-5d4607e68802.png)
![v2_settings](https://user-images.githubusercontent.com/62302815/158897935-eb46cd69-0fee-4b2d-8177-8317c68ffef3.png)

### Version 1 (December 23, 2020)
![v1_grades](https://user-images.githubusercontent.com/62302815/158897930-d3f95bc6-b37f-4601-8be8-d17570ed4221.png)
![v1_login](https://user-images.githubusercontent.com/62302815/158897932-66fe6595-e77a-4c9f-9459-5655b1614992.png)

### Prototype (November 2020)
![prototype_grades](https://user-images.githubusercontent.com/62302815/158897924-5af96457-aa46-491f-b7eb-df92add75363.png)
![prototype_login](https://user-images.githubusercontent.com/62302815/158897928-aec0687d-2ce4-40c8-9dec-79e6d3b985a1.png)
