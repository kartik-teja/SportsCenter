import { useEffect } from "react";
import { useMatchDispatch, useMatchState } from "../../contexts/Matches/context";
import { fetchMatch } from "../../contexts/Matches/actions";

const MatchCard = () => {
    const matchListState = useMatchState();
    const matchDispatch = useMatchDispatch();

    useEffect(() => {
        // Fetch match data when the component mounts
        fetchMatch(matchDispatch);
    }, [matchDispatch]);

    if (matchListState.isLoading) {
        return <div>Loading matches...</div>;
    }

    if (matchListState.isError) {
        return <div>Error: {matchListState.errorMessage}</div>;
    }

    console.log(matchListState);

    return (
        <div className="match-card-container">
            {Object.values(matchListState.matchData).map((match) => (
                <div key={match.id} className="match-card">
                    <h2>{match.teams.map(team => team.name).join(' vs ')}</h2>
                    <p>Date: {new Date(match.endsAt).toLocaleDateString()}</p>
                    <p>Location: {match.location}</p>
                    <p>Sport: {match.sportName}</p>
                    <p>Status: {match.isRunning ? 'Running' : 'Not Running'}</p>
                </div>
            ))}
        </div>
    );
};

export default MatchCard;