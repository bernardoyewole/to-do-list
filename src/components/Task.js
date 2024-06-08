import { MdDelete, MdEdit } from "react-icons/md";

function Task({ id, name, date, deleteTask, editTask }) {
    const handleDelete = () => {
        deleteTask(id);
    }

    const handleEdit = () => {
        editTask(id);
    }

    return (
        <div className="task-container">
            <div className="task">
                <div>
                    <p className="name">{name}</p>
                </div>
                <div className="actions">
                    <div>
                        <p className="date">{date}</p>
                    </div>
                    <div>
                        <MdEdit className="edit" onClick={handleEdit} />
                        <MdDelete className="delete" onClick={handleDelete} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task