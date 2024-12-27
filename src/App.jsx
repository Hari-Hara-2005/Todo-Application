import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  // Fetch data
  const [posts, setPosts] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("https://todo-pi-plum-45.vercel.app/");
      setPosts(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Insert data
  const [newTodo, setNewTodo] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://todo-pi-plum-45.vercel.app/", {
        desc: newTodo,
      });
      console.log("Successfully Inserted the data");
      fetchData();
      setNewTodo("");
    } catch (error) {
      console.error(error.message);
    }
  };

  // Edit data
  const [editTodo, setEditTodo] = useState("");
  const [id, setId] = useState(null);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editTodo) return;

    try {
      await axios.put(`https://todo-pi-plum-45.vercel.app/${id}`, {
        desc: editTodo,
      });
      fetchData();
      setEditTodo("");
      setId(null); // Clear the edit state after update
    } catch (error) {
      console.error(error.message);
    }
  };

  // Delete data
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://todo-pi-plum-45.vercel.app/${id}`);
      console.log("Deleted Successfully!");
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>

      {/* Display todos */}
      {posts.map((post) => (
        <div key={post.todo_id}>
          <h3>{post.todo_desc}</h3>
          {/* Edit and Delete buttons */}
          <button
            onClick={() => {
              setEditTodo(post.todo_desc);
              setId(post.todo_id);
            }}
          >
            Edit
          </button>
          <button onClick={() => deleteTodo(post.todo_id)}>Delete</button>
        </div>
      ))}

      {/* Form to submit a new todo */}
      <form onSubmit={handleSubmit}>
        <input
          value={newTodo}
          type="text"
          onChange={(e) => setNewTodo(e.target.value)}
          required
        />
        <button type="submit">Add Todo</button>
      </form>

      {/* Form to edit a todo (shown only if editing a todo) */}
      {id !== null && (
        <form onSubmit={handleEditSubmit}>
          <input
            value={editTodo}
            type="text"
            onChange={(e) => setEditTodo(e.target.value)}
            required
          />
          <button type="submit">Update Todo</button>
          <button type="button" onClick={() => setId(null)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
