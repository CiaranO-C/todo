function createTask(title, category) {
    let _title = title;
    let _category = category;
    let _style = 'default';
    const _todos = [];


    function setTodo(todo) {
        _todos.push(todo);
    };

    function removeTodo(index) {
        _todos.splice(index, 1);
    };

    function setTitle(newTitle) {
        _title = newTitle;
    };

    function setCategory(newCategory) {
        _category = newCategory;
    };
   
    const getTodos = () => _todos;
    const getCategory = () => _category;
    const getTitle = () => _title;
    const getStyle = () => _style;

    const privateProps = {
        _todos,
        _title,
        _category,
        _style
    }

    return {
        privateProps, //Remove later!!
        setTodo,
        removeTodo,
        setCategory,
        setTitle,
        getTodos,
        getCategory,
        getTitle,
        getStyle
    };
}

function createTodo(title, description, dueDate, priority) {
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority


    function setTitle(newTitle) {
        (newTitle) ? _title = newTitle : console.log('todo needs validation1');
    };

    function setDescription(newDesc = _description) {
        (newDesc) ? _description = newDesc : console.log('todo needs validation2');
    };

    function setDate(newDate = _dueDate) {
        (newDate) ? _dueDate = newDate : console.log('todo needs validation3');
    };

    function setPriority(newPriority) {
        (newPriority) ? _priority = newPriority : console.log('todo needs validation4')
    };

    const getTitle = () => _title;
    const getDescription = () => _description;
    const getDate = () => _dueDate;
    const getPriority = () => _priority;

    const privateProps = {
        title,
        description,
        dueDate,
        priority
    };

    return {
        privateProps, //Remove later!!
        setTitle,
        setDescription,
        setDate,
        setPriority,
        getTitle,
        getDescription,
        getDate,
        getPriority
    };
};