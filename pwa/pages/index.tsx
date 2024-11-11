import { useEffect, useState } from "react"
import TaskCard from "../components/TaskCard"
import { Card } from "@mui/material"
import TaskForm from "../components/TaskForm"

type Task = {
  id: number,
  name: string,
  description: string,
  deadline: Date,
  done: boolean,
}

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const getTasks = async() => {
    const res = await fetch("/tasks")
    const data = await res.json()
    console.log(data.member)
    setTasks(data.member)
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
  <>
    <h1>Todoリスト</h1>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
      {tasks.map((task) => {
        return(
          <Card key={task.id} sx={{width: 275, marginX: 1}}>
            <TaskCard
              id={task.id}
              name={task.name}
              description={task.description}
              deadline={task.deadline}
              done={task.done}
              getTasks={getTasks}
              />
          </Card>
        )
      })}
    </div>
    <div style={{paddingTop: 10}}>
      <TaskForm getTasks={getTasks} />
    </div>
  </>)
}

export default Home