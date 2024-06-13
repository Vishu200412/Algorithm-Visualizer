import React, { useEffect, useRef, useState } from 'react';
import './Grid.css';
import { useParams } from '../context/PathfindingContext';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

export default function Grid() {
  const { grid, setgrid, editing, seteditFlag, mode, start, end, run, res, algo } = useParams();
  const [refarray, setRefArray] = useState(getrefarray(grid));

  function getrefarray(grid) {
    let array = [];
    grid.forEach((elem) => {
      elem.forEach((child) => {
        array.push(useRef());
      });
    });
    return array;
  }

  function BFS(graph, hashmap, prevmap, start, target) {
    console.log(start);
    console.log(target);
    let queue = [start];
    let count = 0;
    hashmap[`${start.x}-${start.y}`] = true;
    while (queue.length > 0) {
      count += 1;
      let c = queue.pop();
      refarray[c.x + c.y * 25]?.current?.style && (refarray[c.x + c.y * 25].current.style['transition-delay'] = `${count * 8}ms`);
      refarray[c.x + c.y * 25]?.current?.classList && refarray[c.x + c.y * 25].current.classList.add('visited');
      if (c.x === target.x && c.y === target.y) return [c, count];

      if (c.x + 1 < 25 && !hashmap[`${c.x + 1}-${c.y}`] && !graph[c.y][c.x + 1].iswall) {
        queue.unshift({ x: c.x + 1, y: c.y });
        prevmap[`${c.x + 1}-${c.y}`] = { ...c };
        hashmap[`${c.x + 1}-${c.y}`] = true;
      }
      if (c.x - 1 >= 0 && !hashmap[`${c.x - 1}-${c.y}`] && !graph[c.y][c.x - 1].iswall) {
        queue.unshift({ x: c.x - 1, y: c.y });
        prevmap[`${c.x - 1}-${c.y}`] = { ...c };
        hashmap[`${c.x - 1}-${c.y}`] = true;
      }
      if (c.y + 1 < 25 && !hashmap[`${c.x}-${c.y + 1}`] && !graph[c.y + 1][c.x].iswall) {
        queue.unshift({ x: c.x, y: c.y + 1 });
        prevmap[`${c.x}-${c.y + 1}`] = { ...c };
        hashmap[`${c.x}-${c.y + 1}`] = true;
      }
      if (c.y - 1 >= 0 && !hashmap[`${c.x}-${c.y - 1}`] && !graph[c.y - 1][c.x].iswall) {
        queue.unshift({ x: c.x, y: c.y - 1 });
        prevmap[`${c.x}-${c.y - 1}`] = { ...c };
        hashmap[`${c.x}-${c.y - 1}`] = true;
      }
    }
    return null;
  }

  function DFS(graph, hashmap, prevmap, start, target) {
    console.log(start);
    console.log(target);
    let queue = [start];
    let count = 0;
    hashmap[`${start.x}-${start.y}`] = true;
    while (queue.length > 0) {
      count += 1;
      let c = queue[0];
      queue.shift();
      refarray[c.x + c.y * 25]?.current?.style && (refarray[c.x + c.y * 25].current.style['transition-delay'] = `${count * 8}ms`);
      refarray[c.x + c.y * 25]?.current?.classList && refarray[c.x + c.y * 25].current.classList.add('visited');
      if (c.x === target.x && c.y === target.y) return [c, count];

      if (c.y + 1 < 25 && !hashmap[`${c.x}-${c.y + 1}`] && !graph[c.y + 1][c.x].iswall) {
        queue.unshift({ x: c.x, y: c.y + 1 });
        prevmap[`${c.x}-${c.y + 1}`] = { ...c };
        hashmap[`${c.x}-${c.y + 1}`] = true;
      }
      if (c.x - 1 >= 0 && !hashmap[`${c.x - 1}-${c.y}`] && !graph[c.y][c.x - 1].iswall) {
        queue.unshift({ x: c.x - 1, y: c.y });
        prevmap[`${c.x - 1}-${c.y}`] = { ...c };
        hashmap[`${c.x - 1}-${c.y}`] = true;
      }
      if (c.y - 1 >= 0 && !hashmap[`${c.x}-${c.y - 1}`] && !graph[c.y - 1][c.x].iswall) {
        queue.unshift({ x: c.x, y: c.y - 1 });
        prevmap[`${c.x}-${c.y - 1}`] = { ...c };
        hashmap[`${c.x}-${c.y - 1}`] = true;
      }
      if (c.x + 1 < 25 && !hashmap[`${c.x + 1}-${c.y}`] && !graph[c.y][c.x + 1].iswall) {
        queue.unshift({ x: c.x + 1, y: c.y });
        prevmap[`${c.x + 1}-${c.y}`] = { ...c };
        hashmap[`${c.x + 1}-${c.y}`] = true;
      }
    }
    return null;
  }

  function dijkstra(graph, start, target) {
    console.log(start);
    console.log(target);

    let pq = new MinPriorityQueue((node) => node.priority);
    let distances = {};
    let prevmap = {};
    let count = 0;
    for (let y = 0; y < graph.length; y++) {
      for (let x = 0; x < graph[y].length; x++) {
        distances[`${x}-${y}`] = Infinity;
        prevmap[`${x}-${y}`] = null;
      }
    }
    distances[`${start.x}-${start.y}`] = 0;
    pq.enqueue({ priority: 0, node: start });

    while (!pq.isEmpty()) {
      let { node: current } = pq.dequeue();
      refarray[current.x + current.y * 25]?.current?.style && (refarray[current.x + current.y * 25].current.style['transition-delay'] = `${count * 8}ms`);
      refarray[current.x + current.y * 25]?.current?.classList && refarray[current.x + current.y * 25].current.classList.add('visited');
      count += 1;

      if (current.x === target.x && current.y === target.y) return { path: reconstructPath(prevmap, current), count };

      let neighbors = getNeighbors(graph, current);
      for (let neighbor of neighbors) {
        let alt = distances[`${current.x}-${current.y}`] + neighbor.weight;
        if (alt < distances[`${neighbor.x}-${neighbor.y}`]) {
          distances[`${neighbor.x}-${neighbor.y}`] = alt;
          prevmap[`${neighbor.x}-${neighbor.y}`] = current;
          pq.enqueue({ priority: alt, node: neighbor });
        }
      }
    }
    return null;
  }

  function getNeighbors(graph, node) {
    let neighbors = [];
    let directions = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
    ];

    for (let direction of directions) {
      let x = node.x + direction.dx;
      let y = node.y + direction.dy;

      if (x >= 0 && x < 25 && y >= 0 && y < 25 && !graph[y][x].iswall) {
        neighbors.push({ x, y, weight: graph[y][x].weight });
      }
    }
    return neighbors;
  }

  function reconstructPath(prevmap, current) {
    let path = [];
    while (prevmap[`${current.x}-${current.y}`]) {
      path.push(current);
      current = prevmap[`${current.x}-${current.y}`];
    }
    path.push(current); // Add the start node to the path
    return path.reverse();
  }

  useEffect(() => {
    if (algo === 'BFS') {
      let hashmap = {};
      let prevmap = {};
      for (let j = 0; j < 25; j++) {
        for (let i = 0; i < 25; i++) {
          hashmap[`${i}-${j}`] = false;
          prevmap[`${i}-${j}`] = null;
        }
      }
      let result = BFS(grid, hashmap, prevmap, start.current, end.current);
      let path = [];
      if (result != null) {
        let current = result[0];
        while (prevmap[`${current.x}-${current.y}`] != null) {
          path.push(current);
          current = prevmap[`${current.x}-${current.y}`];
        }
        path.push(current); // Add the start node to the path
        setTimeout(() => {
          path.reverse().forEach((elem, index) => {
            refarray[elem.x + elem.y * 25]?.current?.style && (refarray[elem.x + elem.y * 25].current.style['transition-delay'] = `${index * 15}ms`);
            refarray[elem.x + elem.y * 25]?.current?.classList && refarray[elem.x + elem.y * 25].current.classList.add('path');
          });
        }, result[1] * 9);
      }
    }
    if (algo === 'DFS') {
      let hashmap = {};
      let prevmap = {};
      for (let j = 0; j < 25; j++) {
        for (let i = 0; i < 25; i++) {
          hashmap[`${i}-${j}`] = false;
          prevmap[`${i}-${j}`] = null;
        }
      }
      let result = DFS(grid, hashmap, prevmap, start.current, end.current);
      let path = [];
      if (result != null) {
        let current = result[0];
        while (prevmap[`${current.x}-${current.y}`] != null) {
          path.push(current);
          current = prevmap[`${current.x}-${current.y}`];
        }
        path.push(current); // Add the start node to the path
        setTimeout(() => {
          path.reverse().forEach((elem, index) => {
            refarray[elem.x + elem.y * 25]?.current?.style && (refarray[elem.x + elem.y * 25].current.style['transition-delay'] = `${index * 15}ms`);
            refarray[elem.x + elem.y * 25]?.current?.classList && refarray[elem.x + elem.y * 25].current.classList.add('path');
          });
        }, result[1] * 9);
      }
    }
    if (algo === 'dijkstra') {
      let result = dijkstra(grid, start.current, end.current);
      if (result) {
        setTimeout(() => {
          result.path.forEach((elem, index) => {
            refarray[elem.x + elem.y * 25]?.current?.style && (refarray[elem.x + elem.y * 25].current.style['transition-delay'] = `${index * 15}ms`);
            refarray[elem.x + elem.y * 25]?.current?.classList && refarray[elem.x + elem.y * 25].current.classList.add('path');
          });
        }, result.count * 9);
      }
    }
  }, [run]);

  useEffect(() => {
    refarray.forEach((elem) => {
      elem.current.style['transition-delay'] = '0ms';
    });
    refarray.forEach((elem) => {
      elem.current.classList.remove('visited');
      elem.current.classList.remove('path');
    });
  }, [res]);

  return (
    <div className='board'>
      {refarray.map((elem, index) => {
        let classList = ['cell'];

        let yindex = Math.floor(index / 25);
        let xindex = index % 25;
        let cell = grid[yindex] && grid[yindex][xindex];

        if (cell && cell.iswall) {
          classList.push('wall');
        }

        return <div key={`${index}`} ref={elem} className={classList.join(' ')}
          onMouseDown={() => { seteditFlag(true); }} onMouseUp={() => { seteditFlag(false); }}
          onMouseMove={() => {
            if (!editing) return;
            const current = grid[yindex] && grid[yindex][xindex];
            if (current.isstart || current.istarget) return;
            switch (mode) {
              case 'setstart':
                var newgrid = grid.map((elem) => {
                  return elem.map((elem) => {
                    if (!elem.isstart) return elem;
                    return { ...elem, isstart: false };
                  });
                });
                newgrid[yindex][xindex] = { ...newgrid[yindex][xindex], isstart: true, istarget: false, weight: 1, iswall: false };
                start.current = { x: xindex, y: yindex };
                setgrid(newgrid);
                break;

              case 'settarget':
                var newgrid = grid.map((elem) => {
                  return elem.map((elem) => {
                    if (!elem.istarget) return elem;
                    return { ...elem, istarget: false };
                  });
                });
                newgrid[yindex][xindex] = { ...newgrid[yindex][xindex], isstart: false, istarget: true, weight: 1, iswall: false };
                end.current = { x: xindex, y: yindex };
                setgrid(newgrid);
                break;

              case 'addbricks':
                var newgrid = grid.slice();
                newgrid[yindex][xindex] = { ...newgrid[yindex][xindex], weight: 1, iswall: true };
                setgrid(newgrid);
                break;

              case 'addweight':
                var newgrid = grid.slice();
                newgrid[yindex][xindex] = { ...newgrid[yindex][xindex], weight: 5, iswall: false };
                setgrid(newgrid);
                break;
              default:
                return;
            }
          }}>
          {cell && cell.weight > 1 ? <i className="bi bi-box-seam-fill"></i> : null}
          {cell && cell.isstart ? <i className="bi bi-geo-alt-fill"></i> : null}
          {cell && cell.istarget ? <i className="bi bi-geo-fill"></i> : null}
        </div>
      })}
    </div>
  );
}
