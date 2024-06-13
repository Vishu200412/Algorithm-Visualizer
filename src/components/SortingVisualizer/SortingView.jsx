import React, { useState, useEffect } from 'react'

import Navbar from './Navbar/Navbar'
import Bars from './Bars/Bar'

import bubbleSort from './Algorithms/BubbleSort'
import selectionSort from './Algorithms/SelectionSort'
import insertionSort from './Algorithms/InsertionSort'
import mergeSort from './Algorithms/MergeSort'
import quickSort from './Algorithms/QuickSort'

const SortingView = () => {
  // Generating shuffled array of 1 to n
  const generateRandomArray = (len) => {
    setCompleted(false)
    setSorting(false)
    setSortedIndex([])

    const randomArray = Array.from(Array(len + 1).keys()).slice(1)  // generates an array [1,2,3,......,len]

    // randomly shuffle the array
    // Took reference from "https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array"

    for (let i = randomArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i - 1)) // Math.random() generates random number bretween 0(inclusive) and 1(exclusive)
      const temp = randomArray[i]

      randomArray[i] = randomArray[randomIndex]
      randomArray[randomIndex] = temp
    }

    setBlocks(randomArray)
  }

  // States
  const [algo, setAlgo] = useState('bubbleSort')
  const [len, setLength] = useState(30)
  const [blocks, setBlocks] = useState([])
  const [sorting, setSorting] = useState(false)
  const [completed, setCompleted] = useState(true)
  const [speed, setSpeed] = useState(250)
  const [compare, setCompare] = useState([])
  const [swap, setSwap] = useState([])
  const [sortedIndex, setSortedIndex] = useState([])

  // Generating random array every time the length is changed by the user
  useEffect(() => {
    generateRandomArray(len)
  }, [len, algo])

  // setting the selected algorithm
  const handleAlgo = (event) => {
    setAlgo(event.target.value)
  }

  // handling the length of the array
  const handleLength = (event) => {
    setLength(Number(event.target.value))
  }

  // handling the speed of sorting
  const handleSpeed = (event) => {
    setSpeed(Math.ceil(400 / Number(event.target.value)))
  }

  // Sorting according to the algorithm
  const handleSort = () => {
    const sortAccOrder = (order) => {
      ;(function loop(i) {
        setTimeout(function () {
          const [j, k, arr, index] = order[i]
          setCompare([j, k])
          setSwap([])

          if (index !== null) {
            setSortedIndex((prevState) => [...prevState, index])
          }

          if (arr) {
            setBlocks(arr)
            if (j !== null || k != null) setSwap([j, k])
          }

          if (++i < order.length) {
            loop(i)
          } else {
            setSorting(false)
            setCompleted(true)
          }
        }, speed)
      })(0)
    }

    setSorting(true)

    algo === 'bubbleSort'
      ? sortAccOrder(bubbleSort(blocks))
      : algo === 'selectionSort'
      ? sortAccOrder(insertionSort(blocks))
      : algo === 'insertionSort'
      ? sortAccOrder(selectionSort(blocks))
      : algo === 'mergeSort'
      ? sortAccOrder(mergeSort(blocks))
      : algo === 'quickSort'
      ? sortAccOrder(quickSort(blocks))
      : (() => {
          setSorting(false)
          setCompleted(true)
        })()
  }

  return (
    <div>
      <Navbar
        generateRandomArray={() => generateRandomArray(len)}
        handleLength={handleLength}
        handleSpeed={handleSpeed}
        handleAlgo={handleAlgo}
        handleSort={handleSort}
        sorting={sorting}
        completed={completed}
        len={len}
        speed={speed}
        algo={algo}
      />

      <Bars
        blocks={blocks}
        compare={sorting && compare}
        swap={sorting && swap}
        sorted={sortedIndex}
      />
    </div>
  );
};

export default SortingView;
