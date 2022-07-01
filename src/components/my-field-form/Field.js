import { Component } from 'react'

export default class Field extends Component {
  getControlled = () => {
    return {
      // getState
      value: 'omg',

      onChange: (e) => {
        // setState
        const newValue = e.target.value
        console.log('newValue:', newValue);
      }
    }
   }

  render() {
    const { children } = this.props
    return children
  }
}
