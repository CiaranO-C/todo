export { singleTaskPage, pageHeader, generateTodo, destroyTodo }
import { createTodo } from "./todos";
import { attachToTask, saveAllTasks, updateTodo, deleteTodo } from "./pageControl";
import { updateCounters } from "./sidebar";

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


        const priorityDropdown = document.createElement('div');
        priorityDropdown.classList.add('dropdown');
        const priorityIcon = document.createElement('span');
        priorityIcon.classList.add('material-symbols-outlined', 'priority');

        const priorityOptions = document.createElement('div');
        priorityOptions.classList.add('dropdown-options', 'hidden');
        const priorityOne = document.createElement('span');
        const priorityTwo = document.createElement('span');
        const priorityThree = document.createElement('span');

        priorityOne.textContent = 'counter_1';
        priorityTwo.textContent = 'counter_2';
        priorityThree.textContent = 'counter_3';

        const options = [priorityOne, priorityTwo, priorityThree];

        options.forEach(option => {
            option.classList.add('material-symbols-outlined', 'priority');
            togglePriorityStyle(option, option.textContent);
        })

        priorityOptions.append(priorityOne, priorityTwo, priorityThree);
        priorityDropdown.append(priorityIcon, priorityOptions);

        const dueDate = document.createElement('input');
        dueDate.type = 'date';
        dueDate.style.colorScheme = 'dark';

        priorityDateContainer.append(priorityDropdown, dueDate);

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



        return [template, todoInfo, titleInput, priorityDropdown, dueDate, leftBtn, rightBtn]
    }

    function priorityMenu(event) {
        const container = event.target;
        const icon = container.children[0];
        const menu = container.children[1];
        const options = menu.children;

        menu.classList.toggle('hidden', false);
        toggleOptions(true);

        function toggleOptions(bool) {
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                (bool) ? option.addEventListener('click', chooseOption) : option.removeEventListener('click', chooseOption);
            };
        }

        function chooseOption(event) {
            const prevChoice = icon.textContent
            const choice = event.target.textContent;
            icon.textContent = choice;
            togglePriorityStyle(icon, choice, prevChoice);
        }

        container.addEventListener('mouseleave', () => {
            menu.classList.toggle('hidden', true);
            toggleOptions(false);

        }, { once: true });
    }

    function newTodo(event) {
        const [todoItem, todoInfo, titleInput, priorityDropdown, dueDate, cancelBtn, confirmBtn] = todoTemplate();

        const dashboardPage = document.querySelector('.selected');

        const priorityIcon = priorityDropdown.children[0];

        const addButton = event.target;
        const taskId = addButton.getAttribute('data-taskid');

        addButton.removeEventListener('click', newTodo);

        priorityIcon.textContent = 'arrow_circle_down';
        dueDate.min = new Date().toISOString().split('T')[0];

        if (dashboardPage) {
            const pageTitle = dashboardPage.children[1].textContent;

            switch (pageTitle) {
                case 'Today':
                    dueDate.value = new Date().toISOString().split('T')[0];
                    break;
                case 'This Week':
                    const today = new Date();
                    today.setDate(today.getDate() + 7);
                    const weekToday = today.toISOString().split('T')[0];
                    dueDate.max = weekToday;
                    break;
                case 'Important':
                    priorityIcon.textContent = 'counter_3';
                    priorityIcon.classList.add('high');
                    break;
            };
        };

        cancelBtn.textContent = 'close';
        confirmBtn.textContent = 'done';

        cancelBtn.style.color = 'white';
        confirmBtn.style.color = 'white';

        todoItem.style.backgroundColor = 'rgba(35, 35, 35, 0.5)';

        appendToList(todoItem);

        titleInput.focus();

        priorityDropdown.addEventListener('mouseenter', priorityMenu);

        cancelBtn.addEventListener('click', deleteTemplate, { once: true });

        confirmBtn.addEventListener('click', confirmTodo);

        function deleteTemplate() {
            while (todoItem.firstElementChild) {
                todoItem.removeChild(todoItem.firstElementChild);
            }
            todoItem.remove();
            addButton.addEventListener('click', newTodo);
        };

        function confirmTodo() {
            const title = titleInput.value;
            const date = dueDate.value;
            const dateObj = new Date(date);
            const priority = priorityDropdown.children[0].textContent;

            if (title && date && priority !== 'arrow_circle_down') {
                console.log('all inputs valid');
                confirmBtn.removeEventListener('click', confirmTodo);
                const todo = createTodo(title, dateObj, priority);

                attachToTask(taskId, todo);

                if (taskId !== 'general') {
                    saveAllTasks();
                }

                updateCounters();

                deleteTemplate();
                generateTodo(todo);
            } else {

                if (!title) {
                    console.log('no title!')
                }
                if (!date) {
                    console.log('no date!')
                }
                if (priority === 'arrow_circle_down') {
                    console.log('no priority!')
                }

                todoItem.style.backgroundColor = '#ff000033';
                setTimeout(() => {
                    todoItem.style.backgroundColor = '';
                }, 250);
            };
        }
    }

    function appendToList(todo) {
        const todoList = document.querySelector('.todo-list');
        todoList.appendChild(todo);
    }

    function generateTodo(todo) {
        const [todoItem, todoInfo, titleInput, priorityDropdown, dueDate, editBtn, deleteBtn] = todoTemplate();

        const todoId = todo.getId();
        const complete = todo.getComplete();
        const taskId = todo.getParentId();
        const priority = todo.getPriority();
        const title = todo.getTitle();
        const date = todo.getDate().toISOString().split('T')[0];
        const priorityIcon = priorityDropdown.children[0];

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

        const clickables = [todoItem, todoInfo, priorityDropdown, dueDate, editBtn, deleteBtn];
        clickables.forEach(elem => {
            elem.setAttribute('data-taskid', taskId);
            elem.setAttribute('data-todoid', todoId);
        });
        todoListeners(clickables);
    }

    function togglePriorityStyle(icon, newPriority, prevPriority) {
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

    function todoListeners([todoItem, todoInfo, priorityDropdown, dueDate, editBtn, deleteBtn]) {
        const taskId = todoItem.getAttribute('data-taskid');
        const todoId = todoItem.getAttribute('data-todoid');

        const input = todoInfo.children[0];
        const priorityIcon = priorityDropdown.children[0];

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
            const priority = priorityIcon.textContent;
            const date = new Date(dueDate.value);

            updateTodo(taskId, todoId, isComplete, title, priority, date)
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
                priorityDropdown.addEventListener('mouseenter', priorityMenu);
                todoInfo.removeEventListener('click', toggleComplete);
            } else if (status === 'done') {
                editBtn.textContent = 'edit';
                input.readOnly = true;
                dueDate.readOnly = true;
                todoInfo.addEventListener('click', toggleComplete);
                priorityDropdown.removeEventListener('mouseenter', priorityMenu);
                sendChanges();
                updateCounters();
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
                editBtn.addEventListener('click', editTodo); //edit button becomes cancel button, needs listener enabled incase todo is complete, therefore disabled.
                editBtn.textContent = 'close';
                editBtn.classList.toggle('inactive', false);
                deleteBtn.textContent = 'done';
                todoItem.style.backgroundColor = '#ff000033';
                input.readOnly = true;
                dueDate.readOnly = true;
                priorityDropdown.removeEventListener('mouseenter', priorityMenu);
            } else if (status === 'done') {
                deleteTodo(taskId, todoId);
                destroyTodo(todoItem);
                updateTodoCount();
            };
        }
    }


    function destroyTodo(todo) {
        const todoClone = todo.cloneNode(true);
        todo.replaceWith(todoClone);

        while (todoClone.firstChild) {
            todoClone.removeChild(todoClone.firstChild);
        };
        todoClone.remove();
    };