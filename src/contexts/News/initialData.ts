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
        content: "The excitement was in the air as the Table Tennis match was about to start. It was the day of the big game between Stealth Strikers and Celestial Chargers, and the fans couldn't be more excited.\n\n\n  The game started on a high note, with both teams showcasing their skills and tactics. The crowd was on their feet, cheering for their teams. The first half of the game saw Stealth Strikers taking a slight lead. But Celestial Chargers was not far behind.\n\n\n  As the second half of the game started, Celestial Chargers came back stronger. They were determined to win the game. Their strategy was working, and they managed to level the scores.\n\n\n  The last few minutes of the game were a nail-biter. Both teams had their fair share of chances, but the game ended in a draw. It was a match that was filled with excitement, suspense, and drama, a true reflection of the spirit of Table Tennis."
        , teams: [
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