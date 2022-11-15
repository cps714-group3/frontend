import React from 'react';
import "./boardNav.css"; 


export const BoardNav = () =>{
    return(
        <div className ="container">
            <div> 
            <ul className = "nav" style={{listStyle:'none'}}> 
                <li>Dashboard</li> 
                <li>Backlog</li>
                <li> Kanban Board </li> 
                <li> Reports </li> 
                <li> Issue Logs</li>
                <li> Active Sprints</li> 
                <li> Project  Settings</li> 
                <li> User Settings </li>
            </ul> 
            </div>

        </div>
    )
}