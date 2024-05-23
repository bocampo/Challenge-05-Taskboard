// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const createToDo = document.querySelector('#btn btn-success');
const modelEntry = document.getElementById('modalEntry');


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
    /*
        const taskCard = $('<div>').addClass('card m-3 task-card draggable').css('width', '15px').attr('data-task-id', task.id);
        const cardHeader = $('<div>').addClass('card m-3').text(task.title);
        */

    const taskCard = $('<div>').addClass('card task-card draggable my-3').attr('data-task-id', task.taskId);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.description);
    const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    const cardDeleteBtn = $('<button>').addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-task-id', task.taskId);
    cardDeleteBtn.on('click', handleDeleteTask);

    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

    if (taskList == null) {
        taskList = [];
    }

    const todoList = $("#todo-cards");
    const inProgressList = $("#in-progress-cards");
    const completedCards = $("#done-cards");

    todoList.empty();
    inProgressList.empty();
    completedCards.empty();

    for (let task of taskList) {
        console.log(task);

        switch (task.category) {
            case "to-do":
                todoList.append(createTaskCard(task));
                break;
            case "in-progress":
                inProgressList.append(createTaskCard(task));
                break;
            case "done":
                completedCards.append(createTaskCard(task));
                break;
        }
    }

    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
        helper: function (e) {
            // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable');
            // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    console.log(event);

    let newTask = {
        taskId: generateTaskId(),
        title: $('#taskTitle').val(),
        description: $('#taskDescription').val(),
        dueDate: $('#taskDueDate').val(),
        category: 'to-do'
    }

    taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    event.preventDefault();

    taskList.pop();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

    // ? Get the project id from the event
    const taskId = ui.draggable[0].dataset.projectId;

    // ? Get the id of the lane that the card was dropped into
    const newStatus = event.target.id;

    for (let task of taskList) {
        // ? Find the project card by the `id` and update the project status.
        if (taskList.taskId == taskId) {
            task.category = newStatus;
        }
    }
    // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
    $('#taskDueDate').datepicker({
        changeMonth: true,
        changeYear: true,
    });

    $('#taskCreation').on('submit', handleAddTask);

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });
});

