
import { MatchProvider, useMatchState } from "../../contexts/Matches/context";
import MatchCard from "./MatchCard";

const MatchList = () => {
    const matchListState = useMatchState();
    const isFetchingmatchs = matchListState.isLoading;
    if (isFetchingmatchs) {
        return <>Loading...</>;
    }

    return (
        <MatchProvider>
            <MatchCard />
        </MatchProvider>

    )
};

export default MatchList;

