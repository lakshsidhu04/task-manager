import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddTask from './components/AddTask'
import Tasks from './components/Tasks'

function App() {
  const [count , setCount] = useState(0)

  useEffect(() => {
    const storedCount = localStorage.getItem('count');
    if (storedCount) {
      setCount(parseInt(storedCount, 10));
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]);

  return (
    <>
      <AddTask count={count} setCount={setCount}/>
      <Tasks count={count} setCount={setCount}/>
    </>
  )
}

export default App
