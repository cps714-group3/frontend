import { Center, chakra, Heading } from '@chakra-ui/react';
import React from 'react';
import { HEADER_HEIGHT_CSS } from '../../helpers/constants';

export const Header = () => {
    return (
        <chakra.header pt='2' w='full' h={HEADER_HEIGHT_CSS}>
            <Center>
                <Heading>Dumpster Fire</Heading>
            </Center>
        </chakra.header>
    );
};
