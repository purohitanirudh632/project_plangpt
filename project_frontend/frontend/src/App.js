import logo from './logo.svg';
import './App.css';
import Demo from './components/demo';
import Nav from './components/nav';
import Home from './components/home';
function App() {
  return (
    <div className="App">
      <Nav />
      {/* <Home /> */}
      <Demo />
    </div>
  );
}

export default App;
