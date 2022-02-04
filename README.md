# admin-panel-app-nestjs-api

The admin-panel-app-nestjs-api is an example of the REST-API server. It was created by the Nestjs framework. It is the backend part of the fullstack app. Data stored SQL database: PostgreSQL: [postgres](https://www.heroku.com/postgres)

## Quick start

# Step 1 Clone repo

```bash
git clone git@github.com:konstantindergachev/admin-panel-app-nestjs-api.git
```

# Step 2 Install dependencies

```bash
npm install or yarn install
```

# Step 3 To hosting images I use Cloudinary

[cloudinary](https://cloudinary.com/)

# Step 4 Save your config variables into .env file (see .env.example)

```sh
SECRET_STRING=<jwt config secret>
PORT=<backend port>
UPLOAD_HOST=<images upload host>
CORS_HOST=<frontend host with port>

POSTGRES_HOST=<postgresql host>
POSTGRES_PORT=<postgresql port>
POSTGRES_USER=<user name>
POSTGRES_PASSWORD=<user password>
POSTGRES_DB=<database name>
```

# Step 5 Copy your frontend static files into the build folder

```bash
build
    |_ css
    |_ js
    |_ favicon.ico
    |_ index.html
```

# Step 6 Start the server in the development mode in the nodemon mode

```bash
 npm run start:dev or yarn start:dev
```

## The frontend part of this app is here: [admin-panel-app-vue3-interface](https://github.com/konstantindergachev/admin-panel-app-vue3-interface)

Author:
Konstantin Dergachev [portfolio](http://dergachevkonstantin.surge.sh/).
