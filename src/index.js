
//////////////////////////////////////////////////////////////////////
const allTasks = [];
function checkStorage() {
    if (localStorage.length) {
        const jsonTasks = localStorage.getItem("allTasks");
        const tasks = JSON.parse(jsonTasks);

        tasks.forEach(task => {
            const restoredTask = attachMethods(task);
            addTaskToArray(restoredTask);
        });
    };
};

function attachMethods(task) {
    const taskInstance = new Task();
    Object.assign(taskInstance, task);

    const todos = taskInstance.getTodos();
    todos.forEach(todo => {
        const i = todos.indexOf(todo);
        const todoInstance = new Todo();

        Object.assign(todoInstance, todo);
        todos[i] = todoInstance;
    });

    return taskInstance;
};

function saveToStorage() {
    const jsonAllTasks = JSON.stringify(allTasks);
    localStorage.setItem("allTasks", jsonAllTasks);
};

function addTaskToArray(task) {
    allTasks.push(task)
};


////////////////////////////////////////////////////////////////////////////////////

function Task(title, category, todos = []) {
    this.title = title;
    this.category = category;
    this.todos = todos;
    this.style = 'default';
    this.sorted = false;
    this.sortedTodos = null;
    // const domElem = document.Element('');
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
    setStyle: function (newStyle) {
        style = newStyle;
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
    getStyle: function () {
        return this.style;
    },
    toggleSorted: function () {
        (this.sorted) ? this.sorted = false : this.sorted = true;
    },
    sortTodos: function (key) {
        this.toggleSorted();
        this.sortedTodos = this.getTodos().slice();
        this.sortedTodos.sort((a, b) => a[key] - b[key]);
    },
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
function Todo(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority
    this.complete = false;
};

Todo.prototype = {
    ...Todo.prototype,

    setTitle: function (newTitle) {
        (newTitle) ? this.title = newTitle : console.log('todo needs validation1');
    },

    setDescription: function (newDesc) {
        (newDesc) ? this.description = newDesc : console.log('todo needs validation2');
    },

    setDate: function (newDate = this.dueDate) {
        (newDate) ? this.dueDate = newDate : console.log('todo needs validation3');
    },

    setPriority: function (newPriority) {
        this.priority = newPriority;
    },

    toggleComplete: function () {
        (this.complete) ? this.complete = false : this.complete = true;
    },
    getDate: function () {
        const stringDate = this.dueDate.toLocaleDateString();
        return stringDate;
    },
    getTitle: () => this.title,
    getDescription: () => this.description,

    getPriority: () => this.priority
};

///////////////////////////////////////////////////////////////////////////////////////////////////

function attachToTask(task, todo) {
    task.setTodo(todo);
}


function generateExample() {
    //This will be triggered by using GUI
    const taskOne = new Task('Train Paw', "Dog Training");
    const todoOne = new Todo('Step One', 'Mark and treat when dog moves paws', 'today', '1');
    const todoTwo = new Todo('Step two', 'Hold hand by paw, whenever dog brushes hand mark and treat', 'tomorrow', '2');

    //This will be handled by attachToTask function
    taskOne.setTodo(todoOne);
    taskOne.setTodo(todoTwo);

    const taskTwo = new Task('Train Sit', "Work");
    const todoThree = new Todo('Step One', 'Mark and treat when dog moves paws', 'today', '2');
    const todoFour = new Todo('Step two', 'treat when dog sits', 'tomorrow', '1');

    //This will be handled by attachToTask function
    taskTwo.setTodo(todoThree);
    taskTwo.setTodo(todoFour);

    addTaskToArray(taskOne);
    addTaskToArray(taskTwo);
    saveToStorage();
}

//some sort of page control object that can tell if filtered view or not

function filterAllTasks(category) {
    const filteredTasks = allTasks.filter((task) => task.getCategory() === category);

    return filteredTasks;
};



function collateTodos(tasks) {
    const allTodos = [];

    for (let i = 0; i < tasks.length; i++) {
        const todos = tasks[i].getTodos();
        for (let j = 0; j < todos.length; j++) {
            allTodos.push(todos[j]);
        };
    };

    return allTodos;
}

/*
    this.dueDate = dueDate;
    this.priority = priority
    this.complete = false;
*/

function filterTodos(key, value) {
    const allTodos = collateTodos(allTasks);
    const filteredTodos = allTodos.filter((todo) => todo[key] === value);

    return filteredTodos;
}

function thisWeeksTodos() {
    const allTodos = collateTodos(allTasks);
    const today = new Date(new Date().toDateString());
    const weekToday = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const filteredTodos = allTodos.filter((todo) => todo[dueDate] <= weekToday);

    return filteredTodos;
}


checkStorage();
//generateExample();
console.log(allTasks);
console.log(collateTodos(allTasks));
console.log(filterTodos("complete", true));
console.log(filterTodos("complete", false));

console.log(filterTodos("priority", "1"));
console.log(filterTodos("priority", "2"));
//some sort of page control object which stores things like
//currently selected task
//is filtered true/false