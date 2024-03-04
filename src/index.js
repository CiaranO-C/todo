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

function Task(title, category, style = 'default', todos = []) {
    this.title = title;
    this.category = category;
    this.style = style;
    this.todos = todos;
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
    }
};




/////////////////////////////////////////////////////////////////////////////////////////////////////////
function Todo(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority
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
        (newPriority) ? this.priority = newPriority : console.log('todo needs validation4')
    },
    getTitle: () => this.title,
    getDescription: () => this.description,
    getDate: () => this.dueDate,
    getPriority: () => this.priority
};

function attachToTask(task, todo) {
    task.setTodo(todo);
}

function getSelectedTask() {
    //   const selected = current task by html title or id?
    return selected;
}


function generateExample() {
    //This will be triggered by using GUI
    const taskOne = new Task('Train Paw', "Dog Training");
    const todoOne = new Todo('Step One', 'Mark and treat when dog moves paws', 'today', 'low');
    const todoTwo = new Todo('Step two', 'Hold hand by paw, whenever dog brushes hand mark and treat', 'tomorrow', 'low');

    //This will be handled by attachToTask function
    taskOne.setTodo(todoOne);
    taskOne.setTodo(todoTwo);

    console.log(taskOne);

    addTaskToArray(taskOne);

    console.log(allTasks);
    saveToStorage();
}

checkStorage();
//generateExample();
console.log(allTasks);