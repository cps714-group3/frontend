import { Box, Center } from '@chakra-ui/react';
import React from 'react';
import { usePageHeight } from '../helpers/functions';

export const Landing = () => {
    const pageHeight = usePageHeight();

    return (
        <Box w='full' h={pageHeight} bg='red.400'>
            <Center h='full'>Landing</Center>
        </Box>
    );
};
