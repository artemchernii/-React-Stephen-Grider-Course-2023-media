/* eslint-disable react/prop-types */
import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import { useRemoveAlbumMutation } from '../store';
import PhotosList from './PhotosList';

export default function AlbumListItem({ album }) {
    const [removeAlbum, results] = useRemoveAlbumMutation();

    const handleRemoveAlbum = () => {
        removeAlbum(album);
    };

    const header = (
        <div className="flex justify-between items-center">
            <Button className="mr-2" onClick={handleRemoveAlbum}>
                {results.isLoading ? 'Loading' : <GoTrashcan />}
            </Button>
            <div>{album.title}</div>
        </div>
    );
    return (
        <ExpandablePanel header={header} key={album.id}>
            <PhotosList album={album} />
        </ExpandablePanel>
    );
}
