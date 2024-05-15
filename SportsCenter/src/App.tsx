
import './App.css'

import MatchList from './pages/Matches/MatchList'

function App() {

  return (
    <>
      <div className="flex flex-col">
        <div className="md:container md:mx-auto">
          <MatchList />
        </div>

        <div className="flex flex-row flex-nowrap ">
          <div className="flex-initial md:mx-auto w-60 p-2">
            News
          </div>
          <div className="flex-initial md:mx-auto w-20 p-2">
            search
          </div>
        </div>
      </div>

    </>
  )
}

export default App
