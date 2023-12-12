import { useState, useCallback, useEffect, useRef } from "react";

 export default function App() {
  const [length, setLength] = useState(false);
  const [number, setNumber] = useState(false);
  const [charallow, setCharalow] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef =useRef(null)



  const passwordgenetor = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (charallow) str += "?{}[]!@#$%^&*_-+~ ";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, setPassword, charallow]);

  const copypasswordtoclip = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,50)
    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(()=>{
    passwordgenetor();
  },[length,charallow,number,passwordgenetor])


  return (
    <>
      <div className="w-full max-w-4xl  h-40 mx-auto text-center shadow-md rounded-lg px-4  my-8 text-orange-500 bg-gray-800">
        <h3 className="text-3xl text-center my-4 text-white">password generetor</h3>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef }
          />
          <button className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0  " onClick={copypasswordtoclip}>Copy</button>
        </div>
       <div className="flex text-sm gap-x-2">
        <div className="flex  items-center gap-x-1">
          <input type="range" 
          min={5}
          max={30}
          value={length}
          className="cursor-pointer"
          onChange={(e)=> {setLength(e.target.value)}}
          />
          <label > length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked={number}
          id="numberInput"
          onChange={()=>{setNumber((prev)=>!prev);
          }}
          />
          <label htmlFor="numberInput">Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked={charallow}
          id="charInput"
          onChange={()=>{setCharalow((prev)=>!prev);
          }}
          />
          <label htmlFor="numberInput">Charecters</label>
          </div>
       </div>

      </div>
    </>
  );
}

// export default App;
