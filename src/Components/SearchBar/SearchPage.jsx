import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({ posts: [], users: [] });
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchResults = async (searchQuery, pageNum) => {
        if (!searchQuery.trim()) {
            setResults({ posts: [], users: [] });
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/search`, {
                params: { q: searchQuery, page: pageNum, limit },
            });
            setResults(res.data);
        } catch (err) {
            setError("Failed to fetch results");
            setResults({ posts: [], users: [] });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim()) {
                fetchResults(query, page);
            } else {
                setResults({ posts: [], users: [] });
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [query, page]);

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };
    const handleNextPage = () => {
        if (results.posts.length === limit || results.users.length === limit) {
            setPage(page + 1);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <input
                type="search"
                placeholder="Search posts or users..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                }}
            />

            {loading && (
                <p className="text-center text-gray-500 mb-2">Loading results...</p>
            )}

            {error && <p className="text-center text-red-500 mb-2">{error}</p>}

            {!loading && !error && results?.posts?.length === 0 && results?.users?.length === 0 && query.trim() !== "" && (
                <p className="text-center text-gray-500 mb-2">No results found.</p>
            )}

            {/* Results */}
            {(results?.posts?.length > 0 || results?.users?.length > 0) && (
                <div className="space-y-6">
                    {/* Posts */}
                    {results?.posts?.length > 0 && (
                        <section>
                            <h2 className="text-xl font-semibold mb-2">Posts</h2>
                            <ul className="border rounded-md overflow-hidden">
                                {results?.posts?.map((post) => (
                                    <li
                                        key={post?._id}
                                        className="px-4 py-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                                        
                                    >
                                        {post?.title}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Users */}
                    {results.users.length > 0 && (
                        <section>
                            <h2 className="text-xl font-semibold mb-2">Users</h2>
                            <ul className="border rounded-md overflow-hidden">
                                {results.users.map((user) => (
                                    <li
                                        key={user?._id}
                                        className="px-4 py-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                                       
                                    >
                                        {user?.name}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Pagination controls */}
                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            disabled={page === 1}
                            onClick={handlePrevPage}
                            className={`px-4 py-2 rounded-md border ${page === 1
                                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                                    : "text-blue-600 border-blue-600 hover:bg-blue-100"
                                }`}
                        >
                            Prev
                        </button>

                        <span className="flex items-center text-gray-700 font-medium">
                            Page {page}
                        </span>

                        <button
                            onClick={handleNextPage}
                            className="px-4 py-2 rounded-md border text-blue-600 border-blue-600 hover:bg-blue-100"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
