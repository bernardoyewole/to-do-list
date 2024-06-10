import { useContext } from "react";
import Task from "./Task";
import { TaskContext } from "../App"
import { formatDate } from "../App";

function TaskList() {
    const {
        tasks,
        deleteTask,
        editTask,
        completeTask,
    } = useContext(TaskContext);

    const handleDeleteTask = (taskId) => {
        deleteTask(taskId);
    }

    const handleEditTask = (taskId) => {
        editTask(taskId);
    }

    const truncateTaskName = (taskName, maxLength) => {
        if (taskName.length <= maxLength) {
            return taskName;
        }

        // Find the last space within the maxLength
        let truncatedTaskName = taskName.substring(0, maxLength + 1);
        let lastSpaceIndex = truncatedTaskName.lastIndexOf(' ');

        if (lastSpaceIndex > -1) {
            truncatedTaskName = truncatedTaskName.substring(0, lastSpaceIndex);
        } else {
            // If no space is found, truncate at maxLength
            truncatedTaskName = taskName.substring(0, maxLength);
        }

        return truncatedTaskName + '...';
    }

    return (
        <>
            {tasks.map((task) => (
                <Task key={task.id}
                    id={task.id}
                    name={truncateTaskName(task.name, 24)}
                    date={formatDate(task.date)}
                    isCompleted={task.isCompleted}
                    deleteTask={handleDeleteTask}
                    editTask={handleEditTask}
                    completeTask={completeTask}
                ></Task>
            ))}
        </>
    )
}

export default TaskList