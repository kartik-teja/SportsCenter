import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { team } from '../../contexts/Matches/types';
import { sport } from '../../contexts/Sports/types';
import useUserPreferences from './UseUserPreferences';
interface UserPreferenceEditorProps {
    onClose: () => void;
}

const UserPreferenceEditor: React.FC<UserPreferenceEditorProps> = ({ onClose }) => {
    const authToken = localStorage.getItem("authToken");
    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
    const [selectedSports, setSelectedSports] = useState<string[]>([]);
    const [teamsList, setTeamsList] = useState<team[]>([]);
    const [sportsList, setSportsList] = useState<sport[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(true);

    const userPreferences = useUserPreferences();

    const handleToggleSport = (sportName: string) => {
        setSelectedSports(prevSelected => {
            if (prevSelected.includes(sportName)) {
                return prevSelected.filter(sport => sport !== sportName);
            } else {
                return [...prevSelected, sportName];
            }
        });
    };

    const handleToggleTeam = (teamName: string) => {
        setSelectedTeams(prevSelected => {
            if (prevSelected.includes(teamName)) {
                return prevSelected.filter(team => team !== teamName);
            } else {
                return [...prevSelected, teamName];
            }
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    preferences: {
                        selectedSports,
                        selectedTeams,
                    }
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update preferences');
            }

            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            localStorage.setItem(
                'userData',
                JSON.stringify({
                    ...userData,
                    preferences: {
                        selectedSports,
                        selectedTeams,
                    },
                })
            );
            handleCloseModal();


        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (userPreferences) {
            setSelectedSports(userPreferences.selectedSports || []);
            setSelectedTeams(userPreferences.selectedTeams || []);
        }
    }, [userPreferences]);

    useEffect(() => {
        const fetchPreferences = async () => {
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
        };

        fetchPreferences();
    }, [userPreferences]);

    const handleCloseModal = () => {
        setModalOpen(false);
        onClose();
    };

    return (
        <>
            {modalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center p-8  rounded justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white text-lg rounded-lg overflow-hidden shadow-xl w-112 max-h-full overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-2xl bg-indigo-900 p-2 text-center font-bold mb-4">Select Favorites</h2>
                            <hr className='border border-black m-1' />

                            <div className="mb-3 grid grid-cols-3 gap-4">
                                <h3 className="font-bold text-blue-900 text-center text-2xl mb-2 col-span-3 underline">Sports</h3>

                                {sportsList.map((sport) => (
                                    <button
                                        key={sport.id}
                                        className={`block rounded-md p-2 border ${selectedSports.includes(sport.name) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} `}
                                        onClick={() => handleToggleSport(sport.name)}
                                    >
                                        {sport.name}
                                    </button>
                                ))}
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <h3 className="font-bold text-blue-900 mb-2 text-center text-xl col-span-3 underline">Teams</h3>

                                {teamsList.map((team) => (
                                    <button
                                        key={team.id}
                                        className={`block rounded-md p-2 border ${selectedTeams.includes(team.name) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                                        onClick={() => handleToggleTeam(team.name)}
                                    >
                                        {team.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end px-6 pb-6 gap-2">

                            <button
                                onClick={handleCloseModal}
                                className="bg-red-700 hover:bg-red-500 text-white px-4 py-2 rounded transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Save Preferences
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserPreferenceEditor;
