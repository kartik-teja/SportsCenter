import React, { useState, useEffect } from "react";
import { News } from "../../contexts/News/types";
import { API_ENDPOINT } from "../../config/constants";

interface NewsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    articleId: number;
}

const NewsPanel: React.FC<NewsPanelProps> = ({ isOpen, onClose, articleId }) => {
    const [article, setArticle] = useState<News>();

    useEffect(() => {
        if (isOpen) {
            const fetchArticle = async () => {
                const response = await fetch(`${API_ENDPOINT}/articles/${articleId}`);
                const data = await response.json();
                setArticle(data);
            };
            fetchArticle();
        }
    }, [isOpen, articleId]);

    if (!isOpen || !article) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative h-auto">
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h2 className="text-2xl font-bold">{article.title}</h2>
                    <button className="text-2xl font-bold" onClick={onClose}>×</button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto mb-4">
                    <img src={article.thumbnail} alt={article.title} className="w-auto h-auto mb-4" />
                    <div className=" mb-4">
                        <p>{article.content}</p>
                        <button
                            className="absolute bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default NewsPanel;
