import React from 'react';
import './Reports.css';
import { Input, Text } from '@chakra-ui/react';
import Select from 'react-select';
import { useSigninCheck, useUser } from 'reactfire';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const CreateProject = () => {

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

    const [projName, setProjName] = React.useState("");
    const [team, setTeam] = React.useState<any[]>([]);

    const placeHolderList = [
        {value: "test1@gmail.com", label: "test1@gmail.com"},
        {value: "test2@gmail.com", label: "test2@gmail.com"},
        {value: "test3@gmail.com", label: "test3@gmail.com"},
        {value: "test4@gmail.com", label: "test4@gmail.com"},
        {value: "test5@gmail.com", label: "test5@gmail.com"},
    ]

    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(`project name: ${projName}`);
        let m = "";
        team.forEach((member:any, index:number) => {
            m = m + member.value + " ";
        });
        console.log(`Team members: ${m}`);
        console.log("submit event");
    }

    const handleSelect = (data:any) => {
        setTeam(data);
    }

    return (
        <div id="container">
            <div id="uploadArea">
                    <div className="formbold-main-wrapper">
                        
                        <div className="formbold-form-wrapper">
                            <Text fontSize='24px' as='b' color="#07074d">Create a new project</Text>
                            <br /><br />
                            <form onSubmit={handleSubmit}>
                            <div className="formbold-mb-5">
                            <Text fontSize='18px' as='b' color="#07074d">Project Name: {projName}</Text>
                            <Input
                                isInvalid
                                errorBorderColor='grey'
                                value={projName}
                                color="#07074d"
                                onChange={(e) => {setProjName(e.target.value);}}
                                placeholder='Dumpster Fire'
                                size='sm'
                            />
                                
                            </div>

                            <div className="formbold-mb-5" style={{color: "#07074d"}}>
                                <Text fontSize='18px' as='b' color="#07074d">Add team members:</Text>
                                <Select
                                    options={placeHolderList}
                                    placeholder="Select members"
                                    value={team}
                                    onChange={handleSelect}
                                    isSearchable={true}
                                    isMulti
                                    isClearable
                                />
                            </div>

                            <div>
                                <button className="formbold-btn w-full" type="submit">Create</button>
                            </div>
                        
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
    );
};
