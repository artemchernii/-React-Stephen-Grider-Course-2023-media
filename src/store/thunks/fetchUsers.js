import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('http://localhost:3005/users');

    // DEV ONLY

    // await delay(90000);
    await delay(1000);

    return response.data;
});

// DEV ONLY

const delay = (duration) => {
    return new Promise((res) => {
        setTimeout(res, duration);
    });
};

export { fetchUsers };
