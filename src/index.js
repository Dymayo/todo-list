import "./styles.css";
import init from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
    init();
});

// console.log('Created To-Do:', { ...todo1 });

// // Toggle the completion status of the to-do
// toggleCompleted(todo1);
// console.log('After toggling completion:', { ...todo1 });

// // Edit the to-do item
// editTodo(todo1, { description: 'Milk, eggs, bread, fruits, and vegetables', priority: 'Medium' });
// console.log('After editing:', todo1);

// // Create a project
// const project = createProject('Work');

// // Create a to-do
// const todo = createTodo('Finish report', 'Complete the quarterly report', '2025-04-30', 'High');

// // Add the to-do to the project
// addTodo(project, todo);

// // Get all to-dos in the project
// console.log(getTodos(project));

// // Remove the to-do from the project
// removeTodo(project, 'Finish report');

// // Check the updated to-dos
// console.log(getTodos(project));