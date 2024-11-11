import { CardContent, Checkbox, Typography } from "@mui/material"

type TaskCardProps = {
    id: number,
    name: string,
    description: string,
    deadline?: Date,
    done: boolean,
    getTasks: () => void,
}

const TaskCard = ({id, name, description, deadline, done, getTasks}: TaskCardProps) => {    
    const updateTaskDone = async() => {
        const data = JSON.stringify({
            name: name,
            description: description,
            deadline: deadline,
            done: !done,
        })
        const options = {
            method: "PATCH",
            body: data,
            headers: {
                "Accept": "application/ld+json",
                "Content-Type": "application/merge-patch+json"
            }
        }
        await fetch(`/tasks/${id}`, options)
        await getTasks()
    }

    return (
        <CardContent>
            <Typography sx={{color: "text.secondary", fontSize: 14}}>
                {deadline?.toLocaleString()}
            </Typography>
            <Typography variant="h5">
                {name}
            </Typography>
            <Typography variant="body2">
                {description}
            </Typography>
            <Checkbox checked={done} onClick={updateTaskDone} />
        </CardContent>
    )
}

export default TaskCard