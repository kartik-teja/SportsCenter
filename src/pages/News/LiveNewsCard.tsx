import React, { useState, useEffect } from 'react';
import { useNewsDispatch, useNewsState } from '../../contexts/News/context';
import { fetchNews } from '../../contexts/News/actions';
import NewsPanel from './NewsPanel';

interface NewsCardProps {
    selectedSport: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ selectedSport }) => {
    const NewsListState = useNewsState();
    const NewsDispatch = useNewsDispatch();
    const [isNewsPanelOpen, setIsNewsPanelOpen] = useState<boolean>(false);
    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

    useEffect(() => {
        fetchNews(NewsDispatch);
    }, [NewsDispatch, selectedSport]);

    if (NewsListState.isLoading) {
        return <div>Loading News...</div>;
    }

    if (NewsListState.isError) {
        return <div>Error: {NewsListState.errorMessage}</div>;
    }

    const filteredNews = () => {
        if (selectedSport === 'all') {
            return NewsListState.newsData;
        } else {
            return NewsListState.newsData.filter(article => article.sport.id.toString() === selectedSport);
        }
    };

    const openNewsPanel = (articleId: string) => {
        setSelectedArticleId(articleId);
        setIsNewsPanelOpen(true);
    };

    const closeNewsPanel = () => {
        setIsNewsPanelOpen(false);
        setSelectedArticleId(null);
    };

    const newsList = filteredNews();

    return (
        <div className="space-y-4 overflow-auto text-left">


            {newsList.length > 0 ? (
                newsList.map(article => (
                    <div key={article.id} className="border p-4 rounded-lg flex flex-col md:flex-row">
                        <div className="md:w-2/3 w-full">
                            <p className="text-gray-500">{article.sport.name}</p>
                            <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                            <p className="mb-2">{article.summary}</p>
                            <p className="text-gray-500">
                                {new Date(article.date).toLocaleDateString()}
                                <button
                                    className="font-bold text-gray-900 text-right ml-2"
                                    onClick={() => openNewsPanel(article.id.toString())}
                                >
                                    read more..
                                </button>
                            </p>
                        </div>
                        <div className="md:w-1/3 h-auto w-full md:mr-4">
                            <img src={article.thumbnail} alt={article.title} className="w-auto h-auto object-cover rounded-lg mb-2 md:mb-0" />
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No news available for this sport.</p>
            )}

            {selectedArticleId !== null && (
                <NewsPanel
                    isOpen={isNewsPanelOpen}
                    onClose={closeNewsPanel}
                    articleId={parseInt(selectedArticleId)}
                />
            )}
        </div>
    );
};

export default NewsCard;
