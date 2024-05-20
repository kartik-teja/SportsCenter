
import { useMatchState } from "../../contexts/Matches/context";
import MatchCard from "./MatchCard";

const MatchList = () => {
    const matchListState = useMatchState();
    const isFetchingmatchs = matchListState.isLoading;
    if (isFetchingmatchs) {
        return <>Loading...</>;
    }

    return (
        <MatchCard />
    )
};

export default MatchList;

