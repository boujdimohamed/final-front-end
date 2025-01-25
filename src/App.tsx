import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, useColorModeValue, useToast } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewTaskCard from './components/NewTaskCard';
import TaskCard from './components/TaskCard';
import UpdateTaskModal from './components/UpdateTaskModal';
import Pagination from './components/Pagination';
import TaskStatistics from './components/TaskStatistics';
import TaskDetails from './components/TaskDetails';
import api from './services/API';
import  Task from './models/Task';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const toast = useToast();

/*   useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/all');
        setTasks(response.data as Task[]);
        console.log(tasks);
      } catch (error) {
        toast({
          title: 'Error fetching tasks',
          description: (error as any).message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    };

    fetchTasks();
  }, [toast]); */

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/all');
        setTasks(response.data as Task[]);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast({
          title: 'Error fetching tasks',
          description: (error as any).message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    };

    fetchTasks();
  }, [toast]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const handleAddTask = async (newTask: Task) => {
    try {
      await api.post('/add', newTask);
      const response = await api.get('/all');
      setTasks(response.data as Task[]);
    } catch (error) {
      toast({
        title: 'Error adding task',
        description: (error as any).message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleOpenUpdateModal = (task: Task) => {
    setSelectedTask(task);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask;
      setTasks([...tasks]);
      setCurrentPage(Math.ceil((taskIndex + 1) / tasksPerPage));
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await api.delete(`/delete/${taskId}`);
      const response = await api.get('/all');
      setTasks(response.data as Task[]);
      toast({
        title: 'Task deleted',
        description: 'The task has been deleted successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting task',
        description: (error as any).message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const tasksPerPage = 5; // Number of tasks to display per page
  const paginatedTasks = tasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const statistics = {
    paused: tasks.filter((task) => task.status === 'todo').length,
    started: tasks.filter((task) => task.status === 'in-progress' || task.status === 'review').length,
    finished: tasks.filter((task) => task.status === 'completed').length,
    total: tasks.length,
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <React.Fragment>
            <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} py={8}>
              <Container maxW="container.xl">
                <TaskStatistics
                  paused={statistics.paused}
                  started={statistics.started}
                  finished={statistics.finished}
                  total={statistics.total}
                />
                <Box my={4} />
                <Grid
                  templateColumns="repeat(auto-fill, minmax(380px, 1fr))"
                  gap={6}
                  autoRows="1fr"
                >
                  <NewTaskCard onAddTask={handleAddTask} />
                  {paginatedTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onEdit={() => handleOpenUpdateModal(task)} onDelete={handleDeleteTask}/>
                  ))}
                </Grid>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </Container>
              {selectedTask && (
                <UpdateTaskModal
                  isOpen={isUpdateModalOpen}
                  onClose={() => setIsUpdateModalOpen(false)}
                  onUpdateTask={handleUpdateTask}
                  task={selectedTask}
                />
              )}
            </Box>
          </React.Fragment>
        } />
        <Route path="/tasks/:taskId" element={<TaskDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

