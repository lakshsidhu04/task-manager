import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const AddTask = ({count,setCount}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false)
    const [url, setUrl] = useState('http://localhost:5002/taskapi')
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post(url, {
                title,
                description,
                completed
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data)
            if(response.data.code === 11000){
                alert('Task already exists')
            }
            setTitle('')
            setDescription('')
            setCount(count + 1)
        }
        catch(err){
            console.log(err)
        }
    }
    
    return (
        <div className='flex content-center justify-center'>
            <div className="add-task p-4 bg-white rounded-lg shadow-md w-1/2">
                <input
                    type="text"
                    placeholder="Add Task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full py-2 px-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full py-2 px-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
                >
                    Add Task
                </button>
            </div>
        </div>

    )
}

export default AddTask;