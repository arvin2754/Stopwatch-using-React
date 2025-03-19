import { useState } from 'react';
import './App.css';

function App() {
  const [show, setShow] = useState(false);
  const [items, setItems] = useState({ hours: 0, min: 0, sec: 0, ms: 0 });
  const [id, setId] = useState(null);
  const [data,setData]=useState([]);
  const timer = () => {
    const idss = setInterval(() => {
      setItems((prev) => {
        let { hours, min, sec, ms } = prev;
        ms += 10;

        if (ms === 1000) {
          ms = 0;
          sec += 1;
        }
        if (sec === 60) {
          sec = 0;
          min += 1;
        }
        if (min === 60) {
          min = 0;
          hours += 1;
        }
        if (hours === 24) {
          hours = 0;
        }

        return { hours, min, sec, ms };
      });
    }, 10);

    setId(idss); 
  };

  const stop = () => {
    clearInterval(id);
  };

  const reset = () => {
    stop();
    setItems({ hours: 0, min: 0, sec: 0, ms: 0 }); 
    setData([]);
    setShow(false);
  };

  const laps=()=>{
    setData((prev)=>[items,...prev]);
  }

  


  return (
    <div className='mains'>
      <div className='mains2'>
        <div className='fontSize'>
          <span>{String(items.hours).padStart(2, '0')}</span>:
          <span>{String(items.min).padStart(2, '0')}</span>:
          <span>{String(items.sec).padStart(2, '0')}</span>:
          <span>{String(Math.floor(items.ms / 10)).padStart(2, '0')}</span>
          
        </div>

        {show ? (
          <div className='buttonSpace'>
            <button onClick={() => { laps()}}>Lap</button>
            <button onClick={reset}>Reset</button>
          </div>
        ) : (
          <button onClick={() => { setShow(true); timer(); }}>Start</button>
        )}
      </div>

      
      {data.length !== 0 ? (
  <div className="main2">
    
    {data.slice().reverse().map((d, index) => (
      <p key={index}>
        {index + 1}{"   "}
        {d.hours !== 0 ? `${d.hours}hr:` : ""}
        {String(d.min).padStart(2, '0')}:
        {String(d.sec).padStart(2, '0')}:
        {String(Math.floor(d.ms / 10)).padStart(2, '0')}
      </p>
    ))}
  </div>
) : (
  <div style={{display:"none"}}>
  </div>
)}

      
      
    </div>


  );
}

export default App;
