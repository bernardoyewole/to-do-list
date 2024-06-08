import { useState, useEffect, useRef } from 'react';

function Form({ addTask, isEditing, currentTask, updateTask }) {
    const [userInput, setUserInput] = useState('');
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