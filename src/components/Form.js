import { useState, useEffect, useRef } from 'react';
import { useContext } from "react";
import { TaskContext } from "../App";

function Form() {
    const {
        addTask,
        updateTask,
        isEditing,
        currentTask,
    } = useContext(TaskContext);

    const [userInput, setUserInput] = useState('');

    /*
        The useRef hook is a built-in React hook that allows you to create a 
        mutable object which persists across renders. This object can be used 
        to store a reference to a DOM element or any other mutable value that 
        you want to persist between renders without causing re-renders.
    */
    const inputRef = useRef(null);

    const handleInput = (event) => {
        setUserInput(event.target.value);
    }

    const handleSubmit = () => {
        if (userInput.trim() === '') {
            // If the input is empty, set focus to the input field and return early
            inputRef.current.focus();
            return;
        }

        if (isEditing) {
            updateTask(userInput);
        } else {
            addTask(userInput);
            setUserInput('');
        }
        setUserInput('');
    }

    useEffect(() => {
        if (isEditing) {
            setUserInput(currentTask.name);
        }
    }, [isEditing, currentTask]);

    return (
        <>
            <input
                ref={inputRef}
                type='text'
                className='task-input'
                placeholder='Add your task here...'
                onChange={handleInput}
                value={userInput}
            />
            <input
                type='button'
                value={isEditing ? 'Update' : 'Add'}
                className='add-btn'
                onClick={handleSubmit}
            />
        </>
    )
}

export default Form