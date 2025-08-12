import { useState, useEffect, useRef } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  searchSelect: string;
  defaultValue?: string;
  setSearchSelect:(value: string) => void;
}

const SearchableSelect: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
  setSearchSelect,
  searchSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(
    options.find((opt) => opt.value === defaultValue)?.label || ""
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    setSelectedLabel(option.label);
    setSearchText("");
    setIsOpen(false);
    onChange(option.value);
  };

  return (
    <div className={`relative w-full ${className}`} ref={wrapperRef}>
      {/* Trigger box */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-11 w-full cursor-pointer rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm shadow-theme-xs text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
      >
        {selectedLabel || placeholder}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full border-none px-4 py-2 text-sm outline-none bg-white dark:bg-gray-800 dark:text-white/90"
            value={searchSelect}
            onChange={(e) => setSearchSelect(e.target.value)}
            autoFocus
          />
          {/* Filtered options */}
          <ul className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                attr-id={option.value}
              >
                {option.label}
              </li>
            ))}
            {options.length === 0 && (
              <li className="px-4 py-2 text-sm text-gray-400 dark:text-gray-500">
                No results
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
