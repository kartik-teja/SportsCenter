import React, { useState, useEffect } from 'react';
import { useNewsState } from '../../contexts/News/context';
import { useSportState } from '../../contexts/Sports/context';
import { sport } from '../../contexts/Sports/types';

const LiveNewsList: React.FC = () => {
    const { newsData } = useNewsState();
    const { sportData } = useSportState();
    const [selectedSport, setSelectedSport] = useState<number | null>(null);

    useEffect(() => {
        if (sportData.sports.length > 0) {
            setSelectedSport(sportData.sports[0].id);
        }
    }, [sportData.sports]);

    const handleTabClick = (sportId: number) => {
        setSelectedSport(sportId);
    };

    const truncateSummary = (summary: string) => {
        return summary.length > 50 ? summary.slice(0, 50) + '...' : summary;
    };

    const filteredNews = newsData.filter(article => article.sport.id === selectedSport);

    return (
        <div className="p-4">
            <div className="flex flex-wrap gap-2 mb-4">
                {sportData.sports.map((sport: sport) => (
                    <button
                        key={sport.id}
                        onClick={() => handleTabClick(sport.id)}
                        className={`px-4 py-2 border rounded ${selectedSport === sport.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {sport.name}
                    </button>
                ))}
            </div>
            <div className="space-y-4 max-h-56 overflow-auto text-left">
                {filteredNews.length > 0 ? (
                    filteredNews.map(article => (
                        <div key={article.id} className="border p-4 rounded-lg flex flex-col md:flex-row">
                            <div className="md:w-2/3 w-full">
                                <p className="text-gray-500">{article.sport.name}</p>
                                <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                                <p className="mb-2">{truncateSummary(article.summary)}</p>
                                <p className="text-gray-500">{new Date(article.date).toLocaleDateString()} <span className="font-bold text-gray-900 text-right">read more..</span></p>
                            </div>
                            <div className="md:w-1/3 max-h-46 w-full md:mr-4">
                                <img src={article.thumbnail} alt={article.title} className="w-auto h-auto object-cover rounded-lg mb-2 md:mb-0" />
                            </div>

                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No news available for this sport.</p>
                )}
            </div>
        </div>
    );
};

export default LiveNewsList;
