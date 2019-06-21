import React from 'react';
import ScreenshotGenerator from "./ScreenshotGenerator/ScreenshotGenerator";
import image from './firefox.jpg'
import './App.css';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ScreenshotGenerator image={image} />
        </header>
      </div>
    );
  }

}

export default App;
