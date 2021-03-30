//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById('new-task'); //Add a new task.
var addButton = document.getElementsByTagName('button')[0]; //first button
var incompleteTaskHolder = document.getElementById('incomplete-tasks'); //ul of #incompleteTasks
var completedTasksHolder = document.getElementById('completed-tasks'); //completed-tasks

//New task list item
var createNewTaskElement = function (taskString) {
  var taskItem = document.createElement('section');

  //input (checkbox)
  var checkBox = document.createElement('input'); //checkbx
  //label
  var label = document.createElement('label'); //label
  //input (text)
  var editInput = document.createElement('input'); //text
  //button.edit
  var editButton = document.createElement('button'); //edit button

  //button.delete
  var deleteButton = document.createElement('button'); //delete button
  var deleteButtonImg = document.createElement('img'); //delete button image

  taskItem.classList.add('task-item');

  label.innerText = taskString;
  label.classList.add('task', 'task-name');

  //Each elements, needs appending
  checkBox.type = 'checkbox';
  checkBox.classList.add('mark-done');
  editInput.type = 'text';
  editInput.classList.add('task', 'task-input');

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.classList.add('delete-img');
  deleteButtonImg.setAttribute('alt', 'Delete task');
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  taskItem.appendChild(checkBox);
  taskItem.appendChild(label);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

var addTask = function () {
  console.log('Add Task...');
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var taskItem = createNewTaskElement(taskInput.value);

  //Append taskItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(taskItem);
  bindTaskEvents(taskItem, taskCompleted);

  taskInput.value = '';
};

//Edit an existing task.

var editTask = function () {
  console.log('Edit Task...');
  console.log("Change 'edit' to 'save'");

  var taskItem = this.parentNode;

  var editInput = taskItem.querySelector('input[type=text]');
  var label = taskItem.querySelector('label');
  var editBtn = taskItem.querySelector('.edit');
  var containsClass = taskItem.classList.contains('edit-mode');
  //If class of the parent is .editmode
  if (containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  taskItem.classList.toggle('edit-mode');
};

//Delete task.
var deleteTask = function () {
  console.log('Delete Task...');

  var taskItem = this.parentNode;
  var ul = taskItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(taskItem);
};

//Mark task completed
var taskCompleted = function () {
  console.log('Complete Task...');

  //Append the task list item to the #completed-tasks
  var taskItem = this.parentNode;
  completedTasksHolder.appendChild(taskItem);
  bindTaskEvents(taskItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log('Incomplete Task...');
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var taskItem = this.parentNode;
  incompleteTaskHolder.appendChild(taskItem);
  bindTaskEvents(taskItem, taskCompleted);
};

var ajaxRequest = function () {
  console.log('AJAX Request');
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

var bindTaskEvents = function (tasktaskItem, checkBoxEventHandler) {
  console.log('bind list item events');
  //select taskItems children
  var checkBox = tasktaskItem.querySelector('input[type=checkbox]');
  var editButton = tasktaskItem.querySelector('button.edit');
  var deleteButton = tasktaskItem.querySelector('button.delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don"t get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
