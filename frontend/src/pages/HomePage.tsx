import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Audio } from 'react-loader-spinner';
import axios from 'axios';
import { authAPI } from '../api/authAPI';

const fetchData = async (page: number) => {
    // const response = await axios.get('http://localhost:5500/api/music');
    const response = await axios.get(
        `https://openapiv1.coinstats.app/coins?page=${page}&limit=10`,
        {
            headers: {
                'X-API-KEY': 'CCp/y0UZBDFZzW1bQ8MHwUCrXs00BHphn1SjOmT9iAE=',
            },
        }
    );
    return response.data;
};

export default function HomePage() {
    const [page, setPage] = useState(1);

    const { data, isLoading, error } = useQuery({
        queryKey: ['songs', page],
        queryFn: () => fetchData(page),
    });

    if (isLoading)
        return (
            <Audio
                height="80"
                width="80"
                color="green"
                ariaLabel="loading"
            />
        );

    if (error) return <p>An error has occurred: {error.message}</p>;

    return (
        <div className="text-center">
            <button
                className="mt-4"
                onClick={() => setPage((page) => (page > 1 ? page - 1 : 1))}
            >
                Previous page
            </button>
            <button
                className="mt-4"
                onClick={() => setPage((page) => page + 1)}
            >
                Next page
            </button>
            <div className="max-w-3xl mx-auto text-left">
                <table className="border-collapse border border-black">
                    <tbody>
                        <tr className="border border-black">
                            <td className="p-4">Id</td>
                            <td className="p-4">Name</td>
                            <td className="p-4">Price</td>
                        </tr>
                        {data.result.map((item) => {
                            return (
                                <tr
                                    key={item.name}
                                    className=""
                                >
                                    <td className="p-4">{item.id}</td>
                                    <td className="p-4 flex gap-2">
                                        <img
                                            className="w-10 h-10"
                                            src={item.icon}
                                        />
                                        {item.name}
                                    </td>
                                    <td className="p-4">{item.price}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
