export {checkStorage, getTask, getArrayOfTasks, save, deleteItem}
import { addToAllTasks } from "./pageControl";
import { addToTaskList } from "./sidebar";
import { Task } from "./tasks";
import { Todo } from "./todos";


function checkStorage() {
    if (localStorage.length > 1) {
        console.log(localStorage);
        const jsonTasks = localStorage.getItem("allTasks");
        const idTaskPairs = Object.entries(JSON.parse(jsonTasks));
        console.log(idTaskPairs);
        idTaskPairs.forEach(pair => {
            const [id, task] = pair;
        console.log(task);
            const restoredTask = attachMethods(task);
    
            addToAllTasks(id, restoredTask);
            addToTaskList(restoredTask);
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

//save key value pair to local storage
function save(key, value) {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(`${key}`, jsonValue);
};

function deleteItem(id) {
    localStorage.removeItem(id);
};
