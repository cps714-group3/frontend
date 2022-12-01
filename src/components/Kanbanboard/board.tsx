import React, { useEffect, useState } from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';
import './board.css';
import { v4 as uuid } from 'uuid';
import { BoardNav } from './boardNav';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Center,
    HStack,
} from '@chakra-ui/react';

import { ImUser, ImBooks } from 'react-icons/im';
import { Issue } from '../../helpers/dbTypes';

const initialWorkingBoard: WorkingBoard = {
    'TO DO': {
        name: 'TO DO ',
        items: [],
        status: 'To Do ',
    },
    'IN PROGRESS': {
        name: 'IN PROGRESS',
        items: [],
        status: 'In Progress',
    },
    DONE: {
        name: 'DONE',
        items: [],
        status: 'Finished',
    },
};

type WorkingBoard = {
    [key: string]: {
        name: string;
        items: Issue[];
        status: string;
    };
};

interface Props {
    issues: Issue[];
}

export const KanbanBoard = React.memo(({ issues }: Props) => {
    const [columns, setColumns] = useState(initialWorkingBoard);

    useEffect(() => {
        console.log(columns);
    }, [columns]);
    useEffect(() => {
        // Clear working board items
        const t_columns = { ...columns };
        for (const board in t_columns) {
            t_columns[board].items = [];
        }
        // Map through issues to update the working board
        for (const issue of issues) {
            switch (issue.status) {
                case 'TO DO':
                    t_columns['TO DO'].items.push(issue);
                    break;
                case 'IN PROGRESS':
                    t_columns['IN PROGRESS'].items.push(issue);
                    break;
                case 'DONE':
                    t_columns['DONE'].items.push(issue);
                    break;
            }
        }
        setColumns(t_columns);
    }, [issues]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'row',
                justifyContent: 'right',
                height: '100%',
            }}
        >
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <HStack overflowX='auto'>
                    {Object.entries(columns).map(
                        ([columnId, column], index) => {
                            return (
                                <div
                                    className='todoCont'
                                    key={columnId}
                                    style={{
                                        backgroundColor: '#f7f2f8',
                                    }}
                                >
                                    <h2 className='boardtitle'>
                                        {column.name}
                                    </h2>
                                    <div style={{ margin: 8 }}>
                                        <Droppable
                                            droppableId={columnId}
                                            key={columnId}
                                        >
                                            {(provided, snapshot) => {
                                                return (
                                                    <div
                                                        className='droparea'
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        style={{
                                                            background:
                                                                snapshot.isDraggingOver
                                                                    ? '#e6e1f9'
                                                                    : '#e6e1f9',
                                                        }}
                                                    >
                                                        {column.items.map(
                                                            (item, index) => {
                                                                return (
                                                                    <Draggable
                                                                        key={
                                                                            item.title +
                                                                            item.assignee +
                                                                            item.reporter
                                                                        }
                                                                        draggableId={
                                                                            item.title +
                                                                            item.assignee +
                                                                            item.reporter
                                                                        }
                                                                        index={
                                                                            index
                                                                        }
                                                                    >
                                                                        {(
                                                                            provided,
                                                                            snapshot
                                                                        ) => {
                                                                            return (
                                                                                <div
                                                                                    className='dragbox'
                                                                                    ref={
                                                                                        provided.innerRef
                                                                                    }
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                    style={{
                                                                                        userSelect:
                                                                                            'none',
                                                                                        backgroundColor:
                                                                                            snapshot.isDragging
                                                                                                ? '#d0e6fb'
                                                                                                : 'white',

                                                                                        ...provided
                                                                                            .draggableProps
                                                                                            .style,
                                                                                    }}
                                                                                >
                                                                                    [
                                                                                    {index +
                                                                                        1}

                                                                                    ]
                                                                                    :{' '}
                                                                                    <b>
                                                                                        {
                                                                                            item.title
                                                                                        }
                                                                                    </b>
                                                                                    <br />
                                                                                    {
                                                                                        item.description
                                                                                    }
                                                                                    <br />
                                                                                    Status:{' '}
                                                                                    {
                                                                                        column.status
                                                                                    }
                                                                                    <br />
                                                                                    <IssueDetailsModal
                                                                                        title={
                                                                                            item.title
                                                                                        }
                                                                                        content={
                                                                                            item.description
                                                                                        }
                                                                                        assignee={
                                                                                            item.assignee
                                                                                        }
                                                                                        status={
                                                                                            column.status
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            );
                                                                        }}
                                                                    </Draggable>
                                                                );
                                                            }
                                                        )}
                                                        {provided.placeholder}
                                                    </div>
                                                );
                                            }}
                                        </Droppable>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </HStack>
            </DragDropContext>
        </div>
    );
});

const IssueDetailsModal = ({ title, content, assignee, status }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <button className='btn2' onClick={onOpen}>
                Details
            </button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent style={{ minHeight: 400 }}>
                    <ModalHeader style={{ color: 'white' }}>
                        {title}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {content}
                        <br />
                        <br />
                        <div className='assigneeCont'>
                            <ImUser />
                            <div className='assignee'>Assignee: {assignee}</div>
                        </div>
                        <br />
                        <br />
                        <div className='assigneeCont'>
                            <ImBooks />
                            <div className='assignee'> Status: {status}</div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
