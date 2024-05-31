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
        <><h2 className='text-3xl text-strong pr-4 inline text-left text-gray-800 px-1'>Live Games</h2>
            <MatchProvider>
                <button className="px-2 py-1 border rounded bg-blue-500 text-white" onClick={refreshMatches}>Refresh Scores</button>
                {toggle ? <MatchCard key={1} /> : <MatchCard key={2} />}
            </MatchProvider></>
    );
};

export default MatchList;
