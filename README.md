# ec.bryth.dev

Web app to calculate grade averages using *EcoleDirecte* credentials  
Built with [Vue.js](https://vuejs.org)

## Setup
```sh
npm install

# Build the js bundle
npm start

# Build the js bundle and watch for changes
npm run watch
```

## Database

The app used to use a MongoDB (document) database to store usage analytics

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

From Dec 27, 2021 to Jan 30, 2023, `45,316` logins were recorded in total (spanning across 1235 unique users from more than 30 schools)

## Changelog

### 2.4.1
Simplify functions  
Add image credit in console

### 2.4.0
Move the whole logic to the client side  
Remove analytics

### 2.3.1
Add Discord contact in console  
Add missing grades error handling

### 2.3.0
Move pink theme toggle to `/settings`  
Remove experiments system

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
![v2_settings](https://github.com/Brythzz/ec.bryth.dev/assets/62302815/b5e8e0c4-95ea-4cc3-8945-5bec4dddcab1)

![v2_login_pink](https://user-images.githubusercontent.com/62302815/158897934-a38ee3a4-e8b8-473c-8b5f-e6e383a1e28d.png)
![v2_grades_pink](https://user-images.githubusercontent.com/62302815/158897933-39ed3420-d4e8-4b8a-8914-5d4607e68802.png)
![v2_settings_pink](https://user-images.githubusercontent.com/62302815/158897935-eb46cd69-0fee-4b2d-8177-8317c68ffef3.png)

### Version 1 (December 23, 2020)
![v1_grades](https://user-images.githubusercontent.com/62302815/158897930-d3f95bc6-b37f-4601-8be8-d17570ed4221.png)
![v1_login](https://user-images.githubusercontent.com/62302815/158897932-66fe6595-e77a-4c9f-9459-5655b1614992.png)

### Prototype (November 2020)
![prototype_grades](https://user-images.githubusercontent.com/62302815/158897924-5af96457-aa46-491f-b7eb-df92add75363.png)
![prototype_login](https://user-images.githubusercontent.com/62302815/158897928-aec0687d-2ce4-40c8-9dec-79e6d3b985a1.png)
