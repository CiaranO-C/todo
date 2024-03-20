export { Task, createTask }
import { save } from "./storage";
import { addToAllTasks, saveAllTasks } from "./pageControl";

function Task(title, category) {
    this.title = title;
    this.category = category;
    this.todos = [];
    this.id = null;
};

Task.prototype = {
    ...Task.prototype,

    setTodo: function (todo) {
        this.todos.push(todo);
    },
    removeTodo: function (index) {
        this.todos.splice(index, 1);
    },
    setCategory: function (newCategory) {
        this.category = newCategory;
    },
    setTitle: function (newTitle) {
        this.title = newTitle;
    },
    getTodos: function () {
        return this.todos;
    },
    getCategory: function () {
        return this.category;
    },
    getTitle: function () {
        return this.title;
    },
    setId: function (taskId = generateTaskID()) {
        if (!this.id) {
            this.id = taskId;
        } else console.error(`task already has ID - ${this.id}`);
    },
    getId: function () {
        return this.id;
    },
    saveTask: function () {
        const id = this.id;
        save(id, this);
    },
};

//checks storage for next unique ID, then stores the following one
function generateTaskID() {
    const id = Number(localStorage.getItem('taskID')) || 0;
    let nextID = id + 1;
    save('taskID', nextID);

    return 'task_' + id;
}

function createTask(title, category) {
    const task = new Task(title, category);
    task.setId();
    task.saveTask();

    addToAllTasks(task.getId(), task);
    saveAllTasks();
    return task;
}
