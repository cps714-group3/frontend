import React from 'react';
import {Tree} from "@geist-ui/react";
import './Reports.css';

const openDoc = (path: string) => {
    const temp = path.split("/");

    if (temp[0] === "Burndown Charts") {
        const w = window.open(`http://localhost:8000/static/reports/burndown/${temp[1]}`, '_blank');
        if (w) {
            w.focus();
        }
    }
    if (temp[0] === "Gantt Charts") {
        const w = window.open(`http://localhost:8000/static/reports/gantt/${temp[1]}`, '_blank');
        if (w) {
            w.focus();
        }
    }
    if (temp[0] === "Project Management Plans") {
        const w = window.open(`http://localhost:8000/static/reports/project_management/${temp[1]}`, '_blank');
        if (w) {
            w.focus();
        }
    }
    if (temp[0] === "Risk Reports") {
        const w = window.open(`http://localhost:8000/static/reports/risk/${temp[1]}`, '_blank');
        if (w) {
            w.focus();
        }
    }
    if (temp[0] === "Other") {
        const w = window.open(`http://localhost:8000/static/reports/other/${temp[1]}`, '_blank');
        if (w) {
            w.focus();
        }
    }
  };

export const Reports = () => {
    return (
        <div id="container">
            <div id="fileTree">
                <Tree onClick={openDoc}>
                    <Tree.Folder name="Burndown Charts">
                        <Tree.File name="cat.jpeg" />
                        <Tree.File name="index.js" />
                        <Tree.File name="Layout.js" />
                    </Tree.Folder>
                    <Tree.Folder name="Gantt Charts">
                        <Tree.File name="app.js" />
                        <Tree.File name="index.js" />
                        <Tree.File name="Layout.js" />
                    </Tree.Folder>
                    <Tree.Folder name="Project Management Plans">
                        <Tree.File name="app.js" />
                        <Tree.File name="index.js" />
                        <Tree.File name="Layout.js" />
                    </Tree.Folder>
                    <Tree.Folder name="Risk Reports">
                        <Tree.File name="app.js" />
                        <Tree.File name="index.js" />
                        <Tree.File name="Layout.js" />
                    </Tree.Folder>
                    <Tree.Folder name="Other">
                        <Tree.File name="app.js" />
                        <Tree.File name="index.js" />
                        <Tree.File name="Layout.js" />
                    </Tree.Folder>
                    <Tree.Folder name="Other">
                        <Tree.File name="app.js" />
                        <Tree.File name="index.js" />
                        <Tree.File name="Layout.js" />
                    </Tree.Folder>
                    <Tree.Folder name="Other">
                        <Tree.File name="app.js" />
                        <Tree.File name="index.js" />
                        <Tree.File name="Layout.js" />
                    </Tree.Folder>
                    <Tree.Folder name="Other">
                        <Tree.File name="app.js" />
                        <Tree.File name="index.js" />
                        <Tree.File name="Layout.js" />
                    </Tree.Folder>
                </Tree>
            </div>
        </div>
    );
};
