import { useState, useEffect } from "react";
import Login from "./components/Login.jsx";

const API_URL = "http://localhost:3000";

function App() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!token) return;
    fetch(`${API_URL}/v1/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, [token]);

  if (!token) return <Login setToken={setToken} />;

  return (
    <div>
      <h1>Users</h1>
      {users.length === 0 ? <p>No users found</p> :
        <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>}
    </div>
  );
}

export default App;
