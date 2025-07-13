import React, { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: {
    className: string;
    ageMin: number | null;
    ageMax: number | null;
    status: string;
  }) => void;
  classOptions: string[];
};

const AdvancedFilterModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onApply,
  classOptions,
}) => {
  const [className, setClassName] = useState('');
  const [ageMin, setAgeMin] = useState<number | null>(null);
  const [ageMax, setAgeMax] = useState<number | null>(null);
  const [status, setStatus] = useState('');

  const handleSubmit = () => {
    onApply({ className, ageMin, ageMax, status });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">Advanced Filters</h2>

        <div className="mb-3">
          <label className="block text-sm font-medium">Class</label>
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">All</option>
            {classOptions.map((cls, idx) => (
              <option key={idx} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        <div className="mb-3 flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium">Age Min</label>
            <input
              type="number"
              value={ageMin ?? ''}
              onChange={(e) => setAgeMin(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded"
              placeholder="Min"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Age Max</label>
            <input
              type="number"
              value={ageMax ?? ''}
              onChange={(e) => setAgeMax(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded"
              placeholder="Max"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Banned">Banned</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilterModal;
