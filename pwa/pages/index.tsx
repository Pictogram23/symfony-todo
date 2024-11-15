import { useEffect, useState } from "react"
import TaskCard from "../components/TaskCard"
import { Card, IconButton, Modal } from "@mui/material"
import TaskForm from "../components/TaskForm"
import AddCircleIcon from '@mui/icons-material/AddCircle';

export type Task = {
  id: number,
  name: string,
  description: string,
  deadline?: Date,
  done: boolean,
}

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const handleOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => setModalOpen(false)

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
              task={task}
              getTasks={getTasks}
              />
          </Card>
        )
      })}
    </div>
    <IconButton onClick={handleOpenModal}>
      <AddCircleIcon />
    </IconButton>
    <Modal open={modalOpen} onClose={handleCloseModal}>
      <TaskForm getTasks={getTasks} handleCloseModal={handleCloseModal} />
    </Modal>
  </>)
}

export default Home