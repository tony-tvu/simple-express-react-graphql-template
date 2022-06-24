# Simple Apollo GraphQL

This is a simple full stack application built with Express, Apollo Graphql, MongoDB, React, and TypeScript which can be used as a template for your next project.

## Steps to Start Express Server
From terminal, cd into ``` /api ``` directory.

Start MongoDB container:
```
docker-compose up
```
OR
```
docker compose up
```

Install dependencies
```
npm install
```

Start server
```
npm start
```

If the server has started successfully, you should be able to navigate to http://localhost:8080 and see this:

``` {"message":"Simple API built with Express, Apollo GraphQL, and MongoDB."} ```

To populate test data, navigate to http://localhost:8080/graphql to use the GraphiQL tool. 

Run this query with any name and age on the fourth and fifth line below:
```
mutation create {
  createUser(
    newUserInput: {
      name: "BOB SMITH"
      age: 30
    }
  ) {
    id
    name
    age
    createdAt
    updatedAt
  }
}
```

To view all data using the GraphiQL tool, run:
```
query usersQuery {
  getAllUsers {
    id
    name
    age
    createdAt
    updatedAt
  }
}
```

To find a user by ID using the GraphiQL tool, run:
```
query getUserByIDQuery {
  getUserById(id: "62755d38ac344afc0af874c7") {
  	id
    name
    age
    createdAt
    updatedAt
  }
}
```

To delete a user by ID using the GraphiQL tool, run:
```
mutation deleteMutation {
  deleteUser(id: "62755d38ac344afc0af874c7")
}
```

To update a user by ID using the GraphiQL tool, run:
```
mutation updateQuery {
  updateUser(
    editUserInput: {
        id: "62755d9c711f1dfdee0edd06"
        name: "NEW NAME"
        age: 51
      }
  ) {
    id
    name
    age
    createdAt
    updatedAt
  }
}
```
