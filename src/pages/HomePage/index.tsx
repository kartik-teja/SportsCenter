import { useState, useEffect } from 'react';
import { NewsProvider } from '../../contexts/News/context';
import MatchList from '../Matches/MatchList';
import Favourites from '../News/Favourites';
import LiveNews from '../News/LiveNews';
import UserActionsButton from '../User/UserActions';

function Home() {
    const isAuthenticated = () => {
        return localStorage.getItem('authToken') ? true : false;
    };

    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            setShowScrollButton(scrollTop > 200);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className="flex justify-between items-center w-full bg-blue-900 text-white p-4">
                <div className='flex justify-center w-full'>
                    <h1 className="text-3xl">Sports Center</h1>
                </div>
                <div className="flex justify-end">
                    <UserActionsButton isAuthenticated={isAuthenticated()} />
                </div>
            </div>
            <div className="flex flex-col min-h-screen bg-gray-100">
                <div className="mx-2 my-4 p-4 bg-white rounded shadow-md">
                    <MatchList />
                </div>
                <h1 className='text-3xl text-left pl-4 text-gray-800'>Trending News</h1>
                <div className='max-h-50vh'>
                    <div className="flex flex-col md:flex-row flex-wrap p-1">
                        <div className="flex-1 md:flex-none md:w-2/3 p-4 bg-white rounded shadow-md">
                            <NewsProvider>
                                <LiveNews />
                            </NewsProvider>
                        </div>
                        <div className="flex-1 md:flex-none md:w-1/3 p-4 bg-gray-300 rounded shadow-md ">
                            <h2 className="text-white text-xl text-center bg-blue-900 py-2 px-4 rounded-lg mb-4">Favourites</h2>
                            <NewsProvider>
                                <Favourites />
                            </NewsProvider>
                        </div>
                    </div>
                </div>
                {showScrollButton && (
                    <button
                        className="fixed bottom-4 right-4 bg-blue-900 text-white px-4 py-2 rounded shadow-md"
                        onClick={scrollToTop}
                    >
                        Scroll To Top
                    </button>
                )}
            </div>
        </>
    );
}

export default Home;
