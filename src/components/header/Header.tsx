import { Center, chakra, Heading } from '@chakra-ui/react';
import React from 'react';

export const Header = () => {
    return (
        <chakra.header pt='2'>
            <Center>
                <Heading>Dumpster Fire</Heading>
            </Center>
        </chakra.header>
    );
};
