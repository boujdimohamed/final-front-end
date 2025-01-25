import React from 'react';
import { Box, Flex, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import AddTaskModal from './AddTaskModal';

import  Task  from '../models/Task'; 

const NewTaskCard: React.FC<{ onAddTask: (task: Task) => void }> = ({ onAddTask }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        borderWidth="1px"
        borderRadius="lg"
        borderColor={borderColor}
        bg={bg}
        h="full"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        transition="all 0.2s"
        _hover={{ borderColor: 'blue.500', bg: 'blue.50', shadow: 'md' }}
        direction="column"
        gap={2}
        p={4}
        onClick={onOpen}
      >
        <Box p={3} borderRadius="full" bg="blue.50" color="blue.500">
          <Plus size={24} />
        </Box>
        <Text fontWeight="medium">Add New Task</Text>
      </Flex>

      {/* AddTaskModal */}
      <AddTaskModal isOpen={isOpen} onClose={onClose} onAddTask={onAddTask} />
    </>
  );
};

export default NewTaskCard;
