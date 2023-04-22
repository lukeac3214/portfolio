import React, { Component } from 'react'
import '../styles/DotsNBoxes.css'
const circleRadius = 0.25
const strokeWidth = 0.5
const defaultColor = "black"

// Grid takes onMouseDown, height, width, and text size as props and uses them to display the grid
export default class Grid extends Component {
  render() {
    const {
        onMouseDown,
        height,
        width,
        textSize
    } = this.props
  

  return(
    <svg
        height={height} width={width}
        viewBox="0 0 17 17"
        xmlns="<http://www.w3.org/2000/svg>"
      >
        {/* text for completed squares */}
        <text id="square1" textAnchor="middle" x="3.5" y="3.5" fontSize={textSize}></text>
        <text id="square2" textAnchor="middle" x="8.5" y="3.5" fontSize={textSize}></text>
        <text id="square3" textAnchor="middle" x="13.5" y="3.5" fontSize={textSize}></text>

        <text id="square4" textAnchor="middle" x="3.5" y="8.5" fontSize={textSize}></text>
        <text id="square5" textAnchor="middle" x="8.5" y="8.5" fontSize={textSize}></text>
        <text id="square6" textAnchor="middle" x="13.5" y="8.5" fontSize={textSize}></text>

        <text id="square7" textAnchor="middle" x="3.5" y="13.5" fontSize={textSize}></text>
        <text id="square8" textAnchor="middle" x="8.5" y="13.5" fontSize={textSize}></text>
        <text id="square9" textAnchor="middle" x="13.5" y="13.5" fontSize={textSize}></text>


        {/* first row of lines */}
        <line
          className='gameline'
          id='line1'
          strokeWidth={strokeWidth}
          x1="1" y1="1" x2="6" y2="1" 
          stroke={defaultColor}
          strokeOpacity={0}
          onClick={() => onMouseDown('line1')}>
        </line>
        
        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="6" y1="1" x2="11" y2="1" 
          stroke={defaultColor}
          id='line2'
          strokeOpacity={0}
          onClick={() => onMouseDown('line2')}>
        </line>

        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="11" y1="1" x2="16" y2="1" 
          stroke={defaultColor}
          id='line3'
          strokeOpacity={0}
          onClick={() => onMouseDown('line3')}>
        </line>

    
        {/* second row of lines */}
        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="1" y1="1" x2="1" y2="6" 
          stroke={defaultColor}
          id='line4'
          strokeOpacity={0}
          onClick={() => onMouseDown('line4')}>
        </line>

        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="6" y1="1" x2="6" y2="6" 
          stroke={defaultColor}
          id='line5'
          strokeOpacity={0}
          onClick={() => onMouseDown('line5')}>
        </line>

        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="11" y1="1" x2="11" y2="6" 
          stroke={defaultColor}
          id='line6'
          strokeOpacity={0}
          onClick={() => onMouseDown('line6')}>
        </line>

        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="16" y1="1" x2="16" y2="6" 
          stroke={defaultColor}
          id='line7'
          strokeOpacity={0}
          onClick={() => onMouseDown('line7')}>
        </line>
  
  
        {/* third row of lines */}
        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="1" y1="6" x2="6" y2="6" 
          stroke={defaultColor}
          id='line8'
          strokeOpacity={0}
          onClick={() => onMouseDown('line8')}>
        </line>

        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="6" y1="6" x2="11" y2="6" 
          stroke={defaultColor}
          id='line9'
          strokeOpacity={0}
          onClick={() => onMouseDown('line9')}>
        </line>

        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="11" y1="6" x2="16" y2="6" 
          stroke={defaultColor}
          id='line10'
          strokeOpacity={0}
          onClick={() => onMouseDown('line10')}>
        </line>

  
        {/* fourth row of lines */}
        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="1" y1="6" x2="1" y2="11" 
          stroke={defaultColor}
          id='line11'
          strokeOpacity={0}
          onClick={() => onMouseDown('line11')}>
        </line>

        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="6" y1="6" x2="6" y2="11" 
          stroke={defaultColor}
          id='line12'
          strokeOpacity={0}
          onClick={() => onMouseDown('line12')}>
        </line>

        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="11" y1="6" x2="11" y2="11" 
          stroke={defaultColor}
          id='line13'
          strokeOpacity={0}
          onClick={() => onMouseDown('line13')}>
        </line>

        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="16" y1="6" x2="16" y2="11" 
          stroke={defaultColor}
          id='line14'
          strokeOpacity={0}
          onClick={() => onMouseDown('line14')}>
        </line>
  

        {/* fifth row of lines */}
        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="1" y1="11" x2="6" y2="11" 
          stroke={defaultColor}
          id='line15'
          strokeOpacity={0}
          onClick={() => onMouseDown('line15')}>
        </line>

        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="6" y1="11" x2="11" y2="11" 
          stroke={defaultColor}
          id='line16'
          strokeOpacity={0}
          onClick={() => onMouseDown('line16')}>
        </line>

        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="11" y1="11" x2="16" y2="11" 
          stroke={defaultColor}
          id='line17'
          strokeOpacity={0}
          onClick={() => onMouseDown('line17')}>
        </line>


        {/* sixth row of lines */}
        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="1" y1="11" x2="1" y2="16" 
          stroke={defaultColor}
          id='line18'
          strokeOpacity={0}
          onClick={() => onMouseDown('line18')}>
        </line>

        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="6" y1="11" x2="6" y2="16" 
          stroke={defaultColor}
          id='line19'
          strokeOpacity={0}
          onClick={() => onMouseDown('line19')}>
        </line>

        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="11" y1="11" x2="11" y2="16" 
          stroke={defaultColor}
          id='line20'
          strokeOpacity={0}
          onClick={() => onMouseDown('line20')}>
        </line>

        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="16" y1="11" x2="16" y2="16" 
          stroke={defaultColor}
          id='line21'
          strokeOpacity={0}
          onClick={() => onMouseDown('line21')}>
        </line>
  

        {/* seventh row of lines */}
        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="1" y1="16" x2="6" y2="16" 
          stroke={defaultColor}
          id='line22'
          strokeOpacity={0}
          onClick={() => onMouseDown('line22')}>
        </line>

        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="6" y1="16" x2="11" y2="16" 
          stroke={defaultColor}
          id='line23'
          strokeOpacity={0}
          onClick={() => onMouseDown('line23')}>
        </line>

        <line
          className='gameline'
          strokeWidth={strokeWidth}
          x1="11" y1="16" x2="16" y2="16" 
          stroke={defaultColor}
          id='line24'
          strokeOpacity={0}
          onClick={() => onMouseDown('line24')}>
        </line>

        {/* first row of circles */}
        <circle
          cx="1" cy="1" r={circleRadius}
          strokeWidth={strokeWidth} 
          stroke={defaultColor}
          fill="none"
        />

        <circle
          cx="6" cy="1" r={circleRadius}
          strokeWidth={strokeWidth} 
          stroke={defaultColor}
          fill="black"
        />

        <circle
          cx="11" cy="1" r={circleRadius}
          strokeWidth={strokeWidth} 
          stroke={defaultColor}
          fill="none"
        />

        <circle
          cx="16" cy="1" r={circleRadius}
          strokeWidth={strokeWidth} 
          stroke={defaultColor}
          fill="none"
        />


        {/* second row of circles */}
        <circle
          cx="1" cy="6" r={circleRadius}
          strokeWidth={strokeWidth} 
          stroke={defaultColor}
          fill="none"
        />

        <circle
          cx="6" cy="6" r={circleRadius}
          strokeWidth={strokeWidth} 
          stroke={defaultColor}
          fill="none"
        />

        <circle
          cx="11" cy="6" r={circleRadius}
          strokeWidth={strokeWidth} 
          stroke={defaultColor}
          fill="none"
        />

        <circle
          cx="16" cy="6" r={circleRadius}
          strokeWidth={strokeWidth} 
          stroke={defaultColor}
          fill="none"
        />

        {/* third row of circles */}
        <circle
          cx="1" cy="11" r={circleRadius}
          strokeWidth={strokeWidth} 
          stroke={defaultColor}
          fill="none"
        />

        <circle
          cx="6" cy="11" r={circleRadius}
          strokeWidth={strokeWidth} 
          stroke={defaultColor}
          fill="none"
        />

        <circle
          cx="11" cy="11" r={circleRadius}
          strokeWidth={strokeWidth} 
          stroke={defaultColor}
          fill="none"
        />

        <circle
          cx="16" cy="11" r={circleRadius}
          strokeWidth={strokeWidth} 
          stroke={defaultColor}
          fill="none"
        />


        {/* fourth row of circles */}
        <circle
          cx="1" cy="16" r={circleRadius}
          strokeWidth={strokeWidth} 
          stroke={defaultColor}
          fill="none"
        />

        <circle
          cx="6" cy="16" r={circleRadius}
          strokeWidth={strokeWidth} 
          stroke={defaultColor}
          fill="none"
        />

        <circle
          cx="11" cy="16" r={circleRadius}
          strokeWidth={strokeWidth} 
          stroke={defaultColor}
          fill="none"
        />

        <circle
          cx="16" cy="16" r={circleRadius}
          strokeWidth={strokeWidth} 
          stroke={defaultColor}
          fill="none"
        />

      </svg>
  )
  }
}
