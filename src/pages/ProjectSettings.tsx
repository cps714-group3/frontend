import React from 'react';
import './ProjectSettings.css'; // import the css file for this page


export const ProjectSettings = () => {
    
    const [projectSettings, setProjectSettings] = React.useState({})

    React.useEffect(() => {
        (async () => { 
            // Get Project Settings
            fetch("http://localhost:8000/api/projects/get_active_project")
            .then(response => response.json())
            .then(data => {
                setProjectSettings(data)
            });
        })();
    });

    const getTeamMembers = () => {
        // Display users as list
        const userList = projectSettings.team.map((user) => {
            return (
                <li>
                    {user.username}
                    <button value={user.username} onClick={removeUser}>
                        Remove User
                    </button>
                </li>
            )
        })

        return userList;
    }

    // Handle remove user from project button
    const removeUser = (e) => {
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
                console.log(`Removed ${data} user from project`);
            });
        })();
    }

    return (
        <div id="container">
            <ul>
                {getTeamMembers()}
            </ul>
        </div>
    );
};
