import React from 'react';
import ScreenshotGenerator from "./ScreenshotGenerator/ScreenshotGenerator";
import './App.css';
import Template from "./ScreenshotGenerator/Template";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.imageSelected = this.imageSelected.bind(this)
  }

  imageSelected(event) {
    let state = { image: URL.createObjectURL(event.target.files[0]) }
    let templateSelector = this.refs.templateSelector
    switch (templateSelector.selectedIndex) {
      case 0:
        state.template = Template.IPHONE_1
        break
      case 1:
          state.template = Template.IPHONE_2
          break
    }
    this.setState(state)
  }

  render() {
    let { image } = this.state
    if (image)
      return (
        <div className="App">
          <header className="App-header">
            <ScreenshotGenerator image={image} template={this.state.template} />
          </header>
        </div>
      );
    else
      return (
        <div className="App">
          <header className="App-header">
            <select name="templates" ref="templateSelector">
              <option value="iphone1">iPhone Template 1</option>
              <option value="iphone2">iPhone Template 2</option>
            </select>
            <input type='file' onChange={this.imageSelected} accept="image/*" />
          </header>
        </div>
      );
  }

}

export default App;
