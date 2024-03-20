export { attachToTask, filterTodos, thisWeeksTodos, updateTask, deleteTodo, updateTodo, addToAllTasks, deleteTask, saveAllTasks, showSelected, clearContent }
import { Task } from "./tasks";
import { getTask as getStoredTask, save, getArrayOfTasks } from "./storage";
import { destroyTodo, pageHeader, generateTodo } from "./singleTaskPage";
import { allTasksPage } from "./allTasksPage";


    const deleteAllBtn = document.querySelector('#deleteAll');

    const todayBtn = document.querySelector('.today');
    const thisWeekBtn = document.querySelector('.this-week');
    const allTasksBtn = document.querySelector('.all');
    const importantBtn = document.querySelector('.important');

    let displayArray = [];
    const tasksObject = {};
    const generalTask = getGeneralTask();

    function getGeneralTask() {
        let task = localStorage.getItem('general');

        if (task === null) {
            task = new Task('General', 'inbox');
            task.setId('general');
            task.saveTask();
        } else {
            task = getStoredTask('general');
            console.log(task);
        }
        return task;
    }

    function getPage() {
        const page = {};

        const btn = document.querySelector('.selected');

        page.icon = btn.children[0].children[0].textContent;
        page.title = btn.children[1].textContent;

        return page;
    }

    function attachToTask(taskId, todo) {
        const task = getTask(taskId);
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
        const filteredTodos = allTodos.filter((todo) => {
            return todo[key] === value;
        });
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

    deleteAllBtn.addEventListener('click', handleDeleteBtn)

    function handleDeleteBtn() {
        const completedTodos = document.querySelectorAll('.complete');
        const button = deleteAllBtn.textContent;

        function resetDelete() {
            cancel.classList.toggle('active', false);
            deleteAllBtn.textContent = 'Delete Completed';
        };

        if (button === 'Delete Completed') {
            if (completedTodos.length) {
                const cancel = document.querySelector('#cancel');

                cancel.classList.toggle('active', true);
                cancel.addEventListener('click', resetDelete, { once: true });

                deleteAllBtn.textContent = 'Confirm';

            } else {
                alert('No completed todos found!');
            };
        } else {
            completedTodos.forEach(todo => {
                const taskId = todo.getAttribute('data-taskid');
                const todoId = todo.getAttribute('data-todoid');

                deleteTodo(taskId, todoId);
                destroyTodo(todo);
            });
            resetDelete();
        };
    }



    function updateTask(id, icon, title) {
        const task = getTask(id);
        console.log(task);

        task.setCategory(icon);
        task.setTitle(title);

        console.log(task.getCategory());
        console.log(task.getTitle());

        task.saveTask(); 
        saveAllTasks();
    };

    function deleteTodo(taskId, todoId) {
        const task = getTask(taskId);
        const todos = task.getTodos();

        const index = todos.findIndex(todo => todo.getId() === todoId);
        task.removeTodo(index);

        task.saveTask();
        saveAllTasks();
    }

    function updateTodo(taskId, todoId, status, title, priority, dueDate) {
        const task = getTask(taskId);
        const todos = task.getTodos();
        const todoToUpdate = todos.find(todo => todo.getId() === todoId);

        todoToUpdate.toggleComplete(status);
        todoToUpdate.setTitle(title);
        todoToUpdate.setPriority(priority);
        todoToUpdate.setDate(dueDate);

        task.saveTask();
        saveAllTasks();
    }

    function getTask(id) {
        let task;
        (id === 'general') ? task = generalTask : task = tasksObject[id];
        return task;
    }

    function addToAllTasks(id, task) {
        tasksObject[id] = task;
    };

    function deleteTask(id) {
        delete tasksObject[id];
    };

    function saveAllTasks() {
        save('allTasks', tasksObject);
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
        displayArray = getArrayOfTasks();
        allTasksPage(displayArray);
    }

    function displayToday() {
        const today = new Date(new Date().toDateString()).toISOString();
        clearSelection();
        showSelected(todayBtn);
        const tasks = getArrayOfTasks();
        tasks.push(generalTask);
        const todoArray = filterTodos(tasks, 'dueDate', today);
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

        pageHeader(header, page.icon, page.title);
        page.todos.forEach(todo => generateTodo(todo));
    }

    function displayThisWeek() {
        clearSelection();
        showSelected(thisWeekBtn);
        const tasks = getArrayOfTasks();
        tasks.push(generalTask);
        const todoArray = thisWeeksTodos(tasks);

        loadPage(todoArray);
    }

    function displayImportant() {
        clearSelection();
        showSelected(importantBtn);
        const tasks = getArrayOfTasks();
        tasks.push(generalTask);
        const todoArray = filterTodos(tasks, 'priority', 'counter_3');

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
    };
