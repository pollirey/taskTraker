class TaskManager {
    constructor(){
        this.tasks = [];
        this.loadTasks();
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveTasks();
    }

    deleteTask(id){
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    toggleTask(id){
        const task = this.tasks.find( task => task.id === id);
        if(task){
            task.toggleStatus();
            this.saveTasks();
        }
    }

    getCompletedTasks(){
        return this.tasks.filter(task => task.completed);
    }

    getActiveTask(){
        return this.tasks.filter(task => !task.completed);
    }

    saveTasks(){
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    loadTasks(){
        const tasks = localStorage.getItem("tasks");
        if(tasks) {
            const parsedTasks = JSON.parse(tasks);
            this.tasks = parsedTasks.map(task => {
                return new Task(task.id, task.title, task.category, task.completed);
            })
        }
    }
}
