import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AdvancedFilterModal from '../../filters/AdvancedFilterModal';
import { DataStudents } from '../../../utils/type-request';
import { useModal } from '../../../hooks/useModal';
import { Modal } from '../../ui/modal';
import Label from '../../form/Label';
import Select from '../../form/Select';
import Input from '../../form/input/InputField';
import DatePicker from '../../form/date-picker';
import Button from '../../ui/button/Button';
import { toast } from 'react-toastify';
import { deleteStudentById, findStudentById, updateStudentById } from '../../../utils/api-axios';


type Props = {
  data : DataStudents[];
  meta: Meta;
  onCreate: () => void;
  setMeta: (data: Meta) => void;
  setFilter:(data: string)=> void;
  filter: string;
  resetPage: ()=> void;
};
type FormData = {
  username: string;
  email: string;
  age?: string;
  address?: string;
  codeId?: string; // so cccd
  phone?: string;
  gender: string;
  birthday: string;
}
type Meta = {
  limit: number;
  page: number;
  total: number;
}
const classOptions = ['Class A', 'Class B', 'Class C'];

const DataTable: React.FC<Props> = ({ data, meta,setMeta, onCreate,setFilter,filter,resetPage }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const [sortKey, setSortKey] = useState<keyof DataStudents>('_id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [idDeleted, setIdDelete] = useState<string>("")
  const [idEdit, setIdEdit] = useState<string>("")
  const optionGender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
   const [form, setForm] = useState<FormData>({
        email: "",
        username: "",
        age: "",
        address: "",
        codeId: "",
        phone: "",
        gender:"",
        birthday: ""
      });

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

   const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setForm((prev) => ({
            ...prev,
            [name]: value,
          }));
        }, []);
   /* const [filters, setFilters] = useState<{
      className: string;
      ageMin: number | null;
      ageMax: number | null;
      status: string;
    }>({ className: '', ageMin: null, ageMax: null, status: '' });*/

  const handleExport = ()=>{

  }

  const handleImport =()=>{

  }

  const onViewDetail = ()=>{

  }

  const fecthStudentById = useCallback((id: string, callback: ()=>{})=>{
      findStudentById(id).then(data =>{
            setForm({
              ...form,
              email: data.email,
              username: data.username,
              address: data.address,
              age:data.age,
              phone: data.phone,
              codeId: data.codeId,
              gender: data.gender,
              birthday: data.birthday
            })
      callback()
    }).catch(err => console.log(err));
  },[])

  

  const onEdit = (id : string)=>{
    fecthStudentById(id, async()=>{
      setIdEdit(id)
    })
    openModal()
  }

  const onDelete = (id: string)=>{
    setConfirmOpen(true);  
    setIdDelete(id)
  }
  const validateForm = (value: FormData , callback: () => void) => {
      let hasError = false;
      const showError = (message: string) => {
        hasError = true;
        toast.error(message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      };
      
        if (value.email == "") showError("Email be wrong or not be empty!");
        if (value.username == "") showError("Username must not be empty!");
        if (value.age == "") showError("Age must not be empty!");
        if (value.birthday =="") showError("Birthday must not be empty!");
        if (value.codeId == "") showError("Code ID must not be empty!");
        if (value.address == "") showError("Address must not be empty!");
        if (value.phone=="") showError("Phone must not be empty!");
      if(!hasError){
  
        callback()
      }else{
        return
      }
     
    };
    const handleEdit = async () => {
      validateForm(form, 
        async () => {
            try{   // Close only on success
              await updateStudentById(idEdit, form);
              resetPage()
              toast.success('Edit student success!', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          } catch (err) {
            toast.error('Edit student failed', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          }
          closeModal()
        }
      )
    };

  const  PrevPage =()=>{
    setMeta({...meta, page: (meta.page - 1)})
    
  }

  const  NextPage =()=>{
    setMeta({...meta, page : (meta.page + 1) })
  }

  const confirmDelete = ()=>{
    deleteStudentById(idDeleted).then(data =>{
      toast.success('Delete student success!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        resetPage()
        setConfirmOpen(false)
    }).catch(err => 
    {
      toast.error('Delete student failed', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setConfirmOpen(false)
    }
    
    )


  }

  return (
    <div className="p-4 border rounded-xl bg-white dark:bg-white/[0.02] overflow-auto">
      <div className="flex justify-between mb-4">
      <div className="flex items-center">
          <h2 className="text-xl font-semibold">Students</h2>
          <input
            type="text"
            placeholder="Search..."
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setMeta({...meta, page: 1})
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
          {sortedData.map(row => (
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
                  onClick={() => onEdit(row._id)}
                  className="text-yellow-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(row._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    {/*  <AdvancedFilterModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onApply={setFilters}
        classOptions={classOptions}
        
      />*/}
          

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

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[1300px] m-4">
        <div className="no-scrollbar relative w-full max-w-[1300px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Student Information
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Username</Label>
                    <Input type="text"  name="username"  onChange={handleChange} value={form.username}/>
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Gender</Label>
                    <Select
                      options={optionGender}
                      placeholder="Select an Gender"
                      defaultValue={form.gender}
                      onChange={(value) => setForm({...form, gender: value})}
                      className="dark:bg-dark-900"
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <DatePicker
                      id="date-picker"
                      label="Brithday"
                      placeholder="Select a date"
                      defaultDate={form.birthday}
                      onChange={(dates, currentDateString) => {
                        // Handle your logic
                        setForm({...form, birthday: currentDateString})
                      }}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Age</Label>
                    <Input 
                      type="text" 
                      name="age" 
                      value={form.age}  
                      onChange={handleChange}  
                      />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email</Label>
                    <Input 
                      type="text" 
                      name="email" 
                      disabled
                      value={form.email}  
                      onChange={handleChange}
                      />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Phone</Label>
                    <Input type="text" name="phone" value={form.phone}  onChange={handleChange} />
                  </div>


                  <div className="col-span-2 lg:col-span-1">
                    <Label>Address</Label>
                    <Input type="text" name="address" value={form.address}  onChange={handleChange} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Code Id</Label>
                    <Input type="text" name="codeId" value={form.codeId}  onChange={handleChange} />
                  </div>


                 

                  
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" type="button" onClick={handleEdit}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal isOpen={isConfirmOpen} onClose={()=> setConfirmOpen(false)} className="max-w-sm m-4">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-sm w-full">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Confirm Deletion
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete this record? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          
      </Modal>
    </div>
  );
};

export default DataTable;
