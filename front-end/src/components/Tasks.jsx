import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
const Tasks = ({count,setCount}) => {
    
    const [tasks, setTasks] = useState([])
    const [url, setUrl] = useState('http://localhost:5002/taskapi')
    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            console.log(response.data)
            setTasks(response.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        
        fetchData()
    }, [count])
    
    const handleDelete = async (id) => {
        try{
            const response = await axios.delete(`${url}/${id}`);
            console.log(response.data)
            setCount(count - 1)
        }
        catch(err){
            console.log(err)
        }
    }

    const handleComplete = async (task_title,task_description,id,task_completed) => {
        try{
            const newTask = {
                title: task_title,
                description: task_description,
                completed: !task_completed
            }
            
            const response = await axios.put(`${url}/${id}`,newTask);
            fetchData()
            console.log(response.data)
        }
        catch(err){
            console.log(err)
        }
    }

    const handleEdit = () => {
        console.log('Edit')
    }

    return (
        <div className="tasks flex flex-col items-center my-4">
            <h1 className="text-center text-2xl font-bold">Tasks</h1>
            <div className="task-list w-1/2">
                {tasks.map((task) => {
                    return (
                        <div key={task._id} className="task bg-white p-4 rounded-lg shadow-md mb-4">
                            <div className='info flex flex-col'>
                                <input readOnly value={task.title} className={`outline-none text-xl font-bold ${task.completed ? 'line-through text-gray-400' : ''} `} />
                                <input readOnly className="text-gray-500 outline-none" value={task.description} />
                            </div>
                            <div className="flex justify-end items-center mt-4">
                                <button className={` text-white ${task.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} py-2 px-4 mx-2 rounded-md focus:outline-none`} onClick={() => handleComplete(task.title, task.description, task._id, task.completed)}>
                                    {task.completed ? 'Completed' : 'Not Completed'}
                                </button>
                                <button className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mx-2 rounded-md focus:outline-none`} onClick={()=>handleEdit()}>
                                    Edit
                                </button>
                                <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mx-2 rounded-md focus:outline-none" onClick={()=>handleDelete(task._id)}>
                                    Delete
                                </button>
                                
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Tasks;