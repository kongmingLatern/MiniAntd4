import {
  useRef
} from 'react'
// 定义状态管理库
class FormStore {
  constructor() {
    this.store = {} // 状态值：name: value
    this.fieldEntities = []
    this.callbacks = {}
  }

  // 注册实例(forceUpdate)
  // 注册与取消注册
  // 订阅与取消订阅
  registerFieldEntities = (entity) => {
    this.fieldEntities.push(entity)
    return () => {
      this.fieldEntities = this.fieldEntities.filter(item => item !== entity)
      delete this.store[entity.props.name]
    }
  }

  // get
  getFieldsValue = () => {
    return {
      ...this.store
    }
  }

  getFieldValue = (name) => {
    return this.store[name]
  }

  // set
  setFieldsValue = (newStore) => {
    // 1. update store
    this.store = {
      ...this.store,
      ...newStore
    } // 2. update Field
    this.fieldEntities.forEach(entity => {
      Object.keys(newStore).forEach(k => {
        if (k === entity.props.name) {
          entity.onStoreChange()
        }
      })
    })
  }

  setCallbacks = (callbacks) => {
    // 接收回调函数 onFinish && onFinishFailed
    this.callbacks = { ...this.callbacks, ...callbacks }
  }

  // 校验
  validate = () => {
    let err = []
    // TODO: 校验
    this.fieldEntities.forEach(entity => {

      const { name, rules } = entity.props

      const value = this.getFieldValue(name)
      let rule = rules[0]

      if (rule && rule.required && (value === undefined || value === '')) {
        err.push({ [name]: rule.message }, value)
      }
    })


    return err
  }

  submit = () => {
    // 提交
    const err = this.validate()
    const { onFinish, onFinishFailed } = this.callbacks
    if (err.length === 0) {
      // 校验通过
      onFinish(this.getFieldsValue())
    } else {
      // 校验不通过
      onFinishFailed(err, this.getFieldValue())
    }

  }

  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      registerFieldEntities: this.registerFieldEntities,
      submit: this.submit,
      setCallbacks: this.setCallbacks
    }
  }
}
export default function useForm(form) {
  // 存值，在组件卸载之前指向的都是同一个值
  const formRef = useRef()

  if (!formRef.current) {
    if (form) {
      formRef.current = form
    } else {
      const formStore = new FormStore()
      formRef.current = formStore.getForm()
    }
  }

  return [formRef.current]
};