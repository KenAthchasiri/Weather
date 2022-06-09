import { useEffect, useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import './App.css'

function App() {
  const [name,setName] = useState('bangkok')
  const [nameInput,setNameInput] = useState('')
  const [error, setError] = useState('')

  const [city, setCity] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [dataStatus,setDataStatus] = useState(false)
  
  
  
  const apiKey = 'aa41dc60c6f0f116a4e0758b4b603544'

  const covertTemp = (k) => {
    return (k-273).toFixed()
  }

  const searchCity = (e) => {
    e.preventDefault()
    setName(nameInput)
    if(nameInput === '') {
      setError('กรุณาป้อนเมืองที่ตามหา')
    }else if (nameInput !== ''){
      setError('ไม่พบเมืองที่คุณตามหา')
    }
    setNameInput('')

  }

  useEffect(()=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`
    fetch(url)
      .then(res=>res.json())
      .then(data=>{
        setCity(data)
        console.log(data);
        setIsLoading(true)
        if(data.cod === '404' || data.cod === '400') {
          setDataStatus(false)
        } else {
          setDataStatus(true)
        }
      })

  },[name])
  

  return (
    
      <div className='App'>
        <form className='search' onSubmit={searchCity}>
          <button type='submit' className='search-btn'><AiOutlineSearch/></button>
          <input className='search-bar'  type="text" placeholder='Search..' value={nameInput} onChange={(e)=>setNameInput(e.target.value)}/>
        </form>
        { isLoading && dataStatus &&
          <section>
            <div className='location'>
              <h1 className='city'>{city.name}</h1>
              <p className='state'>{city.sys.country}</p>
            </div>
            <div className='card'>
              <div className='weather'>
                <h1>{covertTemp(city.main.temp)}&deg;C</h1>
                <small>สูงสุด: {covertTemp(city.main.temp_max)}&deg;C , ต่ำสุด: {covertTemp(city.main.temp_min)}&deg;C</small>
              </div>
              <div className='info'>
                <div className='status'>{city.weather[0].main}</div>
                <div className='humidity'>ความชื้น: {city.main.humidity}</div>
                <div className='wind'>ความเร็วลม: {city.wind.speed}</div>
              </div>
            </div>
          </section> 
        }
        {!dataStatus && 
          <div className='error'>{error}</div> 
        }
      </div>
    
  )
}

export default App
