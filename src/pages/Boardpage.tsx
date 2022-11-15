import React, {useState} from 'react'; 
import { KanbanBoard } from '../components/Kanbanboard/board';
import { BoardNav } from '../components/Kanbanboard/boardNav';
import "./Boardpage.css"; 


export const WorkBoard = () =>{ 
    return (
        
        <div className='wrapper'>
        <body>
             <KanbanBoard /> 
        </body>
        </div>
        
    )
    
};
