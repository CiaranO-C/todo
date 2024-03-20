export { allTasksPage }
import { showSelected, clearContent, saveAllTasks, updateTask, deleteTask } from "./pageControl";
import { singleTaskPage } from "./singleTaskPage";
import { getTask, getArrayOfTasks, deleteItem } from "./storage";
import { updateListItem, removeFromTaskList, updateCounters, addToTaskList } from "./sidebar";
import { createTask } from "./tasks";

    function generateTaskCards(tasks) {
        const taskContainer = document.querySelector('.tasks-container');

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];

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
            const taskList = document.querySelector('.task-list').children;
            let listItem;
            for (let i = 1; i < taskList.length; i++) {
                listItem = taskList[i];
                if (listItem.getAttribute('data-taskid') === taskId) {
                    break;
                };
            };

            const element = event.target;
            const cardBtns = [icon, titleInput, editBtn, deleteBtn];

            if (!cardBtns.includes(element)) {
                clearContent();
                singleTaskPage(getTask(taskId));
                showSelected(listItem);
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
                saveAllTasks();
                updateListItem(taskId, icon, titleInput);

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

            console.log(id);
            console.log(category);
            console.log(title);

            updateTask(id, category, title);
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
            deleteTask(id); //deletes from object containing all tasks
            saveAllTasks(); // overwrites localstorage 'allTasks'
            deleteItem(id); // hard deletes individual task from localstorage
            taskCard.remove(); // removes card from DOM
            removeFromTaskList(id);
            updateCounters();
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
        clearContent();
        generatePageTemplate(getArrayOfTasks());
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
            const container = document.querySelector('.modal-content');
            const category = document.querySelector('input[name="category"]:checked');

            if (!title.value || !category) {
                container.classList.toggle('error');
                setTimeout(() => {
                    container.classList.toggle('error');
                }, 200);
            } else {
                const task = createTask(title.value, category.id);
                updateCounters();
                addToTaskList(task);
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