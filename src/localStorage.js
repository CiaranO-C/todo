export {checkStorage, saveToStorage}

function checkStorage() {
    if (localStorage.length) {
        const jsonTasks = localStorage.getItem("allTasks");
        const idTaskPairs = Object.entries(JSON.parse(jsonTasks));
        idTaskPairs.forEach(pair => {
            const [id, task] = pair;
            const restoredTask = attachMethods(task);
            addToAllTasks(id, restoredTask);
        });
    };
};

//save key value pair to local storage
function saveToStorage(key, value) {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(`${key}`, jsonValue);
};

//re-attach methods after parsing localStorage JSON
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