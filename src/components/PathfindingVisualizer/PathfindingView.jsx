import React from 'react';
import Grid from './Grid/Grid'; // Import local Grid component
import Navbar from './Navbar/Navbar'; // Import local Navbar component
import './PathfindingView.css';

const PathfindingView = () => {
  return (
    <div className="pathfinding-view">
      <Navbar /> {/* Use local Navbar */}
      <div className="grid-container">
        <Grid /> {/* Use local Grid */}
      </div>
    </div>
  );
};

export default PathfindingView;
