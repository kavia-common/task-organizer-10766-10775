import React, { useState } from "react";
import './figma_design_system.css';

/**
 * PUBLIC_INTERFACE
 * StatusBar visual indicator. Decorative only for web.
 */
function StatusBar() {
  return (
    <div className="figma-status-bar" />
  );
}

/**
 * PUBLIC_INTERFACE
 * AppBar at the top of the screen.
 * @param {object} props - title, onBack (optional/back navigation), children
 */
function AppBar({ title, onBack, children }) {
  return (
    <div className="figma-appbar" style={{ height: 118, position: "relative" }}>
      {onBack && (
        <button
          aria-label="Back"
          style={{
            position: "absolute",
            left: 18,
            top: 44,
            background: "none",
            border: "none",
            cursor: "pointer"
          }}
          onClick={onBack}
        >
          <img src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/ead06132-5398-4162-9100-ac1b76c86165"
               alt="Back" width={25}/>
        </button>
      )}
      <span className="figma-appbar-title" style={onBack ? { marginLeft: 56 } : {}}>{title}</span>
      {children}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * A single todo item row with actions.
 * @param {object} props - todo, onComplete, onEdit, onDelete
 */
function TodoItem({ todo, onComplete, onEdit, onDelete }) {
  return (
    <div className="figma-card figma-todo-bar">
      <div>
        <div className="figma-todo-title">{todo.title}</div>
        <div className="figma-todo-subtitle">{todo.detail}</div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button aria-label="toggle complete" onClick={() => onComplete(todo.id)}
                style={{ background: "none", border: "none", padding: 0 }}>
          <img
            src={
              todo.completed
                ? "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/fbdbc197-919e-4290-b0f3-815ca8d7444a"
                : "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/8ef9572f-6b64-4962-bfb2-498ff23bba69"
            }
            alt={todo.completed ? "completed" : "not completed"}
            width={25}
            height={25}
          />
        </button>
        <button aria-label="edit" onClick={() => onEdit(todo.id)}
                style={{ background: "none", border: "none", padding: 0 }}>
          <img
            src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7520a42d-ea4d-401d-956b-cb035101252c"
            alt="edit"
            width={25}
            height={25}
          />
        </button>
        <button aria-label="delete" onClick={() => onDelete(todo.id)}
                style={{ background: "none", border: "none", padding: 0 }}>
          <img
            src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4f9b5752-3135-4167-9788-499d5d1a6f57"
            alt="delete"
            width={25}
            height={25}
          />
        </button>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * List of todo items.
 * @param {object} props - todos, onComplete, onEdit, onDelete
 */
function TodoList({ todos, onComplete, onEdit, onDelete }) {
  return (
    <div>
      {todos.length === 0 ? (
        <div style={{ color: "#8b8787", padding: 24, textAlign: "center" }}>
          No todos yet.
        </div>
      ) : (
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onComplete={onComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Floating Action Button to add a new todo.
 */
function FloatingActionButton({ onClick }) {
  return (
    <button
      className="figma-fab"
      aria-label="Add new todo"
      onClick={onClick}
    >
      <img
        src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/0079a008-aa12-4f84-aa1e-95f2722440c9"
        alt="Add"
        width={36}
        height={36}
      />
    </button>
  );
}

/**
 * PUBLIC_INTERFACE
 * Bottom navigation bar for filtering todos.
 */
function BottomNav({ selected, onSelect }) {
  return (
    <nav className="figma-navbar">
      <button
        className="figma-navbar-item"
        onClick={() => onSelect("all")}
        style={{ outline: "none" }}
      >
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/19a3e714-bf67-42a3-a769-361e5c897c64"
          alt="all"
          width={30}
          height={30}
        />
        <span className={`figma-navbar-label${selected === "all" ? "" : " inactive"}`}>All</span>
      </button>
      <button
        className="figma-navbar-item"
        onClick={() => onSelect("completed")}
        style={{ outline: "none" }}
      >
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/1dcac9b9-9778-44d6-ab81-0c6ccb28ba92"
          alt="completed"
          width={30}
          height={30}
        />
        <span className={`figma-navbar-label${selected === "completed" ? "" : " inactive"}`}>Completed</span>
      </button>
    </nav>
  );
}

/**
 * PUBLIC_INTERFACE
 * Add/Edit Todo form screen
 */
function AddTodoForm({ initial, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [detail, setDetail] = useState(initial?.detail || "");

  const submit = e => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ ...initial, title: title.trim(), detail: detail.trim() });
  };

  return (
    <>
      <StatusBar />
      <AppBar title={initial ? "Edit Task" : "Add Task"} onBack={onCancel} />
      <main style={{ maxWidth: 414, margin: "0 auto", padding: "32px 16px 96px 16px" }}>
        <form onSubmit={submit}>
          <div className="mb-md">
            <label htmlFor="todo-title" className="figma-title" style={{ display: "block" }}>
              Title
            </label>
            <input
              id="todo-title"
              className="figma-input-underline"
              placeholder="Enter todo title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
              maxLength={50}
              required
            />
          </div>
          <div className="mb-md">
            <label htmlFor="todo-detail" className="figma-title" style={{ display: "block" }}>
              Detail
            </label>
            <input
              id="todo-detail"
              className="figma-input-underline"
              placeholder="Enter details"
              value={detail}
              onChange={e => setDetail(e.target.value)}
              maxLength={120}
            />
          </div>
          <button className="figma-add-btn" id="add-todo-btn" type="submit">
            {initial ? "UPDATE" : "ADD"}
          </button>
        </form>
      </main>
    </>
  );
}

// PUBLIC_INTERFACE
// Main parent for todo app
function TodoApp() {
  // Demo todo data; replace with data fetched from backend for production.
  const [todos, setTodos] = useState([
    { id: 1, title: "TODO TITLE", detail: "TODO SUB TITLE", completed: false },
    { id: 2, title: "Buy groceries", detail: "Milk, Bread, Eggs", completed: false },
    { id: 3, title: "Call Alice", detail: "Wish happy birthday", completed: true }
  ]);
  const [screen, setScreen] = useState("list"); // "list" | "add" | "edit"
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");

  // Handlers for actions (locally scaffolded, real app would call backends)
  const goAdd = () => {
    setEditingId(null);
    setScreen("add");
  };
  const goList = () => {
    setEditingId(null);
    setScreen("list");
  };
  const onEdit = (todoId) => {
    setEditingId(todoId);
    setScreen("edit");
  };
  const onComplete = (todoId) => {
    setTodos(todos =>
      todos.map(t =>
        t.id === todoId ? { ...t, completed: !t.completed } : t
      )
    );
  };
  const onDelete = (todoId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTodos(todos => todos.filter(t => t.id !== todoId));
    }
  };
  const handleAddSubmit = data => {
    // If editing, replace; else add new
    if (screen === "edit" && editingId != null) {
      setTodos(todos =>
        todos.map(t => (t.id === editingId ? { ...t, ...data } : t))
      );
    } else {
      setTodos(todos => [
        { ...data, id: Math.max(0, ...todos.map(t => t.id)) + 1, completed: false },
        ...todos
      ]);
    }
    setScreen("list");
    setEditingId(null);
  };

  // Filter
  let shownTodos = todos;
  if (filter === "completed") {
    shownTodos = todos.filter(t => t.completed);
  }

  // Screen rendering
  if (screen === "add") {
    return <AddTodoForm onSubmit={handleAddSubmit} onCancel={goList} />;
  }
  if (screen === "edit" && editingId != null) {
    const todo = todos.find(t => t.id === editingId);
    return <AddTodoForm initial={todo} onSubmit={handleAddSubmit} onCancel={goList} />;
  }

  return (
    <div>
      <StatusBar />
      <AppBar title="TODO APP" />
      <main style={{ maxWidth: 414, margin: "0 auto", padding: "24px 8px 96px 8px" }}>
        <TodoList
          todos={shownTodos}
          onComplete={onComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        <FloatingActionButton onClick={goAdd} />
      </main>
      <BottomNav selected={filter} onSelect={setFilter} />
    </div>
  );
}

export default TodoApp;
