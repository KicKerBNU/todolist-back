const Todo = require('../models/Todo');

// Create a new todo
exports.createTodo = async (req, res) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all todos
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single todo by ID
exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a todo
exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 