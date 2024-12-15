// Importing Material-UI components and other necessary libraries
import Container from "@mui/material/Container"; // Container for layout
import Card from "@mui/material/Card"; // Card component for display
import CardContent from "@mui/material/CardContent"; // Content area of the Card
import Typography from "@mui/material/Typography"; // Text styling
import Divider from "@mui/material/Divider"; // Divider for separation
import ToggleButton from "@mui/material/ToggleButton"; // Toggle button for filters
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"; // Grouping toggle buttons
import ToDo from "./ToDo"; // ToDo component to display individual tasks
import Grid from "@mui/material/Grid"; // Grid layout for responsive design
import TextField from "@mui/material/TextField"; // Input field for new tasks
import Button from "@mui/material/Button"; // Button for actions
import { useEffect, useMemo, useState } from "react"; // Hook for state management
import { useContext } from "react"; // Hook for context management
import { TodosContext } from "../Contexts/TodoContext"; // Context for todos
import { v4 as IdUnique } from "uuid"; // UUID for unique ID generation

// Main ToDoList component
export default function ToDoList() {

  //  t
  // Extracting todos and setTodos from context
  const { todos, setTodos } = useContext(TodosContext);

  // State for input field
  const [titleInput, setTitleInput] = useState("");

  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  const complitedTodos = useMemo(()=>{
     return  todos.filter((t) => {
      return t.isComplited;
    });
  } , [todos]);
  const nonComplitedTodos = useMemo(()=>{
    
     return todos.filter((t) => {
      return !t.isComplited;
    }); 
  } , [todos])

  let TodosToBeRender = todos;

  if (displayedTodosType === "complited") {
    TodosToBeRender = complitedTodos;
  } else if (displayedTodosType === "non-complited") {
    TodosToBeRender = nonComplitedTodos;
  } else {
    TodosToBeRender = todos;
  }

  const todoJsx = TodosToBeRender.map((t) => {
    return <ToDo key={t.id} todo={t} />;
  });

  // Function to handle adding a new task
  function handleAddTask() {
    if (titleInput === "") {
      alert("le chemps est vide ");

      return;
    }

    const UpdatedTodos = [
      ...todos, // Spread existing todos
      { id: IdUnique(), title: titleInput, details: "", isComplited: false }, // New todo
    ];
    setTodos(UpdatedTodos);
    localStorage.setItem("todos", JSON.stringify(UpdatedTodos));
    setTitleInput(""); // Reset input field
  }

  function handleDisplayedTodosType(e) {
    setDisplayedTodosType(e.target.value);
  }

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos"); // Get todos from localStorage
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos)); // Parse and set todos if they exist
    } else {
      setTodos([]); // Set to an empty array if no todos are found
    }
  }, []);
  

  return (
    <Container maxWidth="sm">
      {" "}
      {/* Container with max width */}
      <Card sx={{ minWidth: 275, }} >
        {" "}
        {/* Card for task display */}
        <CardContent>
          <Typography variant="h3" component="div">
            {" "}
            {/* Header */}
            My Tasks
          </Typography>
          <Divider /> {/* Divider line */}
          {/* Toggle buttons for filtering tasks */}
          <ToggleButtonGroup
            color="primary"
            value={displayedTodosType} // Placeholder value
            exclusive
            aria-label="Platform"
            style={{ marginTop: "10px" }}
            onChange={handleDisplayedTodosType}
          >
            <ToggleButton value="complited">done</ToggleButton>
            <ToggleButton value="non-complited">not yet</ToggleButton>
            <ToggleButton value="all">all</ToggleButton>
          </ToggleButtonGroup>
          {/* End of toggle buttons */}
          {/* Rendering all todo items */}
          {todoJsx}
          {/* Input field and button for adding new tasks */}
          <Grid container>
            <Grid
              item
              xs={8} // Takes 8 columns on the grid
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <TextField
                id="outlined-basic"
                label="Task" // Label for input
                variant="outlined"
                style={{ width: "100%" }} // Full width
                value={titleInput} // Controlled input
                onChange={(e) => {
                  setTitleInput(e.target.value); // Update state on change
                }}
              />
            </Grid>
            <Grid
              item
              xs={4} // Takes 4 columns on the grid
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button
                variant="contained"
                style={{ width: "100%", height: "100%", marginLeft: "10px" }}
                onClick={() => {
                  handleAddTask(); // Call function to add task
                }}
              >
                Add Task
              </Button>
            </Grid>
          </Grid>
          {/* End of input field and button */}
        </CardContent>
      </Card>
    </Container>
  );
}
