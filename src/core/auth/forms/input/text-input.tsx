import { ErrorMessage, Field, FieldProps } from 'formik'
import React from 'react'
import TextError from './text-error';

export interface TextInputProps {
  name: string;
  label?: string;
  type: string;
  placeholder: string
}

const TextInput: React.FC<TextInputProps> = ({ name, label, type, placeholder, ...rest }) => {
  return (
    <div className=' flex flex-col'>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <input
            {...field}
            {...rest}
            id={name}
            className='bg-lighter-blue w-full text-sm placeholder-blue-gray font-primary border border-dark-gray rounded-xl px-3 py-2.5 focus:ring-0 focus:border-primary-400 h-12'
            type={type}
            placeholder={placeholder}
          />
        )}    
      </Field>
      <ErrorMessage name={name}>
        {(errorMsg) => <TextError>{errorMsg}</TextError>}
      </ErrorMessage>
    </div>
  )
}

export default TextInput

