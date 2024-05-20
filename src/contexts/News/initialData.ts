import { News } from './types';
const initialData: News[] = [
    {
        id: 74,
        title: "Excitement and Drama in Unforgettable Match",
        thumbnail: "https://images.pexels.com/photos/187329/pexels-photo-187329.jpeg?auto=compress&cs=tinysrgb&w=1440",
        sport: {
            id: 5,
            name: "Table Tennis"
        },
        date: "2023-08-01T12:08:33.811Z",
        summary: "A game filled with excitement, suspense, and drama, a true reflection of the spirit of the sport",
        teams: [
            {
                id: 20,
                name: "Stealth Strikers"
            },
            {
                id: 17,
                name: "Celestial Chargers"
            }
        ]
    }
]

export default initialData;