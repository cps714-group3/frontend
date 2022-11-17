import React, {useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './board.css';
import {v4 as uuid} from 'uuid';
import { BoardNav } from './boardNav';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react';



const dummyinfo = [
    { id: uuid(), title:"This is a a thing", content: "Create a Kanban Board: Create a simple Kanban board that can be used in by a development team."},
    { id: uuid(), content: "Implement Kanban API ", title:"This board"},
    { id: uuid(), content: "Implement user settings: Implement user settings so that blah blah blah blah ",title:"Here board" },
    { id: uuid(), content: "Create Simple Drag and Drop for Kanban Board:  blah blah blah blah blah blah blah blahblah blah blah blah   ", title:"This board"},
    { id: uuid(), content: "Implement API Dashboard: blah blah blah blahblah blab blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah", title:"This board" },
    { id: uuid(), content: "Add Users to Project: blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",title:"This board" },
    { id: uuid(), content: "Seventh task", title:"This board" },
    { id: uuid(), content: "Eight task",title:"This board" },
    { id: uuid(), content: "Ninth task",title:"This board" },
    { id: uuid(), content: "Tenth task",title:"This board" },
    { id: uuid(), content: "Eleventh task", title:"Here board" },
    { id: uuid(), content: "Create a Kanban Board: Create a simple Kanban board that can be used in by a development team.", title:"This is a a thing" },
    { id: uuid(), content: "Implement Kanban API ", title:"This board"},
    { id: uuid(), content: "Implement user settings: Implement user settings so that blah blah blah blah ",title:"Here board" },
    { id: uuid(), content: "Create Simple Drag and Drop for Kanban Board:  blah blah blah blah blah blah blah blahblah blah blah blah   ", title:"This board"},
    { id: uuid(), content: "Implement API Dashboard: blah blah blah blahblah blab blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah", title:"This board" },
    { id: uuid(), content: "Add Users to Project: blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",title:"This board" },
    { id: uuid(), content: "Seventh task", title:"This board" },
    { id: uuid(), content: "Eight task",title:"This board" },
    { id: uuid(), content: "Ninth task",title:"This board" },
    { id: uuid(), content: "Tenth task",title:"This board" },
    { id: uuid(), content: "Eleventh task", title:"Here board" }

  ];
  
  const workingboard = {
    [uuid()]: {
      name: "TO DO ",
      items: dummyinfo
    },
    [uuid()]: {
      name: "IN PROGRESS",
      items: []
    },
    [uuid()]: {
      name: "DONE",
      items: []
    }
  };
  
const onDragEnd = (result:any, columns:any, setColumns:any) => {
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
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
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
          items: copiedItems
        }
      });
    }
  };
 

  const IsolatedModal =({title, content}:any) =>{
    const { isOpen, onOpen, onClose } = useDisclosure();
    return(
      <>
      <Button onClick={onOpen} >
          Details
      </Button>
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent style={{minHeight:400}}>
          <ModalHeader style={{color:"white"}}>
          {title}
        </ModalHeader><ModalCloseButton />
        <ModalBody>
          {content}
        </ModalBody>
        </ModalContent>
        
      </Modal>
      </>
        
    );
  };

export const KanbanBoard = () =>{
  const [columns, setColumns] = useState(workingboard);
    return (
      <body style={{display:'flex',alignItems:"row",justifyContent: "right", height:"100%" }}>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div 
                key={columnId}
                style={{
                  backgroundColor:"#CBC3E3",
                  width:"100%",
                }}
              >
                <h2 className ="boardtitle" >{column.name}</h2>
                <div style={{ margin: 8 }} >
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div 
                          className="droparea"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "#e6e1f9"
                              : "#e6e1f9"
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div className="dragbox"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        backgroundColor: snapshot.isDragging
                                          ? "#d0e6fb"
                                          : "white",
                                        
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      [{index + 1}] : <b>{item.title}</b> 
                                      <br/>
                                      {item.content}
                                      <IsolatedModal title = {item.title} content ={item.content}/>
                                                    
                                     </div>
                                  
                                  );
                                }}
                                  
                                
                              </Draggable>
                            );
                          })}
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
      </body>
    );
  }

