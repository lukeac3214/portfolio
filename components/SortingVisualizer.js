import React from 'react';
import { getInsertSortAnimations } from '../SortingAlgorithms/InsertSort.js';
import { getHeapSortAnimations } from '../SortingAlgorithms/HeapSort.js';
import { getQuickSortAnimations } from '../SortingAlgorithms/QuickSort.js';
import { getBubbleSortAnimations } from '../SortingAlgorithms/BubbleSort.js';
import '../styles/SortingVisualizer.css';
import Slider from '@material-ui/core/Slider'
import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';

// valid = true when no sorting/animations are in progress
let valid = true;

// stores animation timers
let timers = [];

// use longer animation delay for smaller screens
let animationSpeedMs = (window.innerWidth < 835) ? 10 : 5;

const PRIMARY_COLOR = "#c90000";
const SECONDARY_COLOR = 'yellow';

const marks = [
    {
        value: 2,
        label: '2ms',
    },
    {
        value: 5,
        label: '5ms',
    },
    {
        value: 10,
        label: '10ms',
    },
    {
        value: 25,
        label: '25ms',
    },
];

export default function SortingVisualizer() {
    const [barArray, setBarArray] = useState([]);

    // on component mount, reset the bar array to default and add window resize listener
    useEffect(() => {
        resetBarArray();
        window.addEventListener('resize', handleResize.bind(this));
        // on component unmount, remove window resize listener and reset the bar array to default
        return () => {
            window.removeEventListener('resize', handleResize.bind(this));
            resetBarArray();
        };
    }, [])


    // on window resize, reset the bar array to fit new window dimensions
    function handleResize() {
        resetBarArray();
    }

    // removes any animations in progress, resets the bar array to default values based on screen size, and resets global vars
    function resetBarArray() {
        //clear all existing timers to end animations and set state
        for (let timer of timers) {
            clearTimeout(timer);
            timer = null;
        }
        timers = [];
        //fill a new, empty array with bars of a random length
        const newBarArray = [];
        for (let i = 0; i < Math.floor(window.innerWidth / 14); i++) {
            newBarArray.push(randomIntFromInterval(5, window.innerHeight / 2));
        }
        // Reverse Sort the list
        // newBarArray.sort(function(a, b){return b - a});
        setBarArray(newBarArray);

        //ensure all bars are reset to primary color
        const arrayBars = document.getElementsByClassName('bar');
        for (let bars of arrayBars) {
            bars.style.backgroundColor = PRIMARY_COLOR;
        }
        valid = true;
    }

    // sort the array and return a list of values compared and swapped, which will be used in the animation
    function quickSort() {
        if (valid) {
            valid = false;
            const animations = getQuickSortAnimations(barArray);
            animateSort(animations);
        }
    }

    // sort the array and return a list of values compared and swapped, which will be used in the animation
    function heapSort() {
        if (valid) {
            valid = false;
            const animations = getHeapSortAnimations(barArray);
            animateSort(animations);
        }
    }

    // sort the array and return a list of values compared and swapped, which will be used in the animation
    function insertSort() {
        if (valid) {
            valid = false;
            const animations = getInsertSortAnimations(barArray);
            animateSort(animations);
        }
    }

    // sort the array and return a list of values compared and swapped, which will be used in the animation
    function bubbleSort() {
        if (valid) {
            valid = false;
            const animations = getBubbleSortAnimations(barArray);
            animateSort(animations);
        }
    }

    // animateSort first changes the color of both bars being compared to the secondary color,
    // then the bars are changed back to their primary color, followed by swapping the two bars by changing their heights
    // this is repeated for every pair of bars that were compared and swapped and stored in the animations array
    function animateSort(animations) {
        for (let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('bar');

            // First, when i % 3 === 0, change both bars color to the secondary color
            // Second, when i % 3 === 1, change both bars color back to primary color
            if (i % 3 !== 2) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOne = bars[barOneIndex].style;
                const barTwo = bars[barTwoIndex].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                timers.push(setTimeout(() => {
                    barOne.backgroundColor = color;
                    barTwo.backgroundColor = color;
                }, i * animationSpeedMs));
                // Then, when i % 3 === 2, swap the bars by changing their heights
            } else {
                timers.push(setTimeout(() => {
                    const [barOneIndex, barOneHeight, barTwoIndex, barTwoHeight] = animations[i];
                    const barOne = bars[barOneIndex].style;
                    const barTwo = bars[barTwoIndex].style;
                    barOne.height = `${barOneHeight}px`;
                    barTwo.height = `${barTwoHeight}px`;
                }, i * animationSpeedMs));
            }
        }
    }

    function handleSliderChange(value) {
        animationSpeedMs = value;
    }

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return (
        <div style={{
            backgroundColor: "white",
            borderRadius: "10px",
            width: 12 * barArray.length
        }}>

            <div className='controls'>
                <Button
                    className='resetBtn'
                    variant='outlined'
                    onClick={() => resetBarArray()}>
                    Reset Bars
                </Button>
                <div className='speedControl' style={{ width: "70% " }} >
                    <div>
                        <h2>Animation Delay</h2>
                    </div>
                    <div className='slider'>
                        <Slider
                            style={{
                                color: "black",
                                fontSize: "10px"
                            }}
                            marks={marks}
                            step={null}
                            defaultValue={(window.innerWidth < 835) ? 10 : 5}
                            min={2}
                            max={25}
                            onChange={(_, value) => handleSliderChange(value)} />
                    </div>
                </div>
                <div className='sort-btns'>

                    <div className='inner-btn-box'>
                        <Button
                            variant='outlined'
                            onClick={() => quickSort()}>
                            Quick Sort
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={() => heapSort()}>
                            Heap Sort
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={() => insertSort()}>
                            Insert Sort
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={() => bubbleSort()}>
                            Bubble Sort
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bar-array">
                {barArray.map((height, id) => (
                    <div
                        className="bar"
                        key={id}
                        style={{
                            backgroundColor: PRIMARY_COLOR,
                            height: `${height}px`,
                        }}>
                    </div>
                ))}
            </div>
        </div>
    );
}