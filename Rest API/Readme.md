# REST API Design

| Task no. | HTTP Method | Route                               | Operation                     |
|----------|-------------|-------------------------------------|-------------------------------|
| 1.       | GET         | /users                              | List all users                |
| 2.       | GET         | /users/:id (Dynamic Path Parameter) | Get the user with id          |
| 3.       | POST        | /users                              | Create a new user             |
| 4.       | PATCH       | /users/:id (Dynamic Path Parameter) | Update the user with id       |
| 5.       | DELETE      | /users/:id (Dynamic Path Parameter) | Delete the user with id       |

**Note:** `:id` is a variable or dynamic parameter.

## Fake Database
- [Mockaroo](https://www.mockaroo.com)

## Testing the API with Postman

[Postman](https://www.postman.com) is a powerful tool used to test APIs by sending requests to the endpoints and observing the responses. Here’s how we can use Postman to test the above API routes:

1. **GET /users**
   - Open Postman and create a new GET request.
   - Enter the URL `http://localhost:8000/api/users`.
   - Click `Send` to retrieve a list of all users.

2. **GET /users/:id**
   - Create a new GET request in Postman.
   - Enter the URL `http://localhost:8000/api/users/1` (replace `1` with the desired user ID).
   - Click `Send` to retrieve the details of the user with the specified ID.

3. **POST /users**
   - Create a new POST request in Postman.
   - Enter the URL `http://localhost:8000/api/users`.
   - Go to the `Body` tab, select `raw` and choose `JSON` from the dropdown.
   - Enter the user data in JSON format, for example:
     ```json
     {
       "first_name": "John",
       "last_name": "Doe",
       "email": "john.doe@example.com",
       "gender": "Male",
       "job_title": "Engineer"
     }
     ```
   - Click `Send` to create a new user with the provided data.

4. **PATCH /users/:id**
   - Create a new PATCH request in Postman.
   - Enter the URL `http://localhost:8000/api/users/1` (replace `1` with the ID of the user you want to update).
   - Go to the `Body` tab, select `raw` and choose `JSON` from the dropdown.
   - Enter the fields you want to update in JSON format, for example:
     ```json
     {
       "job_title": "Senior Engineer"
     }
     ```
   - Click `Send` to update the user with the specified ID.

5. **DELETE /users/:id**
   - Create a new DELETE request in Postman.
   - Enter the URL `http://localhost:8000/api/users/1` (replace `1` with the ID of the user you want to delete).
   - Click `Send` to delete the user with the specified ID.

Using Postman, we can easily test and verify our API endpoints to ensure they are working correctly. It allows us to quickly send requests, view responses, and debug any issues with our API.
