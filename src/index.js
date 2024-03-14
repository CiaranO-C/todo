
////////////////////////////////////////////////Local Storage////////////////////////////////////////////////
const storage = (function () {
    function checkStorage() {
        if (localStorage.length) {
            const jsonTasks = localStorage.getItem("allTasks");
            const idTaskPairs = Object.entries(JSON.parse(jsonTasks));
            idTaskPairs.forEach(pair => {
                const [id, task] = pair;
                const restoredTask = attachMethods(task);
                pageControl.addToAllTasks(id, restoredTask);
            });
        };
    };

    function getFromStorage(id) {
        return localStorage.getItem(id);
    }

    function parseStorageItem(item) {
        return JSON.parse(item);
    }

    function getTask(id) {
        const jsonTask = getFromStorage(id);
        const parsedTask = parseStorageItem(jsonTask);
        const restoredTask = attachMethods(parsedTask);

        return restoredTask;
    }

    function getArrayOfTasks() {
        const jsonAllTasksObj = getFromStorage('allTasks');
        const parsedTasks = Object.values(parseStorageItem(jsonAllTasksObj));

        const allTasks = [];

        parsedTasks.forEach(task => {
            const restoredTask = attachMethods(task);
            allTasks.push(restoredTask);
        });

        return allTasks
    };

    //re-attach methods after parsing localStorage JSON
    function attachMethods(task) {
        const taskInstance = new tasksModule.Task();
        Object.assign(taskInstance, task);

        const todos = taskInstance.getTodos();
        todos.forEach(todo => {
            const i = todos.indexOf(todo);
            const todoInstance = new todoModule.Todo();

            Object.assign(todoInstance, todo);
            todos[i] = todoInstance;
        });

        return taskInstance;
    };

    //save key value pair to local storage
    function save(key, value) {
        const jsonValue = JSON.stringify(value);
        localStorage.setItem(`${key}`, jsonValue);
    };

    function deleteItem(id) {
        localStorage.removeItem(id);
    };

    return { checkStorage, getArrayOfTasks, save, deleteItem }
})();















////////////////////////////////////////////////Task Module////////////////////////////////////////////////
const tasksModule = (function () {
    function Task(title, category, todos = []) {
        this.title = title;
        this.category = category;
        this.todos = todos;
        this.style = 'default'; //get rid of this
        this.sorted = false;
        this.sortedTodos = null;
        this.id = null;
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
        setId: function () {
            if (!this.id) {
                this.id = generateTaskID();
            } else console.log('task already has ID');
        },
        getId: function () {
            return this.id;
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

    //checks storage for next unique ID, then stores the following one
    function generateTaskID() {
        let id = Number(localStorage.getItem('taskID')) || 0;
        let nextID = id + 1;
        storage.save('taskID', nextID);

        return 'task_' + id;
    }

    return { Task }
})();











////////////////////////////////////////////////Todo Module/////////////////////////////////////////////////////////

const todoModule = (function () {
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
        setId: function () {
            this.id = generateTodoID();
        },
        toggleComplete: function () {
            this.complete = !(this.complete);
        },
        getDate: function () {
            const stringDate = this.dueDate.toLocaleDateString();
            return stringDate;
        },
        getTitle: () => this.title,
        getDescription: () => this.description,
        getPriority: () => this.priority
    };

    function generateTodoID() {
        let id = Number(localStorage.getItem('todoID')) || 0;
        let nextID = id + 1;
        storage.save('todoID', nextID);

        return 'todo_' + id;
    }

    return { Todo };
})();









////////////////////////////////////////////////Task Utility Functions////////////////////////////////////////////////

//attach 
function attachToTask(task, todo) {
    task.setTodo(todo);
    todo.parentTask = task.getId();
}

function createTask(title, category) {
    const task = new tasksModule.Task();
    task.setTitle(title);
    task.setCategory(category);
    task.setId();
    const id = task.getId();

    storage.save(id, task);
    pageControl.addToAllTasks(id, task);
    return task;
}

//adds task value to allTasks object with unique ID as key


//give this an object where values are task objects
function filterAllTasks(tasks, category) {
    const all = tasks;
    const filteredTasks = all.filter((task) => task.getCategory() === category);

    return filteredTasks;
};

////////////////////////////////////////////////Todo Utility Functions////////////////////////////////////////////////
function createTodo(title, description, dueDate, priority) {
    const todo = new todoModule.Todo();
    todo.setTitle(title);
    todo.setDescription(description);
    todo.setDate(dueDate);
    todo.setPriority(priority);
    todo.setId();

    return todo;
};



////////////////////////////////////////////////To Be Deleted////////////////////////////////////////////////

function generateExample() {
    //This will be triggered by using GUI
    const taskOne = createTask('Dog Food', 'pet_supplies');

    //these will get passed the UID of the add button which should match that of the parent Task (whether general or user made);
    const todoOne = createTodo('Buy kibble', 'make sure it is chicken variety', new Date(new Date().toDateString()).toISOString(), '1');
    const todoTwo = createTodo('Buy yak sticks', 'look for dark smokey ones', new Date(new Date().toDateString()).toISOString(), '2');

    attachToTask(taskOne, todoOne);
    attachToTask(taskOne, todoTwo);

    const taskTwo = createTask('Dog Training', 'pets');

    const todoThree = createTodo('Train paw', 'do training stuff', new Date(new Date().toDateString()).toISOString(), '1');
    const todoFour = createTodo('Train Sit', 'Do training stuff', new Date(new Date().toDateString()).toISOString(), '3');


    //attach to task gives the parent ID
    attachToTask(taskTwo, todoThree);
    attachToTask(taskTwo, todoFour);

    pageControl.saveAllTasks();
}











////////////////////////////////////////////////////////////page control/////////////////////////////////////////////
const pageControl = (function () {
    const searchBar = document.querySelector('#search');
    const deleteAllBtn = document.querySelector('#deleteAll');


    const todayBtn = document.querySelector('.today');
    const thisWeekBtn = document.querySelector('.this-week');
    const allTasksBtn = document.querySelector('.all');
    const importantBtn = document.querySelector('.important');

    let displayArray = [];
    const tasksObject = {};

    function collateTodos(tasks) {
        const allTodos = [];

        for (let i = 0; i < tasks.length; i++) {
            const todos = tasks[i].getTodos();
            for (let j = 0; j < todos.length; j++) {
                allTodos.push(todos[j]);
            };
        };
        return allTodos;
    };

    function filterTodos(tasks, key, value) {
        const allTodos = collateTodos(tasks);
        const filteredTodos = allTodos.filter((todo) => todo[key] === value);

        return filteredTodos;
    }

    function thisWeeksTodos(tasks) {
        const allTodos = collateTodos(tasks);
        const today = new Date(new Date().toDateString());
        const weekToday = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

        const filteredTodos = allTodos.filter((todo) => {
            const dueDate = new Date(todo.dueDate);
            return dueDate >= today && dueDate <= weekToday;
        });

        return filteredTodos;
    }

    function updateTask(id, icon, title) {
        const task = tasksObject[id];
        task.setCategory(icon);
        task.setTitle(title);

        storage.save(id, task); //updates individual task in local storage
    };

    function addToAllTasks(id, task) {
        tasksObject[id] = task;
    };

    function deleteTask(id) {
        delete tasksObject[id];
    };

    function saveAllTasks() {
        storage.save('allTasks', tasksObject);
    }

    function searchByTask(tasks) {
        searchBar.addEventListener('keydown', () => {

        });
    }

    function searchByTodo(todos) {
        searchBar.addEventListener('keydown', () => {

        });
    }

    function showSelected(btn) {
        const previousBtn = document.querySelector('.selected');
        if (previousBtn) { previousBtn.classList.toggle('selected', false) };

        btn.classList.toggle('selected', true);
    };

    function clearSelection() {
        const previousBtn = document.querySelector('.selected');
        if (previousBtn) { previousBtn.classList.toggle('selected', false) };
    };

    function displayAllTasks() {
        clearSelection();
        showSelected(allTasksBtn);
        displayArray = storage.getArrayOfTasks();
        allTasksModule.allTasksPage(displayArray);
    }

    function displayToday() {
        const today = new Date(new Date().toDateString()).toISOString();
        clearSelection();
        showSelected(todayBtn);
        const tasks = storage.getArrayOfTasks();
        displayArray = filterTodos(tasks, 'dueDate', today);
        console.log(tasks);
        console.log(displayArray);
        //todaysTodosPage(displayArray);
    }

    function displayThisWeek() {
        clearSelection();
        showSelected(thisWeekBtn);
        const tasks = storage.getArrayOfTasks();
        displayArray = thisWeeksTodos(tasks);
        console.log(displayArray);
        //thisWeeksTodos(displayArray);
    }

    function displayImportant() {
        clearSelection();
        showSelected(importantBtn);
        const tasks = storage.getArrayOfTasks();
        displayArray = filterTodos(tasks, 'priority', '1');
        console.log(displayArray);
        //importantTodos(displayArray);
    }

    window.addEventListener('DOMContentLoaded', displayAllTasks);

    todayBtn.addEventListener('click', () => {
        clearContent();
        displayToday();
    });
    thisWeekBtn.addEventListener('click', () => {
        clearContent();
        displayThisWeek();
    });
    allTasksBtn.addEventListener('click', () => {
        clearContent();
        displayAllTasks();
    });
    importantBtn.addEventListener('click', () => {
        clearContent();
        displayImportant();
    });

    function clearContent() {
        const content = document.querySelector('.content');
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        };
        console.log('content cleared!');
    };

    return { clearContent, filterTodos, thisWeeksTodos, addToAllTasks, saveAllTasks, deleteTask, updateTask };
})();





///////////////////////////////////////side Bar module////////////////////////////////
const sidebar = (function () {
    const dailyTodoCount = document.querySelector('#dailyCount');
    const weeklyTodoCount = document.querySelector('#weeklyCount');
    const importantTodoCount = document.querySelector('#importantCount');
    const taskCount = document.querySelector('#taskCount');
    const taskList = document.querySelector('.task-list');

    const menuBtn = document.querySelector('#menuButton');
    const main = document.querySelector('main');

    menuBtn.addEventListener('click', () => {
        main.classList.toggle('expand-margin');
    });

    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const mediumPageSize = 980;
        if (width >= mediumPageSize) {
            main.classList.toggle('expand-margin', false);
        };
    });

    function updateCounters() {
        const tasks = storage.getArrayOfTasks();
        dailyTodoCount.textContent = pageControl.filterTodos(tasks, 'dueDate', new Date(new Date().toDateString()).toISOString()).length;
        weeklyTodoCount.textContent = pageControl.thisWeeksTodos(tasks).length;
        importantTodoCount.textContent = pageControl.filterTodos(tasks, 'priority', '1').length;
        taskCount.textContent = tasks.length;
    }

    function populateTaskList(tasks) {
        tasks.forEach((task) => {
            const listItem = document.createElement('div');
            listItem.classList.add('list-item');

            const icon = document.createElement('span');
            icon.classList.add('material-symbols-outlined');
            icon.textContent = task.getCategory();

            const taskTitle = document.createElement('p');
            taskTitle.textContent = task.getTitle();

            listItem.append(icon, taskTitle);
            taskList.appendChild(listItem);

            listItem.addEventListener('click', taskListener);

            function taskListener() {
                pageControl.clearContent();
                singleTaskModule.singleTaskPage(task);
            };
        });
    }

    function clearTaskList() {
        const tasks = taskList.children;

        while (tasks.length > 1) {
            taskList.removeChild(taskList.lastElementChild);
        };
    };


    return { updateCounters, populateTaskList }
})();




////////////////////////////////////////SINGLE TASK PAGES//////////////////////////////////////////////////
singleTaskModule = (function() {
function singleTaskPage(task) {
    console.log(task);
}
return {singleTaskPage};
})();








////////////////////////////////////////////////////ALL Task Pages//////////////////////////////////////////////////
const allTasksModule = (function () {
    function allTasksPage(tasks) {
        const mainContent = document.querySelector('.content');

        const pageTitle = document.createElement('h1');
        pageTitle.textContent = 'Your Tasks';

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('tasks-container');

        mainContent.append(pageTitle, taskContainer);

        if (tasks.length) {
            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i];
                console.log(task);

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

                editButton.classList.add('material-symbols-outlined');
                deleteButton.classList.add('material-symbols-outlined');

                editButton.textContent = 'edit';
                deleteButton.textContent = 'delete';

                const clickables = [categoryIcon, taskTitle, editButton, deleteButton, taskDiv];
                clickables.forEach(element => element.setAttribute('data-taskid', `${task.getId()}`));

                buttonContainer.append(editButton, deleteButton);

                section.append(todoCounter, buttonContainer);
                taskDiv.append(header, section);

                taskListeners(clickables);
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

        function taskListeners([icon, titleInput, editBtn, deleteBtn, taskCard]) {
            const taskId = taskCard.getAttribute('data-taskid');

            editBtn.addEventListener('click', handleEditBtn);

            function handleEditBtn(event) {
                const status = event.target.textContent;

                if (status === 'edit') {
                    cardEditable(true);

                } else if (status === 'done') {
                    cardEditable(false);
                    updateTaskObj(taskId);
                    pageControl.saveAllTasks();

                } else if (status === 'close') {
                    cardDeleteable(false);
                };
            }

            function cardEditable(bool) {
                const header = [icon, titleInput];
                header.forEach(elem => elem.classList.toggle('edit', bool));
                titleInput.readOnly = !(bool);

                if (bool) {
                    editBtn.textContent = 'done';
                    icon.addEventListener('click', modalListeners);
                } else {
                    editBtn.textContent = 'edit';
                    icon.removeEventListener('click', modalListeners);
                };
            }

            function updateTaskObj(id) {
                const category = icon.textContent;
                const title = titleInput.value;

                pageControl.updateTask(id, category, title);
            }

            function modalListeners() {
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

            deleteBtn.addEventListener('click', handleDeleteBtn)

            function handleDeleteBtn(event) {
                const status = event.target.textContent;
                console.log(status);

                if (status === 'delete') {
                    icon.removeEventListener('click', modalListeners);
                    cardEditable(false);
                    cardDeleteable(true);
                } else {
                    destroyTask(taskId);
                    //update sidebar values
                };
            }

            function cardDeleteable(bool) {
                taskCard.classList.toggle('delete', bool);

                if (bool) {
                    editBtn.textContent = 'close';
                    deleteBtn.textContent = 'done';
                } else {
                    editBtn.textContent = 'edit';
                    deleteBtn.textContent = 'delete';
                };
            };

            function destroyTask(id) {
                editBtn.removeEventListener('click', () => handleEditBtn);
                deleteBtn.removeEventListener('click', () => handleDeleteBtn)
                pageControl.deleteTask(id); //deletes from object containing all tasks
                pageControl.saveAllTasks(); // overwrites localstorage 'allTasks'
                storage.deleteItem(id); // hard deletes individual task from localstorage
                taskCard.remove(); // removes card from DOM
            };
        };
    };
    return { allTasksPage };
})();







storage.checkStorage();
//generateExample();
sidebar.updateCounters();
sidebar.populateTaskList(storage.getArrayOfTasks());

