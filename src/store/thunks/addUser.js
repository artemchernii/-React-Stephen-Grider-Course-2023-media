import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { faker } from '@faker-js/faker';

const addUser = createAsyncThunk('users/add', async () => {
    const resp = await axios.post('http://localhost:3009/users', {
        name: faker.name.fullName(),
    });

    return resp.data;
});

export { addUser };
