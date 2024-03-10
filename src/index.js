
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
    allTasks.push(task);
};


////////////////////////////////////////////////////////////////////////////////////

function Task(title, category, todos = []) {
    this.title = title;
    this.category = category;
    this.todos = todos;
    this.style = 'default'; //get rid of this
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
    todo.parentTask = task.getTitle();
}

function createTask(title, category) {
    const task = new Task();
    task.setTitle(title);
    task.setCategory(category);

    return task;
}

function createTodo(title, description, dueDate, priority) {
    const todo = new Todo();
    todo.setTitle(title);
    todo.setDescription(description);
    todo.setDate(dueDate);
    todo.setPriority(priority);

    return todo;
}


function generateExample() {
    //This will be triggered by using GUI
    addTaskToArray(createTask('Train Paw', 'pet_supplies'));
    attachToTask(allTasks[0], createTodo('Step One', 'Mark and treat when dog moves paws', 'today', '1'));
    attachToTask(allTasks[0], createTodo('Step two', 'Hold hand by paw, whenever dog brushes hand mark and treat', 'tomorrow', '2'));


    //this is a simplified breakdown of what the above achieves using the utility functions
    const taskTwo = new Task('Train Sit', "sound_detection_dog_barking");
    const todoThree = new Todo('Step One', 'Mark and treat when dog moves paws', 'today', '2');
    const todoFour = new Todo('Step two', 'treat when dog sits', 'tomorrow', '1');
    attachToTask(taskTwo, todoThree);
    attachToTask(taskTwo, todoFour);
    addTaskToArray(taskTwo);

    saveToStorage();
}

//some sort of page control object that can tell if filtered view or not

function filterAllTasks(category) {
    const filteredTasks = allTasks.filter((task) => task.getCategory() === category);

    return filteredTasks;
};


//as todos are rendered 
//to remove todo elem
//assign return of this to 'parentTask variable'
//then simply combine parentTask.getTodos() and index attribute and splice(index, 1); 
//once removed ensure to re render display and re-assign attributes to new index values
function getParentTask(parentTitle) {
    const parentTask = allTasks.find((task) => task.getTitle() === parentTitle);

    return parentTask;
}


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

//some sort of object which stores things like
//currently selected task
//is filtered true/false, maybe its a allTasks obj
/*
allTasks = {
    tasks: [],
    isFiltered: false,
    isSorted: false,
    etc...
}
*/

/////////////////////////DOM STUFF//////////////////////////////////////
function allTasksPage() {

    const mainContent = document.querySelector('.content');

    const pageTitle = document.createElement('h1');
    pageTitle.textContent = 'Your Tasks';

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('tasks-container');

    mainContent.append(pageTitle, taskContainer);

    if (allTasks.length) {
        for (let i = 0; i < allTasks.length; i++) {
            const task = allTasks[i];

            const taskDiv = document.createElement('div');

            const header = document.createElement('header');
            header.classList.add('task-header');

            const categoryIcon = document.createElement('span');
            categoryIcon.classList.add('material-symbols-outlined');
            categoryIcon.textContent = task.getCategory();

            const taskTitle = document.createElement("input");
            taskTitle.type = "text";
            taskTitle.readOnly = true;
            taskTitle.value = task.getTitle();

            header.append(categoryIcon, taskTitle);

            const section = document.createElement('section');

            const todoCounter = document.createElement('div');
            todoCounter.classList.add('todos-amount');

            const todosText = document.createElement('span');
            todosText.textContent = 'Todos';

            const line = document.createElement('div');
            line.classList.add('line');

            const todoNumber = document.createElement('span');
            todoNumber.textContent = task.getTodos().length;

            todoCounter.append(todosText, line, todoNumber);

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('task-button-container');

            const editButton = document.createElement('button');
            const deleteButton = document.createElement('button');

            editButton.setAttribute('data-btnType', 'edit'); //check if needed
            deleteButton.setAttribute('data-btnType', 'delete'); //check if needed

            editButton.classList.add('material-symbols-outlined');
            deleteButton.classList.add('material-symbols-outlined');

            editButton.textContent = 'edit';
            deleteButton.textContent = 'delete';

            buttonContainer.append(editButton, deleteButton);

            section.append(todoCounter, buttonContainer);
            taskDiv.append(header, section);

            taskDiv.setAttribute('data-task-index', `${i}`);
            taskListeners(taskDiv, task);
            taskContainer.appendChild(taskDiv);
        };
    } else {
        const addTask = document.createElement('div');
        addTask.id = 'addTask';

        const addIcon = document.createElement('span');
        addIcon.classList.add('material-symbols-outlined');
        addIcon.textContent = 'add_circle';

        addTask.appendChild(addIcon);

        taskContainer.appendChild(addTask);
    };

    function taskListeners(taskElement, taskObject) {
        const [icon, titleInput] = taskElement.children[0].children;
        const [editBtn, deleteBtn] = taskElement.children[1].children[1].children;

        editBtn.addEventListener('click', () => {
            const status = editBtn.textContent;
            console.log(status);
            if (status === 'edit') {
                icon.classList.toggle('edit');
                titleInput.classList.toggle('edit');
                titleInput.readOnly = false;
                editBtn.textContent = 'done';
                icon.addEventListener('click', modalListeners);
            } else {
                icon.classList.toggle('edit');
                titleInput.classList.toggle('edit');
                titleInput.readOnly = true;
                editBtn.textContent = 'edit';
                icon.removeEventListener('click', modalListeners);
                updateTaskObject();
                saveToStorage();
            };
        });

        function modalListeners(event) {
            const modal = document.querySelector('#myModal');
            const closeBtn = document.querySelector('#closeModal');
            const confirmBtn = document.querySelector('#modalConfirm');

            modal.classList.toggle('hidden'); //displays the modal

            closeBtn.addEventListener('click', closeModal);
            confirmBtn.addEventListener('click', changeIcon);

            function closeModal() {
                modal.classList.toggle('hidden');
                closeBtn.removeEventListener('click', closeModal);
                confirmBtn.removeEventListener('click', changeIcon);
            };

            function changeIcon() {
                const selectedIcon = document.querySelector('input[name="category"]:checked').id;
                icon.textContent = selectedIcon;
                closeModal();
            };
        };

        function updateTaskObject() {
            console.log(taskObject);
            taskObject.setCategory(icon.textContent);
    
            taskObject.setTitle(titleInput.value);
        };
    };
};

checkStorage();
//generateExample();
console.log(allTasks);
allTasksPage();