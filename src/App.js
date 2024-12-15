// Importing necessary styles and components
import "./App.css"; // Main CSS for styling
import ToDoList from "./Components/ToDoList"; // ToDoList component
import { v4 as IdUnique } from "uuid"; // UUID for unique ID generation
import { TodosContext } from "./Contexts/TodoContext"; // Context for managing todos
import { useState } from "react"; // React hook for state management

// Initial todos array with some default values
const initialTodos = [
  {
    id: IdUnique(), // Unique ID for the todo
    title: "reading", // Title of the todo
    details: "reading new book", // Details of the todo
    isComplited: false, // Completion status
  },
  {
    id: IdUnique(),
    title: "reading",
    details: "reading new book",
    isComplited: false,
  },
  {
    id: IdUnique(),
    title: "reading",
    details: "reading new book",
    isComplited: false,
  },
];

// Main App component
function App() {
  // State to manage todos
  const [todos, setTodos] = useState(initialTodos);

  return (
    <div className="App">
      {/* Providing the todos and setTodos to the context */}
      <TodosContext.Provider value={{ todos: todos, setTodos: setTodos }}>
        <ToDoList /> {/* Rendering the ToDoList component */}
      </TodosContext.Provider>
    </div>
  );
}

// Exporting the App component as default
export default App;
