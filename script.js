
// let count = JSON.parse(localStorage.getItem("countItems"));
// if (count == null || count == 0) {
//     count = 0;
// }
// let toDoList = JSON.parse(localStorage.getItem("todoItems"));

// if (toDoList !== null) {
//     console.log(toDoList);
//     toDoList.forEach(element => {
//         presentTask(element.name, element.dueDate, element.dueTime, element.taskId, element.isFinished);

//     });
//     // renderTodoList();
// }
// else {
toDoList = [];
//}

function emptyList() {
    document.querySelector('.js-todo-list').innerHTML = '';
    // localStorage.removeItem('todoItems');
    // localStorage.removeItem('countItems');
    count = 0;
    toDoList = [];


}


function addToDo() {


    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;
    const dateInputElem = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElem.value;

    const timeInputElem = document.querySelector('.js-due-time-input');
    const dueTime = timeInputElem.value;

    inputElement.value = "";
    dateInputElem.value = "";
    timeInputElem.value = "";
    // console.log(taskId);

    toDoList.push({
        name: name,
        dueDate: dueDate,
        dueTime: dueTime,
        isFinished: false
    });
    // console.log(taskId);
    presentTask(name, dueDate, dueTime);





    // localStorage.setItem('countItems', JSON.stringify(count));
    // localStorage.setItem('todoItems', JSON.stringify(toDoList));
    // console.log(toDoList);
    // renderTodoList(toDoList);
}


function markFinished(checkbox, taskId) {
    // console.log('array', arr);
    var listItem = checkbox.parentElement.parentElement.parentElement;
    console.log(checkbox);
    console.log(checkbox.parentElement);
    console.log(checkbox.parentElement.parentElement);
    console.log(listItem);
    var taskText = listItem.querySelector('.text-container span');
    var dueInfo = listItem.querySelector('.due-info');
    var dueTime = listItem.querySelector('.due-time');

    const RemoveElem = listItem.querySelector('.js-remove-button');


    const labelElem = listItem.querySelector('.js-remove-Message');


    taskText.classList.toggle("finished");
    dueInfo.classList.toggle("finished");
    dueTime.classList.toggle("finished");
    console.log(taskText.classList.contains("finished"));

    const filteredTask = toDoList.filter(prop => {
        if (prop.taskId === taskId) {
            if (taskText.classList.contains("finished") === true) {
                RemoveElem.classList.add('is-removed');
                labelElem.innerHTML = 'Great Work!';
                labelElem.classList.add('remove-message');
                prop.isFinished = true;
            }
            else {
                RemoveElem.classList.remove('is-removed');
                labelElem.innerHTML = "";
                labelElem.classList.remove('remove-message');
                prop.isFinished = false;
            }

        }
        else {
            // console.log('else');
        }
    });
    // localStorage.setItem('todoItems', JSON.stringify(toDoList));
    // console.log(toDoList);

}

function removeTask(button) {
    const listItem = button.parentElement.parentElement.parentElement;
    console.log(listItem);
    const name = listItem.querySelector('.text-container span').textContent;

    const dueDate = listItem.querySelector('.due-info').textContent.replace('Due: ', '');

    const dueTime = listItem.querySelector('.due-time').textContent;


    listItem.remove();

    let filteredArray = toDoList.filter(task =>
        !(task.name === name.trim() &&
            task.dueDate === dueDate &&
            task.dueTime === dueTime)
    );
    toDoList = filteredArray;
    // localStorage.setItem('todoItems', JSON.stringify(toDoList));
    // console.log(toDoList);
}
function presentTask(name, dueDate, dueTime, taskId, isFinished) {
    let labelMessage = '';
    let taskList = document.getElementById("taskList");
    const Todate = new Date();
    const DueDateComp = new Date(dueDate + 'T' + dueTime);
    // if (Todate > DueDateComp) {
    //     alert('Please set a futuristic Goal!');
    //     return;
    // }
    if (Todate > DueDateComp) {
        labelMessage = 'Task Over Due!'

    }
    else {
        labelMessage = "";
    }
    // let arr = [taskId, labelMessage];
    // console.log('array', arr);
    var li = document.createElement("li");
    li.innerHTML = `
            <div class="task-container">
            <div class="checkbox-container">
                    <input id="check-box"  class="js-check-box check-boxes" type="checkbox" onclick="markFinished(this,${taskId})">
             </div>
                <div class="text-container">
                    <span>${name}</span>
                 </div>
                 <div>   
                    <span class="due-info">Due: ${dueDate}</span>
                 </div>
                 <div>   
                    <span class="due-time">${dueTime}</span>
                </div>
                <div>
                    <button class="delete-todo-button js-remove-button" onclick="removeTask(this)">Remove</button>
                </div>
                  
                  <label class="warning js-remove-Message" id="warningLabel">${labelMessage}</label>

                </div>`;

    // markFinished(this, JSON.stringify(arr));

    let checkbox = li.querySelector('.js-check-box');
    // console.log(checkbox)
    // console.log(checkbox);
    if ((isFinished) === true) {
        checkbox.click();
    }
    taskList.appendChild(li);

    // onclick="markFinished(this,${JSON.stringify(arr)})"

}
