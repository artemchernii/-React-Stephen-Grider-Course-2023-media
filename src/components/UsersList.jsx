import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
import useThunk from '../hooks/use-thunk';
import UsersListItem from './UsersListItem';

function UsersList() {
    const [doFetchUsers, isLoadingUsers, loadingUsersError] =
        useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, isCreatingUserError] =
        useThunk(addUser);
    const { data } = useSelector((state) => state.users);

    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    const handleAddUser = () => {
        doCreateUser();
    };

    let content;
    if (isLoadingUsers) {
        content = <Skeleton times={6} className="h-10 w-full" />;
    } else if (loadingUsersError) {
        content = <div>We got an error {loadingUsersError.message}</div>;
    } else {
        content = data.map((user) => {
            return (
                <UsersListItem key={user.id} user={user} />
                // <div
                //     key={user.id}
                //     className="mb-2 order rounded border text-lg"
                // >
                //     <div className="flex p-2 justify-between items-center cursor-pointer">
                //         {user.name}
                //     </div>
                // </div>
            );
        });
    }
    return (
        <div>
            <div className="flex flex-row justify-between m-3 items-center">
                <h1 className="m-2 text-xl">Users</h1>

                <Button loading={isCreatingUser} onClick={handleAddUser}>
                    + Add User
                </Button>

                {isCreatingUserError && 'Error with creating user '}
            </div>
            <div className="content">{content}</div>
        </div>
    );
}

export default UsersList;
