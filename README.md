# coffee-shop-backend

## E-commerce site Back-end Application

Created GitHub repo with Node .gitignore and README.md
Cloned to local repo  
Ran  
npm init -y  
npm i express mongoose dotenv cors  
npm i nodemon --save-dev

### Created ./index.js

- Created express server with mongoose connection

### Created ./controller/

- Added and exported model for Products
- Created and exported routes

## Tested routes

### POST /products

![alt text](</public/Screenshot 2024-06-17 222609.png>)

### GET /products

![alt text](</public/Screenshot 2024-06-17 222620.png>)

### PUT /product/:productID

![alt text](</public/Screenshot 2024-06-17 222816.png>)

### GET /products/:productID

![alt text](</public/Screenshot 2024-06-17 222839.png>)

### Delete /products/:productID

![alt text](</public/Screenshot 2024-06-17 222958.png>)

## Middleware and User Routes

### Created src/middleware/

- Added auth.js, json web token user authentication

### /models

- Added User model with bcryptjs password hashing

### /routers

- Added and exported user authentication routes POST /login and POST /register

### Tested routes

#### POST /register

![alt text](</public/Screenshot 2024-06-18 221725.png>)

#### POST /login

![alt text](</public/Screenshot 2024-06-18 222840.png>)

#### GET /products protected route

![alt text](</public/Screenshot 2024-06-18 222956.png>)

### More routes

#### Get all users ADMIN ONLY

![alt text](</public/Screenshot 2024-06-20 022802.png>)

#### Get User by ID

![alt text](</public/Screenshot 2024-06-20 023152.png>)

#### Update a User by ID

![alt text](</public/Screenshot 2024-06-20 023248.png>)

#### Delete a User by ID (Admin Only)

![alt text](</public/Screenshot 2024-06-20 023421.png>)

#### Get a Single Product by ID

![alt text](</public/Screenshot 2024-06-20 024446.png>)

#### Update a Product by ID

![alt text](</public/Screenshot 2024-06-20 024534.png>)

#### Delete a Product by ID

![alt text](</public/Screenshot 2024-06-20 024547.png>)

#### Post a product with an image

![alt text](<Screenshot 2024-06-20 234446.png>)

#### Get products with filter and pagination

![alt text](<Screenshot 2024-06-20 234550.png>)
