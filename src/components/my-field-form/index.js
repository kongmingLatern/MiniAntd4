import useForm from "./useForm"
import Field from './Field'
import _Form from "./Form"

const Form = _Form
Form.Field = Field
Form.useForm = useForm

export {
  useForm,
  Field
}

export default Form