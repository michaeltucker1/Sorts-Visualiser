import React, { useState, useEffect, useRef } from "react";
import Slider from '@mui/material/Slider';

function App() {

  const [numbersToSort, setNumbersToSort] = useState([])
  const [lengthOfArray, setLengthOfArray] = useState(40)

  //Reference to all the bars in the list - used for visualising and changing the colours of the bars
  const barsRef = useRef()

  //Sets the speed of the algorithim (ms)
  const [speed, setSpeed] = useState()

  // Turns true when a sorting algorithim is running
  const [isSorting, setIsSorting] = useState(false)

  //Turns true once the algorithim has finished sorting and goes back to false when the length changes
  const [isSorted, setIsSorted] = useState(false)

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  //When the length of Array is changed by the slider, a new array will be generated with the new length 
  useEffect(() => {
    generateArray(lengthOfArray)
  }, [lengthOfArray])

  //Generates an array with random integers
  const generateArray = (length) => {
    let tempArray = []
    for (let i = 0; i < length; i++) {
      var randomInteger = Math.round(20 + (Math.random() * (200 - 20)))
      tempArray.push(randomInteger)
    }
    setNumbersToSort(tempArray)
    setIsSorted(false)
  }

  //Conducts a bubble sort on an array
  const bubbleSort = async (arr) => {
    if (isSorting === false) {
      for (var i = 0; i < arr.length; i++) {

        // Last i elements are already in place  
        for (var j = 0; j < (arr.length - i - 1); j++) {

          // Checking if the item at present iteration 
          // is greater than the next iteration

          if (arr[j] > arr[j + 1]) {

            barsRef.current.childNodes[j].style.backgroundColor = "green"
            barsRef.current.childNodes[j + 1].style.backgroundColor = "red"
            await sleep(speed)
            // If the condition is true then swap them
            var temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp

            barsRef.current.childNodes[j].style.backgroundColor = "blue"
            barsRef.current.childNodes[j + 1].style.backgroundColor = "blue"
            setNumbersToSort([...arr])
          } else {
            barsRef.current.childNodes[j].style.backgroundColor = "green"
            barsRef.current.childNodes[j + 1].style.backgroundColor = "green"
            await sleep(speed)
            barsRef.current.childNodes[j].style.backgroundColor = "blue"
            barsRef.current.childNodes[j + 1].style.backgroundColor = "blue"
          }

        }
      }
      setIsSorting(false)
      setIsSorted(true)
      for (var index = 0; index < arr.length; index++) {
        barsRef.current.childNodes[index].style.backgroundColor = "green"
      }
    }
  }

  //Conducts a selection sort on an array
  const selectionSort = async (arr, n) => {
    if (isSorting === false) {
      var i, j, min_idx;

      // One by one move boundary of unsorted subarray
      for (i = 0; i < n - 1; i++) {
        // Find the minimum element in unsorted array
        min_idx = i;
        barsRef.current.childNodes[min_idx].style.backgroundColor = "green"
        for (j = i + 1; j < n; j++) {
          if (arr[j] < arr[min_idx]) {
            barsRef.current.childNodes[min_idx].style.backgroundColor = "blue"
            await sleep(speed)
            min_idx = j;
            barsRef.current.childNodes[min_idx].style.backgroundColor = "green"
          } else {
            barsRef.current.childNodes[j].style.backgroundColor = "red"
            await sleep(speed)
            barsRef.current.childNodes[j].style.backgroundColor = "blue"
          }
        }

        // Swap the found minimum element with the first element
        var temp = arr[min_idx]
        arr[min_idx] = arr[i]
        barsRef.current.childNodes[min_idx].style.backgroundColor = "blue"
        arr[i] = temp
        setNumbersToSort([...arr])
      }
      setIsSorting(false)
      setIsSorted(true)
      for (var index = 0; index < arr.length; index++) {
        barsRef.current.childNodes[index].style.backgroundColor = "green"
      }
    }
  }

  //Conducts a insertion sort on an array
  const insertionSort = async (arr, n) => {
    if (isSorting === false) {
      let i, key, j;
      for (i = 1; i < n; i++) {
        key = arr[i];
        barsRef.current.childNodes[i].style.backgroundColor = "green"
        j = i - 1;
        /* Move elements that are 
        greater than key, to one position ahead 
        of their current position */
        while (j >= 0 && arr[j] > key) {
          barsRef.current.childNodes[j].style.backgroundColor = "red"
          await sleep(speed)
          arr[j + 1] = arr[j];
          barsRef.current.childNodes[j].style.backgroundColor = "blue"
          j = j - 1;
          setNumbersToSort([...arr])
        }
        arr[j + 1] = key;
        setNumbersToSort([...arr])
      }
      setIsSorting(false)
      setIsSorted(true)
      for (var index = 0; index < arr.length; index++) {
        barsRef.current.childNodes[index].style.backgroundColor = "green"
      }
    }
  }


  //Handles changing the value of the length slider
  const handleLengthChange = (event, newValue) => {
    if (isSorted === true) {
      for (var i = 0; i < numbersToSort.length; i++) {
        barsRef.current.childNodes[i].style.backgroundColor = "blue"
      }
    }
    setLengthOfArray(newValue);
  };

  //Handles changing the value of the speed slider
  const handleSpeedChange = (event, newValue) => {
    if (newValue === 1) {
      setSpeed(100)
    } else if (newValue === 2) {
      setSpeed(20);
    } else {
      setSpeed(0)
    };
  };

  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "200px", paddingLeft: "200px", backgroundColor: "grey", height: "180px" }}>
        <button onClick={() => { if (isSorted === false) { bubbleSort(numbersToSort); setIsSorting(true); } }} style={{ marginRight: "80px", marginTop: "18px", padding: "20px", borderRadius: "10px", borderStyle: "solid" }} >Bubble Sort</button>
        <button onClick={() => { if (isSorted === false) { selectionSort(numbersToSort, numbersToSort.length); setIsSorting(true); } }} style={{ marginRight: "80px", marginTop: "18px", padding: "20px", borderRadius: "10px", borderStyle: "solid" }} >Selection Sort</button>
        <button onClick={() => { if (isSorted === false) { insertionSort(numbersToSort, numbersToSort.length); setIsSorting(true); } }} style={{ marginRight: "80px", marginTop: "18px", padding: "20px", borderRadius: "10px", borderStyle: "solid" }} >Insertion Sort</button>
        <div style={{ width: "20%" }}>
          <h2>Speed</h2>
          <Slider defaultValue={5} aria-label="Default" valueLabelDisplay="auto" onChange={handleSpeedChange} min={1} max={3} />
        </div>
        <div style={{ width: "40%", marginLeft: "80px" }}>
          <h2>Length</h2>
          <Slider defaultValue={40} aria-label="Default" valueLabelDisplay="auto" onChange={handleLengthChange} min={20} max={100} />
        </div>

      </div>


      {/* Displays list of styled bar's  */}
      <ul ref={barsRef} style={{ display: "flex", justifyContent: "center", marginLeft: "-40px" }}>
        {numbersToSort.map((number, index) => (
          < div key={index} style={{ backgroundColor: 'blue', width: "15px", height: `${3 * number}px`, margin: "2px" }}></div>
        ))
        }
      </ul >



    </div >
  );
}

export default App;
