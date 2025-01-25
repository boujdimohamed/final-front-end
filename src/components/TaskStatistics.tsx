import React from 'react';
import { Box, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react';

interface TaskStatisticsProps {
  paused: number;
  started: number;
  finished: number;
  total: number;
}

const TaskStatistics: React.FC<TaskStatisticsProps> = ({ paused, started, finished, total }) => {
  const glassBg = useColorModeValue(
    'rgba(255, 255, 255, 0.7)',
    'rgba(26, 32, 44, 0.7)' // Adjusts based on light/dark mode
  );

  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      /* bg={glassBg}
      backdropFilter="blur(10px)" // Glass effect
      borderRadius="md"
      p={6}
      border="1px solid"
      borderColor={borderColor}
      shadow="lg"
      maxW="container.md"
      mx="auto"
      mt={8} */

      bg={glassBg}
      backdropFilter="blur(10px)" // Glass effect
      borderRadius="md"
      p={6}
      border="1px solid"
      borderColor={borderColor}
      shadow="lg"
      maxW="container.md"
      mx="auto"
      mt={8}
      transition="all 0.2s"
      _hover={{
        borderColor: 'blue.500',
        bg: useColorModeValue('blue.50', 'blue.900'),
        shadow: 'xl',
      }}

    >
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
        <Stat textAlign="center">
          <StatLabel>waiting</StatLabel>
          <StatNumber>{paused}</StatNumber>
        </Stat>
        <Stat textAlign="center">
          <StatLabel>on Going</StatLabel>
          <StatNumber>{started}</StatNumber>
        </Stat>
        <Stat textAlign="center">
          <StatLabel>Finished</StatLabel>
          <StatNumber>{finished}</StatNumber>
        </Stat>
        <Stat textAlign="center">
          <StatLabel>Total</StatLabel>
          <StatNumber>{total}</StatNumber>
        </Stat>
      </SimpleGrid>
    </Box>
  );
};

export default TaskStatistics;
