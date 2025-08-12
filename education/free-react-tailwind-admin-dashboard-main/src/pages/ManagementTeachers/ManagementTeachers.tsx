import React, { useCallback, useEffect, useState } from 'react'
import PageMeta from '../../components/common/PageMeta'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import { useModal } from '../../hooks/useModal';
import { Modal } from '../../components/ui/modal';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';
import Button from '../../components/ui/button/Button';
import {  DataTeacher, FecthDataCourse } from '../../utils/type-request';
import { createTeacher, getALLCourses, getTeachers, } from '../../utils/api-axios';
import DatePicker from '../../components/form/date-picker';
import Select from '../../components/form/Select';
import { ToastError, ToastSuccess } from '../../utils/Toast';
import TeacherTable from '../../components/tables/BasicTables/TeacherTable';

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

function ManageTeacher() {
  
  const [data, setData] = useState<DataTeacher[]>([]);
  const [meta,setMeta] = useState<Meta>({
    limit: 15,
    page: 1,
    total: 15
  });
  const [filter, setFilter] = useState<string>('');
  const optionGender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
  const { isOpen, openModal, closeModal } = useModal();
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

  
 
  const fetchTeachers = useCallback(()=>{
    getTeachers({limit: meta.limit, page : meta.page, findText:filter}).then(res => {
      setMeta((prev) => ({
        ...prev,
        total: res.meta.total, // Only update `total` to avoid resetting `limit/page`
      }));
      setData(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[meta.page, meta.limit, filter])


  const resetPage = ()=>{
    fetchTeachers()
  }

  useEffect(()=>{
    fetchTeachers()
  },[fetchTeachers])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }, []);

  const validateForm = (value: FormData , callback: () => void) => {
    let hasError = false;
    const showError = (message: string) => {
      hasError = true;
      ToastError(message)
    };
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.email);
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
  const handleSave = async () => {
    validateForm(form, 
      async () => {
        try {
          await createTeacher(form);      // Create student
          await fetchTeachers();          // Refresh list
          closeModal();     
          ToastSuccess('Add teacher success!')
        } catch (err) {
          ToastError("Add teacher error!")
        }
      }
    )
  };
      
 /* const filteredData = data.filter((student) => {
    const matchClass =
      !filters.className || student.className === filters.className;
    const matchAgeMin =
      filters.ageMin === null || student.age >= filters.ageMin;
    const matchAgeMax =
      filters.ageMax === null || student.age <= filters.ageMax;
    const matchStatus =
      !filters.status || student.status === filters.status;

    return matchClass && matchAgeMin && matchAgeMax && matchStatus;
  });*/

  /*const filteredData = selectedClass
    ? data.filter((student) => student.className === selectedClass)
    : data;
*/
  return (
    <>
      <PageMeta
        title="Management Teachers"
        description="tracking the information teachers"
      />
      <PageBreadcrumb pageTitle="Management Teachers" />
      
      <div className="space-y-6">
     {/*  <ClassFilter
        classes={mockClasses}
        selectedClass={selectedClass}
        onChange={setSelectedClass}
      />*/}
          <TeacherTable  
            data={data} 
            meta={meta} 
            setMeta={setMeta} 
            filter={filter}
            setFilter={setFilter}
            resetPage={resetPage}
            
        onCreate={openModal} />
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[1300px] m-4">
        <div className="no-scrollbar relative w-full max-w-[1300px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Create Teacher Information
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
                      onChange={(value) => setForm({...form, gender: value})}
                      
                      className="dark:bg-dark-900"
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <DatePicker
                      id="date-picker"
                      label="Brithday"
                      placeholder="Select a date"
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
              <Button size="sm" type="button" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default ManageTeacher