import React, { useState, useEffect } from 'react';
import { customFetch } from '../../utils/Fetch';
import UserCard from './components/UserCard';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function ManageUsers() {
	const [searchValue, setSearchValue] = useState('');
	const [users, setUsers] = useState([]);
	const [filterOption, setFilterOption] = useState('');

	const handleSearchInputChange = async (event) => {
		const value = event.target.value;
		setSearchValue(value);
		if (filterOption !== '') {
			const { err, isPen, newData, newStatus, newStatusText, newMessage } = await customFetch(
				process.env.REACT_APP_USERS_URL + `searchUsers`,
				'POST',
				{
					[filterOption.toLowerCase()]: value,
				}
			);
			setUsers(newData);
		}
	};

	const handleFilterChange = (event) => {
		const selectedOption = event.target.value;
		setFilterOption(selectedOption);
	};

	useEffect(() => {
		const fetchData = async () => {
			const { err, isPen, newData, newStatus, newStatusText, newMessage } = await customFetch(
				process.env.REACT_APP_USERS_URL + `searchUsers`,
				'POST',
				{
					name: '',
				}
			);
			setUsers(newData);
		};

		fetchData();
	}, []);

	return (
		<>
			<div className="mt-10 xl:mx-10 mx-2">
				<div className="flex flex-wrap w-full lg:flex-nowrap gap-2">
					<div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center w-full">
						<div className="flex">
							<span className="text-xl">
								User
								<PersonIcon className="ml-2" />
							</span>
						</div>
					</div>
					<div className="divider divider-horizontal w-full"></div>
					<div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center w-full">
						<div className="flex">
							<span className="text-xl">
								Agent
								<SupportAgentIcon className="ml-2" />
							</span>
						</div>
					</div>
					<div className="divider divider-horizontal w-full"></div>
					<div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center w-full">
						<div className="flex">
							<span className="text-xl">
								Manager
								<ManageAccountsIcon className="ml-2" />
							</span>
						</div>
					</div>
					<div className="divider divider-horizontal w-full"></div>
					<div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center w-full">
						<div className="flex">
							<span className="text-xl">
								Admin
								<AdminPanelSettingsIcon className="ml-2" />
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className="w-90 flex p-4">
				<div className="join flex-grow ">
					<div className="w-5/6">
						<div>
							<input
								className="input input-bordered join-item w-full"
								placeholder="Search"
								value={searchValue}
								onChange={handleSearchInputChange}
							/>
						</div>
					</div>
					<select
						className="select select-bordered join-item w-1/6 focus:outline-none"
						onChange={handleFilterChange}
					>
						<option selected>Select Filter</option>
						<option>Name</option>
						<option>Email</option>
					</select>
				</div>
			</div>
			{/* <div className="w-3/4 mx-auto flex p-4 gap-4">
				<div className="badge badge-outline w-1/4">
					User
					<PersonIcon />
				</div>
				<div className="badge badge-outline w-1/4">
					Agent
					<SupportAgentIcon />
				</div>
				<div className="badge badge-outline w-1/4">
					Manager
					<ManageAccountsIcon />
				</div>
				<div className="badge badge-outline w-1/4">
					Admin
					<AdminPanelSettingsIcon />
				</div>
			</div> */}

			<div className="flex flex-wrap justify-around gap-4 mt-4">
				{users.map((user) => (
					<UserCard
						key={user._id}
						userType={user.role}
						userName={user.firstName + ' ' + user.lastName}
						email={user.email}
						userID={user._id}
						profilePicture={user.profilePic}
					/>
				))}
			</div>
		</>
	);
}

export default ManageUsers;
