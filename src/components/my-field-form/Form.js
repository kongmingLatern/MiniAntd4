import FieldContext from "./FieldContext";

export default function Form({children, form}){
  return (
    <form>
      <FieldContext.Provider value={form}>
        {children}
      </FieldContext.Provider>
     </form>
  ) 
}
