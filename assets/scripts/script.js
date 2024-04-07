// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const createToDo = document.querySelector('#btn btn-success');
const modelEntry = document.getElementById('to-do');

//let task = '';


// Todo: create a function to generate a unique task id
function generateTaskId() {
    if (nextId === null) {
        nextId = 1;
    }
    else {
        nextId++;
    }

    localStorage.setItem('nextId', JSON.stringify(nextId));
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>').addClass('card m-3').css('width', '15px');
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

    if (taskList == null) {
        taskList = [];
    }
    else {

    }

    taskList.sortable({
        placeholder: "ui-state-highlight"
    });
    taskList.disableSelection();
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    let newTask = {
        taskID: generateTaskId(),
        title: $('#taskTitle').val(),
        description: $('#taskDescription').val(),
        dueDate: $('#taskDueDate').val(),
        category: 'to-do'
    }

    taskList.push(newTask);

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    event.preventDefault();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
