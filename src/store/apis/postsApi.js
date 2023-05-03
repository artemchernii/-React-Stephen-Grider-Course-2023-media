import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const postsApi = createApi({
    reducerPath: 'posts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3009',
    }),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        getposts: builder.query({
            query: () => '/posts',
            providesTags: ['Posts'],
        }),
        addPost: builder.mutation({
            query: (post) => {
                return {
                    method: 'POST',
                    url: '/posts',
                    body: post,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                };
            },
            invalidatesTags: ['Posts'],
        }),
        removePost: builder.mutation({
            query: (id) => {
                return {
                    url: `/posts/${id}`,
                    method: 'DELETE',
                    credentials: 'include',
                };
            },
            invalidatesTags: ['Posts'],
        }),
    }),
});

export const { useGetpostsQuery, useAddPostMutation, useRemovePostMutation } =
    postsApi;
