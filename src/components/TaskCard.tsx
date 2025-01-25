import React from 'react';
import {useNavigate}  from 'react-router-dom';
import { Box, Flex, VStack, HStack, Heading, Badge, Text, Progress, Tag, TagLabel, TagLeftIcon, Popover, PopoverTrigger, PopoverContent, PopoverBody, IconButton, Tooltip,  useColorModeValue,useDisclosure,useToast} from '@chakra-ui/react';
import { Pencil, Trash2, Calendar, Clock, Tag as TagIcon, Users, AlertCircle, CheckCircle2, Timer, Circle } from 'lucide-react';
import LetterAvatar from './LettreAvatar';
import ConfirmationModal from './ConfirmationModal';
import Task from '../models/Task';
import tagColorMapping from '../utils/TagcolorsConfig';

const statusConfig = {
    'todo': { color: 'gray', icon: Circle },
    'in-progress': { color: 'blue', icon: Timer },
    'review': { color: 'orange', icon: AlertCircle },
    'completed': { color: 'green', icon: CheckCircle2 },
  };
  
  const priorityConfig = {
    'low': { color: 'gray' },
    'medium': { color: 'orange' },
    'high': { color: 'red' },
  };
  interface TaskCardProps {
    task: Task;
    onEdit: () => void;
    onDelete: (taskId: number) => void;
  }
  
const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete}) => 
  {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const secondaryText = useColorModeValue('gray.600', 'gray.400');
  const popoverBg = useColorModeValue('white', 'gray.700');
  const navigate = useNavigate();

  const handleConfirmDelete = () => {
    onDelete(task.id);
    onClose();
  };

  const StatusIcon = statusConfig[task.status].icon;

  

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  const handleDoubleClick = () => {
    navigate(`/tasks/${task.id}`);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      overflow="hidden"
      bg={bg}
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
      position="relative"
      onDoubleClick={handleDoubleClick}
    >
      {task.progress== 100 && task.taskCompleted && (
        <Box
          position="absolute"
          top={0}
          right={0}
          bg="green.500"
          color="white"
          px={2}
          py={1}
          borderBottomLeftRadius="md"
          fontSize="xs"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <CheckCircle2 size={18} />
        </Box>
      )}
      <Box p={4}>
        <VStack align="stretch" spacing={3}>
          {/* Header */}
          <Flex justify="space-between" align="start">
            <HStack spacing={3}>
              <LetterAvatar
              letter={task.name.charAt(0).toUpperCase()}
              bgColor="#3182ce"
              textColor="#ffffff"
              />
              <VStack align="start" spacing={1}>
              <Heading size="md" noOfLines={1}>{task.name}</Heading>
              <HStack spacing={2}>
                <Badge 
                colorScheme={statusConfig[task.status].color}
                display="flex"
                alignItems="center"
                gap={1}
                >
                <StatusIcon size={12} />
                {task.status.replace('-', ' ').toUpperCase()}
                </Badge>
                <Badge 
                colorScheme={priorityConfig[task.priority].color}
                variant="subtle"
                >
                {task.priority.toUpperCase()}
                </Badge>
              </HStack>
              </VStack>
            </HStack>
          </Flex>

          {/* Description */}
            <Text color={secondaryText} noOfLines={1} fontSize="sm">
            {task.description.split(' ').slice(0, 6).join(' ')}...
            </Text>

          {/* Progress Bar */}
          <Box>
            <Flex justify="space-between" mb={1}>
              <Text fontSize="xs" fontWeight="medium">Progress</Text>
              <Text fontSize="xs" color={secondaryText}>{task.progress}%</Text>
            </Flex>
            <Progress 
              value={task.progress} 
              size="sm" 
              borderRadius="full" 
              colorScheme={task.progress === 100 ? 'green' : 'blue'}
            />
          </Box>

          {/* Tags */}
          <HStack spacing={2} flexWrap="wrap">
            {task.tags.length > 0 ? (
              task.tags.map((tag, index) => (
              <Tag
                key={index}
                size="sm"
                variant="subtle"
                colorScheme={tagColorMapping[tag.label] || 'gray'}
              >
                <TagLeftIcon as={TagIcon} boxSize="12px" />
                <TagLabel>{tag.label}</TagLabel>
              </Tag>
              ))
            ) : (
              <Box w="100%" h="20px" />
            )}
          </HStack>
          <Flex justify="space-between" align="center">
            <HStack spacing={4} color={secondaryText} fontSize="xs">
              <HStack spacing={1}>
                <Calendar size={14} />
                <Text>{new Date(task.startDate).toLocaleDateString()}</Text>
                <Text>{formatTime(task.startTime)}</Text>
              </HStack>
              <HStack spacing={1}>
                <Clock size={14} />
                <Text>{new Date(task.endDate).toLocaleDateString()}</Text>
                <Text>{formatTime(task.endTime)}</Text>
              </HStack>
            </HStack>
            {task.assignees.length > 0 ? (
              <Popover placement="top-end">
              <PopoverTrigger>
                <IconButton
                aria-label="View assignees"
                icon={<Users size={14} />}
                size="sm"
                variant="ghost"
                colorScheme="gray"
                />
              </PopoverTrigger>
              <PopoverContent w="auto" minW="200px" bg={popoverBg}>
                <PopoverBody p={2}>
                <VStack align="stretch" spacing={1}>
                  {task.assignees.map((assignee, index) => (
                  <Text
                    key={index}
                    fontSize="sm"
                    p={2}
                    borderRadius="md"
                    _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
                  >
                    {assignee.name}
                  </Text>
                  ))}
                </VStack>
                </PopoverBody>
              </PopoverContent>
              </Popover>
            ) : (
              <Box w="14px" h="14px" />
            )}
          </Flex>
        </VStack>
      </Box>

      {/* Actions */}
      <Flex 
        borderTop="1px" 
        borderColor={borderColor} 
        p={2} 
        justifyContent="space-between"
        alignItems="center"
        bg={useColorModeValue('gray.50', 'gray.700')}
      >
        <HStack>
          <Tooltip label="Edit Task" placement="top">
            <IconButton
              aria-label="Edit Task"
              icon={<Pencil size={18} />}
              size="sm"
              variant="ghost"
              colorScheme="blue"
              onClick={onEdit} // Ensure this line is present
            />
          </Tooltip>
          <Tooltip label="Delete" placement="top">
            <IconButton
              aria-label="Delete"
              icon={<Trash2 size={18} />}
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={onOpen}
            />
          </Tooltip>
        </HStack>
      </Flex>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        description={`Are you sure you want to delete the task: ${task.name}?`}
      />
    </Box>
  );
};

export default TaskCard;

