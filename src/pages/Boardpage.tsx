import { Center, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { CreateIssueButton } from '../components/createIssue/CreateIssueButton';
import { KanbanBoard } from '../components/Kanbanboard/board';
import { BoardNav } from '../components/Kanbanboard/boardNav';

export const WorkBoard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const fetchData = async () => {};

    return (
        <div>
            <Center py='2'>
                <CreateIssueButton
                    isOpen={isOpen}
                    onClose={onClose}
                    onOpen={onOpen}
                    refetchData={fetchData}
                />
            </Center>
            <KanbanBoard />
        </div>
    );
};
