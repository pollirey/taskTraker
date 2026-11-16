class Task {
    constructor(id, title, category, completed = false){
        this.id = id;
        this.title = title;
        this.category = category;
        this.completed = completed;
    }

    toggleStatus(){
        this.completed = !this.completed;
    }
}
