export { Todo, createTodo }
import { save } from "./storage";

    function Todo(title, dueDate, priority) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority
        this.complete = false;
        this.id = null;
    };

    Todo.prototype = {
        ...Todo.prototype,

        setTitle: function (newTitle) {
            this.title = newTitle;
        },

        setDescription: function (newDesc) {
            this.description = newDesc;
        },

        setDate: function (newDate) {
            this.dueDate = newDate.toISOString();
        },

        setPriority: function (newPriority) {
            this.priority = newPriority;
        },
        setId: function () {
            const todoId = generateTodoID();
            this.id = todoId;
        },
        getId: function () {
            return this.id;
        },
        getParentId: function () {
            return this.parentTask;
        },
        toggleComplete: function (status) {
            this.complete = status;
        },
        getComplete: function () {
            return this.complete;
        },
        getDate: function () {
            const date = new Date(this.dueDate);
            return date;
        },
        getTitle: function () {
            return this.title
        },
        getDescription: function () {
            return this.description
        },
        getPriority: function () {
            return this.priority
        },
    };

    function generateTodoID() {
        let id = Number(localStorage.getItem('todoID')) || 0;
        let nextID = id + 1;
        save('todoID', nextID);

        return 'todo_' + id;
    }

    function createTodo(title, dueDate, priority) {
        const todo = new Todo(title, dueDate, priority);
        todo.setId();
    
        return todo;
    };
