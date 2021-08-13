# Client side of Trello-clone app

## About The Project
The application allows:
- Create, delete, rename boards
- Add, delete, update text tasks
- Search tasks
- Assign users to tasks
- View the history of activity tasks(in work)
- Invite users to the board with link
- Auth Google(in work)

### Tech
The application uses the following platforms, frameworks and libraries:

- node.js
- Express
- sequelize
- postgreSQL
- cors
- bcrypt
- passport

## Getting Started
Requires [Node.js](https://nodejs.org/) v14.17.3 to run.
The client side is [here](https://github.com/Vetal26/trello-clone-front.git)

### Installation
1. Clone the repo.
```sh
git clone https://github.com/Vetal26/trello_clone_server.git
```

2. Install the dependencies.
```sh
npm install
```

3. Сreate a .env file and add the following content:
```sh
PORT=3333
DB_HOST='127.0.0.1'
DB_USERNAME=%your_login%
DB_PASSWORD=%your_password%
JWT_SECRET
```

4. Create database and run data migration
```sh
npm run db:create
npm run db:migrate
```


5. Start the server
```sh
npm run start:dev
```

## Contact
If you have any questions, please contact by email: vbshmit@gmail.com.
Sincerely Vitaly Borisov.