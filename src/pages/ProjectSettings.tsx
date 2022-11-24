import React from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSigninCheck } from "reactfire";
import "./ProjectSettings.css";

export const ProjectSettings = () => {
	// Button redirecting to the project settings page will only be visible if there is an active project for the user
	// i.e., a project with "In Progress" status in which the user is a member of the team

	const navigate = useNavigate();
	const toast = useToast();
	const { status, data: signInCheckResult } = useSigninCheck();

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

	type ProjectSettingsType = Array<{
		projectName: string;
		projectStatus: string;
		team: Array<{ username: string; role: string }>;
		issues: Array<{
			issueId: string;
			title: string;
			description: string;
			assignee: string;
			reporter: string;
			priority: string;
			status: string;
			due: string;
		}>;
		reports: Array<{ doc_type: string; doc_name: string; doc_path: string }>;
	}>;

	// Set the initial state of the project settings
	const [projectSettings, setProjectSettings] = React.useState(
		{} as ProjectSettingsType
	);

	// On page load, fetch the project settings from the backend for the active project
	React.useEffect(() => {
		(async () => {
			// Get active project's settings

			// TODO: Get username of logged in user
			const username = "test2@gmail.com";
			fetch(
				`http://localhost:8000/api/projects/get_user_active_project/${username}`
			)
				.then((response) => response.json())
				.then((data) => {
					setProjectSettings(data);
				});
		})();
	}, []);

	// Get team members from the active project and display them
	const getTeamMembers = () => {
		const userList = projectSettings[0]?.team?.map((user) => {
			return (
				<li key={user.username}>
					{user.username}
					<button
						id="remove-team-member"
						value={user.username}
						onClick={removeUser}
					>
						Remove User
					</button>
				</li>
			);
		});

		return userList;
	};

	// Remove a user from the active project when the "Remove User" button is clicked
	const removeUser = (e: any) => {
		e.preventDefault();

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: e.target.value,
				role: "NULL",
			}),
		};

		(async () => {
			fetch(
				`http://localhost:8000/api/projects/remove_project_user/${projectSettings[0].projectName}`,
				requestOptions
			)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
				});
		})();
	};

	return (
		<div id="container">
			{/* Enter Other Project Settings Here */}

			<div id="manage-team">
				<ul>{getTeamMembers()}</ul>
			</div>
		</div>
	);
};
