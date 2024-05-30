import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";

interface UserPreference {
    selectedSports: string[];
    selectedTeams: string[];
}

const useUserPreferences = () => {
    const authToken = localStorage.getItem('authToken');
    const [userPreferences, setUserPreferences] = useState<UserPreference | null>(null);

    useEffect(() => {
        const fetchUserPreferences = async () => {
            try {
                if (!authToken) return;

                const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch UserPreferences');
                }

                const data = await response.json();
                setUserPreferences(data.preferences);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserPreferences();
    }, [authToken]);

    return userPreferences;
};

export default useUserPreferences;
