const taskManager = new TaskManager();
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const activeTasks = document.getElementById('activeTasks');
const categoriesList = document.getElementById('categoriesList');

function renderStatistics() {
    const tasks = taskManager.tasks;
    const completed = taskManager.getCompletedTasks();
    const active = taskManager.getActiveTask();
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = completed.length;
    activeTasks.textContent = active.length;
}

function renderCategories() {
    const categories = {
        
    }
    taskManager.tasks.forEach(task => {
        if(categories[task.category]){
            categories[task.category]++;
        } else {
            categories[task.category] = 1;
        }
    })
    categoriesList.innerHTML = "";
    Object.keys(categories).forEach(category => {
        const categoryEl = document.createElement("div");
        categoryEl.classList.add("category");
        categoryEl.innerHTML = `
        <span class="category__name">${category}</span>
        <span class="category__count">${categories[category]} задач</span>
        `
        categoriesList.append(categoryEl);
    })
    if(Object.keys(categories).length === 0){
        categoriesList.innerHTML = `
        <div class="empty">Задач пока нет</div>
        `
    }
}

renderStatistics();
renderCategories();