import { useState } from "react"

function App() {
  const [color, setColor] = useState("olive")
  return (
    <div style={{backgroundColor: color}} id="body_div">
      <div id="inner-div">
        <button style={{backgroundColor: "red"}} onClick={() => {setColor("red")}}>Red</button>
        <button style={{backgroundColor: "green"}} onClick={() => {setColor("green")}}>Green</button>
        <button style={{backgroundColor: "blue"}} onClick={() => {setColor("blue")}}>Blue</button>
        <button style={{backgroundColor: "orange"}} onClick={() => {setColor("orange")}}>Orange</button>
        <button style={{backgroundColor: "yellow"}} onClick={() => {setColor("yellow")}}>Yellow</button>
        <button style={{backgroundColor: "yellow"}} onClick={() => {setColor("yellow")}}>Yellow</button>
        <button style={{backgroundColor: "yellow"}} onClick={() => {setColor("yellow")}}>Yellow</button>
        <button style={{backgroundColor: "yellow"}} onClick={() => {setColor("yellow")}}>Yellow</button>
        
      </div>
    </div>
  )
}

export default App
