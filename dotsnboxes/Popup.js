import React from 'react'
import '../styles/DotsNBoxes.css'

// popup will display itself when gameOver is true, otherwise returns "" if false
function Popup(props) {
        return (props.trigger) ? (
            <div className='popup'>
                <div className="popup-inner">
                    {/* set gameover to false when x button is clicked, and close popup */}
                    <button className='x-btn' onClick={() => props.setTrigger(false)}>X</button>
                    {props.children}
                    {/* set gameover to false when close button is clicked, and close popup */}
                    <button className='close-btn' onClick={() => props.setTrigger(false)}>Close</button>
                </div>
            </div>
        ) : "";
}

export default Popup;