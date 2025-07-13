import React, { useEffect, useMemo, useState } from 'react';
import AdvancedFilterModal from '../../filters/AdvancedFilterModal';
import { DataStudents } from '../../../utils/type-request';

type Props = {
  data : DataStudents[];
  meta: Meta;
  onCreate: () => void;
  setMeta: (data: Meta) => void;
};

type Meta = {
  limit: number;
  page: number;
  total: number;
}
const classOptions = ['Class A', 'Class B', 'Class C'];

const DataTable: React.FC<Props> = ({ data, meta,setMeta, onCreate }) => {
  console.log(data)
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof DataStudents>('_id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  


  const pageSize = 15;
  const totalPages = Math.ceil(meta.total / pageSize);

  const toggleSort = (key: keyof DataStudents) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const values = Object.values(row).join(' ').toLowerCase();
      return values.includes(search.toLowerCase());
    });
  }, [data, search]);

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    return sortOrder === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };
    const [filters, setFilters] = useState<{
      className: string;
      ageMin: number | null;
      ageMax: number | null;
      status: string;
    }>({ className: '', ageMin: null, ageMax: null, status: '' });

  const handleExport = ()=>{

  }

  const handleImport =()=>{

  }

  const onViewDetail = ()=>{

  }

  const onEdit = ()=>{

  }

  const onDelete = ()=>{

  }

  const  PrevPage =()=>{
    setMeta({...meta, page: (meta.page - 1)})
    
  }

  const  NextPage =()=>{
    setMeta({...meta, page : (meta.page + 1) })
  }

  return (
    <div className="p-4 border rounded-xl bg-white dark:bg-white/[0.02] overflow-auto">
      <div className="flex justify-between mb-4">
      <div className="flex items-center">
          <h2 className="text-xl font-semibold">Students</h2>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset to page 1 on new search
            }}
            className="mt-2 ml-2 px-3 py-1.5 border rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onCreate}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create New Record
          </button>
        <button
            onClick={handleExport}
            className="px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          >
            Export Excel
          </button>

          <button
            onClick={handleImport}
            className="px-3 py-1.5 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Import Excel
          </button>
          <button
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => setModalOpen(true)}
        >
          Advanced Filters
        </button>

          

          
        </div>
        
      </div>

      <table className="min-w-[800px] w-full text-left border border-gray-200 dark:border-white/[0.05]">
        <thead className="bg-gray-100 dark:bg-white/[0.05]">
          <tr>
            <th className="px-4 py-3">
              <input
                type="checkbox"
                checked={selectedIds.length === data.length}
                onChange={() =>
                  setSelectedIds(
                    selectedIds.length === data.length ? [] : data.map(d => d._id)
                  )
                }
              />
            </th>
            {[ 'name', 'email', 'age', 'CodeId',"actions"].map((key) => (
              <th
                key={key}
                className="px-4 py-3 cursor-pointer text-gray-600 dark:text-gray-300"
                onClick={() => toggleSort(key as keyof DataStudents)}
              >
                {key.toUpperCase()} {sortKey === key ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row._id} className="border-t border-gray-100 dark:border-white/[0.05]">
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(row._id)}
                  onChange={() => toggleSelect(row._id)}
                />
              </td>
              <td className="px-4 py-2">{row.username}</td>
              <td className="px-4 py-2">{row.email}</td>
              <td className="px-4 py-2">{row.age}</td>
              <td className="px-4 py-2">{row.codeId}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onViewDetail()}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit()}
                  className="text-yellow-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete()}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AdvancedFilterModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onApply={setFilters}
        classOptions={classOptions}
      />
          

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Page {meta.page} of {totalPages}
        </p>
        <div className="space-x-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={PrevPage}
            disabled={meta.page === 1}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={NextPage}
            disabled={meta.page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
