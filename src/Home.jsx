import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Plus, CheckCircle2, Circle, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isToggling, setIsToggling] = useState(null); // Track which todo is being toggled
  const [isDeleting, setIsDeleting] = useState(null); // Track which todo is being deleted

  // Fetch data
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("https://todo-pi-plum-45.vercel.app/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Insert data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAdding) return;
    setIsAdding(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://todo-pi-plum-45.vercel.app/",
        {
          desc: newTodo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos([
        ...todos,
        {
          todo_id: response.data.todo_id,
          todo_desc: newTodo,
          status: "pending",
        },
      ]);
      setNewTodo("");
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  // Delete data
  const deleteTodo = async (id) => {
    if (isDeleting) return;
    setIsDeleting(id);

    setTodos(todos.filter((todo) => todo.todo_id !== id));
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://todo-pi-plum-45.vercel.app/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Deleted Successfully!");
      fetchData();
    } catch (error) {
      console.error("Error occurred:", error);
      fetchData();
    } finally {
      setIsDeleting(null);
    }
  };

  // Toggle status between 'pending' and 'completed'
  const toggleStatus = async (id) => {
    if (isToggling === id) return;
    setIsToggling(id);

    const todo = todos.find((todo) => todo.todo_id === id);
    const updatedStatus = todo.status === "completed" ? "pending" : "completed";

    setTodos(
      todos.map((todo) =>
        todo.todo_id === id ? { ...todo, status: updatedStatus } : todo
      )
    );

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://todo-pi-plum-45.vercel.app/${id}`,
        {
          desc: todo.todo_desc,
          status: updatedStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Status updated successfully!");
    } catch (error) {
      console.error(error.message);
      fetchData();
    } finally {
      setIsToggling(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-500 to-black p-6 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto shadow-2xl rounded-xl overflow-hidden">
        <div className="bg-white/10 backdrop-blur-lg text-white p-6">
          <motion.h1
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-3xl font-bold"
          >
            TODO List
          </motion.h1>
        </div>
        <div className="p-6 space-y-6 bg-white/5 backdrop-blur-lg">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              placeholder="What would you like to do?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              required
              className="w-full bg-white/80 border-none pl-4 pr-12 py-4 text-lg rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={isAdding}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full p-3 shadow-lg transition-all duration-300"
            >
              {isAdding ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
            </button>
          </form>

          <div className="space-y-4">
            <div className="grid grid-cols-[1fr,auto,auto] gap-4 text-sm text-white/70 pb-2 px-2">
              <div>Task</div>
              <div>Status</div>
              <div>Action</div>
            </div>
            <AnimatePresence>
              {todos.map((todo) => (
                <motion.div
                  key={todo.todo_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-[1fr,auto,auto] items-center bg-white/80 p-4 rounded-xl shadow-md"
                >
                  <span
                    className={`text-gray-700 ${
                      todo.status === "completed"
                        ? "line-through text-gray-400"
                        : ""
                    }`}
                  >
                    {todo.todo_desc}
                  </span>
                  <div>
                    <button
                      onClick={() => toggleStatus(todo.todo_id)}
                      disabled={isToggling === todo.todo_id}
                      className={`rounded-full px-3 py-1 text-white ${
                        todo.status === "completed"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {isToggling === todo.todo_id ? (
                        <Loader className="h-5 w-5 animate-spin" />
                      ) : todo.status === "completed" ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 inline" />
                          <span className="ml-2 hidden md:inline">
                            Completed
                          </span>
                        </>
                      ) : (
                        <>
                          <Circle className="h-5 w-5 inline" />
                          <span className="ml-2 hidden md:inline">Pending</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => deleteTodo(todo.todo_id)}
                      disabled={isDeleting === todo.todo_id}
                      className="text-gray-400 hover:text-red-500 hover:bg-red-100 p-2 rounded-full"
                    >
                      {isDeleting === todo.todo_id ? (
                        <Loader className="h-5 w-5 animate-spin" />
                      ) : (
                        <Trash2 className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {todos.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-white/70 py-8"
              >
                No tasks yet. Add one to get started!
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
