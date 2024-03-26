export { updateCounters, addToTaskList, removeFromTaskList, updateListItem }
import { getArrayOfTasks, getTask } from "./storage";
import { filterTodos, thisWeeksTodos, showSelected, clearContent } from "./pageControl";
import { singleTaskPage } from "./singleTaskPage";


    const dailyTodoCount = document.querySelector('#dailyCount');
    const weeklyTodoCount = document.querySelector('#weeklyCount');
    const importantTodoCount = document.querySelector('#importantCount');
    const taskCount = document.querySelector('#taskCount');
    const taskList = document.querySelector('.task-list');
    const generalTask = document.querySelector('#general');

    const menuBtn = document.querySelector('#menuButton');
    const main = document.querySelector('main');

    generalTask.addEventListener('click', taskListener)

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
        const tasks = getArrayOfTasks();
        const generalTask = getTask('general');
        tasks.push(generalTask);
        dailyTodoCount.textContent = filterTodos(tasks, 'dueDate', new Date(new Date().toDateString()).toISOString()).length;
        weeklyTodoCount.textContent = thisWeeksTodos(tasks).length;
        importantTodoCount.textContent = filterTodos(tasks, 'priority', 'counter_3').length;
        taskCount.textContent = tasks.length - 1;
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
    };

    function taskListener(event) {
        const listItem = event.target.closest('.list-item');
        const taskId = listItem.getAttribute('data-taskid');

        const task = getTask(taskId);
        showSelected(listItem);
        clearContent();
        singleTaskPage(task);
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