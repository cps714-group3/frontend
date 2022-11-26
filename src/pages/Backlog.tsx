import React from 'react';
import './Backlog.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSigninCheck, useUser } from 'reactfire';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const FilterableTable = require('react-filterable-table');

export const Backlog = () => {

    const { status, data: signInCheckResult } = useSigninCheck();
    const toast = useToast();
    const navigate = useNavigate();
    React.useEffect(() => {
        if (status === 'success') {
            if (!signInCheckResult.signedIn) {
                toast({
                    title: 'Cannot Access Dashboard',
                    description: 'User is not Authenticated',
                    status: 'error',
                    duration: 3500,
                });
                navigate('/login');
            }
        }
    }, [signInCheckResult, status]);

    const [items, setItems] = React.useState<any[]>([]);
    
    let fields = [
        { name: 'title', displayName: "Title", inputFilterable: true, exactFilterable: true },
        { name: 'description', displayName: "Description", inputFilterable: true, exactFilterable: true },
        { name: 'assignee', displayName: "Assignee", inputFilterable: true, exactFilterable: true, sortable: true },
        { name: 'reporter', displayName: "Reporter", inputFilterable: true, exactFilterable: true, sortable: true },
        { name: 'priority', displayName: "Priority", inputFilterable: true, exactFilterable: true, sortable: true },
        { name: 'status', displayName: "Status", inputFilterable: true, exactFilterable: true, sortable: true },
        { name: 'due', displayName: "Due", inputFilterable: true, exactFilterable: true, sortable: true }
    ];

    React.useEffect(() => {
        fetch("http://localhost:8000/api/issues/")
        .then(response => response.json()) // turn response into json
        .then(data => { // the json above is represented now by the variable data
            console.log(data["queryResult"]["issues"]);
            setItems(data["queryResult"]["issues"]);
        });
    }, []);

    return (
        <div id="container">
            <div id="tableArea">
            <h1 id="back">Product Backlog</h1>
            <FilterableTable
                initialSort="title"
                data={items}
                fields={fields}
                noRecordsMessage="No Records"
                noFilteredRecordsMessage="No filter matched"
            />
            </div>
        </div>
    );
};
