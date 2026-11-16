const taskManager = new TaskManager();
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskCategory = document.getElementById("taskCategory");
const tasksList = document.getElementById("tasksList");

const filters = document.querySelectorAll(".filter");
let currentFilter = "all";

function renderTasks() {
    let tasks = taskManager.tasks;
    if(currentFilter === "active"){
        tasks = taskManager.getActiveTask();
    }
    if(currentFilter === "completed") {
        tasks = taskManager.getCompletedTasks();
    }
    tasksList.innerHTML = "";
    if(tasks.length === 0){
        tasksList.innerHTML = `<div class="empty">Задач пока нет</div>`;
        return;
    }
    tasks.forEach(task => {
        const taskElement = document.createElement("article");
        taskElement.classList.add("task");
        if(task.completed) {
            taskElement.classList.add("task--completed"); 
        }

        taskElement.innerHTML = `
                    <div class="task__content">
                <h3 class="task__title">${task.title}</h3>
                <div class="task__category">
                    Категория:${task.category}
                </div>
                <div class="task__status">
                  Статус:${task.completed?"Выполнена":"Активна"}
                </div>
            </div>
            <div class="task__buttons">
                <button class="task__button" data-action="toggle" data-id="${task.id}">${task.completed ? "Вернуть в активные" : "Выполнить"}</button>
                <button class="task__button" data-action="delete" data-id="${task.id}">Удалить</button>
            </div>
        `
        tasksList.append(taskElement);
    })
}

taskForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const title = taskTitle.value.trim();
    const category = taskCategory.value;
    if(!title){
        return;
    }
    const task = new Task(Date.now(), title, category);
    taskManager.addTask(task);
    taskForm.reset();
    renderTasks();
})

tasksList.addEventListener('click', (e) => {
    const button = e.target.closest(".task__button");
    if(!button){
        return;
    }
    const id = Number(button.dataset.id);
    const action = button.dataset.action;
    if(action === "delete"){
        taskManager.deleteTask(id);
    }
    if(action === "toggle") {
        taskManager.toggleTask(id);
    }
    renderTasks();
})

 filters.forEach(filter => {
    filter.addEventListener("click", () => {
        filters.forEach(button => {
            button.classList.remove("filter--active");
        })
        filter.classList.add("filter--active");
        currentFilter = filter.dataset.filter;
        renderTasks();
    })
 })

renderTasks();


