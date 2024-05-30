import { useState, useEffect } from 'react';
import { useSportState } from '../../contexts/Sports/context';
import NewsCard from './LiveNewsCard';

const LiveNewsList = () => {
    const { sportData } = useSportState();
    const [selectedSport, setSelectedSport] = useState<number | string | null>(null);

    useEffect(() => {
        if (sportData.sports.length > 0) {
            setSelectedSport('all');
        }
    }, [sportData.sports]);

    const handleTabClick = (sportId: string) => {
        setSelectedSport(sportId);
    };

    return (
        <div className="p-4">
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={() => handleTabClick('all')}
                    className={`px-4 py-2 border rounded ${selectedSport === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Latest News
                </button>
                {sportData.sports.map((sport) => (
                    <button
                        key={sport.id}
                        onClick={() => handleTabClick(sport.id.toString())}
                        className={`px-4 py-2 border rounded ${selectedSport === sport.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {sport.name}
                    </button>
                ))}
            </div>
            {selectedSport !== null && <NewsCard selectedSport={selectedSport.toString()} />}
        </div>
    );
};

export default LiveNewsList;
