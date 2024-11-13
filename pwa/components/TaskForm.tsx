import { Box, Button, TextareaAutosize, TextField } from "@mui/material"
import { useState } from "react"

type TaskFormProps = {
    getTasks: () => void,
    handleCloseModal: () => void,
}

const TaskForm = ({getTasks, handleCloseModal}: TaskFormProps) => {
    const [name, setName] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [deadline, setDeadline] = useState<string>()

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

    return (
        <div style={{position: 'relative', width: 400, height: 300}}>
            <Box component='form' noValidate autoComplete='off'
                sx={{width: 275, display: 'flex', alignItems: 'center', flexFlow: 'column', margin: 'auto',
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
                }}>
                <TextField label="Name" onChange={(e) => {setName(e.target.value)}} sx={{margin: 'auto', width: 275}} />
                <TextareaAutosize onChange={(e) => {setDesc(e.target.value)}} style={{margin: 'auto', width: 275}} />
                <TextField type="date" onChange={(e) => setDeadline(e.target.value)} style={{margin: 'auto', width: 275}} />
                <Button variant='outlined' onClick={POST} sx={{width: 275}}>Submit</Button>
            </Box>
        </div>
    )
}

export default TaskForm