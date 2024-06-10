import './style/index.css'
import Form from './components/Form';
import TaskList from './components/TaskList';
import { v4 as uuid } from "uuid";
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const addTask = (userInput) => {
    let task = {
      id: uuid().slice(0, 8),
      name: userInput,
      isCompleted: false,
      date: Date.now()
    }
    setTasks([...tasks, task]);
  }

  const formatDate = (timestamp) => {
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

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  const editTask = (taskId) => {
    setIsEditing(true);
    let tempTask = tasks.find(task => task.id === taskId);
    setCurrentTask(tempTask);
  }

  const updateTask = (newTaskName) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === currentTask.id) {
        return {
          ...task,
          name: newTaskName,
          date: Date.now()
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    setIsEditing(false);
    setCurrentTask({});
  }

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  return (
    <div className="App">
      <section>
        <h1>Task Tracker</h1>
        <div className='form-container'>
          <Form
            className='form'
            addTask={addTask}
            isEditing={isEditing}
            currentTask={currentTask}
            updateTask={updateTask}
          >
          </Form>
        </div>
        <div className='task-list'>
          <TaskList
            tasks={tasks}
            formatDate={formatDate}
            deleteTask={deleteTask}
            editTask={editTask}
            completeTask={completeTask}
          >
          </TaskList>
        </div>
      </section>
    </div>
  );
}

export default App;
