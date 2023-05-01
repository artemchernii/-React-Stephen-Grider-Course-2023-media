/* eslint-disable react/prop-types */
import { useAddPhotoMutation, useFetchPhotosQuery } from '../store';
import PhotosListItem from './PhotosListItem';
import Button from './Button';
import Skeleton from './Skeleton';

const PhotosList = ({ album }) => {
    const { data, isFetching, error } = useFetchPhotosQuery(album);
    const [addPhoto, addPhotoResult] = useAddPhotoMutation();

    const handleAddPhoto = () => {
        addPhoto(album);
    };

    let content;

    if (isFetching) {
        content = <Skeleton times={4} className="w-8 h-8" />;
    } else if (error) {
        content = error;
    } else {
        content = data.map((photo) => {
            return <PhotosListItem key={photo.id} photo={photo} />;
        });
    }
    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Photos in {album.id}</h3>
                <Button
                    loading={addPhotoResult.isLoading}
                    onClick={handleAddPhoto}
                >
                    Add photo +
                </Button>
            </div>
            <div className="mx-8 flex flex-row flex-wrap justify-center gap-4">
                {content}
            </div>
        </div>
    );
};

export default PhotosList;
