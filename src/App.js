import React from 'react';
import ScreenshotGenerator from "./ScreenshotGenerator/ScreenshotGenerator";
import './App.css';
import Template from "./ScreenshotGenerator/Template";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {bgColor: '#e66465'}
    this.imageSelected = this.imageSelected.bind(this)
  }

  imageSelected(event) {
    let state = { image: URL.createObjectURL(event.target.files[0]) }
    let templateSelector = this.refs.templateSelector
    switch (templateSelector.selectedIndex) {
      // case 0:
      //   state.template = Template.IPHONE_1
      //   break
      // case 1:
      //   state.template = Template.IPHONE_2
      //   break
      case 0:
        state.template = Template.IPHONE_TRANSPARENT
        break
    }
    this.setState(state)
  }

  colorSelected = (e) => {
    this.setState({bgColor: e.target.value})
  }

  render() {
    let { image, bgColor } = this.state
    if (image)
      return (
        <div className="App">
          <header className="App-header">
            <ScreenshotGenerator image={image} template={this.state.template} bgColor={bgColor} />
            <div style={{zIndex: 10}}>
              <input
                type="color"
                id="bgColorPicker"
                name="bgColor"
                value={this.state.bgColor}
                onChange={this.colorSelected} />
              <label for="Background">Head</label>
            </div>
          </header>
        </div>
      );
    else
      return (
        <div className="App">
          <header className="App-header">
            <select name="templates" ref="templateSelector">
              {/* <option value="iphone1">iPhone Template 1</option>
              <option value="iphone2">iPhone Template 2</option> */}
              <option value="iphone2">iPhone Transparent Template</option>
            </select>
            <input type='file' onChange={this.imageSelected} accept="image/*" />
          </header>
        </div>
      );
  }

}

export default App;
