import { InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { languages } from 'utils/translation'

const CustomSelect = ({
  label,
  labelClasses,
  value,
  handleChange,
  length,
  containerClasses,
  options = [],
  disabled,
  selectClassNames = '',
  iconComponent = '',
}) => {
  return (
    <div className={`${containerClasses}`}>
      <InputLabel shrink className={labelClasses}>
        {label}
      </InputLabel>
      <Select
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className={`${selectClassNames}`}
        disabled={disabled}
        IconComponent={iconComponent}
        sx={{
          '.MuiSelect-select': {
            width: 76,
          },
        }}
      >
        {options.length
          ? options.map((option) => (
              <MenuItem key={option} value={option}>
                <div>
                  <span className='pr-[7px]'>{languages[option].icon}</span>
                  {option}
                </div>
              </MenuItem>
            ))
          : Array.from({
              length,
            }).map((_, i) => (
              <MenuItem key={i} value={i + 1}>
                {i + 1}
              </MenuItem>
            ))}
      </Select>
    </div>
  )
}

export default CustomSelect
