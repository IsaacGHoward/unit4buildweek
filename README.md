# Build Week Scaffolding for Node and PostgreSQL
---
## Base URL: https://african-marketplace-unit-4.herokuapp.com/
---
|Type     |Endpoint           |Description        |Auth|
|:-------:|:-----------------------:|:----------------------:|:--:|
|POST     |/api/auth/register       |Register User           |No  |
|POST     |/api/auth/login          |Login User              |No  |
|GET      |/api/users               |get all users           |Yes |
|GET      |/api/items               |get all items           |Yes |
|GET      |/api/items/categories    |get all categories      |Yes |
|GET      |/api/items/categories/:category_id|get all items in category|Yes |
|GET      |/api/items/owner/:user_id|get all items from a user|Yes |
|POST     |/api/items               |create new item         |Yes |
|POST     |/api/items/owner/:item_id|add existing item to owner|Yes |
|PUT      |/api/items/:item_id      |update item             |Yes |
|DELETE   |/api/items/:item_id      |delete item             |Yes |

## Token must be in the header under Authorization for Auth endpoints
---
## POST Register
### Endpoint /api/auth/register
```
    {
        "user_username": "string",       required
        "user_password": "string",       required
        "role_id": integer,
    }
```
#### Returns
```
    {
        "user_id": "user id",
        "user_username": "registered user name",
        "role_name": "registered user's role (defaults to Owner)",
    }
```
---
## POST Login
### Endpoint /api/auth/login
```
    {
        "user_username": "user's registered user name",     required
        "user_password": "user's password"                  required
    }
```
#### Returns
```
    {
        "message": "success message",
        "token": "authentication token",
    }
```
---
## GET all Users
### Endpoint /api/users
#### Returns Array of All Users
```
    [
        {
            "user_id": integer,
            "user_username": "user's name",
            "user_password": "hashed user password",
            "role_name": "user's role name"
        }
    ]
```
---
## GET all Items
### Endpoint /api/items
#### Returns Array of All Items
```
    [
        {
            "item_id": integer,
            "item_name": "name of item",
            "item_description": "description of item (can be null)" ,
            "item_price": "string of item's price",
            "item_location": "location of item",
            "category_id": integer
        }
    ]
```
---
## GET all Categories
### Endpoint /api/items/categories 
#### Returns Array of All Categories
```
    [
        {
            "category_id": integer,
            "category_name": "name of category"
        }
    ]
```
---
## GET Items by Category
### Endpoint /api/items/categories/:category_id
#### Returns Array of All Items in Category
```
    [
        {
            "item_id": integer,
            "item_name": "name of item",
            "item_description": "description of item (can be null)" ,
            "item_price": "string of item's price",
            "item_location": "location of item",
            "category_id": integer
        }
    ]
```
---
## GET Items by User
### Endpoint /api/items/owner/:user_id
#### Returns Array of All Items a User has
```
    [
        {
            "user_id": integer,
            "item_id": integer,
            "item_name": "name of item",
            "item_description": "description of item (can be null)" ,
            "item_price": "string of item's price",
            "item_location": "location of item",
            "category_id": integer
        }
    ]
```
---
## POST add new Item
### Endpoint /api/items  
```
    {
        "item_name":"name of new item (unique)",       required
        "item_price":"price of new item",              required
        "item_location":"USA",                         required
        "item_description":"description of item",
        "category_id":integer                          required
    }
```
#### Returns
```
    {
        "item_id": integer,
        "item_name": "name of item",
        "item_description": "description of item (can be null)",
        "item_price": "string of item's price",
        "item_location": "location of item",
        "category_id": integer
    }
```
---
## POST Add existing Item to Owner by given ID
### Endpoint /api/items/owner/:item_id
#### Returns Array of Owner's Items
```
    [
        {
            "user_id": integer,
            "item_id": integer,
            "item_name": "name of item",
            "item_description": "description of item (can be null)" ,
            "item_price": "string of item's price",
            "item_location": "location of item",
            "category_id": integer
        }
    ]
```
---
## PUT Edit existing Item by given ID
### Endpoint /api/items/:item_id
```
    {
        "item_name":"name of new item (unique)",       Edit any of these fields
        "item_price":"price of new item",              
        "item_location":"USA",                         
        "item_description":"description of item",
        "category_id":integer                                
    }
```
#### Returns Edited Item
```
    {
        "item_name":"name of new item (unique)",       
        "item_price":"price of new item",              
        "item_location":"USA",                         
        "item_description":"description of item",
        "category_id":integer                                
    }
```
---
## DELETE Delete Item with given ID
### Endpoint /api/items/:item_id
#### Returns message response
```
    {
        "message": "Removed Item with ID : {ID} from DB"
    }
```
---


## Requirements

- [PostgreSQL, pgAdmin 4](https://www.postgresql.org/download/) and [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed in your local machine.
- A Heroku app with the [Heroku PostgreSQL Addon](https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-heroku-postgres) added to it.
- Development and testing databases created with [pgAdmin 4](https://www.pgadmin.org/docs/pgadmin4/4.29/database_dialog.html).

## Starting a New Project

- Create a new repository using this template, and clone it to your local.
- Create a `.env` file and follow the instructions inside `knexfile.js`.
- Fix the scripts inside `package.json` to use your Heroku app.

## Scripts

- **start**: Runs the app.
- **server**: Runs the app with Nodemon.
- **migrate**: Migrates the local development database to the latest.
- **rollback**: Rolls back migrations in the local development database.
- **seed**: Truncates all tables in the local development database, feel free to add more seed files.
- **test**: Runs tests.
- **deploy**: Deploys the main branch to Heroku.

**The following scripts NEED TO BE EDITED before using: replace `YOUR_HEROKU_APP_NAME_HERE`**

- **migrateh**: Migrates the Heroku database to the latest.
- **rollbackh**: Rolls back migrations in the Heroku database.
- **databaseh**: Interact with the Heroku database from the command line using psql.
- **seedh**: Runs all seeds in the Heroku database.

## Hot Tips

- Figure out the connection to the database and deployment before writing any code.

- If you need to make changes to a migration file that has already been released to Heroku, follow this sequence:

  1. Roll back migrations in the Heroku database
  2. Deploy the latest code to Heroku
  3. Migrate the Heroku database to the latest

- If your frontend devs are clear on the shape of the data they need, you can quickly build provisional endpoints that return mock data. They shouldn't have to wait for you to build the entire backend.

- Keep your endpoints super lean: the bulk of the code belongs inside models and other middlewares.

- Validating and sanitizing client data using a library is much less work than doing it manually.

- Revealing crash messages to clients is a security risk, but during development it's helpful if your frontend devs are able to tell you what crashed.

- PostgreSQL comes with [fantastic built-in functions](https://hashrocket.com/blog/posts/faster-json-generation-with-postgresql) for hammering rows into whatever JSON shape.

- If you want to edit a migration that has already been released but don't want to lose all the data, make a new migration instead. This is a more realistic flow for production apps: prod databases are never migrated down. We can migrate Heroku down freely only because there's no valuable data from customers in it. In this sense, Heroku is acting more like a staging environment than production.

- If your fronted devs are interested in running the API locally, help them set up PostgreSQL & pgAdmin in their machines, and teach them how to run migrations in their local. This empowers them to (1) help you troubleshoot bugs, (2) obtain the latest code by simply doing `git pull` and (3) work with their own data, without it being wiped every time you roll back the Heroku db. Collaboration is more fun and direct, and you don't need to deploy as often.
