import { useState, useEffect } from 'react';
import { useSportDispatch, useSportState } from '../../contexts/Sports/context';
import { useNewsDispatch } from '../../contexts/News/context';
import { useTeamState, useTeamDispatch } from '../../contexts/Teams/context';
import NewsCard from './LiveNewsCard';
import { API_ENDPOINT } from '../../config/constants';
import { fetchNews } from '../../contexts/News/actions';
import { fetchSport } from '../../contexts/Sports/actions';
import { fetchTeam } from '../../contexts/Teams/actions';

const LiveNewsList = () => {
    const { sportData } = useSportState();
    const [selectedSport, setSelectedSport] = useState<string | null>(null);
    const [teamsList, setTeamsList] = useState<string[]>([]);
    const [sportsList, setSportsList] = useState<string[]>([]);

    const newsDispatch = useNewsDispatch();
    const sportDispatch = useSportDispatch();
    const teamDispatch = useTeamDispatch();
    const { teamData } = useTeamState();

    useEffect(() => {
        fetchNews(newsDispatch);
        fetchSport(sportDispatch);
        fetchTeam(teamDispatch);
        fetchPreferences();
    }, [newsDispatch, sportDispatch, teamDispatch]);

    const fetchPreferences = async () => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            const { preferences } = JSON.parse(userData);
            setSportsList(preferences.selectedSports);
            setTeamsList(preferences.selectedTeams);
        } else {
            try {
                const [sportsResponse, teamsResponse] = await Promise.all([
                    fetch(`${API_ENDPOINT}/sports`),
                    fetch(`${API_ENDPOINT}/teams`)
                ]);
                if (!sportsResponse.ok || !teamsResponse.ok) {
                    throw new Error('Failed to fetch data');
                }
                const sportsData = await sportsResponse.json();
                const teamsData = await teamsResponse.json();
                setSportsList(sportsData.sports);
                setTeamsList(teamsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    useEffect(() => {
        const updateSportsList = () => {
            const updatedSportsList = teamData
                .filter(team => teamsList.includes(team.name))
                .map(team => team.plays);
            setSportsList(prevSportsList => [...new Set([...prevSportsList, ...updatedSportsList])]);
        };
        updateSportsList();
    }, [teamData, teamsList]);

    const filteredTeams = teamData.filter(team => {
        const sport = sportData.sports.find(sport => sport.id.toString() === selectedSport);
        return sport && team.plays === sport.name && teamsList.includes(team.name);
    });

    const filteredSports = () => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            return sportData.sports.filter(sport => {
                return sportsList.includes(sport.name);
            });
        } else {
            return sportData.sports;
        }
    };

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
                {filteredSports().map(sport => (
                    <button
                        key={sport.id}
                        onClick={() => handleTabClick(sport.id.toString())}
                        className={`px-4 py-2 border rounded ${selectedSport === sport.id.toString() ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {sport.name}
                    </button>
                ))}
            </div>
            {selectedSport && <NewsCard selectedSport={selectedSport} />}
        </div>
    );
};

export default LiveNewsList;
