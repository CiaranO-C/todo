
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
                sidebar.addToTaskList(restoredTask);
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
        console.log(parsedTask);
        console.log(getArrayOfTasks());
        const restoredTask = attachMethods(parsedTask);

        console.log(restoredTask);

        return restoredTask;
    }

    function getArrayOfTasks() {
        const allTasksArray = [];

        const jsonAllTasksObj = getFromStorage('allTasks');

        if (jsonAllTasksObj) {
            const parsedTasks = Object.values(parseStorageItem(jsonAllTasksObj));

            parsedTasks.forEach(task => {
                const restoredTask = attachMethods(task);
                allTasksArray.push(restoredTask);
            });
        };
        return allTasksArray;
    }

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

    return { checkStorage, getArrayOfTasks, getTask, save, deleteItem }
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
        saveTask: function () {
            const id = this.id;
            storage.save(id, this);
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
        storage.save('todoID', nextID);

        return 'todo_' + id;
    }

    return { Todo };
})();









////////////////////////////////////////////////Task Utility Functions////////////////////////////////////////////////

//BOTH USED IN THE CREATION OF NEW TASKS/TODOS


function createTask(title, category) {
    const task = new tasksModule.Task();
    task.setTitle(title);
    task.setCategory(category);
    task.setId();
    const id = task.getId();

    storage.save(id, task);
    pageControl.addToAllTasks(id, task);
    pageControl.saveAllTasks();
    return task;
}

//give this an object where values are task objects NOT CURRENTLY IN USE
function filterAllTasks(tasks, category) {
    const all = tasks;
    const filteredTasks = all.filter((task) => task.getCategory() === category);

    return filteredTasks;
};

////////////////////////////////////////////////Todo Utility Functions////////////////////////////////////////////////
function createTodo(title, dueDate, priority) {
    const todo = new todoModule.Todo();
    todo.setTitle(title);
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
    const todoOne = createTodo('Buy kibble', 'make sure it is chicken variety', new Date(new Date().toDateString()).toISOString(), 'counter_1');
    const todoTwo = createTodo('Buy yak sticks', 'look for dark smokey ones', new Date(new Date().toDateString()).toISOString(), 'counter_2');

    attachToTask(taskOne, todoOne);
    attachToTask(taskOne, todoTwo);

    const taskTwo = createTask('Dog Training', 'pets');

    const todoThree = createTodo('Train paw', 'do training stuff', new Date(new Date().toDateString()).toISOString(), 'counter_1');
    const todoFour = createTodo('Train Sit', 'Do training stuff', new Date(new Date().toDateString()).toISOString(), 'counter_3');


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
    const generalTask = {};


    function getPage() {
        const page = {};

        const btn = document.querySelector('.selected');

        page.icon = btn.children[0].children[0].textContent;
        page.title = btn.children[1].textContent;

        return page;
    }

    function attachToTask(taskId, todo) {
        const task = tasksObject[taskId];
        task.setTodo(todo);
        todo.parentTask = task.getId();
        task.saveTask();
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
        saveAllTasks();
    };

    function deleteTodo(taskId, todoId) {
        const task = tasksObject[taskId];
        const todos = task.getTodos();

        const index = todos.findIndex(todo => todo.getId() === todoId);
        task.removeTodo(index);

        storage.save(taskId, task);
        saveAllTasks();
    }

    function updateTodo(taskId, todoId, status, title) {
        const task = tasksObject[taskId];
        const todos = task.getTodos();
        const todoToUpdate = todos.find(todo => todo.getId() === todoId);

        todoToUpdate.toggleComplete(status);
        todoToUpdate.setTitle(title);

        console.log(todoToUpdate);

        storage.save(taskId, task); //updates individual task in local storage
        saveAllTasks();
    }

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
        todoArray = filterTodos(tasks, 'dueDate', today);
        loadPage(todoArray);
    }

    function loadPage(todoArray) {
        const page = getPage();
        page.todos = todoArray;
        const mainContent = document.querySelector('.content');
        const header = document.createElement('header');
        const todoList = document.createElement('div');
        todoList.classList.add('todo-list');

        mainContent.append(header, todoList);

        singleTaskModule.pageHeader(header, page.icon, page.title);
        page.todos.forEach(todo => singleTaskModule.generateTodo(todo));
    }

    function displayThisWeek() {
        clearSelection();
        showSelected(thisWeekBtn);
        const tasks = storage.getArrayOfTasks();
        todoArray = thisWeeksTodos(tasks);
        console.log(displayArray);
        loadPage(todoArray);
    }

    function displayImportant() {
        clearSelection();
        showSelected(importantBtn);
        const tasks = storage.getArrayOfTasks();
        todoArray = filterTodos(tasks, 'priority', 'counter_3');
        console.log(displayArray);
        loadPage(todoArray)
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

    return { attachToTask, clearContent, clearSelection, filterTodos, updateTodo, deleteTodo, thisWeeksTodos, addToAllTasks, saveAllTasks, deleteTask, updateTask };
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
    const nav = document.querySelector('nav');

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
        importantTodoCount.textContent = pageControl.filterTodos(tasks, 'priority', 'counter_3').length;
        taskCount.textContent = tasks.length;
    }

    function addToTaskList(task) {
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');

        const icon = document.createElement('span');
        icon.classList.add('material-symbols-outlined');
        icon.textContent = task.getCategory();

        const taskTitle = document.createElement('p');
        taskTitle.textContent = task.getTitle();

        listItem.append(icon, taskTitle);
        taskList.appendChild(listItem);

        listItem.setAttribute('data-taskid', `${task.getId()}`);
        listItem.addEventListener('click', taskListener);

        function taskListener() {
            pageControl.clearSelection();
            pageControl.clearContent();
            singleTaskModule.singleTaskPage(task);
            console.log(task);
        };
    };

    function removeFromTaskList(taskId) {
        const tasks = taskList.children;

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            if (task.getAttribute('data-taskid') === taskId) {
                task.remove();
            };
        };
    };

    function updateListItem(taskId, icon, title) {
        const tasks = taskList.children;
        const newIcon = icon.textContent;
        const newTitle = title.value;

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            if (task.getAttribute('data-taskid') === taskId) {
                task.firstElementChild.textContent = newIcon;
                task.lastElementChild.textContent = newTitle;
            };
        };
    };

    function clearTaskList() {
        const tasks = taskList.children;

        while (tasks.length > 1) {
            taskList.removeChild(taskList.lastElementChild);
        };
    };


    return { updateCounters, addToTaskList, removeFromTaskList, updateListItem }
})();





/////////////////////////////////////////display todos module//////////////////////////////////////////////////
collatedTodos = (function () {
    function dashTodoPage(page) {
        console.log(page);
    }

    return { dashTodoPage }
})();





////////////////////////////////////////SINGLE TASK PAGES//////////////////////////////////////////////////
singleTaskModule = (function () {

    function singleTaskPage(task) {
        const taskIcon = task.getCategory();
        const taskTitle = task.getTitle();
        const todos = task.getTodos();
        const id = task.getId();

        const mainContent = document.querySelector('.content');
        const header = document.createElement('header');
        const todoList = document.createElement('div');
        todoList.classList.add('todo-list');

        mainContent.append(header, todoList);

        pageHeader(header, taskIcon, taskTitle, id);
        checkTodos(todos);
    }

    function appendTodoItem() {

    }

    function addTodo() {
        const btn = document.querySelector('#todoAdd');
        const parentTaskId = btn.getAttribute('data-taskid');
        console.log(btn);
        console.log(parentTaskId);
        /*
        - add button should know which task page is currently in view so it know which object to add the todo 
            give add button a data task id attribute when rendering page.
            this will either be task.getID/taskID or generalTask
        - if no element contains class '.selected', 
        - get the add todo card
        - check if card off screen
        - if off screen scroll card into view
        - make user also focus on input?
        - should have x and tick as buttons. 
        - x will cancel the new todo entry
        - tick confirms it
        - to confirm must have title due date and priority
        */
    }

    function checkTodos(todos) {
        if (todos.length) {
            todos.forEach(todo => {
                generateTodo(todo);
            });
        };
    };

    function pageHeader(header, icon, title, taskId = 'general') {
        const pageCategory = document.createElement('h1'); // this is task icon or dash button icon
        pageCategory.classList.add('material-symbols-outlined');
        pageCategory.textContent = icon;

        const titleContainer = document.createElement('div');
        titleContainer.classList.add('title-container');

        const pageTitle = document.createElement('h2');
        pageTitle.textContent = title; //this is the title of the task or title of dash button

        const todoCountContainer = document.createElement('div');
        const todoCount = document.createElement('span');
        todoCount.classList.add('todoCount');
        todoCount.textContent = '0';

        const addTodoBtn = document.createElement('button');
        addTodoBtn.classList.add('add');
        addTodoBtn.id = 'todoAdd';
        addTodoBtn.textContent = '+';
        addTodoBtn.setAttribute('data-taskid', taskId);

        addTodoBtn.addEventListener('click', newTodo); //what about removing this listener when page clears?

        todoCountContainer.append(todoCount, addTodoBtn);
        titleContainer.append(pageTitle, todoCountContainer);
        header.append(pageCategory, titleContainer);
    };

    function todoTemplate() {
        const template = document.createElement('div');                    
        template.classList.add('todo');   

        const checkbox = document.createElement('div');                     
        checkbox.classList.add('checkbox');   

        const checkboxIcon = document.createElement('div');                 
        checkboxIcon.classList.add('checkbox-icon');

        checkbox.appendChild(checkboxIcon); 

        const todoInfo = document.createElement('div');                     
        todoInfo.classList.add('title-input-container');                    

        const titleInput = document.createElement('input');

        titleInput.type = 'text';                                           
        titleInput.name = 'title';                                          
        titleInput.classList.add('todo-title-input');     

        const priorityDateContainer = document.createElement('div');       
        priorityDateContainer.classList.add('priorityDate'); 

        const priorityIcon = document.createElement('span');                
        priorityIcon.classList.add('material-symbols-outlined', 'priority');
       
        const dueDate = document.createElement('input');
        dueDate.type = 'date';

        priorityDateContainer.append(priorityIcon, dueDate);

        const strikethrough = document.createElement('div');
        strikethrough.classList.add('strikethrough');

        todoInfo.append(titleInput, priorityDateContainer, strikethrough);

        const todoBtnContainer = document.createElement('div');
        todoBtnContainer.classList.add('todo-buttons');
        const leftBtn = document.createElement('button');
        const rightBtn = document.createElement('button');

        leftBtn.classList.add('material-symbols-outlined');
        rightBtn.classList.add('material-symbols-outlined');

        todoBtnContainer.append(leftBtn, rightBtn);

        template.append(checkbox, todoInfo, todoBtnContainer);

        return [template, todoInfo, titleInput, priorityIcon, dueDate, leftBtn, rightBtn]
    }

    function newTodo(event) {
        const addButton = event.target;
        const taskId = addButton.getAttribute('data-taskid');
        
        addButton.removeEventListener('click', newTodo);
        const [todoItem, todoInfo, titleInput, priorityIcon, dueDate, cancelBtn, confirmBtn] = todoTemplate();
        appendToList(todoItem);
        todoItem.style.backgroundColor = 'rgba(35, 35, 35, 0.5)';
        titleInput.focus();
        // priopirtyIcon - apply hover menu
        priorityIcon.textContent = 'arrow_circle_down';
        
        dueDate.style.colorScheme = 'dark';
        dueDate.min = new Date().toISOString().split('T')[0]; ;
        cancelBtn.textContent = 'close';                                      
        confirmBtn.textContent = 'done'; 

        cancelBtn.style.color = 'white';
        confirmBtn.style.color = 'white';
        cancelBtn.addEventListener('click', deleteTemplate, {once:true}); //- remove and re apply add todo listener
        confirmBtn.addEventListener('click', confirmTodo, {once:true}) //- replace with new Todo() passed to generateTodo and re apply add todo listener

        function deleteTemplate() {
            while(todoItem.firstElementChild){
                todoItem.removeChild(todoItem.firstElementChild);
            }
            todoItem.remove();
            addButton.addEventListener('click', newTodo);
        };

        function confirmTodo(){
            const title = titleInput.value;
            const date = dueDate.value;
            const priority = priorityIcon.textContent;

            const todo = createTodo(title, date, priority);
            pageControl.attachToTask(taskId, todo);
            pageControl.saveAllTasks();

            deleteTemplate();
            generateTodo(todo);
        }

    }

    function appendToList(todo) {       
        const todoList = document.querySelector('.todo-list');      
        todoList.appendChild(todo);   
    }

    function generateTodo(todo) {
       // todoCount = document.querySelector('.todoCount');

        const [todoItem, todoInfo, titleInput, priorityIcon, dueDate, editBtn, deleteBtn] = todoTemplate();

        const todoId = todo.getId();
        const complete = todo.getComplete();
        const taskId = todo.getParentId();
        const priority = todo.getPriority();
        const title = todo.getTitle();
        const date = todo.getDate().toISOString().split('T')[0];          
                                    
        if (complete) { todoItem.classList.add('complete') };               

        titleInput.readOnly = true;                                                             
        titleInput.value = `${title}`;                            

        priorityIcon.textContent = priority;                            
        switch (priority) {
            case 'counter_1':
                priorityIcon.classList.add('low');
                break;
            case 'counter_2':
                priorityIcon.classList.add('medium')
                break;
            case 'counter_3':
                priorityIcon.classList.add('high')
                break;
        };

        dueDate.value = date    
        dueDate.readOnly = true;                                      

        if (complete) { editBtn.classList.add('inactive', true) };              

        editBtn.textContent = 'edit';
        deleteBtn.textContent = 'delete';

        appendToList(todoItem);
        updateTodoCount();

        const clickables = [todoItem, todoInfo, priorityIcon, dueDate, editBtn, deleteBtn];
        clickables.forEach(elem => {
            elem.setAttribute('data-taskid', taskId);
            elem.setAttribute('data-todoid', todoId);
        });
        todoListeners(clickables);
    }

    function togglePriorityStyle(icon, prevPriority, newPriority) {
        const classOf = {
            "counter_1": "low",
            "counter_2": "medium",
            "counter_3": "high",  
        };

        icon.classList.toggle(`${classOf[prevPriority]}`, false);
        icon.classList.toggle(`${classOf[newPriority]}`, true);
    }

    function updateTodoCount() {
        const todoList = document.querySelector('.todo-list');
        const todoCount = document.querySelector('.todoCount');

        todoCount.textContent = `${todoList.children.length}`;
    }

    function todoListeners([todoItem, todoInfo, priorityIcon, dueDate, editBtn, deleteBtn]) {
        const taskId = todoItem.getAttribute('data-taskid');
        const todoId = todoItem.getAttribute('data-todoid');

        const input = todoInfo.children[0];

        todoInfo.addEventListener('click', toggleComplete);

        function toggleComplete() {
            todoItem.classList.toggle('complete');
            toggleEditListener(getStatus());
            sendChanges();
        };

        function getStatus() {
            const isComplete = todoItem.classList.contains('complete');

            return isComplete;
        }

        function sendChanges() {
            const isComplete = getStatus();
            const title = input.value;

            pageControl.updateTodo(taskId, todoId, isComplete, title)
        }

        function toggleEditListener(bool) {
            if (bool) {
                editBtn.classList.toggle('inactive', true);
                editBtn.removeEventListener('click', editTodo);
            } else {
                editBtn.classList.toggle('inactive', false);
                editBtn.addEventListener('click', editTodo);
            };
        }

        if (!getStatus()) { editBtn.addEventListener('click', editTodo) };

        function editTodo() {
            const status = editBtn.textContent;

            if (status === 'edit') {
                editBtn.textContent = 'done';
                input.readOnly = false;
                dueDate.readOnly = false;
                todoInfo.removeEventListener('click', toggleComplete);
            } else if (status === 'done') {
                editBtn.textContent = 'edit';
                input.readOnly = true;
                dueDate.readOnly = true;
                todoInfo.addEventListener('click', toggleComplete);

                sendChanges();
            } else if (status === 'close') {
                todoItem.classList.toggle('delete', false);
                todoItem.style.backgroundColor = '';
                editBtn.textContent = 'edit';
                deleteBtn.textContent = 'delete';
                if (getStatus()) {
                    editBtn.removeEventListener('click', editTodo);
                    editBtn.classList.toggle('inactive', true);
                }
                todoInfo.addEventListener('click', toggleComplete);

            };
        }

        deleteBtn.addEventListener('click', confirmDelete);

        function confirmDelete() {
            const status = deleteBtn.textContent;
            if (status === 'delete') {
                todoInfo.removeEventListener('click', toggleComplete);
                editBtn.addEventListener('click', editTodo);
                editBtn.textContent = 'close';
                editBtn.classList.toggle('inactive', false);
                deleteBtn.textContent = 'done';
                todoItem.style.backgroundColor = '#ff000033';
            } else if (status === 'done') {
                pageControl.deleteTodo(taskId, todoId);
                destroyTodo();
                updateTodoCount();
            };
        }

        function destroyTodo() {
            todoClone = todoItem.cloneNode(true);
            todoItem.replaceWith(todoClone);

            while (todoClone.firstChild) {
                todoClone.removeChild(todoClone.firstChild);
            };
            todoClone.remove();
        };
    }

    return { singleTaskPage, pageHeader, generateTodo, appendToList };
})();








////////////////////////////////////////////////////ALL Task Pages//////////////////////////////////////////////////
const allTasksModule = (function () {

    function generateTaskCards(tasks) {
        const taskContainer = document.querySelector('.tasks-container');

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
    };

    function taskListeners(clickables) {
        const [icon, titleInput, editBtn, deleteBtn, taskCard] = clickables
        const taskId = taskCard.getAttribute('data-taskid');

        taskCard.addEventListener('click', openTask);

        function openTask(event) {
            const element = event.target;
            const cardBtns = [icon, titleInput, editBtn, deleteBtn]

            if (!cardBtns.includes(element)) {
                pageControl.clearContent();
                pageControl.clearSelection();
                singleTaskModule.singleTaskPage(storage.getTask(taskId));
            };
        }

        editBtn.addEventListener('click', handleEditBtn);

        function handleEditBtn(event) {
            const status = event.target.textContent;

            if (status === 'edit') {
                cardEditable(true);

            } else if (status === 'done') {
                cardEditable(false);
                updateTaskObj(taskId);
                pageControl.saveAllTasks();
                sidebar.updateListItem(taskId, icon, titleInput);

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
                icon.addEventListener('click', categoryModal);
            } else {
                editBtn.textContent = 'edit';
                icon.removeEventListener('click', categoryModal);
            };
        }

        function updateTaskObj(id) {
            const category = icon.textContent;
            const title = titleInput.value;

            pageControl.updateTask(id, category, title);
        }

        function categoryModal() {
            const modal = document.querySelector('#taskCategoryModal');
            const modalContent = document.querySelector('#taskCategoryModal>div');
            const closeBtn = document.querySelector('#closeCategoryModal');
            const confirmBtn = document.querySelector('#confirmCategory');

            generateCategoryBtns(modalContent);

            modal.classList.toggle('hidden'); //displays the modal

            closeBtn.addEventListener('click', closeModal);
            confirmBtn.addEventListener('click', changeIcon);

            function closeModal() {
                modal.classList.toggle('hidden');
                closeBtn.removeEventListener('click', closeModal);
                confirmBtn.removeEventListener('click', changeIcon);
                removeCategoryBtns();
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
                icon.removeEventListener('click', categoryModal);
                cardEditable(false);
                cardDeleteable(true);
            } else {
                destroyTask(taskId);
                checkForTasks();
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
            sidebar.removeFromTaskList(id);
            sidebar.updateCounters();
        };
    };

    function checkForTasks() {
        const taskContainer = document.querySelector('.tasks-container');
        if (!taskContainer.firstElementChild) {
            addTaskCard();
        }
    }

    function addTaskCard() {
        const taskContainer = document.querySelector('.tasks-container');

        const addTask = document.createElement('div');
        addTask.id = 'addTask';

        const addIcon = document.createElement('span');
        addIcon.classList.add('material-symbols-outlined');
        addIcon.textContent = 'add_circle';

        addTask.appendChild(addIcon);

        taskContainer.appendChild(addTask);

        addTask.addEventListener('click', () => {
            addTaskModal();
        })
    }

    function updatePage() {
        pageControl.clearContent();
        generatePageTemplate(storage.getArrayOfTasks());
        console.log('page updated!');
    }

    function addTaskModal() {
        const modal = document.querySelector('#taskAddModal');
        const modalContent = document.querySelector('#taskAddModal>div');
        const closeBtn = document.querySelector('#closeTaskModal');
        const confirmBtn = document.querySelector('#confirmTask');

        generateCategoryBtns(modalContent);

        modal.classList.toggle('hidden');

        closeBtn.addEventListener('click', closeModal);
        confirmBtn.addEventListener('click', confirmTask);

        function confirmTask() {
            const currentPage = document.querySelector('.selected');
            const title = document.querySelector('#taskTitle');
            const category = document.querySelector('input[name="category"]:checked');

            if (!title.value || !category) {
                title.classList.toggle('error');
                setTimeout(() => {
                    title.classList.toggle('error');
                }, 200);
            } else {
                const task = createTask(title.value, category.id);
                sidebar.updateCounters();
                sidebar.addToTaskList(task);
                if (currentPage.classList.contains('all')) {
                    updatePage();
                };
                closeModal();
            }
        }

        function closeModal() {
            modal.classList.toggle('hidden');
            closeBtn.removeEventListener('click', closeModal);
            confirmBtn.removeEventListener('click', confirmTask);
            removeCategoryBtns();
        };
    };


    function generateCategoryBtns(parent) {
        const categories = ['school', 'home', 'work', 'exercise', 'savings', 'pets', 'sound_detection_dog_barking', 'grocery', 'flight_takeoff', 'family_restroom'];
        const container = document.createElement('div');
        container.classList.add('icons-container');

        categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            const radio = document.createElement('input');
            const label = document.createElement('label');

            radio.type = 'radio';
            radio.name = 'category';
            radio.id = category;

            label.htmlFor = category;
            label.textContent = category;
            label.classList.add('material-symbols-outlined');

            categoryDiv.append(radio, label);
            container.appendChild(categoryDiv);
            parent.insertBefore(container, parent.lastElementChild);
        });
    };

    function removeCategoryBtns() {
        const container = document.querySelector('.icons-container');

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        container.remove();
    };

    function generatePageTemplate(tasks) {
        const mainContent = document.querySelector('.content');

        const pageTitle = document.createElement('h1');
        pageTitle.textContent = 'Your Tasks';

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('tasks-container');

        mainContent.append(pageTitle, taskContainer);

        if (tasks.length) {
            generateTaskCards(tasks);
        } else {
            addTaskCard();
        };
    }

    function allTasksPage(tasks) {
        generatePageTemplate(tasks)
    };

    const createTaskBtn = document.querySelector('#taskAdd');

    createTaskBtn.addEventListener('click', () => {
        addTaskModal();
    });

    return { allTasksPage };
})();







storage.checkStorage();
//generateExample();
sidebar.updateCounters();
