# Social network application

### Run in dev move:
1) add **.env** file with the following fields:
  - DB_NAME
  - DB_USER
  - DB_PASSWORD
  - DB_HOST
  - DB_PORT
  - JWT_SECRET
  - TOKEN_LIFE_TIME
  - ADMIN_PASSWORD
  - PORT

  
2) install dependencies - `npm install`

3) run migrations - `npm run migrate:latest`

4) run seeds - `npm run seed:run`

5) run application - `npm start`

### Run tests:
1) add to the **.env** file following fields:
  - TEST_DB_NAME

2) run application - `npm test`