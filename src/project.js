import { createTodo } from './todo.js';

function createProject(name) {
    const todos = [];

    return {
        name,
        todos
    };
}

function addTodo(project, todo) {
    project.todos.push(todo);
}

function removeTodo(project, todoTitle) {
    project.todos = project.todos.filter(todo => todo.title !== todoTitle);
}

function getTodos(project) {
    return project.todos;
}

export { createProject, addTodo, removeTodo, getTodos };
