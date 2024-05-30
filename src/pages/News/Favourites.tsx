import React, { useState, useEffect } from 'react';
import { useNewsDispatch, useNewsState } from '../../contexts/News/context';
import { useSportDispatch, useSportState } from '../../contexts/Sports/context';
import { sport } from '../../contexts/Sports/types';
import { useTeamDispatch, useTeamState } from '../../contexts/Teams/context';
import { team } from '../../contexts/Teams/types';
import { fetchNews } from '../../contexts/News/actions';
import { fetchSport } from '../../contexts/Sports/actions';
import { fetchTeam } from '../../contexts/Teams/actions';
import NewsPanel from './NewsPanel'; // Adjust the import path as needed

const Favourites: React.FC = () => {
    const NewsState = useNewsState();
    const NewsDispatch = useNewsDispatch();
    const SportState = useSportState();
    const SportDispatch = useSportDispatch();
    const TeamState = useTeamState();
    const TeamDispatch = useTeamDispatch();
    const [selectedSport, setSelectedSport] = useState<string>("Select the Sport");
    const [selectedTeam, setSelectedTeam] = useState<string>("Select The Team");
    const [isNewsPanelOpen, setIsNewsPanelOpen] = useState<boolean>(false);
    const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

    useEffect(() => {
        fetchNews(NewsDispatch);
        fetchSport(SportDispatch);
        fetchTeam(TeamDispatch);
    }, [SportDispatch, TeamDispatch, NewsDispatch]);

    const filterTeam = (team: team) => {
        return team.plays === SportState.sportData.sports.find(sport => sport.id.toString() === selectedSport)?.name;
    }

    const filteredNews = NewsState.newsData.filter(article => {
        const sportMatch = article.sport.id.toString() === selectedSport;
        const teamMatch = article.teams.some(team => team.id.toString() === selectedTeam);
        return sportMatch && teamMatch;
    });

    const openNewsPanel = (articleId: number) => {
        setSelectedArticleId(articleId);
        setIsNewsPanelOpen(true);
    };

    const closeNewsPanel = () => {
        setIsNewsPanelOpen(false);
        setSelectedArticleId(null);
    };

    return (
        <div className="p-4">
            <div className="relative text-left">
                <select
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    className="inline-flex justify-center w-full px-4 py-2 border rounded bg-white"
                ><option>Select a Sport</option>
                    {SportState.sportData.sports.map((sport: sport) => (
                        <option key={sport.id} value={sport.id}>{sport.name}</option>
                    ))}
                </select>
            </div>

            <div className="relative text-left mt-4">
                <select
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    className="inline-flex justify-center w-full px-4 py-2 border rounded bg-white"
                ><option>Select a Team</option>
                    {TeamState.teamData.filter(filterTeam).map((team: team) => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-4 max-h-56 overflow-auto text-left mt-4">
                {filteredNews.length > 0 ? (
                    filteredNews.map(article => (
                        <div key={article.id} className="border bg-white p-4 rounded-lg">
                            <h2 className="text font-bold mb-2">{article.title}</h2>
                            <p className="mb-2">{article.summary}</p>
                            <button
                                className="text-center bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-300"
                                onClick={() => openNewsPanel(article.id)}
                            >
                                Read more
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-white text-center">No news available</p>
                )}
            </div>

            {selectedArticleId !== null && (
                <NewsPanel
                    isOpen={isNewsPanelOpen}
                    onClose={closeNewsPanel}
                    articleId={selectedArticleId}
                />
            )}
        </div>
    );
};

export default Favourites;
