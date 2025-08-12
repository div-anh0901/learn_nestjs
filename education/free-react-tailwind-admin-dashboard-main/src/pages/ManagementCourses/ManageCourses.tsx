import React, { useCallback, useEffect, useRef, useState } from 'react'
import PageMeta from '../../components/common/PageMeta'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import { useModal } from '../../hooks/useModal';
import { Modal } from '../../components/ui/modal';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';
import Button from '../../components/ui/button/Button';
import {  FecthDataCourse } from '../../utils/type-request';
import { createCourse, getALLCourses, getTeachers } from '../../utils/api-axios';
import Select from '../../components/form/Select';
import CourseTable from '../../components/tables/BasicTables/CourseTable';
import { ToastError, ToastSuccess } from '../../utils/Toast';
import TextArea from '../../components/form/input/TextArea';
import SearchableSelect from '../../components/form/SearchableSelect';
import { optionsSpanTime, optionsSubject } from '../../utils/data';
import PopupAddStudents , {  PopupAddStudentsRef }from '../../components/ManagementCourses/PopupAddStudents';

type FormData = {
  name: string;
  title: string;
  time: number;
  description: string;
  teacher: string;
  subject: string;
}


type Meta = {
  limit: number;
  page: number;
  total: number;
}
 interface TypeOption {
  value: string;
  label: string;
 }



let optionTeacher :TypeOption[] = []

function ManageCourse() {
  const [data, setData] = useState<FecthDataCourse[]>([]);
  const [meta,setMeta] = useState<Meta>({
    limit: 15,
    page: 1,
    total: 15
  });
  const [filter, setFilter] = useState<string>('');
  const [teacher, setTeacher] = useState<TypeOption[]>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const [searchSelect , setSearchSelect] = useState<string>("");
  const [form, setForm] = useState<FormData>({
    name: "",
    title: "",
    time: 0,
    description: "",
    teacher: "",
    subject: "",
  });

  const [activeTab, setActiveTab] = useState<'create' | 'students'>('create');

  const fetchTeachers = useCallback(()=>{
    getTeachers({limit: 5, page : 1, findText: searchSelect}).then(res => {
      setTeacher([])
      const mapped = res.data.map((teacher) => ({
        value: teacher._id + "",
        label: `${teacher.username} - ${teacher.email}`,
      }));
      setTeacher(mapped)
    }).catch((err)=>{
      console.log(err)
    })
  },[searchSelect])

 
  const fetchCourses = useCallback(()=>{
    getALLCourses({limit: meta.limit, page : meta.page, findText:filter}).then(res => {
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
    fetchCourses()
  }

  useEffect(()=>{
    fetchTeachers()
  },[fetchTeachers])

  useEffect(()=>{
      fetchCourses()
  },[fetchCourses])

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

    if(value.name == "") showError("Name not empty!");
    if(value.title == "") showError("Title not empty!");
    if(value.teacher == "") showError("Teacher not empty!");
    if(value.subject == "") showError("Subject not empty!");
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
          await createCourse(form);      // Create student
          await fetchCourses();          // Refresh list
          closeModal();       
          ToastSuccess("Add course success!");            // Close only on success
        } catch (err) {
          console.error('Create student failed:', err);
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

const [students, setStudents] = useState<any[]>([{
  id: 1,
  name: "123",
  email : "1234"
}]);

const handleRemoveStudent = (id: string) => {
  //setStudents((prev) => prev.filter((s) => s.id !== id));
};

const childRef = useRef<PopupAddStudentsRef>(null);

  const handleParentClick = () => {
    if (childRef.current) {
      childRef.current.clickOpen(); // Call child method from parent
    }
  };
  return (
    <>
      <PageMeta
        title="Management Courses"
        description="tracking the information course"
      />
      <PageBreadcrumb pageTitle="Management Courses" />
      
      <div className="space-y-6">
     {/*  <ClassFilter
        classes={mockClasses}
        selectedClass={selectedClass}
        onChange={setSelectedClass}
      />*/}
          <CourseTable  
            data={data} 
            meta={meta} 
            setMeta={setMeta} 
            filter={filter}
            setFilter={setFilter}
            resetPage={resetPage}
            
        onCreate={openModal} />
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[1300px] max-h-[100vh] m-4">
        <div className="no-scrollbar relative w-full max-w-[1300px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
          <nav className="flex gap-4">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2 font-semibold ${
                activeTab === 'create' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
              }`}
            >
              Create Course
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`px-4 py-2 font-semibold ${
                activeTab === 'students' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
              }`}
            >
              Add Students
            </button>
          </nav>
          </div>
          {
            activeTab === 'create' && (
            <form className="flex flex-col h-[80vh]">
                <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                  <div className="mt-7">
    
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                    
                      <div className="col-span-2 lg:col-span-1">
                        <Label>Courses Name</Label>
                        <Input type="text"  name="name"  onChange={handleChange} value={form.name}/>
                      </div>
    
                      <div className="col-span-2 lg:col-span-1">
                        <Label>Courses Title</Label>
                        <Input type="text"  name="title"  onChange={handleChange} value={form.title}/>
                      </div>
    
                      <div className="col-span-2 lg:col-span-1">
                        <Label>Span time</Label>
                        <Select
                          options={optionsSpanTime}
                          placeholder="Select an option"
                          onChange={(value) => setForm({...form, time: parseInt(value)})}
                          className="dark:bg-dark-900"
                        />
                      </div>
    
                      <div className="col-span-2 lg:col-span-1">
                        <Label>Teacher</Label>
                        <SearchableSelect
                          options={teacher}
                          placeholder="Select an option"
                          onChange={(value) => setForm({...form, teacher: value})}
                          searchSelect={searchSelect}
                          setSearchSelect={setSearchSelect}
                          className="dark:bg-dark-900"
                        />
                      </div>


                      <div className="col-span-2 lg:col-span-1">
                        <Label>Subject</Label>
                        <Select
                          options={optionsSubject}
                          placeholder="Select an option"
                          onChange={(value) => setForm({...form, subject:value})}
                          className="dark:bg-dark-900"
                        />
                      </div>
    
                      <div>
                        <Label>Description</Label>
                        <TextArea
                          value={form.description}
                          onChange={(value) => setForm({...form, description: value})}
                          rows={6}
                        />
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
            )
          }

          {activeTab === 'students' && (
            <div className="h-[80vh] w-[100%] overflow-y-auto px-2">
                <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
                    Enrolled Students
                  </h4>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <Input
                      type="text"
                      placeholder="Search student..."
                      className="w-full sm:w-64"
                    />
                    <Button size="sm" onClick={handleParentClick}>
                      Add Student
                    </Button>
                  </div>
              </div>
              <table className="w-full table-auto border border-gray-200 dark:border-gray-700 text-sm">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="p-2 text-left">#</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id} className="border-t dark:border-gray-700">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{student.name}</td>
                      <td className="p-2">{student.email}</td>
                      <td className="p-2">
                        <Button  onClick={() => handleRemoveStudent(student.id)}>
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Modal>

      <PopupAddStudents ref={childRef} />
    </>
  )
}

export default ManageCourse