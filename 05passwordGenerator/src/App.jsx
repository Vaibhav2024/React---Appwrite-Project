import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*(){}[]~`"

    for (let i=1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length,numberAllowed,characterAllowed])


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 20)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed])

  return (
    <>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center text-2xl'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='bg-white outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef}/>
          <button onClick={copyPasswordToClipboard} className='bg-black px-3 text-orange-500 font-bold'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-4 items-center'>
          <input onChange={(e) => {setLength(e.target.value)}} type="range" min={6} max={35} value={length} className='cursor-pointer'/>
          <p className='text-6'>Length ({length})</p>
          <p className='text-6'><input onChange={() => setNumberAllowed((prev) => !prev)} type="checkbox"/> Numbers</p>
          <p className='text-6'><input onChange={() => setCharacterAllowed((prev) => !prev)} type="checkbox"/> Characters</p>
          
        </div>
      </div>
    </>
  )
}

export default App
