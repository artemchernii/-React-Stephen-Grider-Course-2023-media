/* eslint-disable react/prop-types */
import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import { deleteUser } from '../store/thunks/deleteUser';
import useThunk from '../hooks/use-thunk';
import ExpandablePanel from './ExpandablePanel';
import AlbumList from './AlbumList';

function UsersListItem({ user }) {
    const [doRemoveUser, isLoading, error] = useThunk(deleteUser);
    const handleClick = () => {
        doRemoveUser(user);
    };
    const header = (
        <>
            <Button className="mr-3" loading={isLoading} onClick={handleClick}>
                <GoTrashcan />
            </Button>
            {error && <div>Error deleting user</div>}
            {user.name}
        </>
    );
    return (
        <ExpandablePanel header={header}>
            <AlbumList user={user} />
        </ExpandablePanel>
    );
}

export default UsersListItem;
