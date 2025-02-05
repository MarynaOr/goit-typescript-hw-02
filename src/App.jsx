import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import SearchBar from './component/SearchBar/SearchBar'
import { Toaster } from 'react-hot-toast'











function App() {
const KEY = 'EDQlrnIEQ_NrkKvjtjVS0rM0jqjFEHM6C-Vg9Y-RbyU'
const URL = 'https://api.unsplash.com/'
const [query, setQuery] = useState('nature')
  const [images, setImages] = useState(()=>{
    const savedImage =  localStorage.getItem('images')
return savedImage ? JSON.parse(savedImage) : []
  })
  
  const fetchImg = async() => {
    try{
      const response = await fetch(`${URL}?query=${query}&client_id=${KEY}`)
      const data = await response.json()
      setImages(data.results)
      localStorage.setItem('images', JSON.stringify(data.results))


    } catch (error){
      console.log('error', error);
      
    }
  }
 
  useEffect(() => {
    fetchImg

  }, [query])



  return(<>

 < SearchBar />
 <Toaster/>

  </>)
}

export default App



// 