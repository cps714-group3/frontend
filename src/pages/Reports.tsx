import React from 'react';
import {Tree} from "@geist-ui/react";
import './Reports.css';


export const Reports = () => {

    const [docType, setDocType] = React.useState("");
    const [myFile, setMyFile] = React.useState<any | null>(null);
    const [fileList, setFileList] = React.useState<any | null>(null);

    React.useEffect(() => {
        window.scrollTo(0, 0); //stop auto scroll on file select
    }, [])

    /*
    React.useEffect(() => {
        fetch("http://localhost:8000/api/get_reports")
        .then(response => response.json())
        .then(data => {console.log(data)});
      }, [fileList]);
    */
    const handleSubmit = (event:any) => {
        event.preventDefault();
        
        if (docType !== "" && myFile !== null) {
            console.log(docType);
            console.log(myFile.name);
            /*let form = new FormData();
            form.append("docType", docType);
            form.append("uploaded_file", myFile);
            let response =fetch('http://localhost:8000/api/add_report', {
                method: 'POST',
                body: form
            });
            console.log(response);*/
        }
        else {
            console.log("Invalid form data");
        }
        
        
    }

    const updateFile = (event:any) => {
        //event.preventDefault();
        if (event.target.files[0] !== null){
            setMyFile(event.target.files[0]);
        }
        else {
            console.log("No file selected");
        }
        
    }

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

    return (
        <div id="container">
            <div id="fileTree">
                <Tree onClick={openDoc}>
                    <Tree.Folder name="Burndown Charts">
                        <Tree.File name="cat.jpeg" />
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
                </Tree>
            </div>
            <div id="uploadArea">
                <div className="formbold-main-wrapper">
                    <div className="formbold-form-wrapper">
                        <form onSubmit={handleSubmit}>
                        <div className="formbold-mb-5">
                            <label className="formbold-form-label">
                            Choose document type:
                            </label>
                            <select value={docType} onChange={(e) => setDocType(e.target.value)}>
                                <option hidden disabled value=""> Select an option </option>
                                <option value="burndown">Burndown Chart</option>
                                <option value="gantt">Gantt Chart</option>
                                <option value="project_management">Project Management Plan</option>
                                <option value="risk">Risk Report</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="mb-6 pt-4">
                            <label className="formbold-form-label formbold-form-label-2">
                            Upload File
                            </label>

                            <div className="formbold-mb-5 formbold-file-input">
                            <input type="file" name="file" id="file" onChange={updateFile}/>
                            <label htmlFor="file">
                                <div>
                                <span className="formbold-drop-file">Upload Your File</span>
                                <span className="formbold-browse"> Browse </span>
                                </div>
                            </label>
                            </div>

                            
                        </div>

                        {(myFile !== null) ? <label className="formbold-form-label">{myFile.name}</label> : ''}

                        <div>
                            <button className="formbold-btn w-full" type="submit">Upload</button>
                        </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};
