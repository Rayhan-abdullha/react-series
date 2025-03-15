import React from "react"

const UserList = ({user}: {user: {username: string, email: string}}) => {
  return (
    <div className="user">
        <p>{user.username}</p>
        <p>{user.email}</p>
    </div>
  )
}

export default UserList