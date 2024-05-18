import './App.css'

import MatchList from './pages/Matches/MatchList'
import Favourites from './pages/News/Favorites'
import LiveNews from './pages/News/LiveNews'

function App() {
  return (<>
    <h1 className=' bg-gray-100 bg-gray-100'> Sports Center</h1>
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="container mx-auto my-4 p-4 bg-white rounded shadow-md">
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

export default App
