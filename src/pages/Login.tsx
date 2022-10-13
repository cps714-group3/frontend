import React from 'react';

import { Box, Center } from '@chakra-ui/react';
import { usePageHeight } from '../helpers/hooks';

export const Login = () => {
    const pageHeight = usePageHeight();

    return (
        <Box w='full' h={pageHeight} bg='teal.400'>
            <Center h='full'>Login</Center>
        </Box>
    );
};
