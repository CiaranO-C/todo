export {pageControl};
import { saveToStorage } from "./localStorage";

function pageControl () {
    const searchBar = document.querySelector('#search');
    const deleteAllBtn = document.querySelector('#deleteAll');

    const todayBtn = document.querySelector('.today');
    const thisWeekBtn = document.querySelector('.this-week');
    const allTasksBtn = document.querySelector('.all');
    const importantBtn = document.querySelector('.important');

    let displayArray = [];

    function saveAllTasks() {
        saveToStorage('allTasks', tasksObject);
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
        displayArray = Object.values(tasksObject);
        allTasksPage(displayArray);
    }

    function displayToday() {
        const today = new Date(new Date().toDateString()).toISOString();
        clearSelection();
        showSelected(todayBtn);
        displayArray = filterTodos(tasksObject, 'dueDate', today);
        console.log(displayArray);
        //todaysTodosPage(displayArray);
    }

    function displayThisWeek() {
        clearSelection();
        showSelected(thisWeekBtn);
        displayArray = thisWeeksTodos(tasksObject);
        console.log(displayArray);
        //thisWeeksTodos(displayArray);
    }

    function displayImportant() {
        clearSelection();
        showSelected(importantBtn);
        displayArray = filterTodos(tasksObject, 'priority', '1');
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

    return {saveAllTasks};
};