import { CardContent, Checkbox, Typography } from "@mui/material"

type TaskCardProps = {
    name: string,
    description: string,
    deadline?: Date,
    done: boolean,
}

const TaskCard = ({name, description, deadline, done}: TaskCardProps) => {
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
            <Checkbox checked={done} />
        </CardContent>
    )
}

export default TaskCard