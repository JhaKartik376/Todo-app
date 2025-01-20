import React, { useState } from "react";
import { motion } from "framer-motion";
import "./index.css"; // Ensure Tailwind CSS is imported

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  // Add a new task
  const addTask = () => {
    if (task.trim()) {
      setTasks([
        ...tasks,
        { task, priority, dueDate, completed: false },
      ]);
      setTask("");
      setPriority("Medium");
      setDueDate("");
    }
  };

  // Delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Mark task as complete
  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Sort tasks by priority
  const sortedTasks = tasks.sort((a, b) => {
    const priorities = ["Low", "Medium", "High"];
    return priorities.indexOf(a.priority) - priorities.indexOf(b.priority);
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white p-8 rounded-3xl shadow-2xl overflow-hidden">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-6">Your Cool To-Do List</h1>

        {/* Input Section */}
        <div className="space-y-4 mb-6">
          <div className="flex space-x-4">
            <motion.input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter task"
              className="w-full px-6 py-4 border border-gray-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
              whileFocus={{ scale: 1.05 }}
            />
            <motion.button
              onClick={addTask}
              className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-xl hover:bg-gradient-to-l hover:from-indigo-400 hover:to-purple-400 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              Add Task
            </motion.button>
          </div>

          <div className="flex space-x-4">
            <motion.input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-6 py-4 border border-gray-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
              whileFocus={{ scale: 1.05 }}
            />
            <motion.select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-6 py-4 border border-gray-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
              whileFocus={{ scale: 1.05 }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </motion.select>
          </div>
        </div>

        {/* Task List with Animations */}
        <ul className="space-y-6">
          {sortedTasks.map((task, index) => (
            <motion.li
              key={index}
              className={`flex justify-between items-center p-4 border border-gray-200 rounded-xl shadow-lg transition-all duration-300 ${
                task.completed ? "bg-gray-200" : "bg-white"
              }`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              {/* Task Text */}
              <div className="flex items-center space-x-4">
                <motion.input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                  className="w-6 h-6 border-gray-300 rounded focus:ring-indigo-500 transition-all duration-300"
                  whileHover={{ scale: 1.2 }}
                />
                <span
                  className={`text-xl font-semibold text-gray-700 ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.task}
                </span>
              </div>

              {/* Task Due Date and Priority */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{task.dueDate}</span>
                <motion.span
                  className={`text-sm font-bold ${
                    task.priority === "High"
                      ? "text-red-500"
                      : task.priority === "Medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {task.priority}
                </motion.span>
              </div>

              {/* Delete Button */}
              <motion.button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700 transition-all duration-300"
                whileHover={{ scale: 1.2 }}
              >
                ❌
              </motion.button>
            </motion.li>
          ))}
        </ul>

        {/* Clear All Tasks Button */}
        {tasks.length > 0 && (
          <motion.button
            onClick={() => setTasks([])}
            className="w-full mt-6 py-4 bg-red-500 text-white rounded-xl shadow-xl hover:bg-red-600 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
          >
            Clear All Tasks
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default App;
