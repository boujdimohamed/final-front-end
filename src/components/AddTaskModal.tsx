import React, { useState,useEffect } from 'react';
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
  HStack,
  VStack,
  Checkbox,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import Assignee from '../models/Assignee';
import TaskTag from '../models/TaskTag';
import Task from '../models/Task';
import { uuidToNumber } from '../utils/utils';
import api from '../services/API';


interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task:Task) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAddTask }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime,setStartTime]= useState('');
  const [endTime,setEndTime]=useState('');
  const [availableTags, setAvailableTags] = useState<TaskTag[]>([]);
  const [tags, setTags] = useState<TaskTag[]>([]);
  const [availableAssignees, setAvailableAssignees] = useState<Assignee[]>([]);
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [assigneesLength,setAssigneesLength]=useState<number>(availableAssignees.length);
  const [tagsLength,setTagsLength]=useState<number>(availableTags.length)
  const toast = useToast();

{/* tags and assignees*/}

useEffect(() => {
  const fetchTagsAndAssignees = async () => {
    try {
      const [tagsResponse, assigneesResponse] = await Promise.all([
        api.get('/tags'),
        api.get('/assignees'),
      ]);
      setAvailableTags(tagsResponse.data as TaskTag[]);
      setAvailableAssignees(assigneesResponse.data as Assignee[]);
    } catch (error) {
      toast({
        title: 'Error fetching data',
        description: (error as any).message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  if (isOpen) {
    fetchTagsAndAssignees();
  }
}, [isOpen, toast]);

const handleTagChange = (tag: TaskTag) => {
  if (tags.includes(tag)) {
    setTags(tags.filter(t => t.id !== tag.id));
  } else if (tags.length < 3) {
    setTags([...tags, tag]);
  } else {
    toast({
      title: 'Limit reached',
      description: 'You can select up to 3 tags only.',
      status: 'warning',
      duration: 2000,
      isClosable: true,
    });
  }
};

const handleAssigneeChange = (assignee: Assignee) => {
  if (assignees.includes(assignee)) {
    setAssignees(assignees.filter(a => a.id !== assignee.id));
  } else if (assignees.length < 3) {
    setAssignees([...assignees, assignee]);
  } else {
    toast({
      title: 'Limit reached',
      description: 'You can select up to 3 assignees only.',
      status: 'warning',
      duration: 2000,
      isClosable: true,
    });
  }
};

  const handleAddTask = () => {
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

    const newTask: Task = {
      id:  uuidToNumber(uuidv4()), // Generate a unique ID
      name,
      description,
      priority,
      startDate,
      endDate,
      startTime,
      endTime,
      tags,
      assignees,
      status: 'todo', // Default status
      progress: 0, // Default progress
      taskCompleted: false, // Default taskCompleted
    };

    onAddTask(newTask);
    toast({
      title: 'Task added',
      description: 'The task has been added successfully.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} closeOnEsc={false}>
      <ModalOverlay backdropFilter="blur(6px)" />
      <ModalContent>
      <ModalHeader>Add New Task</ModalHeader>
      <ModalBody>
        <FormControl id="title" isRequired>
        <FormLabel>title</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl id="description" isRequired mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        <FormControl id="priority" isRequired mt={4}>
        <FormLabel>Priority</FormLabel>
        <Select value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
        </FormControl>
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
        {/* Add max 3 tags and  max 3 assignees as needed in existing predefined list using restapi*/}
        <HStack>
        <FormControl id="tags" mt={4}>
            <FormLabel>Tags</FormLabel>
            <Input
              placeholder="Search tags"
              onChange={(e) => {
              const searchValue = e.target.value.toLowerCase();
              setTagsLength(availableTags.length);
              setAvailableTags(
                availableTags.filter(tag =>
                tag.label.toLowerCase().includes(searchValue)
                )
              );
              }}
            />
            <VStack align="start">
              {availableTags.length<tagsLength &&availableTags.map(tag => (
                <Checkbox
                  key={tag.id}
                  isChecked={tags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                >
                  {tag.label}
                </Checkbox>
              ))}
            </VStack>
          </FormControl>
          <FormControl id="assignees" mt={4}>
            <FormLabel>Assignees</FormLabel>
            <Input
              placeholder="Search assignees"
              onChange={(e) => {
              const searchValue = e.target.value.toLowerCase();
              setAssigneesLength(availableAssignees.length);
              setAvailableAssignees(
                availableAssignees.filter(assignee =>
                assignee.name.toLowerCase().includes(searchValue)
                )
              );
              }}
            />
            <VStack align="start" mt={2}>
              {availableAssignees.length<assigneesLength && availableAssignees.map(assignee => (
              <Checkbox
                key={assignee.id}
                isChecked={assignees.includes(assignee)}
                onChange={() => handleAssigneeChange(assignee)}
              >
                {assignee.name}
              </Checkbox>
              ))}
            </VStack>
          </FormControl>
          </HStack>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={handleAddTask}>
        Add Task
        </Button>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
      </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTaskModal;


