/* eslint-disable react/prop-types */
import { useRemovePhotoMutation } from '../store';
import { GoTrashcan } from 'react-icons/go';

export default function PhotosListItem({ photo }) {
    const [removePhotom] = useRemovePhotoMutation();

    const handleRemovePhoto = () => {
        removePhotom(photo);
    };
    return (
        <div
            onClick={handleRemovePhoto}
            className="relative cursor-pointer hover:border-gray-600"
        >
            <img src={photo.imageUrl} className="w-20 h-20" alt={photo.id} />
            <div className="absolute inset-0 flex items-center justify-center hover:bg-grey-200 opacity-0 hover:opacity-80 outline hover:outline-offset-2">
                <GoTrashcan className="text-4xl" />
            </div>
        </div>
    );
}
