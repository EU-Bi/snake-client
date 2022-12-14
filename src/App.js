import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouting from './componenst/AppRouting';
import NavBar from './componenst/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouting/>
    </BrowserRouter>
  );
}

export default App;
