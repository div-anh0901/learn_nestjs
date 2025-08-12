
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../ui/modal';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import Button from '../ui/button/Button';

type Props={
  clickOpen: ()=> void;

}


export type PopupAddStudentsRef = {
  clickOpen: () => void;
};

const PopupAddStudents = forwardRef<PopupAddStudentsRef>((props, ref) => {
 
  const { isOpen, openModal, closeModal } = useModal();

  useImperativeHandle(ref, () => ({
    clickOpen() {
      openModal()
    }
  }));

  
  const [students, setStudents] = useState<any[]>([{
    id: 1 +"",
    name: "123",
    email : "1234"
  }]);
 
function handleRemoveStudent(id: string){

}
 
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[1300px] m-4">
        <div className="no-scrollbar relative w-full max-w-[1300px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Add students
            </h4>
          </div>
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
                    <Button size="sm">
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
        </div>
      </Modal>
    </>
  )
});

export default PopupAddStudents;