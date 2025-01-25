import React from 'react';
import {  HStack, IconButton, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <HStack spacing={4} justify="center" mt={6}>
      <IconButton
      aria-label="Previous Page"
      icon={<ChevronLeftIcon />}
      isDisabled={currentPage === 1}
      onClick={handlePrev}
      variant="outline"
      _hover={{ bg: 'blue.500' }}
      />
      <Text>
      Page {currentPage} of {totalPages}
      </Text>
      <IconButton
      aria-label="Next Page"
      icon={<ChevronRightIcon />}
      isDisabled={currentPage === totalPages}
      onClick={handleNext}
      variant="outline"
      _hover={{ bg: 'blue.500' }}
      />
    </HStack>
  );
};

export default Pagination;
