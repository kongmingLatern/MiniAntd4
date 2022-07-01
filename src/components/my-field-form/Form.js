import FieldContext from "./FieldContext";

export default function Form({ children, form }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.submit()
      }}>
      <FieldContext.Provider value={form}>
        {children}
      </FieldContext.Provider>
    </form>
  )
}
