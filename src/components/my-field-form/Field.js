import React, {
  Component
} from 'react'
import FieldContext from './FieldContext'

export default class Field extends Component {
  static contextType = FieldContext

  componentDidMount() {
    this.unregister = this.context.registerFieldEntities(this)
  }

  componentWillUnmount() {
    this.unregister()
  }

  onStoreChange = () => {
    this.forceUpdate()
  }

  getControlled = () => {
    const {
      getFieldValue,
      setFieldsValue
    } = this.context
    const {
      name
    } = this.props
    return {
      // getState
      value: getFieldValue(name),
      onChange: (e) => {
        const newValue = e.target.value
        // setState
        setFieldsValue({
          [name]: newValue
        })
      }
    }
  }

  render() {
    const {
      children
    } = this.props
    const returnChildNode = React.cloneElement(children, this.getControlled())
    return returnChildNode
  }
}