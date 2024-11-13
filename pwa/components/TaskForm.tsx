import { Box, Button, TextareaAutosize, TextField } from "@mui/material"
import {useState } from "react"
import { Task } from "../pages"

type TaskFormProps = {
    getTasks: () => void,
    handleCloseModal: () => void,
    task?: Task
}

const TaskForm = ({getTasks, handleCloseModal, task}: TaskFormProps) => {
    const [name, setName] = useState<string>(task?.name ? task.name : '')
    const [desc, setDesc] = useState<string>(task?.description ? task.description : '')
    const [deadline, setDeadline] = useState<Date | null>(task?.deadline ? task.deadline : null)

    const submit = () => {
        if (task?.id == undefined) {
            POST()
        } else {
            PATCH()
        }
    }

    const POST = async() => {
        if (name == '') return
        const data = JSON.stringify({
            name: name,
            description: desc,
            deadline: deadline,
            done: false,
        })
        const options = {
            method: "POST",
            body: data,
            headers: {
                "Accept": "application/ld+json",
                "Content-Type": "application/ld+json"
            }
        }
        await fetch('/tasks', options)
        await getTasks()

        handleCloseModal()
    }

    const PATCH = async() => {
        if (name == '' || task?.id == undefined) return
        const data = JSON.stringify({
            name: name,
            description: desc,
            deadline: deadline,
            done: task.done,
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

        handleCloseModal()
    }

    return (
        <Box position='absolute' top='50%' left='50%'
            width={400} height={300} bgcolor='background.paper'
            sx={{transform: 'translate(-50%, -50%)'}}>
            <div style={{position: 'relative', width: 400, height: 300}}>
                <Box component='form' noValidate autoComplete='off'
                    sx={{width: 275, display: 'flex', alignItems: 'center', flexFlow: 'column', margin: 'auto',
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
                    }}>
                    <TextField label="Name" value={name} onChange={(e) => {setName(e.target.value)}} sx={{margin: 'auto', width: 275}} />
                    <TextareaAutosize value={desc} onChange={(e) => {setDesc(e.target.value)}} style={{margin: 'auto', width: 275}} />
                    <TextField type="date" defaultValue={deadline ? new Date(deadline).toLocaleDateString().split('T')[0].replace(/\//g, '-') : ''} onChange={(e) => setDeadline(new Date(e.target.value))} style={{margin: 'auto', width: 275}} />
                    <Button variant='outlined' onClick={submit} sx={{width: 275}}>Submit</Button>
                </Box>
            </div>
        </Box>
    )
}

export default TaskForm