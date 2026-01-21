import { useState } from "react";
import Header from "../../components/Tables/Header";
import EmployeesBody from "../../components/Tables/Body/EmployeesBody";
import ModelAddEmployee from "../../components/ui/Model/ModelAddEmployee";
import ModelDetailEmployee from "../../components/ui/Model/ModelDetailEmployee";
import ModelEditEmployee from "../../components/ui/Model/ModelEditEmployee";
import ModelDelete from "../../components/ui/Model/ModelDelete";

const titles = ["Mã NV","Họ tên","Vai trò","Ngày bắt đầu","Ngày kết thúc","% tham gia","Trạng thái","Thao tác"]

const EmployeesList = () => {
  const [search, setSearch] = useState("");
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDetal, setShowModalDetal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [records, setRecords] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      type: "Leader",
      startDate: "01/11/2025",
      endDate:"01/12/2025",
      contribution:"100%",
      status:"Đang tham gia",
    },
    {
      id: 2,
      name: "Nguyễn Văn B",
      type: "Suport",
      startDate: "01/11/2025",
      endDate:"01/12/2025",
      contribution:"50%",
      status:"Đang tham gia",
    },
    {
      id: 3,
      name: "Nguyễn Văn C",
      type: "Intern",
      startDate: "01/11/2025",
      endDate:"01/12/2025",
      contribution:"100%",
      status:"Đang tham gia",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    type: "PDF",
    status: "Đã số hóa",
  });
  
  const handleShowDelete = (e) => {
    setShowModalDelete(true);
    setSelectedEmployee(e);
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();

    const newRecord = {
      id: records.length + 1,
      name: formData.name,
      type: formData.type,
      date: new Date().toLocaleDateString("vi-VN"),
      status: formData.status,
    };

    setRecords([...records, newRecord]);
    setFormData({ name: "", type: "PDF", status: "Đã số hóa" });
    setShowModalAdd(false);
  };

  const handleShowEdit = (e) => {
    setShowModalEdit(true);
    setSelectedEmployee(e);
  }

  const handleShowDetail = (e) => {
    setShowModalDetal(true);
    setSelectedEmployee(e);
  }
  return (
    <>
      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm nhân sự..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>
      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="flex justify-start items-center my-4 mx-8">
          <button
            onClick={() => setShowModalAdd(true)}
            className="bg-[#ff0000] text-white px-4 py-2 rounded-xl hover:bg-[#b70000] cursor-pointer"
          >
            + Thêm nhân sự
          </button>
        </div>
        <table className="w-full">
          <Header titles={titles}/>
          <EmployeesBody items={records} search={search} handleShowDelete={handleShowDelete} handleShowDetail={handleShowDetail} handleShowEdit={handleShowEdit}/>
        </table>
      </div>
      <ModelAddEmployee isOpen={showModalAdd} onClose={()=>{setShowModalAdd(!showModalAdd)}}/>
      <ModelDetailEmployee data={selectedEmployee} isOpen={showModalDetal} onClose={()=>{setShowModalDetal(!showModalDetal)}}/>
      <ModelEditEmployee data={selectedEmployee} isOpen={showModalEdit} onClose={()=>{setShowModalEdit(!showModalEdit)}}/>
      <ModelDelete 
        title="Xóa nhân sự" 
        content = "Bạn có chắc chắn muốn xoá nhân sự này không?" 
        isOpen={showModalDelete} 
        onClose={()=>{setShowModalDelete(!showModalDelete)}}
      />
    </>
  );
};

export default EmployeesList;
