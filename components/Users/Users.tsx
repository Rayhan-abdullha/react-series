import React, { useEffect } from 'react'
import UserList from './UserList';
type Users = {
    username: string,
    email: string
}
const Users = () => {
    const [users, setUsers] = React.useState<null | Users[]>([])
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then(response => response.json())  
            .then((data) => (
                console.log(data),
                setUsers(data)
            ))
      }, [])
  return (
      <div className='user-wrapper'>
          {
              users?.map((user: Users) => (
                  <UserList key={user.username} user={user}/>
              ))
          }
    </div>
  )
}

export default Users