import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useContext } from "react";
import { TaskContext } from "../App";

function Task({ id, name, date, isCompleted }) {
    const {
        deleteTask,
        editTask,
        completeTask,
    } = useContext(TaskContext)

    const handleDelete = () => {
        deleteTask(id);
    }

    const handleEdit = () => {
        editTask(id);
    }

    const handleComplete = () => {
        completeTask(id);
    }

    return (
        <div className="task-container">
            <div className="task">
                <div>
                    <p className={`name ${isCompleted ? 'completed' : 'incomplete'}`}>{name}</p>
                </div>
                <div className="actions">
                    <div>
                        <p className="date">{date}</p>
                    </div>
                    <div>
                        <IoIosCheckmarkCircleOutline className="complete" onClick={handleComplete} />
                        <MdOutlineModeEdit className="edit" onClick={handleEdit} />
                        <AiOutlineDelete className="delete" onClick={handleDelete} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task