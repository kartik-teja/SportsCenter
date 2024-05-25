import { useState, useEffect } from 'react';
import { useSportState } from '../../contexts/Sports/context';
import NewsCard from './LiveNewsCard';

const LiveNewsList = () => {
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

    return (
        <div className="p-4">
            <div className="flex flex-wrap gap-2 mb-4">
                {sportData.sports.map((sport) => (
                    <button
                        key={sport.id}
                        onClick={() => handleTabClick(sport.id)}
                        className={`px-4 py-2 border rounded ${selectedSport === sport.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {sport.name}
                    </button>
                ))}
            </div>
            {selectedSport !== null && <NewsCard selectedSport={selectedSport} />}
        </div>
    );
};

export default LiveNewsList;
