import { useEffect } from 'react';
import { useNewsDispatch, useNewsState } from '../../contexts/News/context';
import { fetchNews } from '../../contexts/News/actions';

interface NewsCardProps {
    selectedSport: number;
}

const NewsCard: React.FC<NewsCardProps> = ({ selectedSport }) => {
    const NewsListState = useNewsState();
    const NewsDispatch = useNewsDispatch();

    useEffect(() => {
        // Fetch News data when the component mounts or when selectedSport changes
        fetchNews(NewsDispatch);
    }, [NewsDispatch, selectedSport]);

    if (NewsListState.isLoading) {
        return <div>Loading News...</div>;
    }

    if (NewsListState.isError) {
        return <div>Error: {NewsListState.errorMessage}</div>;
    }

    const truncateSummary = (summary: string) => {
        return summary.length > 50 ? summary.slice(0, 50) + '...' : summary;
    };

    const filteredNews = NewsListState.newsData.filter(article => article.sport.id === selectedSport);

    return (
        <div className="space-y-4 max-h-56 overflow-auto text-left">
            {filteredNews.length > 0 ? (
                filteredNews.map(article => (
                    <div key={article.id} className="border p-4 rounded-lg flex flex-col md:flex-row">
                        <div className="md:w-2/3 w-full">
                            <p className="text-gray-500">{article.sport.name}</p>
                            <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                            <p className="mb-2">{truncateSummary(article.summary)}</p>
                            <p className="text-gray-500">{new Date(article.date).toLocaleDateString()} <span className="font-bold text-gray-900 text-right">read more..</span></p>
                        </div>
                        <div className="md:w-1/3 max-h-46 w-full md:mr-4">
                            <img src={article.thumbnail} alt={article.title} className="w-auto h-auto object-cover rounded-lg mb-2 md:mb-0" />
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No news available for this sport.</p>
            )}
        </div>
    );
};

export default NewsCard;
