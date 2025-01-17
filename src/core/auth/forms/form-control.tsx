import React from 'react'
import TextInput from '../forms/input/text-input'
import Textarea from './input/text-area'

interface Props {
  control: string,
  name: string,
  label?: string,
  type: string;
  placeholder: string
}

const FormControl: React.FC<Props> = ({control, name, label, placeholder, type,  ...rest}) => {

  switch (control) {
    case "text-input": return <TextInput name={name} label={label}  placeholder={placeholder} type={type}  {...rest} />
    case 'textarea': return <Textarea  label={name} name={name}  {...rest}/>
    default: return null
  }
}

export default FormControl
