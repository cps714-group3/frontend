import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSigninCheck, useUser } from "reactfire";

export const Dashboard = () => {
    const {data: user} = useUser();
    const navigate = useNavigate();
    const toast = useToast();

    const { status, data: signInCheckResult } = useSigninCheck();


    useEffect(() => {
        if (status == 'success') {
            if (!signInCheckResult.signedIn) {
                toast({
                    title: 'Cannot Access Dashboard',
                    description: 'User is not Authenticated',
                    status: 'error',
                    duration: 3500
                })
                navigate('/login');
            } else {
                console.log(user);
            }

        }
    }, [signInCheckResult, status, user])
    
    return <></>
}