import React,{ Component } from 'react'

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
    const returnChildNode = React.cloneElement(children, this.getControlled())
    return returnChildNode
  }
}
