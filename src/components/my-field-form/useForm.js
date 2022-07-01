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
    }
    console.log("this.store", this.store);
    // 2. update Field
    this.fieldEntities.forEach(entity => {
      Object.keys(newStore).forEach(k => {
        if (k === entity.props.name) {
          entity.onStoreChange()
        }
      })
    })
  }

  setCallbacks = (callbacks) => {
    this.callbacks = { callbacks, ...this.callbacks }
  }

  submit = () => {
    // 提交
    console.log('提交');
  }

  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      registerFieldEntities: this.registerFieldEntities,
      submit: this.submit
    }
  }
}
export default function useForm() {
  // 存值，在组件卸载之前指向的都是同一个值
  const formRef = useRef()

  if (!formRef.current) {
    const formStore = new FormStore()
    formRef.current = formStore
  }

  return [formRef.current]
};