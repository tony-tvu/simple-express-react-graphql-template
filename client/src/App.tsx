import React, { useState } from "react"
import "./App.css"
import { useQuery, gql, useMutation } from "@apollo/client"

interface User {
  id: string
  name: string
  age: number
  createdAt?: string
  updatedAt?: string
}

const query = gql`
  query usersQuery {
    getAllUsers {
      id
      name
      age
      createdAt
      updatedAt
    }
  }
`

const createMutation = gql`
  mutation create($input: UserInput!) {
    createUser(newUserInput: $input) {
      id
      name
      age
      createdAt
      updatedAt
    }
  }
`

const deleteMutation = gql`
  mutation deleteMutation($input: String!) {
    deleteUser(id: $input)
  }
`

const updateMutation = gql`
  mutation updateQuery($input: UserInput!) {
    updateUser(editUserInput: $input) {
      id
      name
      age
      createdAt
      updatedAt
    }
  }
`

function App() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [deleteId, setDeleteId] = useState("")
  const [createErrorMessage, setCreateErrorMessage] = useState("")
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("")
  const [updateErrorMessage, setUpdateErrorMessage] = useState("")
  const [updateId, setUpdateId] = useState("")
  const [updateName, setUpdateName] = useState("")
  const [updateAge, setUpdateAge] = useState("")

  const { loading, error, data } = useQuery(query)
  const [createUser] = useMutation(createMutation)
  const [deleteUser] = useMutation(deleteMutation)
  const [updateUser] = useMutation(updateMutation)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :</p>

  function handleCreateUser(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    setCreateErrorMessage("")
    if (name === "") {
      setCreateErrorMessage("Name cannot be blank.")
      return
    }
    if (!/^-?\d+$/.test(age)) {
      setCreateErrorMessage("Age must be a number.")
      return
    }

    createUser({
      variables: {
        input: {
          name: name,
          age: parseInt(age),
        },
      },
    }).then(() => {
      //reload page on success
      window.location.reload()
    })
  }

  function handleDeleteUser(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    setDeleteErrorMessage("")
    if (deleteId === "") {
      setDeleteErrorMessage("ID cannot be blank.")
      return
    }

    deleteUser({
      variables: {
        input: deleteId,
      },
    })
      .then(() => {
        //reload page on success
        window.location.reload()
      })
      .catch((err) => {
        setDeleteErrorMessage(`User with id ${deleteId} does not exist.`)
      })
  }

  function handleUpdateUser(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    setUpdateErrorMessage("")

    // get existing user
    const user: User = data.getAllUsers.filter(
      (user: User) => user.id === updateId
    )[0]

    if (!user) {
      setUpdateErrorMessage("That user does not exist.")
      return
    }

    let updatedUser: User = {
      id: user.id,
      name: user.name,
      age: user.age,
    }

    if (updateName !== "") updatedUser.name = updateName
    if (updateAge !== "") {
      if (!/^-?\d+$/.test(updateAge)) {
        setUpdateErrorMessage("Age must be a number.")
        return
      }
      updatedUser.age = parseInt(updateAge)
    }

    updateUser({
      variables: {
        input: {
          id: updatedUser.id,
          name: updatedUser.name,
          age: updatedUser.age,
        },
      },
    })
      .then(() => {
        //reload page on success
        window.location.reload()
      })
      .catch((err) => {
        setUpdateErrorMessage(`Something went wrong.`)
      })
  }

  return (
    <div className="App">
      <h1>Create User</h1>
      <form
        onSubmit={(event) => {
          handleCreateUser(event)
        }}
      >
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div style={{ color: "red" }}>{createErrorMessage}</div>

      <h1>Delete User</h1>
      <form
        onSubmit={(event) => {
          handleDeleteUser(event)
        }}
      >
        <label>
          User ID:
          <input
            type="text"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div style={{ color: "red" }}>{deleteErrorMessage}</div>

      <h1>Update User</h1>
      <form
        onSubmit={(event) => {
          handleUpdateUser(event)
        }}
      >
        <label>
          User ID:
          <input
            type="text"
            value={updateId}
            onChange={(e) => setUpdateId(e.target.value)}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="text"
            value={updateAge}
            onChange={(e) => setUpdateAge(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div style={{ color: "red" }}>{updateErrorMessage}</div>

      <h1>All Users</h1>
      {data.getAllUsers.length !== 0 ? (
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
            {data.getAllUsers.map((user: User, key: React.Key) => {
              return (
                <tr key={key}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.createdAt}</td>
                  <td>{user.updatedAt}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <div>no data</div>
      )}
    </div>
  )
}

export default App
