import React, { ChangeEvent, createRef } from 'react';
import { Form } from 'react-bootstrap';
import { IMaskInput } from 'react-imask';

interface InputProps {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  mask?: string;
  value?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  label,
  placeholder,
  handleChange,
  required,
  isInvalid,
  errorMessage,
  mask,
  value,
}) => {
    const inputRef = createRef<HTMLInputElement>()

    const handleAccept = (value: string) => {
        const event = new Event('input', { bubbles: true }) as unknown as React.ChangeEvent<HTMLInputElement>
        Object.defineProperty(event, 'target', {
          writable: false,
          value: { name, value }
        })
        handleChange(event)
      }
  return (
    <div>
      <Form.Label>{label}</Form.Label>
      {mask ? (
        <Form.Control 
        as={IMaskInput}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        isInvalid={isInvalid}
        onAccept={handleAccept}
        mask={mask}
        inputRef={inputRef}
      />
      ) : (
        <Form.Control
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          isInvalid={isInvalid}
        />
      )}
      {isInvalid && <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>}
    </div>
  );
};

export default Input;
