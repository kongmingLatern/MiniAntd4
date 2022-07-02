import useForm from "./useForm"
import Field from './Field'
import _Form from "./Form"
import React from "react"

// const Form = _Form
const Form = React.forwardRef(_Form)
Form.Field = Field
Form.useForm = useForm

export {
  useForm,
  Field
}

export default Form