/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
    useAddPostMutation,
    useGetpostsQuery,
    useRemovePostMutation,
} from '../store/apis/postsApi';
import { GoTrashcan } from 'react-icons/go';

const PostsList = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const { data, isFetching, error } = useGetpostsQuery();
    const [addPost, result] = useAddPostMutation();

    let content;
    if (isFetching) {
        content = <div>Is fetching...</div>;
    } else if (error) {
        content = <div>We got an error</div>;
    } else {
        content = data.map((post) => {
            return <Post key={post.id} post={post} />;
        });
    }
    const submitHandler = (e) => {
        e.preventDefault();

        addPost({
            title,
            body,
        });
    };
    return (
        <div>
            <div className="text-3xl font-bold mb-5">List of posts</div>
            <form onSubmit={submitHandler}>
                <div className="input-block">
                    <label>Title</label>
                    <input
                        className="input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                </div>
                <div className="input-block">
                    <label>Body</label>
                    <input
                        className="input"
                        type="text"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Content"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <div>{content}</div>
        </div>
    );
};

const Post = ({ post }) => {
    const [removePost, result] = useRemovePostMutation();

    const handleDeletePost = () => {
        removePost(post.id);
        // refetch();
    };
    return (
        <div className="border m-2">
            <h2 className="font-bold text-2xl mb-2">Title: {post.title}</h2>
            <div>Post content: {post.body}</div>
            <button onClick={handleDeletePost}>
                <GoTrashcan />
            </button>
        </div>
    );
};
export default PostsList;
