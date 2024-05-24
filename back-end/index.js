const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.connect('mongodb://127.0.0.1:27017/taskdb').then
(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log('Failed to connect to MongoDB', err);
})

const taskScheme = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    
    description:{
            type: String,
            required: false
    },
    completed:{
        type: Boolean,
        required: false
    }
})

const task = mongoose.model('task', taskScheme);
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

app.post('/taskapi', async (req, res) => {
    console.log(req.body);
    const result = await task.create({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    }).then((result) => {   
        return res.status(200).json({success: true, data: result})
    })
    //catch the error if the task already exists
    .catch((err) => {
        return res.status(400).json({success: false, code: err.code});
    });
})

app.get('/taskapi', async (req, res) => {
    const result = await task.find();
    
    return res.status(200).json({success: true, data: result});
})

app.delete('/taskapi/:id', async (req, res) => {
    console.log(req.params.id);
    const result = await task.findByIdAndDelete(req.params.id);
    return res.status(200).json({success: true});
})

app.put('/taskapi/:id', async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    const result = await task.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    });
    return res.status(200).json({success: true});
})

app.listen(5002, () => {
    console.log('Server is running on port 5002');
})
