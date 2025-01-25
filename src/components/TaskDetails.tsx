import React from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Heading,
    Text,
    VStack,
    Badge,
    HStack,
    Spinner,
} from '@chakra-ui/react';
import { CheckCircleIcon, TimeIcon, CalendarIcon, StarIcon } from '@chakra-ui/icons';
import Task from '../models/Task';
import api from '../services/API';
import {formatTime} from '../utils/utils'
import { UserIcon } from 'lucide-react';

const TaskDetails: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>();
    const [task, setTask] = React.useState<Task | null>(null);

    React.useEffect(() => {
        // Fetch task details from the API using the taskId
        const fetchTaskDetails = async () => {
            try {
                const response = await api.get(`/${taskId}`);
                setTask(response.data as Task);
            } catch (error) {
                console.error('Error fetching task details:', error);
            }
        };

        fetchTaskDetails();
    }, [taskId]);

    if (!task) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                bg="gray.50"
            >
                <Spinner size="xl" />
            </Box>
        );
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bg="gray.50"
            p={6}
        >
            <Box
                p={8}
                maxW="600px"
                w="full"
                bg="white"
                boxShadow="xl"
                borderRadius="lg"
                textAlign="center"
            >
                <VStack align="start" spacing={4}>
                    <Heading size="lg" color="blue.600">
                        {task.name}
                    </Heading>
                    <Text fontSize="md" color="gray.600">
                        {task.description}
                    </Text>
                    <HStack spacing={2}>
                        <Badge colorScheme={task.status.toLowerCase() === 'completed' ? 'green' : 'yellow'}>
                            <CheckCircleIcon mr={1} />
                            {task.status}
                        </Badge>
                        <Badge colorScheme={'orange'}>
                            <StarIcon mr={1} />
                            {task.priority}
                        </Badge>
                    </HStack>
                    <HStack spacing={4} mt={4} justifyContent="space-between" w="full">
                        <VStack align="start">
                            <Text fontSize="sm" color="gray.500">
                                <CalendarIcon mr={1} />
                                Start Date:
                            </Text>
                            <Badge colorScheme="purple">
                                {new Date(task.startDate).toLocaleDateString()}
                            </Badge>
                        </VStack>
                        <VStack align="start">
                            <Text fontSize="sm" color="gray.500">
                                <CalendarIcon mr={1} />
                                End Date:
                            </Text>
                            <Badge colorScheme="purple">
                                {new Date(task.endDate).toLocaleDateString()}
                            </Badge>
                        </VStack>
                    </HStack>
                    <HStack spacing={4} mt={4} justifyContent="space-between" w="full">
                        <VStack align="start">
                            <Text fontSize="sm" color="gray.500">
                                <TimeIcon mr={1} />
                                Start Time:
                            </Text>
                            <Badge colorScheme="teal">{formatTime(task.startTime)}</Badge>
                        </VStack>
                        <VStack align="start">
                            <Text fontSize="sm" color="gray.500">
                                <TimeIcon mr={1} />
                                End Time:
                            </Text>
                            <Badge colorScheme="teal">{formatTime(task.endTime)}</Badge>
                        </VStack>
                    </HStack>
                    <HStack spacing={2} flexWrap="wrap">
                        {task.tags.map((tag, index) => (
                            <Badge key={index} colorScheme="blue">
                                {tag.label}
                            </Badge>
                        ))}
                    </HStack>
                    <HStack spacing={2} flexWrap="wrap">
                        <UserIcon/>
                        {task.assignees.map((assignee, index) => (
                            <Badge key={index} colorScheme="gray">
                                {assignee.name}
                            </Badge>
                        ))}
                    </HStack>
                </VStack>
            </Box>
        </Box>
    );
};

export default TaskDetails;
