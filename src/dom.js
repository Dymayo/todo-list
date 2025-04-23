import { createProject, addTodo, removeTodo, getTodos } from './project.js';
import { createTodo, editTodo } from './todo.js';

// State
let projects = [];
let selectedProject = null;
let isEditing = false;
let editingIndex = null;

// DOM Elements
const DOM = {
    projectList: document.getElementById('project-list'),
    todoList: document.getElementById('todo-list'),
    projectTitle: document.getElementById('project-title'),
    projectForm: document.getElementById('project-form'),
    todoForm: document.getElementById('todo-form'),
    inputs: {
        projectName: document.getElementById('project-name'),
        title: document.getElementById('todo-title'),
        desc: document.getElementById('todo-desc'),
        due: document.getElementById('todo-due'),
        priority: document.getElementById('todo-priority')
    }
};

// ——— UI RENDERING ———

function renderProjects(projectArray) {
    DOM.projectList.innerHTML = '';
    projectArray.forEach((project, index) => {
        const li = document.createElement('li');
        li.textContent = project.name;
        li.addEventListener('click', () => handleProjectSelect(project));
        DOM.projectList.appendChild(li);
    });
}

function renderTodos(todoArray) {
    DOM.todoList.innerHTML = '';
    todoArray.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
      <strong>${todo.title}</strong> - ${todo.description} (${todo.dueDate}) [${todo.priority}]
      <button data-index="${index}" class="edit-todo">✏️</button>
      <button data-index="${index}" class="remove-todo">❌</button>
    `;
        DOM.todoList.appendChild(li);
    });
    bindTodoActions();
}

// ——— UI EVENT HANDLING ———

function handleProjectSelect(project) {
    selectedProject = project;
    DOM.projectTitle.textContent = project.name;
    renderTodos(getTodos(project));
}

function handleProjectSubmit(e) {
    e.preventDefault();
    const name = DOM.inputs.projectName.value.trim();
    if (!name) return;

    const newProject = createProject(name);
    projects.push(newProject);
    renderProjects(projects);
    DOM.projectForm.reset();
}

function handleTodoSubmit(e) {
    e.preventDefault();
    if (!selectedProject) return;

    const { title, desc, due, priority } = DOM.inputs;

    if (isEditing) {
        const todo = selectedProject.todos[editingIndex];
        editTodo(todo, {
            title: title.value,
            description: desc.value,
            dueDate: due.value,
            priority: priority.value
        });
        isEditing = false;
        editingIndex = null;
    } else {
        const newTodo = createTodo(title.value, desc.value, due.value, priority.value);
        addTodo(selectedProject, newTodo);
    }

    renderTodos(getTodos(selectedProject));
    DOM.todoForm.reset();
}

function bindTodoActions() {
    DOM.todoList.querySelectorAll('.remove-todo').forEach(btn =>
        btn.addEventListener('click', e => {
            const index = e.target.dataset.index;
            removeTodo(selectedProject, index);
            renderTodos(getTodos(selectedProject));
        })
    );

    DOM.todoList.querySelectorAll('.edit-todo').forEach(btn =>
        btn.addEventListener('click', e => {
            editingIndex = e.target.dataset.index;
            const todo = selectedProject.todos[editingIndex];
            fillTodoForm(todo);
            isEditing = true;
        })
    );
}

function fillTodoForm(todo) {
    const { title, desc, due, priority } = DOM.inputs;
    title.value = todo.title;
    desc.value = todo.description;
    due.value = todo.dueDate;
    priority.value = todo.priority;
}

// ——— INIT & LISTENERS ———

function addEventListeners() {
    DOM.projectForm.addEventListener('submit', handleProjectSubmit);
    DOM.todoForm.addEventListener('submit', handleTodoSubmit);
}

function init() {
    addEventListeners();
    renderProjects(projects);
}

export default init;

