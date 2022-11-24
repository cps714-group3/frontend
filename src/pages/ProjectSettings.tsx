import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSigninCheck, useUser } from "reactfire";
import './ProjectSettings.css';
import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
   

export const ProjectSettings = () => {
    
    type Project = {
        projectName: string;
        status: string;
    }; 

    const [projectSettings, setProjectSettings] = React.useState({})
    const [counter, setCounter] = React.useState(0);

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    React.useEffect(() => {
        window.scrollTo(0, 0); //stop auto scroll on file select
    }, [])

    React.useEffect(() => {
            (async () => { 
                await sleep(1000);
                fetch("http://localhost:8000/api/projects/get_project_settings/") // send get request to backend
                    .then(response => response.json()) // turn response into json
                    .then(data => {     
                        setProjectSettings(data);
                } );

            }
     )();
     
    }, [counter] );

                    return (
                        projectSettings.map((project: Project) => {
                            return (
                                <text> {project.projectName} </text>
                            )
                        })
                    );
            }        
