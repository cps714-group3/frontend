import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
} from '@chakra-ui/react';

import { ImUser, ImBooks } from 'react-icons/im';
import { CreateIssueButton } from '../createIssue/CreateIssueButton';

const dummyinfo = [
    {
        id: uuid(),
        content:
            'Create a Kanban Board: Create a simple Kanban board that can be used in by a development team.',
        title: 'Create Kanban Board ',
        assignee: 'Derek',
        status: ' ',
    },
    {
        id: uuid(),
        content:
            'Implement the Kanban API to the backend so that it is functional and works with the frontend',
        title: 'Implement Kanban API',
        assignee: 'Richie',
        status: '',
    },
    {
        id: uuid(),
        content:
            'Mark forget to buy some food on the way to work. Someone has to bring that to us cause that is really needed',
        title: 'Get Groceries ',
        assignee: 'Garrick',
        status: '',
    },
    {
        id: uuid(),
        content: 'This function should be able to add user reports',
        title: 'Add User Reports',
        assignee: 'Reena',
        status: '',
    },
    {
        id: uuid(),
        content:
            'Create a Kanban Board: Create a simple Kanban board that can be used in by a development team.',
        title: 'This is a a thing5',
        assignee: 'Ramgenesh',
        status: '',
    },
    {
        id: uuid(),
        content:
            'Create a Kanban Board: Create a simple Kanban board that can be used in by a development team.',
        title: 'This is a a thing',
        assignee: 'Lucy',
        status: '',
    },
];

const workingboard = {
    [uuid()]: {
        name: 'TO DO ',
        items: dummyinfo,
        status: 'To Do ',
    },
    [uuid()]: {
        name: 'IN PROGRESS',
        items: [],
        status: 'In Progress',
    },
    [uuid()]: {
        name: 'DONE',
        items: [],
        status: 'Finished',
    },
};

const onDragEnd = (result: any, columns: any, setColumns: any) => {
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

const IsolatedModal = ({ title, content, assignee, status }: any) => {
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

export const KanbanBoard = () => {
    const [columns, setColumns] = useState(workingboard);
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'row',
                justifyContent: 'right',
                height: '100%',
            }}
        >
            <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            className='todoCont'
                            key={columnId}
                            style={{
                                backgroundColor: '#f7f2f8',
                            }}
                        >
                            <h2 className='boardtitle'>{column.name}</h2>
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
                                                                key={item.id}
                                                                draggableId={
                                                                    item.id
                                                                }
                                                                index={index}
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
                                                                            ] :{' '}
                                                                            <b>
                                                                                {
                                                                                    item.title
                                                                                }
                                                                            </b>
                                                                            <br />
                                                                            {
                                                                                item.content
                                                                            }
                                                                            <br />
                                                                            Status:{' '}
                                                                            {
                                                                                column.status
                                                                            }
                                                                            <br />
                                                                            <IsolatedModal
                                                                                title={
                                                                                    item.title
                                                                                }
                                                                                content={
                                                                                    item.content
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
                })}
            </DragDropContext>
        </div>
    );
};
