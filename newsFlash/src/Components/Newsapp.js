import React, { useEffect, useState } from 'react';
import Card from './Card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Newsapp = () => {
    const [search, setSearch] = useState("world");
    const [newsData, setNewsData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const API_KEY = "bcc1d8445e254e9cb1bce4a9c68f62ef";
    const articlesPerPage = 10;

    const getData = async (page = 1) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}&page=${page}&pageSize=${articlesPerPage}`);
            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }
            const jsonData = await response.json();
            setNewsData(jsonData.articles);
            setTotalResults(jsonData.totalResults);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getData(currentPage);
    }, [search, currentPage]);

    const handleInput = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = () => {
        setCurrentPage(1);
    }

    const handleCategory = (category) => {
        setSearch(category);
        setCurrentPage(1);
    }

    const handleNextPage = () => {
        if (currentPage < Math.ceil(totalResults / articlesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <nav className="bg-blue-600 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">NewsFlash</h1>
                    <div className="flex items-center space-x-4">
                        <input 
                            type="text" 
                            placeholder="Search News" 
                            value={search} 
                            onChange={handleInput}
                            className="px-3 py-2 rounded-md"
                        />
                        <button 
                            onClick={handleSearch}
                            className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-100"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto mt-8">
                <h2 className="text-3xl font-bold text-center mb-8">Stay Updated with NewsFlash</h2>
                
                <div className="flex justify-center space-x-4 mb-8">
                    {["sports", "politics", "entertainment", "health", "technology"].map((category) => (
                        <button 
                            key={category}
                            onClick={() => handleCategory(category)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                {isLoading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {newsData && <Card data={newsData} />}

                <div className="flex justify-center items-center mt-8 space-x-4">
                    <button 
                        onClick={handlePrevPage}
                        disabled={currentPage === 1 || isLoading}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <span className="text-lg font-semibold">Page {currentPage}</span>
                    <button 
                        onClick={handleNextPage}
                        disabled={currentPage >= Math.ceil(totalResults / articlesPerPage) || isLoading}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Newsapp;