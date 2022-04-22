import { useState } from "react";

export const useField = (name, type, id = name) => {
  const [value, setValue] = useState("")

  const onChange = event => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue("")
  }

  return {
    name,
    value,
    type,
    id,
    onChange,
    reset
  }
}