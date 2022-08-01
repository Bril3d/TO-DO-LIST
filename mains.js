let input = document.querySelector('.input');
let add = document.querySelector('.add');
let task = document.querySelector('.tasks');

let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataLocal();

add.onclick = () => {
    if(input.value != '') {
        addTaskToArray(input.value);
    }
    input.value = '';
}

task.addEventListener("click",(e) => {
if(e.target.classList.contains("del")) {
    deleteTask(e.target.parentElement.getAttribute("data-id"));

    e.target.parentElement.remove();
}
if(e.target.classList.contains("task")) {
    toggleTask(e.target.getAttribute("data-id"))

    e.target.classList.toggle("done")
}
})

function addTaskToArray(inp) {
    let obj = {
        id: Date.now(),
        title: inp,
        completed:false,
    };
    arrayOfTasks.push(obj);

    addTaskPage(arrayOfTasks);

    addToLocal(arrayOfTasks);
}

function addTaskPage(arr) {
    task.innerHTML = '';


    arr.forEach((t) => {
        let div = document.createElement("div");
        div.className = "task";
        
        if (t.completed){
            div.className = "task done"
        }

        div.setAttribute("data-id",t.id);
        div.appendChild(document.createTextNode(t.title));

        let span = document.createElement("span");
        span.className = "del";

        span.appendChild(document.createTextNode("Delete"));

        div.appendChild(span);

        task.appendChild(div);
    })
}

function addToLocal(arr) {
    window.localStorage.setItem("tasks",JSON.stringify(arr))
}
function getDataLocal(){
    let data = window.localStorage.getItem("tasks");
    if(data) {
        let tasks = JSON.parse(data);
        addTaskPage(tasks);
    }
}

function deleteTask(id) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != id);
    addToLocal(arrayOfTasks);
}

function toggleTask(taskId) {
    for(let i=0; i < arrayOfTasks.length; i++){
        if(arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
    }
    addToLocal(arrayOfTasks);
}
