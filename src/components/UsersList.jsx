import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';

function UsersList() {
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [loadingUsersError, setLoadingUsersError] = useState(null);
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [isCreatingUserError, setIsCreatingUserError] = useState(null);

    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.users);

    useEffect(() => {
        setIsLoadingUsers(true);
        dispatch(fetchUsers())
            .unwrap()
            .catch((error) => setLoadingUsersError(error))
            .finally(() => setIsLoadingUsers(false));
    }, [dispatch]);

    const handleAddUser = () => {
        setIsCreatingUser(true);
        dispatch(addUser())
            .unwrap()
            .then((s) => console.log('success', s))
            .catch((e) => setIsCreatingUserError(e))
            .finally(() => setIsCreatingUser(false));
    };

    const renderedUsers = data.map((user) => {
        return (
            <div key={user.id} className="mb-2 order rounded border text-lg">
                <div className="flex p-2 justify-between items-center cursor-pointer">
                    {user.name}
                </div>
            </div>
        );
    });

    if (isLoadingUsers) {
        return <Skeleton times={6} className="h-10 w-full" />;
    }
    if (loadingUsersError) {
        return <div>We got an error {loadingUsersError.message}</div>;
    }
    return (
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className="m-2 text-xl">Users</h1>
                {isCreatingUser ? (
                    'Creating User...'
                ) : (
                    <Button onClick={handleAddUser}>+ Add User</Button>
                )}
                {isCreatingUserError && 'Error with creating user '}
            </div>
            <div className="user-list">{renderedUsers}</div>
        </div>
    );
}

export default UsersList;
