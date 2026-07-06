import Select from 'react-select';
import cities from '../data/cities';

const options = cities.map((city) => ({
  value: city,
  label: city,
}));

function CitySelect({ value, onChange, name, placeholder }) {
  const selectedOption =
    options.find((option) => option.value === value) || null;

  return (
    <Select
      options={options}
      value={selectedOption}
      placeholder={placeholder}
      isSearchable
      isClearable
      menuPortalTarget={document.body}
      menuPosition="fixed"
      onChange={(selected) =>
        onChange({
          target: {
            name,
            value: selected ? selected.value : '',
          },
        })
      }
      styles={{
        container: (base) => ({
          ...base,
          width: '100%',
        }),
        control: (base, state) => ({
          ...base,
          width: '100%',
          minHeight: 48,
          borderRadius: 10,
          borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
          boxShadow: state.isFocused
            ? '0 0 0 3px rgba(59,130,246,0.15)'
            : 'none',
          '&:hover': {
            borderColor: '#3b82f6',
          },
        }),

        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? '#DBEAFE' : 'white',
          color: '#1F2937',
          cursor: 'pointer',
        }),

        menu: (base) => ({
          ...base,
          borderRadius: 10,
          zIndex: 9999,
        }),

        menuPortal: (base) => ({
          ...base,
          zIndex: 9999,
        }),
      }}
    />
  );
}

export default CitySelect;
