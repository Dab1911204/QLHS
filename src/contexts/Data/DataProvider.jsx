import { useState, useEffect } from "react";
import DataContext from "./DataContext";
import initialData, {
  // Employee helpers
  addEmployee as addEmployeeHelper,
  updateEmployee as updateEmployeeHelper,
  deleteEmployee as deleteEmployeeHelper,
  // Payroll helpers
  addPayroll as addPayrollHelper,
  updatePayroll as updatePayrollHelper,
  deletePayroll as deletePayrollHelper,
  // Attendance helpers
  addAttendance as addAttendanceHelper,
  updateAttendance as updateAttendanceHelper,
  deleteAttendance as deleteAttendanceHelper,
} from "../data/data.js";

export const DataProvider = ({ children }) => {
  // STATE
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("appData");
    return savedData ? JSON.parse(savedData) : initialData;
  });

  // SYNC LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("appData", JSON.stringify(data));
  }, [data]);

  // EMPLOYEES
  const addEmployee = (newEmployee) => {
    setData((prev) => addEmployeeHelper(prev, newEmployee));
  };

  const updateEmployee = (id, updatedFields) => {
    setData((prev) =>
      updateEmployeeHelper(prev, id, updatedFields)
    );
  };

  const deleteEmployee = (id) => {
    setData((prev) => deleteEmployeeHelper(prev, id));
  };

  // PAYROLLS
  const addPayroll = (newPayroll) => {
    setData((prev) => addPayrollHelper(prev, newPayroll));
  };

  const updatePayroll = (id, updatedFields) => {
    setData((prev) =>
      updatePayrollHelper(prev, id, updatedFields)
    );
  };

  const deletePayroll = (id) => {
    setData((prev) => deletePayrollHelper(prev, id));
  };

  // ATTENDANCE
  const addAttendance = (newAttendance) => {
    setData((prev) =>
      addAttendanceHelper(prev, newAttendance)
    );
  };

  const updateAttendance = (id, updatedFields) => {
    setData((prev) =>
      updateAttendanceHelper(prev, id, updatedFields)
    );
  };

  const deleteAttendance = (id) => {
    setData((prev) =>
      deleteAttendanceHelper(prev, id)
    );
  };

  // RESET DATA
  const resetData = () => {
    setData(initialData);
    localStorage.removeItem("appData");
  };

  // CONTEXT VALUE
  const value = {
    data,
    // Employee
    addEmployee,
    updateEmployee,
    deleteEmployee,
    // Payroll
    addPayroll,
    updatePayroll,
    deletePayroll,
    // Attendance
    addAttendance,
    updateAttendance,
    deleteAttendance,
    // System
    resetData,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
