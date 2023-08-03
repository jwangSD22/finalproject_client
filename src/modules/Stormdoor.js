import React, { useState } from 'react'
import './stormdoor.css'
import stormdoor from '../images/stormdoor_transparent.png'


function Stormdoor() {

  const [color,setColor] = useState('#ffffff')

  const handleColorChange = (color) => {
    setColor(color)
  }

  return (
    <>
    <div className='background' style={{backgroundColor:color}}>
    <img src={stormdoor}></img>
    <div>
      <h1>Pick color</h1>
      <label htmlFor='colorPicker'>    <input name='colorPicker' type="color" value={color} onChange={(e) => handleColorChange(e.target.value)} />
      </label>
    </div>

    </div>
    </>
  )
}

export default Stormdoor
