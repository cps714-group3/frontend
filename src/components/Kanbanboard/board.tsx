import React, {useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './board.css';
import {v4 as uuid} from 'uuid';

const dummyinfo = [
    { id: uuid(), content: "Create a Kanban Board: Create a simple Kanban board that can be used in by a development team." },
    { id: uuid(), content: "Implement Kanban API " },
    { id: uuid(), content: "Implement user settings: Implement user settings so that blah blah blah blah " },
    { id: uuid(), content: "Create Simple Drag and Drop for Kanban Board:  blah blah blah blah blah blah blah blahblah blah blah blah   "},
    { id: uuid(), content: "Implement API Dashboard: blah blah blah blahblah blab blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah" },
    { id: uuid(), content: "Add Users to Project: blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah " },
    { id: uuid(), content: "Seventh task" },
    { id: uuid(), content: "Eight task" },
    { id: uuid(), content: "Ninth task" },
    { id: uuid(), content: "Tenth task" },
    { id: uuid(), content: "Eleventh task" }

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


export const KanbanBoard = () =>{
    const [columns, setColumns] = useState(workingboard);
    return (
      <body style={{display:'flex',justifyContent: "right", height:"100%" }}>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor:"#070917",
                  color:"white",
                  width: "100%",
                  height: "100%",
                }}
                key={columnId}
              >
                <h2 id ="boardtitle" >{column.name}</h2>
                <div style={{ margin: 8 }} >
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightgrey"
                              : "white",
                            padding: 4,
                            width: 500,
                            margin:10,
                            minHeight: 900,
                            alignItems:'center'
                          }}
                          id ="droparea"
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
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#d0e6fb"
                                          : "white",
                                        color: "black",
                                        ...provided.draggableProps.style
                                      }}
                                      id ="dragbox"
                                    >
                                      {item.content}
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

