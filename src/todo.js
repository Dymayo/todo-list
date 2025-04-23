function createTodo(title, description, dueDate, priority, completed = false) {
    return {
        title,
        description,
        dueDate,
        priority,
        completed
    };
}

// Toggles the 'completed' status of a todo object between true and false.
function toggleCompleted(todo) {
    todo.completed = !todo.completed;
}

//Edits the properties of a todo object with the provided updates.
function editTodo(todo, updates) {
    for (const key in updates) {
        if (todo.hasOwnProperty(key)) {
            todo[key] = updates[key];
        }
    }
}

export { createTodo, toggleCompleted, editTodo };
