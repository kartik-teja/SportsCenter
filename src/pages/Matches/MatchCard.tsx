import { useEffect } from "react";
import { useMatchDispatch, useMatchState } from "../../contexts/Matches/context";
import { fetchMatch } from "../../contexts/Matches/actions";
import { Match } from "../../contexts/Matches/types";


const MatchCard = () => {
    const matchListState = useMatchState();
    const matchDispatch = useMatchDispatch();

    useEffect(() => {
        fetchMatch(matchDispatch);
    }, [matchDispatch]);

    if (matchListState.isLoading) {
        return <div>Loading matches...</div>;
    }

    if (matchListState.isError) {
        return <div>Error: {matchListState.errorMessage}</div>;
    }

    const filterMatches = (matchData: Match[]): Match[] => {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            return matchData;
        }
        const { preferences } = JSON.parse(userData);
        if (!preferences) {
            return matchData;
        }
        const { selectedSports, selectedTeams } = preferences;
        if (selectedSports & selectedTeams) {
            return matchData;
        }

        const matchesArray: Match[] = Array.isArray(matchData) ? matchData : Object.values(matchData);


        const filteredMatches = matchesArray.filter((match: Match) => {
            const sportMatch = selectedSports.includes(match.sportName);
            const teamMatch = match.teams.some(team => selectedTeams.includes(team.name));
            return sportMatch || teamMatch;
        });

        return filteredMatches;

    }

    return (
        <div className="match-card-container max-h-25vh w-full overflow-x-auto whitespace-nowrap">
            {Object.values(filterMatches(matchListState.matchData)).map((match, index) => (
                <div key={match.id} className={`match-card p-4 inline-block ${index === 0 ? '' : 'ml-4'} border border-gray-300 rounded-lg`}>
                    <h2 className="text-lg font-bold mb-2">{match.teams.map(team => team.name).join(' vs ')}</h2>
                    <p className="text-sm">Date: {new Date(match.endsAt).toLocaleDateString()}</p>
                    <p className="text-sm">Location: {match.location}</p>
                    <p className="text-sm">Sport: {match.sportName}</p>
                    <p className="text-sm">Status: {match.isRunning ? 'Running' : 'Not Running'}</p>
                </div>
            ))}

        </div>
    );
};

export default MatchCard;
