React Workshop - Creating a full CRUD for Articles
==================================================

In this workshop we will create a list of articles, add, edit, view and delete them.

## Prerequisites

A basic Javascript and React course is required to go through this workshop. HTML & CSS is optional, but nice to know.

As technologies, we will use

- [json-server](https://github.com/typicode/json-server) library for the REST API;
- [Webpack](https://webpack.github.io/) for serving and compiling the React files;
- [Bootstrap](http://getbootstrap.com/) CSS framework for a simpler layout creation;

## Technical requirements & technology stack

The project requires NodeJS + npm, and port 3000 and 8000 free for json-server and webpack.

Every exercise folder uses an webpack dev server that serves and compiles the files on-the-fly.

## Get the repository

This is the simple way to get the project. It will download all files.

```sh
git clone https://github.com/cristiansarov/ReactWorkshop-CRUD.git
```

## Setup the API server

Install json-server globally

```sh
npm install -g json-server
```

Go to the api folder:

```sh
cd api
```

And open the server

```sh
json-server --watch db.json --routes routes.json --delay 500
```

The server must run in a different Terminal than the Webpack Dev Server below.

## Run an exercise

In a new Terminal go to the exercise folder

```sh
cd exercise1
```

Install dependencies

```sh
npm install
```

Start the development server

```sh
npm run dev
```

### This will open a server on port 8000:

[http://localhost:8000](http://localhost:8000)

To stop the dev server and go to the next exercise just press `CTRL+C` and follow the instruction above for the next exercise.

## Exercise Instructions

The exercises are created at the beginning step-by-step, and as you learn, the code will be replace with instructions.

* [Exercise 1 instructions](exercise1/docs/Instructions.md)
* [Exercise 2 instructions](exercise2/docs/Instructions.md)
* [Exercise 3 instructions](exercise3/docs/Instructions.md)
