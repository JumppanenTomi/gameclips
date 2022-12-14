# gameclips-backend
Gameclips is open-source application for gamers to share their gaming highlights, bugs and tutorials. API itself is built using [express.js](https://expressjs.com/).
## Demo
Before you start hosting your own site, you might wan't to test our [demo](https://gameclips.northeurope.cloudapp.azure.com/). You can also test our API endpoints from this url https://gameclips.northeurope.cloudapp.azure.com/app/
## Installation
### Database
In order to Node app to work, it needs database to store data.
On local developement environment easiest way to host database is Xampp.

1. Download Xampp from [here](https://www.apachefriends.org/download.html).
2. Install Xampp and head over to `phpMyAdmin` using [these](https://www.youtube.com/watch?v=h6DEDm7C37A&t=70s) instruction.
3. Create database called "gameclips".
4. Once you are in phpMyadmin click `"Import"`-button from navigation.
5. Click on `"Choose file"`-button and select [this](https://github.com/JumppanenTomi/gameclips-database/blob/main/gameclips.sql) file. And after that, from bottom click `"Import"`.

Great, now our database things are ready!

### Node.js app
Because it's BIIIG security-risk to let client communicate straight with database we need REST API server in-between.

1. Download and install Node.js from [here](https://nodejs.org/en/) (we recommend "LTS" versions).
2. After Node.js setup, download this repo's "main"-branch to desired folder.
3. Now we want to open your project's folder in terminal. To do this, open terminal app and type following:
```sh
    cd /path/to/your/project/here
```
4. Next we install node_modules. This happens with this command:
```sh
    npm install
```
5. After this you want to add `.env` file into your project's root directory. Good idea is to use some IDE, like Visual Studio Code in here.<br>
Your `.env` file should look something like this:
```sh
    #following values work on default xampp configuration
    DB_HOST='localhost'             #your database host here
    DB_USER='root'                  #your database username here
    DB_PASSWORD=''                  #your database password here
    DB_NAME='gameclips'             #your database name here
    JWT_SECRET='your_jwt_secret'    #your random string that is used to crypt tokens
```
6. After this you are good to go. To start your API-server type this to terminal (`make sure your database is on`):
```sh
    npm start
```
Now you have REST API server online and working on `localhost:3000`. You can test it using API-platform like [Postman](https://postman.com/).<br>
API documentatition coming later.
 ### Website
Using our application with Postman on long-term doesn't seem wise, so we need web-client to do the job.<br>
Following steps are Xampp only
1. Download [this](https://github.com/JumppanenTomi/gameclips-frontend) repo's "main"-branch toi desired folder.
2. Next using [this](https://www.youtube.com/watch?v=WYufSGgaCZ8) tutorial load your files to your Xampp's Apache-server.

Your application should now automatticaly use your local Node.js app, but in case you need to connect into other Node.js app you can change url from websites path `\scripts\utils\url.js`.