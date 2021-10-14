const controlsPanel = document.getElementById('controls-panel');
const taskInputElem = document.getElementById('taskInput');
const taskContainer = document.getElementById('tasksContainer');
const removeAllBtn = document.getElementById('removeAllButton');
const restoreAllBtn = document.getElementById('restoreAllButton');
const doneAllBtn = document.getElementById('doneAllButton');
const selectAllBtn = document.getElementById('selectAll');

let taskList = [];

controlsPanel.style.display = 'none'; 

selectAllBtn.addEventListener('click', ()=>{
    taskList.forEach(task => task.selected = true);
    updateView();
});

removeAllBtn.addEventListener('click', ()=>{
    taskList = taskList.filter(item => !item.selected);
    updateView();
});

doneAllBtn.addEventListener('click', ()=>{
     const selectedItems = taskList.filter(item =>item.selected);
     selectedItems.forEach(item => {
        item.done = true;
     });

     updateView();
});

restoreAllBtn.addEventListener('click', ()=>{
    const selectedItems = taskList.filter(item => item.selected);
    selectedItems.forEach(item => {
        item.done = false;
    });

    updateView();
});

taskInputElem.addEventListener('keypress', event=>{
    if(event.key == 'Enter' && taskInputElem.value){
         addTask(taskInputElem.value);
         taskInputElem.value = '';

         updateView();
    }
});

function addTask(name) {
    taskList.unshift({
        name: name,
        done: false,
        selected: false
    });
}

function updateView() {
    updateControlsPanel();
    taskContainer.innerHTML = '';

    for (let i = 0; i < taskList.length; i++){
        const itemElement = document.createElement('li');
        itemElement.class = 'list-group-item';

        const innerDiv = document.createElement('div');
        innerDiv.className = 'input-group mb-3 record';

        const inputContainer = document.createElement('div');
        inputContainer.class = 'input-group-prepend';

        const checkboxElem = document.createElement('input');
        checkboxElem.type = 'checkbox';
        checkboxElem.className = 'form-check-input ml-1';
        checkboxElem.checked = taskList[i].selected;

        checkboxElem.addEventListener('change', ()=>{
            taskList[i].selected = checkboxElem.checked;
            updateControlsPanel();
        });

        const checkBoxId = 'checkbox' + i;
        checkboxElem.id = checkBoxId;

        const taskNameElem = document.createElement('label');
        taskNameElem.className = 'form-check-label ml-4';
        taskNameElem.setAttribute('for', checkBoxId);
        taskNameElem.innerText = taskList[i].name;

        if (taskList[i].done){
            taskNameElem.className += ' done-task';
        }

        inputContainer.appendChild(checkboxElem);
        inputContainer.appendChild(taskNameElem);

        const controlButton = document.createElement('button');
        if (taskList[i].done) {
            controlButton.className = 'btn btn-outline-danger';
            controlButton.innerText = 'Remove';
            controlButton.addEventListener('click', ()=>{
               taskList.splice(i, 1);
               updateView();
            });
        } else {
            controlButton.className = 'btn btn-outline-success';
            controlButton.innerText = 'Done';
            controlButton.addEventListener('click', ()=>{
               taskList[i].done = true;
               updateView();
            });
        }

        innerDiv.appendChild(inputContainer);
        innerDiv.appendChild(controlButton);
        itemElement.appendChild(innerDiv);
        taskContainer.appendChild(itemElement);
    }
}

function updateControlsPanel() {
    const smthSelected = taskList.some(task => task.selected);
    if (smthSelected){
        controlsPanel.style.display = 'flex';
    } else {
        controlsPanel.style.display = 'none';
    }
}
