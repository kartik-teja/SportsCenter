import React, { useState, useEffect } from 'react';
import { useNewsDispatch, useNewsState } from '../../contexts/News/context';
import { sport } from '../../contexts/Sports/types';
import { team } from '../../contexts/Teams/types';
import { fetchNews } from '../../contexts/News/actions';
import NewsPanel from './NewsPanel';
import { API_ENDPOINT } from '../../config/constants';
import { fetchSport } from '../../contexts/Sports/actions';
import { useSportState, useSportDispatch } from '../../contexts/Sports/context';
import { fetchTeam } from '../../contexts/Teams/actions';
import { useTeamState, useTeamDispatch } from '../../contexts/Teams/context';

const Favourites: React.FC = () => {
    const NewsState = useNewsState();
    const NewsDispatch = useNewsDispatch();
    const SportState = useSportState();
    const SportDispatch = useSportDispatch();
    const TeamState = useTeamState();
    const TeamDispatch = useTeamDispatch();
    const [selectedSport, setSelectedSport] = useState<string>("Select the Sport");
    const [selectedTeam, setSelectedTeam] = useState<string>("Select The Team");
    const [teamsList, setTeamsList] = useState<string[]>([]);
    const [sportsList, setSportsList] = useState<string[]>([]);
    const [isNewsPanelOpen, setIsNewsPanelOpen] = useState<boolean>(false);
    const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

    useEffect(() => {
        fetchNews(NewsDispatch);
        fetchSport(SportDispatch);
        fetchTeam(TeamDispatch);
        fetchPreferences();

    }, [SportDispatch, TeamDispatch, NewsDispatch]);



    const fetchPreferences = async () => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            const { preferences } = JSON.parse(userData);
            setSportsList(preferences.selectedSports);
            setTeamsList(preferences.selectedTeams);
        } else {
            try {
                const sportsResponse = await fetch(`${API_ENDPOINT}/sports`);
                const sportsData = await sportsResponse.json();
                setSportsList(sportsData.sports);

                const teamsResponse = await fetch(`${API_ENDPOINT}/teams`);
                const teamsData = await teamsResponse.json();
                setTeamsList(teamsData);
                if (!sportsResponse.ok || !teamsResponse.ok) {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    useEffect(() => {
        const updateSportsList = () => {
            const updatedSportsList: string[] = [];
            TeamState.teamData.forEach(team => {
                if (teamsList.includes(team.name)) {
                    updatedSportsList.push(team.plays);
                }
            });
            setSportsList(prevSportsList => [...prevSportsList, ...updatedSportsList]);
        };
        updateSportsList();
    }, [TeamState.teamData, teamsList]);

    const filteredNews = NewsState.newsData.filter(article => {
        const sportMatch = article.sport.id.toString() === selectedSport && sportsList.includes(article.sport.name);
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

    const filteredTeams = () => {
        return teamsList.length > 0 ? (filteredTeams2.length > 0 ? filteredTeams2 : filteredTeams1) : TeamState.teamData;
    };

    const filteredTeams1 = TeamState.teamData.filter(team => {
        const isIncluded = team.plays === SportState.sportData.sports.find(sport => sport.id.toString() === selectedSport)?.name;
        return isIncluded;
    });

    const filteredTeams2 = TeamState.teamData.filter(team => {
        const sport = SportState.sportData.sports.find(sport => sport.id.toString() === selectedSport);
        const isIncluded = sport && team.plays === sport.name && teamsList.includes(team.name);
        return isIncluded;
    });


    const filteredSports = () => {
        const authToken = localStorage.getItem('authToken')
        if (authToken) {
            return SportState.sportData.sports.filter(sport => {
                const isIncluded = (sportsList.includes(sport.name) || sportsList.some(sportName =>
                    filteredTeams2.some(team => team.plays.includes(sportName))))
                return isIncluded;
            });
        } else {
            return SportState.sportData.sports;
        }
    };

    console.log(filteredSports())
    return (
        <div className="p-4">
            <div className="relative text-left">
                <select
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    className="inline-flex justify-center w-full px-4 py-2 border rounded bg-white"
                ><option>Select a Sport</option>
                    {filteredSports().map((sport: sport) => (
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
                    {filteredTeams().map((team: team) => (
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
