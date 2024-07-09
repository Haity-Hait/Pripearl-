import React from 'react';

import { TextField, MenuItem, IconButton } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';

import useSelectableInput from './useSelect';

const SelectableInput = ({ options, onChange }) => {
  const { value, handleSelect, handleCancel } = useSelectableInput();

  const handleChange = (event) => {
    const selectedValue = event.target.value;

    handleSelect(selectedValue);

    if (onChange) {
      onChange(event); // Call the passed onChange handler
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        select
        label="Select an option"
        value={value}
        onChange={handleChange}
        style={{ flexGrow: 1 }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {value && (
        <IconButton onClick={handleCancel}>
          <ClearIcon />
        </IconButton>
      )}
    </div>
  );
};

export default SelectableInput;
