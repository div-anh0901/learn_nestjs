import React from 'react';

type Props = {
  classes: string[];
  selectedClass: string;
  onChange: (value: string) => void;
};

const ClassFilter: React.FC<Props> = ({ classes, selectedClass, onChange }) => {
  return (
    <div className="mb-3">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        Filter by Class
      </label>
      <select
        value={selectedClass}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring focus:border-blue-500"
      >
        <option value="">All Classes</option>
        {classes.map((className, index) => (
          <option key={index} value={className}>
            {className}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClassFilter;
