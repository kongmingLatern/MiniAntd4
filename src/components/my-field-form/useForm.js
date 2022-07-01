import { useRef } from 'react'
// 定义状态管理库
class FormStore {
  constructor() {
    this.store = {} // 状态值：name: value
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
  setFieldValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore
    }
    console.log(`store:${this.store}`);
  }


  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldValue: this.setFieldValue
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
 