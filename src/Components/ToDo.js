// Importing Material-UI components
import Card from "@mui/material/Card"; // Card component for displaying todo
import CardContent from "@mui/material/CardContent"; // Content area of the Card
import Typography from "@mui/material/Typography"; // Text styling
import Grid from "@mui/material/Grid"; // Grid layout for responsive design
import IconButton from "@mui/material/IconButton"; // Icon button for actions

// Importing icons for actions
import CheckIcon from "@mui/icons-material/Check"; // Check icon for completing tasks
import EditIcon from "@mui/icons-material/Edit"; // Edit icon for editing tasks
import DeleteIcon from "@mui/icons-material/Delete"; // Delete icon for removing tasks

// Importing context for todos
import { useContext, useState } from "react"; // Hook for context management
import { TodosContext } from "../Contexts/TodoContext"; // Context for todos

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Main ToDo component
export default function ToDo({ todo }) {
  // Accessing todos and setTodos from context
  const { todos, setTodos } = useContext(TodosContext);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [todoValues, setTodoValues] = useState({
    title: todo.title,
    details: todo.details,
  });

  // Function to handle check button click
  function handleClickCheck() {
    const UpdatedTodos = todos.map((t) => {
      // Toggle isComplited status for the clicked todo
      if (t.id === todo.id) {
        t.isComplited = !t.isComplited;
      }
      return t; // Return updated todo
    });

    // Update the todos in context
    setTodos(UpdatedTodos);
    localStorage.setItem("todos" , JSON.stringify(UpdatedTodos)) ;
  }
  // function to handle button delete
  function handleClickDelete() {
    const UpdatedTodos = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(UpdatedTodos);
    localStorage.setItem("todos" , JSON.stringify(UpdatedTodos))
  }

  // function for handle click button edit
  function handleClickEdit() {
    setOpenEditDialog(true);
  }

  function handleClose() {
    setOpenEditDialog(false);
  }

  function handleAddEdit() {
    const UpdatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: todoValues.title, details: todoValues.details };
      }
      return t;
    });
    setTodos(UpdatedTodos);
    localStorage.setItem("todos" , JSON.stringify(UpdatedTodos))

    setOpenEditDialog(false);
  }

  return (
    <>
      <Dialog
        open={openEditDialog}
        onClose={handleClose}
        PaperProps={{
          component: "form",
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ width: "460px" }}>edit</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="task"
            label="task"
            type="text"
            fullWidth
            variant="standard"
            value={todoValues.title}
            onChange={(e) => {
              setTodoValues({ ...todoValues, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="details"
            label="details"
            type="text"
            fullWidth
            variant="standard"
            value={todoValues.details}
            onChange={(e) => {
              setTodoValues({ ...todoValues, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleAddEdit();
            }}
          >
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
      <Card
        sx={{
          minWidth: 275, // Minimum width of the card
          margin: "10px 0px", // Margin around the card
          backgroundColor: "#1E90FF", // Background color of the card
          color: "white", // Text color
        }}
        className="ToDoCard" // CSS class for styling
      >
        <CardContent>
          <Grid container spacing={1} style={{ alignItems: "center" }}>
            <Grid item xs={8}>
              <Typography variant="h5" component="div">
                {" "}
                {/* Title of the todo */}
                {todo.title}
              </Typography>
              <Typography variant="h6" component="div">
                {" "}
                {/* Details of the todo */}
                {todo.details}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              {/* Check button to mark task as completed */}
              <IconButton
                className="iconButton"
                aria-label="check"
                size="small"
                style={{
                  margin: "8px",
                  color: "#4CAF50", // Icon color
                  backgroundColor: todo.isComplited ? "green" : "#E3F2FD", // Background color based on completion
                  borderRadius: "4px", // Rounded corners
                }}
                onClick={() => {
                  handleClickCheck(); // Call function on click
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* End of check button */}

              {/* Edit button */}
              <IconButton
                className="iconButton"
                aria-label="edit"
                size="small"
                style={{
                  margin: "8px",
                  color: "#2196F3", // Icon color
                  backgroundColor: "#E3F2FD", // Background color
                  borderRadius: "4px", // Rounded corners
                }}
                onClick={() => {
                  handleClickEdit();
                }}
              >
                <EditIcon />
              </IconButton>

              {/* Delete button */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                size="small"
                style={{
                  margin: "8px",
                  color: "#F44336", // Icon color
                  backgroundColor: "#FFEBEE", // Background color
                  borderRadius: "4px", // Rounded corners
                }}
                onClick={() => {
                  handleClickDelete();
                }}
              >
                <DeleteIcon />
              </IconButton>
              {/* End of delete button */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
