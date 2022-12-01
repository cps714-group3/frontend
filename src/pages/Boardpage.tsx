import { Center, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useUser } from 'reactfire';
import { CreateIssueButton } from '../components/createIssue/CreateIssueButton';
import { KanbanBoard } from '../components/Kanbanboard/board';
import { BoardNav } from '../components/Kanbanboard/boardNav';
import { Issue } from '../helpers/dbTypes';

export const WorkBoard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: user } = useUser();
    const [projName, setProjName] = useState<string>();
    const [issues, setIssues] = React.useState<Issue[]>([]);

    useEffect(() => {
        if (!user?.email) return;

        fetch(
            `http://localhost:8000/api/projects/?username=${encodeURIComponent(
                user?.email
            )}`
        )
            .then((response) => response.json())
            .then((data) => {
                if (!data['queryResult']) return;
                setProjName(data['queryResult']['projectName']);
            });
    }, [user?.email]);

    const fetchData = async () => {
        if (!projName) return;
        fetch(
            `http://localhost:8000/api/issues/?projName=${encodeURIComponent(
                projName
            )}`
        )
            .then((response) => response.json())
            .then((data) => {
                if (!data['queryResult']) return;
                setIssues(data['queryResult']['issues']);
            });
    };

    useEffect(() => {
        fetchData();
    }, [projName]);

    useEffect(() => {
        console.log(issues);
    }, [issues]);

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
