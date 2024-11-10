import { Box, Button, TextareaAutosize, TextField } from "@mui/material"
import { useState } from "react"

const TaskForm = () => {
    const [name, setName] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [deadline, setDeadline] = useState<string>()

    const POST = () => {
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
        fetch('/tasks', options)
    }

    return (
        <Box component='form' noValidate autoComplete='off'
            sx={{width: 275, display: 'flex', alignItems: 'center', flexFlow: 'column', margin: 'auto'}}>
            <TextField label="Name" onChange={(e) => {setName(e.target.value)}} sx={{margin: 'auto', width: 275}} />
            <TextareaAutosize onChange={(e) => {setDesc(e.target.value)}} style={{margin: 'auto', width: 275}} />
            <TextField type="date" onChange={(e) => setDeadline(e.target.value)} style={{margin: 'auto', width: 275}} />
            <Button variant='outlined' onClick={POST} sx={{width: 275}}>Submit</Button>
        </Box>
    )
}

export default TaskForm