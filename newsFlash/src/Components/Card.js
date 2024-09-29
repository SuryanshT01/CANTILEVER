import React from 'react';

const Card = ({ data }) => {
    const readMore = (url) => {
        window.open(url);
    }
     
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((curItem, index) => {
                if (!curItem.urlToImage) {
                    return null;
                } else {
                    return (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={curItem.urlToImage} alt={curItem.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 cursor-pointer" onClick={() => readMore(curItem.url)}>
                                    {curItem.title}
                                </h3>
                                <p className="text-gray-600 mb-4">{curItem.description}</p>
                                <button 
                                    onClick={() => readMore(curItem.url)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
                                >
                                    Read More
                                </button>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default Card;