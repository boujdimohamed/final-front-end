import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  HStack,
} from '@chakra-ui/react';

import Task  from '../models/Task';
import TaskTag   from '../models/TaskTag';
import Assignee  from '../models/Assignee';
import api from '../services/API'; 

interface UpdateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateTask: (task: Task) => void;
  task: Task;
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({ isOpen, onClose, onUpdateTask, task }) => {
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(task.priority);
  const [status,setStatus]=useState<'todo' | 'in-progress' | 'review' | 'completed'>(task.status)
  const [startTime,setStartTime]= useState('');
  const [endTime,setEndTime]=useState('');
  const [startDate, setStartDate] = useState(task.startDate);
  const [endDate, setEndDate] = useState(task.endDate);
  const [progress, setProgress]=useState(task.progress)
  const [tags, setTags] = useState<TaskTag[]>(task.tags);
  const [assignees, setAssignees] = useState<Assignee[]>(task.assignees);
  const toast = useToast();

  useEffect(() => {
    setName(task.name);
    setDescription(task.description);
    setPriority(task.priority);
    setStatus(task.status);
    setStartTime(task.startTime);
    setEndTime(task.endTime)
    setStartDate(task.startDate);
    setEndDate(task.endDate);
    setProgress(task.progress)
    setTags(task.tags);
    setAssignees(task.assignees);
  }, [task]);

  const handleUpdateTask = async () => {
    if (!name || !description) {
      toast({
        title: 'Error',
        description: 'Title and description are required!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const updatedTask: Task = {
      ...task,
      name,
      description,
      priority,
      status,
      progress,
      startTime,
      endTime,
      startDate,
      endDate,
      tags,
      assignees,
    };

    try {
      if(updatedTask.progress==100)
      {
        updatedTask.status='completed';
      }
      await api.put(`/update/${task.id}`, updatedTask);
      onUpdateTask(updatedTask);
      toast({
        title: 'Success',
        description: 'Task updated successfully!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update task!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} closeOnEsc={false}>
      <ModalOverlay backdropFilter="blur(6px)" />
      <ModalContent>
        <ModalHeader>Update Task</ModalHeader>
        <ModalBody>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl id="description" isRequired mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
          <HStack><FormControl id="priority" isRequired mt={4}>
            <FormLabel>Priority</FormLabel>
            <Select value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </FormControl>
            <FormControl id="status" isRequired mt={4}>
            <FormLabel>Status</FormLabel>
            <Select value={progress === 100 ? 'completed' : status} onChange={(e) => setStatus(e.target.value as 'todo' | 'in-progress' | 'review' | 'completed')}>
              <option value="todo">Todo</option>
              <option value="in-progress">In-progress</option>
              <option value="review">Review</option>
              <option value="completed">Completed</option>
            </Select>
            </FormControl>
          </HStack>
          <HStack>
          <FormControl id="startTime" isRequired mt={4}>
            <FormLabel>Start Time</FormLabel>
            <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </FormControl>
          <FormControl id="endTime" isRequired mt={4}>
            <FormLabel>End Time</FormLabel>
            <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </FormControl>
          </HStack>
          <HStack>
          <FormControl id="startDate" isRequired mt={4}>
            <FormLabel>Start Date</FormLabel>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </FormControl>
          <FormControl id="dueDate" isRequired mt={4}>
            <FormLabel>Due Date</FormLabel>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </FormControl>
          </HStack>
          <FormControl id="progress" isRequired mt={4}>
            <FormLabel>Progress</FormLabel>
            <Slider
              value={progress}
              onChange={(val) => setProgress(val)}
              min={0}
              max={100}
              step={5}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
                <SliderThumb boxSize={8} bg="blue.500" color="white" fontSize="sm" fontWeight="bold" boxShadow="md">
                <Box color="black" fontSize="xs">
                  {progress}%
                </Box>
              </SliderThumb>
            </Slider>
          </FormControl>
          {/* Add inputs for tags and assignees as needed */}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdateTask}>
            Update Task
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateTaskModal;