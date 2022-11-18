import React from 'react';
import './ProjectSettings.css';

export const ProjectSettings = () => {

    // Button redirecting to the project settings page will only be visible if there is an active project
    // i.e., a project with "In Progress" status

    type ProjectSettingsType = {
        projectName: string
        team: Array<{username: string, role: string}>
        status: string
    };

    // Set the initial state of the project settings
    const [projectSettings, setProjectSettings] = React.useState({} as ProjectSettingsType);

    // On page load, fetch the project settings from the backend for the active project
    React.useEffect(() => {
        (async () => {
            // Get active project's settings
            fetch("http://localhost:8000/api/projects/get_active_project/")
            .then(response => response.json())
            .then(data => {
                setProjectSettings(data)
            });
        })();
    }, []);

    // Get team members from the active project and display them
    const getTeamMembers = () => {
        const userList = projectSettings.team?.map((user) => {
            return (
                <li>
                    {user.username}
                    <button id="remove-team-member" value={user.username} onClick={removeUser}>
                        Remove User
                    </button>
                </li>
            )
        })

        return userList;
    }

    // Remove a user from the active project when the "Remove User" button is clicked
    const removeUser = (e: any) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": e.target.value,
                "role": "NULL"
            })
        };
        
        (async () => { 
            fetch(`http://localhost:8000/api/projects/remove_project_user/${projectSettings.projectName}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                console.log(data);
            });
        })();
    }

    return (
        <div id="container">
            {/* Enter Other Project Settings Here */}
            
            <div id="manage-team">
                <ul>
                    {getTeamMembers()}
                </ul>
            </div>
    
        </div>
    );
};
