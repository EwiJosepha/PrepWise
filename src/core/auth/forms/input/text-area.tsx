import React from 'react';
import { Field } from 'formik';

interface TextareaProps {
  name: string;
  label: string;
}

const Textarea: React.FC<TextareaProps> = (props) => {
  const { name, label, ...rest } = props;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field as='textarea' name={name}  {...rest} />
    </div>
  );
}

export default Textarea;