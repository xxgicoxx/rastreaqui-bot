# RastreAQUI
Telegram bot for track Correios objects.

![Bot](https://i.imgur.com/ZefbpI0.png)

# Prerequisites
* [Node.js](https://nodejs.org/en/) - Node.js

# Running
### 1. Configure
````
# Bot
Create and configure .env file like .env.example
````

### 2. Telegram
````
# Create an Telegram bot
Find @BotFather on Telegram, type /newbot and follow the instructions

# Username
Get your bot username and set 'TELEGRAM_USERNAME' in .env

# Token
Get your token from @BotFather and set 'TELEGRAM_TOKEN' in .env
````

### 3. PostgreSQL
````
# Install
Install PostgreSQL and create an database

# Configure
Set PostgreSQL username, password, database, host and dialect in .env
````

### 4. Sequelize
````
# Install dependencies
npm install

# Create tables
npx sequelize db:migrate

# Seed tables
npx sequelize-cli db:seed:all
````

### 5. Run
````
# Install dependencies
npm install

# Start
npm start
````

# Built With
* [Node.js](https://nodejs.org/en/)

# Authors
* [xxgicoxx](https://github.com/xxgicoxx)

# Acknowledgments
* [FlatIcon](https://www.flaticon.com/)