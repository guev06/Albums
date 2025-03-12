import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import AlbumList from './pages/AlbumList';
import Navigation from './pages/Navigation';
import AddAlbum from './pages/AddAlbum';
import SearchById from './pages/SearchById';
// Import new search components - you'll need to create these

// import SearchByYear from './pages/SearchByYear';
import SearchByTitle from './pages/SearchByTitle';
import Quiz from './pages/Quiz';
import EditAlbum from './pages/EditAlbum';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation></Navigation>
        <Routes>
          <Route path='/list' element={<AlbumList/>}></Route>
          {/* Search routes */}
          
          {/* <Route path='/search/artist' element={<SearchByArtist/>}></Route> */}
          {/* <Route path='/search/:year' element={<SearchByYear/>}></Route>*/}
          <Route path='/search/title' element={<SearchByTitle/>}></Route> 
          <Route path='/search' element={<SearchById/>}></Route>
          <Route path='/add-album' element={<AddAlbum/>}/>
          <Route path="edit/:id" element={<EditAlbum/>}/>
          <Route path='/' element={<Quiz/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;