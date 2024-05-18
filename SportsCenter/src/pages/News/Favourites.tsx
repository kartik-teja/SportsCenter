import React, { useState, useEffect } from 'react';
import { useNewsState } from '../../contexts/News/context';
import { useSportState } from '../../contexts/Sports/context';
import { sport } from '../../contexts/Sports/types';
import { useTeamState } from '../../contexts/Teams/context';
import { team } from '../../contexts/Teams/types';

const Favourites: React.FC = () => {
    const { newsData } = useNewsState();
    const { sportData } = useSportState();
    const { teamData } = useTeamState();
    const [selectedSport, setSelectedSport] = useState<string>("Select the Sport");
    const [selectedTeam, setSelectedTeam] = useState<string>("Select The Team");


    useEffect(() => {
        if (sportData.sports.length > 0) {
            setSelectedSport(sportData.sports[0].id.toString());
        }
    }, [sportData.sports]);

    const truncateSummary = (summary: string) => {
        return summary.length > 50 ? summary.slice(0, 50) + '...' : summary;
    };

    const filterTeam = (team: team) => {
        return team.plays === sportData.sports.find(sport => sport.id.toString() === selectedSport)?.name;
    }

    const filteredNews = newsData.filter(article => {
        const sportMatch = article.sport.id.toString() === selectedSport;
        const teamMatch = article.teams.some(team => team.id.toString() === selectedTeam);
        return sportMatch && teamMatch;
    });

    return (
        <div className="p-4">
            <div className="relative text-left">
                <select
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    className="inline-flex justify-center w-full px-4 py-2 border rounded bg-gray-200"
                >
                    {sportData.sports.map((sport: sport) => (
                        <option key={sport.id} value={sport.id}>{sport.name}</option>
                    ))}
                </select>
            </div>

            <div className="relative text-left mt-4">
                <select
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    className="inline-flex justify-center w-full px-4 py-2 border rounded bg-gray-200"
                >
                    {teamData.filter(filterTeam).map((team: team) => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-4 max-h-56 overflow-auto text-left mt-4">
                {filteredNews.length > 0 ? (
                    filteredNews.map(article => (
                        <div key={article.id} className="border bg-white p-4 rounded-lg  md:flex-row">
                            <h2 className="text font-bold mb-2">{article.title}</h2>
                            <p className="mb-2">{truncateSummary(article.summary)}</p>
                            <button className="text-center bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-300">Read more</button>
                        </div>
                    ))
                ) : (
                    <p className="text-white text-center">No news available</p>
                )}
            </div>
        </div>
    );

};

export default Favourites;
