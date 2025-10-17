import { useEffect, useState } from "react";
import { getUsers } from "./api";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  getUsers().then(data => setUsers(data.results || [])); // <-- yahi change
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.length > 0 ? (
          users.map(u => <li key={u._id}>{u.name}</li>)
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
}

export default App;
