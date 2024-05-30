import { useState } from "react";
import { MatchProvider, useMatchState } from "../../contexts/Matches/context";
import MatchCard from "./MatchCard";

const MatchList = () => {
    const matchListState = useMatchState();
    const [toggle, setToggle] = useState(false);
    const isFetchingMatches = matchListState.isLoading;

    const refreshMatches = () => {
        setToggle(prevToggle => !prevToggle);
    };

    if (isFetchingMatches) {
        return <>Loading...</>;
    }

    return (
        <MatchProvider>
            <button className="px-4 py-2 border rounded bg-blue-500 text-white" onClick={refreshMatches}>Refresh Scores</button>
            {toggle ? <MatchCard key={1} /> : <MatchCard key={2} />}
        </MatchProvider>
    );
};

export default MatchList;
