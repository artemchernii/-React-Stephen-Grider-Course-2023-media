/* eslint-disable react/prop-types */
import { useAddAlbumMutation, useFetchAlbumsQuery } from '../store';
import Skeleton from './Skeleton';
import AlbumListItem from './AlbumListItem';
import Button from './Button';

function AlbumList({ user }) {
    const { data, error, isFetching /* refetch */ } = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();

    const handleAddAlbum = () => {
        addAlbum(user);
        // refetch();
    };

    const renderedAlbums =
        data &&
        data.map((album) => {
            return <AlbumListItem key={album.id} album={album} />;
        });

    let content;

    if (error) {
        content = <div>We got an error {error}</div>;
    } else if (isFetching) {
        content = <Skeleton className="h-10 w-full" times={3} />;
    } else {
        content = data.length > 0 ? renderedAlbums : <div>No albums yet</div>;
    }

    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Albums of {user.name}</h3>
                <Button loading={results.isLoading} onClick={handleAddAlbum}>
                    Add album +
                </Button>
            </div>
            <div>{content}</div>
        </div>
    );
}
export default AlbumList;
