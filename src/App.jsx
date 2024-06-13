import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import PathfindingView from './components/PathfindingVisualizer/PathfindingView';
import SortingView from './components/SortingVisualizer/SortingView';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sorting-visualizer" element={<SortingView />} />
          <Route path="/pathfinding-visualizer" element={<PathfindingView />} />
        </Routes>
      </Router>
    </div>
  );
}

const Home = () => (
  <div className="homepage">
    <h1>Algorithm Visualizer</h1>
    <div className="card-container">
      <Link to="/sorting-visualizer" className="card-link">
        <div className="card">
          <h2>Sorting Visualizer</h2>
          <img src="/images/sorting.png" alt="Sorting Visualizer" className="card-image"/>
          <p>Explore sorting algorithms visually.</p>
        </div>
      </Link>
      <Link to="/pathfinding-visualizer" className="card-link">
        <div className="card">
          <h2>Pathfinding Visualizer</h2>
          <img src="/images/pathfinding.png" alt="Pathfinding Visualizer" className="card-image"/>
          <p>Visualize pathfinding algorithms.</p>
        </div>
      </Link>
    </div>
  </div>
);

export default App;
