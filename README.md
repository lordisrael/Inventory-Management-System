# Inventory Management System API

Inventory Management System API documentation for managing inventory, user authentication, and various operations related to products, categories, departments, and transactions.

Base URL
The base URL for all API endpoints is:

https://invmansys.onrender.com/

## Authentication Endpoints
### Login
POST /auth/login
Login to the Inventory Management System.

### Register
POST /auth/register
Register a new user.

### Logout
GET /auth/logout
Logout the current user.

### Refresh
GET /auth/refresh
Refresh the authentication token.

### Forgot Password
POST /auth/forgot
Initiate the password reset process.

### Reset Password
PATCH /auth/reset/{token}
Reset the password using the provided token.

### Update Password
PUT /auth/update-password
Update the authenticated user's password.

### User Profile
GET /auth/profile
Get the profile of the authenticated user.

## Product Management
### Create Product
POST /products/create
Create a new product.

### Sell Products
POST /products/sell
Sell one or more products.

### Add to Quantity
PUT /products/add/{productId}
Add a specified quantity to an existing product.

### Get a Product
GET /products/get-aproduct/{productId}
Get details of a specific product.

### Delete Product
DELETE /products/delete/{productId}
Delete a product.

### Get All Products
GET /products/getall
Get details of all products.

### Update Product
PUT /products/update/{productId}
Update details of a specific product.

## Category Management
### Get Category
GET /category/get/{categoryId}
Get details of a specific category.

### Create Category
POST /category/create
Create a new category.

### Delete Category
DELETE /category/delete/{categoryId}
Delete a category.

### Edit Category
PUT /category/edit/{categoryId}
Edit the title of a specific category.

### Get All Categories
GET /category/getall
Get details of all categories.

## Department Management
### Get Department
GET /department/get/{departmentId}
Get details of a specific department.

### Create Department
POST /department/create
Create a new department.

### Delete Department
DELETE /department/delete/{departmentId}
Delete a department.

### Edit Department
PUT /department/edit/{departmentId}
Edit the title of a specific department.

### Get All Department
GET /department/getall
Get details of all departments.

## Transaction Management
### Get A Transaction
GET /transaction/get-atransaction/{transactionId}
Get details of a specific transaction.

### Get All Transactions
GET /transaction
Get details of all transactions.

### Delete Transaction
DELETE /transaction/delete/{transactionId}
Delete a transaction.

### Top 3 Products Sold
GET /transaction/top3
Get the top 3 products sold.

### Top 3 Departments
GET /transaction/department
Get the top 3 departments based on transactions.

### Get A Week Transaction
GET /transaction/week
Get transactions for the current week

## Search
GET /search/results?sku=100001
Search for a product by SKU.

Security
This API uses token-based authentication. Include the authentication token in the Authorization header as Bearer <token> for secured endpoints.

Contributing
If you would like to contribute to the development of this API or report any issues, please create a pull request or submit an issue on the GitHub repository. Contributions are welcome!




