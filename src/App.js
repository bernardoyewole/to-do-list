import './style/index.css'
import Form from './components/Form';
import TaskList from './components/TaskList';
import { v4 as uuid } from "uuid";
import { useState, useEffect, useReducer } from 'react';
import { createContext } from 'react';

/*
  Context API allows data to be passed through a component tree without having to 
  pass props manually at every level. This makes it easier to share data between components.

  It is not always necessary. For simple applications, passing props manually is okay.
*/
export const TaskContext = createContext();

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  return date.toLocaleString('en-GB', options);
};

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const initialTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  const [tasks, dispatch] = useReducer(reducer, initialTasks);

  function reducer(tasks, action) {
    switch (action.type) {
      case 'ADD_TASK':
        let task = {
          id: uuid().slice(0, 8),
          name: action.userInput,
          isCompleted: false,
          date: Date.now()
        }
        return [...tasks, task];

      case 'UPDATE_TASK':
        let updatedTasks = tasks.map(task => {
          if (task.id === currentTask.id) {
            return {
              ...task,
              name: action.newTaskName,
              date: Date.now()
            };
          }
          return task;
        });
        return [...updatedTasks];

      case 'DELETE_TASK':
        return tasks.filter(task => task.id !== action.taskId);

      case 'COMPLETE_TASK':
        return tasks.map((task) => {
          if (task.id === action.taskId) {
            return {
              ...task,
              isCompleted: !task.isCompleted
            }
          }
          return task;
        });
      default:
        return tasks;
    }
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (userInput) => {
    dispatch({
      type: 'ADD_TASK',
      userInput: userInput
    });
  }

  const deleteTask = (taskId) => {
    dispatch({
      type: 'DELETE_TASK',
      taskId: taskId
    });
  }

  const editTask = (taskId) => {
    setIsEditing(true);
    let tempTask = tasks.find(task => task.id === taskId);
    setCurrentTask(tempTask);
  }

  const updateTask = (newTaskName) => {
    dispatch({
      type: 'UPDATE_TASK',
      newTaskName: newTaskName
    });
    setIsEditing(false);
    setCurrentTask({});
  }

  const completeTask = (taskId) => {
    dispatch({
      type: 'COMPLETE_TASK',
      taskId: taskId
    });
  }

  return (
    <TaskContext.Provider value={
      {
        tasks,
        addTask,
        deleteTask,
        editTask,
        updateTask,
        completeTask,
        isEditing,
        currentTask,
      }
    }>
      <div className="App">
        <section>
          <h1>Task Tracker</h1>
          <div className='form-container'>
            <Form className='form'></Form>
          </div>
          <div className='task-list'>
            <TaskList></TaskList>
          </div>
        </section>
      </div>
    </TaskContext.Provider>
  );
}

export default App;