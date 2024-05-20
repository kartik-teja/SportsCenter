import MatchList from '../Matches/MatchList';
import Favourites from '../News/Favourites';
import LiveNews from '../News/LiveNews';
import UserActionsButton from '../User/UserActions';


function Home() {
    const isAuthenticated = () => {
        return localStorage.getItem('authToken') ? true : false;
    };
    return (<>
        <div className="flex justify-between items-center w-full">
            <div className='flex justify-center w-full'>
                <h1 className="text-3xl">Sports Center</h1>
            </div>
            <div className="flex justify-end">
                <UserActionsButton isAuthenticated={isAuthenticated()} />
            </div>
        </div>
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="container mx-2 my-4 p-4 bg-white rounded shadow-md">
                <h2 className='text-left'>Live Games</h2>
                <MatchList />
            </div>
            <h1 className='text-left pl-4'>Trending News</h1>
            <div className="flex flex-col md:flex-row flex-wrap p-1">
                <div className="flex-1 md:flex-none md:w-2/3 p-4 bg-white rounded shadow-md">
                    <LiveNews />
                </div>
                <div className="flex-1 md:flex-none md:w-1/3 p-4 bg-gray-500 rounded shadow-md ">
                    <h2>Favourites</h2>
                    <Favourites />
                </div>
            </div>
        </div>
    </>
    )
}

export default Home;
