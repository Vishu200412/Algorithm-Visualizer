import React, { useState } from 'react';
import './Navbar.css';
import { useParams } from '../context/PathfindingContext';

export default function Navbar() {
  const { mode, setmode, algo, setalgo, setres, setrun } = useParams();
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className='navbar'>
      <div className='menu-button' onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`menu ${menuActive ? 'active' : ''}`}>
        <button
          type="button"
          className={['btn', mode === 'setstart' ? 'selected' : ''].join(' ')}
          onClick={() => { setmode(mode === 'setstart' ? null : 'setstart'); toggleMenu(); }}
        >
          <i className="bi bi-geo-alt"></i> Start
        </button>
        <button
          type="button"
          className={['btn', mode === 'settarget' ? 'selected' : ''].join(' ')}
          onClick={() => { setmode(mode === 'settarget' ? null : 'settarget'); toggleMenu(); }}
        >
          <i className="bi bi-geo"></i> Target
        </button>
        <button
          type="button"
          className={['btn', mode === 'addbricks' ? 'selected' : ''].join(' ')}
          onClick={() => { setmode(mode === 'addbricks' ? null : 'addbricks'); toggleMenu(); }}
        >
          <i className="bi bi-bricks"></i> Wall
        </button>
        <button
          type="button"
          className={['btn', mode === 'addweight' ? 'selected' : ''].join(' ')}
          onClick={() => { setmode(mode === 'addweight' ? null : 'addweight'); toggleMenu(); }}
        >
          <i className="bi bi-box-seam"></i> Weight
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => { setres(old => !old); toggleMenu(); }}
        >
          <i className="bi bi-arrow-counterclockwise"></i> Reset
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => { setrun(old => !old); toggleMenu(); }}
        >
          <i className="bi bi-caret-right"></i> Play
        </button>
        <div>
          <select
            className="form-select"
            aria-label="Default select example"
            value={algo}
            onChange={(e) => { setalgo(e.target.value); toggleMenu(); }}
          >
            <option value=''>Choose your algorithm</option>
            <option value="dijkstra">Dijkstra</option>
            <option value="DFS">DFS</option>
            <option value="BFS">BFS</option>
          </select>
        </div>
      </div>
      <div className='container'>
        <button
          type="button"
          className={['btn', mode === 'setstart' ? 'selected' : ''].join(' ')}
          onClick={() => setmode(mode === 'setstart' ? null : 'setstart')}
        >
          <i className="bi bi-geo-alt"></i> Start
        </button>
        <button
          type="button"
          className={['btn', mode === 'settarget' ? 'selected' : ''].join(' ')}
          onClick={() => setmode(mode === 'settarget' ? null : 'settarget')}
        >
          <i className="bi bi-geo"></i> Target
        </button>
        <button
          type="button"
          className={['btn', mode === 'addbricks' ? 'selected' : ''].join(' ')}
          onClick={() => setmode(mode === 'addbricks' ? null : 'addbricks')}
        >
          <i className="bi bi-bricks"></i> Wall
        </button>
        <button
          type="button"
          className={['btn', mode === 'addweight' ? 'selected' : ''].join(' ')}
          onClick={() => setmode(mode === 'addweight' ? null : 'addweight')}
        >
          <i className="bi bi-box-seam"></i> Weight
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => setres(old => !old)}
        >
          <i className="bi bi-arrow-counterclockwise"></i> Reset
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => setrun(old => !old)}
        >
          <i className="bi bi-caret-right"></i> Play
        </button>
        <div>
          <select
            className="form-select"
            aria-label="Default select example"
            value={algo}
            onChange={(e) => setalgo(e.target.value)}
          >
            <option value=''>Choose your algorithm</option>
            <option value="dijkstra">Dijkstra</option>
            <option value="DFS">DFS</option>
            <option value="BFS">BFS</option>
          </select>
        </div>
      </div>
    </div>
  );
}
