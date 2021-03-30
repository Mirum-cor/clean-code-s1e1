//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput = document.querySelector('.task-item__task_create-new'); //Add a new task.
var addButton = document.querySelector('.task-item__modify-task_add'); //add button
var incompleteTaskHolder = document.querySelector('.incomplete-tasks'); //incomplete-tasks
var completedTasksHolder = document.querySelector('.completed-tasks'); //completed-tasks

//New task list item
var createNewTaskElement = function (taskString) {
  var taskItem = document.createElement('section');

  //input (checkbox)
  var checkBox = document.createElement('input'); //checkbx
  //label
  var label = document.createElement('label'); //label
  //input (text)
  var editInput = document.createElement('input'); //text
  //task-item__modify-task_edit
  var editButton = document.createElement('button'); //edit button

  //task-item__modify-task_delete
  var deleteButton = document.createElement('button'); //delete button
  var deleteButtonImg = document.createElement('img'); //delete button image

  taskItem.classList.add('task-item');

  label.innerText = taskString;
  label.classList.add('task-item__task', 'task-item__task_label');

  //Each elements, needs appending
  checkBox.type = 'checkbox';
  checkBox.classList.add('task-item__mark-done');
  editInput.type = 'text';
  editInput.classList.add('task-item__task', 'task-item__task_input');

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.classList.add('task-item__modify-task', 'task-item__modify-task_edit');

  deleteButton.classList.add('task-item__modify-task', 'task-item__modify-task_delete');
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.classList.add('task-item__delete-img');
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
  //Create a new list item with the text from the .task-item__task_create-new:
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

  var editInput = taskItem.querySelector('.task-item__task_input');
  var label = taskItem.querySelector('.task-item__task_label');
  var editBtn = taskItem.querySelector('.task-item__modify-task_edit');
  var containsClass = taskItem.classList.contains('task-item_edit-mode');
  //If class of the parent is .task-item_edit-mode
  if (containsClass) {
    //switch to .task-item_edit-mode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  //toggle edit-mode on the parent, input and label.
  taskItem.classList.toggle('task-item_edit-mode');
  editInput.classList.toggle('task-item__task_edit-input');
  label.classList.toggle('task-item__task_edit-label');
};

//Delete task.
var deleteTask = function () {
  console.log('Delete Task...');

  var taskItem = this.parentNode;
  var section = taskItem.parentNode;
  //Remove the parent list item from the ul.
  section.removeChild(taskItem);
};

//Mark task completed
var taskCompleted = function () {
  console.log('Complete Task...');

  //Append the task list item to the .completed-tasks
  var taskItem = this.parentNode;
  var label = taskItem.querySelector('.task-item__task_label');
  label.classList.add('task-item__task_label-completed');
  completedTasksHolder.appendChild(taskItem);
  bindTaskEvents(taskItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log('Incomplete Task...');
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the .incomplete-tasks.
  var taskItem = this.parentNode;
  var label = taskItem.querySelector('.task-item__task_label');
  label.classList.remove('task-item__task_label-completed');
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
  var checkBox = tasktaskItem.querySelector('.task-item__mark-done');
  var editButton = tasktaskItem.querySelector('.task-item__modify-task_edit');
  var deleteButton = tasktaskItem.querySelector('.task-item__modify-task_delete');

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
