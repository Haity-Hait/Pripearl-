import { useState } from 'react';

const useSelectableInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const handleSelect = (selectedValue) => {
    setValue(selectedValue);
  };

  const handleCancel = () => {
    setValue('');
  };

  return { value, handleSelect, handleCancel };
};

export default useSelectableInput;
