import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import logo from '../assets/logo.svg'; 
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton, Button, Input } from '@chakra-ui/react';
import api from '../services/API';
const Header = () => {
const [tagName, setTagName] = useState('');
const [assigneeName, setAssigneeName] = useState('');
const toast = useToast();

  const handleAddTag = async () => {
    try {
      await api.post('/tags/add', { id:0 ,label: tagName });
      setTagName('');
      toast({
        title: 'Tag added.',
        description: "The tag has been added successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position:'bottom-right'
      });
    } catch (error) {
      console.error('Error adding tag:', error);
      toast({
        title: 'Error.',
        description: "There was an error adding the tag.",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position:'bottom-right'
      });
    }
  };

 

  const handleAddAssignee = async () => {
    try {
      await api.post('/assignees/add', { id: 0, name: assigneeName });
      setAssigneeName('');
      toast({
        title: 'Assignee added.',
        description: "The assignee has been added successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position:'bottom-right'
      });
    } catch (error) {
      console.error('Error adding assignee:', error);
      toast({
        title: 'Error.',
        description: "There was an error adding the assignee.",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position:'bottom-right'
      });
    }
  };

    return (
      <Box bg="teal.500" w="100%" p={4} color="white">
        <Flex align="center" justify="space-between">
          <Flex align="center">
            <Image src={logo} alt="Logo" boxSize="50px" mr={4} />
            <Heading as="h1" size="lg" onClick={() => window.location.href = '/'}>
              <Heading as="span" size="lg" cursor="pointer">
              Task Manager
              </Heading>
            </Heading>
          </Flex>
          <Flex>
            <Popover>
              <PopoverTrigger>
                <Box as="button" bg="teal.700" color="white" p={2} borderRadius="md" mr={2} _hover={{ bg: 'teal.600' }} _active={{ bg: 'teal.800' }}>
                  + Add Tag
                </Box>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Add a new tag</PopoverHeader>
                <PopoverBody>
                  <Input
                  placeholder="Tag name"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  color="gray.500"
                  />
                </PopoverBody>
                <PopoverFooter>
                  <Button colorScheme="teal" onClick={handleAddTag}>
                    Save
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <Box as="button" bg="teal.700" color="white" p={2} borderRadius="md" _hover={{ bg: 'teal.600' }} _active={{ bg: 'teal.800' }}>
                  + Add Assignee
                </Box>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Add a new assignee</PopoverHeader>
                <PopoverBody>
                  <Input
                    placeholder="Assignee name"
                    value={assigneeName}
                    onChange={(e) => setAssigneeName(e.target.value)}
                    color="gray.500"
                  />
                </PopoverBody>
                <PopoverFooter>
                  <Button colorScheme="teal" onClick={handleAddAssignee}>
                    Save
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </Flex>
        </Flex>
      </Box>
    );
  };

  export default Header;
        