import { useEffect, useState } from 'react';

interface SelectUIProps {
  items: { [key: string]: string };
  onChange: (value: string) => void;
}

const SelectUI = ({ onChange, items }: SelectUIProps) => {
  return (
    <select onChange={(e) => onChange(e.target.value)}>
      {Object.entries(items).map(([label, value], i) => (
        <option key={i} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default SelectUI;
