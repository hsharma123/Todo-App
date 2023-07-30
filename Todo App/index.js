let taskInput = document.getElementById('taskInput');
let taskList = document.getElementById('taskList');
let addButton = document.getElementById('addButton');
let editTodo = null;

const addTask = () => {
    const inputText = taskInput.value.trim();
    if (inputText.length <= 0) {
        alert("Please enter your Task");
    } else {
        if (editTodo !== null) {
            // If there's an ongoing edit, update the existing task
            editTodo.firstChild.textContent = inputText;
            addButton.innerText = "Add Task";
            addButton.style.background = "";
            editTodo = null;
        } else {
            const li = document.createElement('li');
            const division = document.createElement('div');
            division.className = 'task';
            division.textContent = inputText;
            li.appendChild(division);

            // Create the delete button
            const div = document.createElement('div');
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', () => {
                taskList.removeChild(li);
                deleteTodoLocalStorage(inputText);
            });

            // Create the Edit button
            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.addEventListener('click', () => {
                taskInput.value = inputText;
                addButton.innerText = "Update Task";
                addButton.style.background = "#23A455";
                editTodo = li;
            });

            div.className = 'action-button';
            div.appendChild(deleteButton);
            div.appendChild(editButton);
            li.appendChild(div);

            taskList.appendChild(li);
        }
        taskInput.value = "";
        saveTodo(inputText);
    }
};

// Save the todo list in localStorage
const saveTodo = (todo) => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Check if the todo already exists in the array
    const index = todos.indexOf(todo);
    if (index === -1) {
        todos.push(todo);
    }

    localStorage.setItem('todos', JSON.stringify(todos));
};

const updateTodoLocalStorage = (newTodo) => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
   
    if (index !== -1) {
        todos[index] = newTodo;
        localStorage.setItem('todos', JSON.stringify(todos));
    }
};
// Get the todo from the localStorage and display it on the page
const getTodo = () => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        const li = document.createElement('li');
        const division = document.createElement('div');
        division.className = 'task';
        division.textContent = todo;
        li.appendChild(division);

        // Create the delete button
        const div = document.createElement('div');
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
            deleteTodoLocalStorage(todo);
        });

        // Create the Edit button
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => {
            taskInput.value = todo;
            addButton.innerText = "Update Task";
            addButton.style.background = "#23A455";
            editTodo = li;
        });

        div.className = 'action-button';
        div.appendChild(deleteButton);
        div.appendChild(editButton);
        li.appendChild(div);

        taskList.appendChild(li);
    });
};

// Delete todo from the Local Storage
const deleteTodoLocalStorage = (todo) => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let index = todos.indexOf(todo);
    if (index !== -1) {
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
};

document.addEventListener('DOMContentLoaded', getTodo);

addButton.addEventListener('click', addTask);
