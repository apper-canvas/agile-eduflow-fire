import React from 'react'
import Label from '../atoms/Label'
import Input from '../atoms/Input'
import Select from '../atoms/Select'

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  options, // for select type
  rows, // for textarea type
  min, // for number type
  max, // for number type
  inputClassName = '',
  labelClassName = '',
  ...props
}) => {
  const renderInput = () => {
    if (type === 'select') {
      return (
        <Select
          value={value}
          onChange={onChange}
          options={options}
          required={required}
          className={`${inputClassName} focus:ring-secondary`}
          {...props}
        />
      )
    } else if (type === 'textarea') {
      return (
        <Input
          type="textarea"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${inputClassName} focus:ring-primary`}
          {...props}
        />
      )
    } else {
      return (
        <Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          className={`${inputClassName} ${type === 'number' ? 'focus:ring-secondary' : 'focus:ring-primary'}`}
          {...props}
        />
      )
    }
  }

  return (
    <div>
      <Label htmlFor={name} className={labelClassName}>
        {label} {required && '*'}
      </Label>
      {renderInput()}
    </div>
  )
}

export default FormField