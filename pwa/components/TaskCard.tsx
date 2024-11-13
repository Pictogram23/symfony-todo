import { CardContent, Checkbox, IconButton, Modal, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TaskForm from "./TaskForm";
import { useState } from "react";
import { Task } from "../pages";

type TaskCardProps = {
    task: Task
    getTasks: () => void,
}

const TaskCard = ({task, getTasks}: TaskCardProps) => {    
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const handleOpenModal = () => setModalOpen(true)
    const handleCloseModal = () => setModalOpen(false)
    
    const updateTaskDone = async() => {
        const data = JSON.stringify({
            name: task.name,
            description: task.description,
            deadline: task.deadline,
            done: !task.done,
        })
        const options = {
            method: "PATCH",
            body: data,
            headers: {
                "Accept": "application/ld+json",
                "Content-Type": "application/merge-patch+json"
            }
        }
        await fetch(`/tasks/${task.id}`, options)
        await getTasks()
    }

    const deleteTask = async() => {
        const options = {
            method: "DELETE"
        }
        await fetch(`/tasks/${task.id}`, options)
        await getTasks()
    }

    return (
        <>
            <CardContent>
                <Typography sx={{color: "text.secondary", fontSize: 14}}>
                    {task.deadline?.toLocaleString()}
                </Typography>
                <Typography variant="h5">
                    {task.name}
                </Typography>
                <Typography variant="body2">
                    {task.description}
                </Typography>
                <Checkbox checked={task.done} onClick={updateTaskDone} />
                <IconButton onClick={handleOpenModal}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={deleteTask}>
                    <DeleteIcon />
                </IconButton>
            </CardContent>
            <Modal open={modalOpen} onClose={handleCloseModal}>
                <TaskForm getTasks={getTasks} handleCloseModal={handleCloseModal} task={task} />
            </Modal>
        </>
    )
}

export default TaskCard