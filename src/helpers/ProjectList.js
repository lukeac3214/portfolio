import graph from '../assets/graph.jpg';
import sort from '../assets/sorting.png';
import dnb from '../assets/dnb.png'
import SortingVisualizer from '../components/SortingVisualizer';
import PathFindingVisualizer from '../components/PathFindingVisualizer';
import GameGrid from '../dotsnboxes/GameGrid';

export const ProjectList = [
    {
        name: "Path-Finding Algorithm Visualizer",
        image: graph,
        skills: "React, HTML, CSS, NPM, MaterialUI, Graph Theory, Path-Finding Algorithms",
        body: "Interactive Visualizer for various path-finding algorithms.",
        comp: <PathFindingVisualizer />
    },
    {
        name: "Sorting Algorithm Visualizer",
        image: sort,
        skills: "React, HTML, CSS, NPM, MaterialUI, Various Sorting Algorithms",
        body: "Interactive Visualizer for various common sorting algorithms.",
        comp: <SortingVisualizer />
    },
    {
        name: "3-Player Dots and Boxes Game",
        image: dnb,
        skills: "React, HTML, CSS, NPM, MaterialUI",
        body: "This is a 3 player version of https://dotsandboxes.org/ which I created for a University assignment",
        comp: <GameGrid />
    },
]