import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes,Route} from "react-router-dom"
import AlbumItem from './pages/AlbumItem';
import AlbumList from './pages/AlbumList';
import Navigation from './pages/Navigation';
import AddAlbum from './pages/AddAlbum';
import SearchForAlbum from './pages/SearchForAlbum';
import Quiz from './pages/Quiz';
import EditAlbum from './pages/EditAlbum';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation></Navigation>
      <Routes>
        <Route path='/item' element={<AlbumItem/>}></Route>
        <Route path='/list' element={<AlbumList/>}></Route>
        <Route path='/search' element={<SearchForAlbum/>}></Route>
        <Route path='/add-album' element={<AddAlbum/>}/>
        <Route path="edit/:id" element={<EditAlbum/>}/>
        <Route path='/' element={<Quiz/>}></Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
