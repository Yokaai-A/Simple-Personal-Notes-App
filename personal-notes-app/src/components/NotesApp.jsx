import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import Navigation from './Navigation';
import AddPage from '../pages/AddPage';
import ArchivePage from '../pages/ArchivePage';

class NotesApp extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    return(
      <div className="notesapp-container">
        <header>
          <h1>Notes App</h1>
          <p><Navigation/></p>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/notes/new' element={<AddPage />} />
            <Route path='notes/:id' element={<DetailPage />} />
            <Route path='/archives' element={<ArchivePage />} />
          </Routes>
        </main>
      </div>
    )
  }
}

export default NotesApp;

