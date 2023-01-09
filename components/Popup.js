import React from 'react'
import '../styles/Popup.css'

function Popup(props) {
        return (props.trigger) ? (
            <div className='popup'>

                <div className="popup-inner">
                    <button className='x-btn' onClick={() => props.setTrigger(false)}>X</button>
                    {props.children}
                    <button className='close-btn' onClick={() => props.setTrigger(false)}>Close</button>
                </div>
            </div>
        ) : "";
}

export default Popup;