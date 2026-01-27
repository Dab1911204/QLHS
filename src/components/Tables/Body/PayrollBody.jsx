import { FaRegEye } from "react-icons/fa";
import { VscTools } from "react-icons/vsc";


const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
};

const PayrollBody = ({ items, onViewDetail, onUpdatePayroll }) => {
  return (
    <tbody>
      {items.map((payroll, idx) => {
        return (
          <tr
            key={payroll.id}
            className={`border-b border-gray-100 hover:bg-blue-50 transition ${
              idx % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <td className="p-4 font-medium text-gray-700">#{payroll.id}</td>
            <td className="p-4">
              <div>
                <p className="font-semibold text-gray-900">{payroll.name}</p>
                <p className="text-sm text-gray-500">{payroll.month}</p>
              </div>
            </td>
            <td className="p-4">
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {payroll.role}
              </span>
            </td>
            <td className="p-4 text-right font-medium text-gray-900">
              {formatCurrency(payroll.baseSalary)}
            </td>
            <td className="p-4 text-right font-medium text-green-600">
              +{formatCurrency(payroll.bonus)}
            </td>
            <td className="p-4 text-right font-medium text-red-600">
              -{formatCurrency(payroll.deduction)}
            </td>
            <td className="p-4 text-right font-bold text-lg text-blue-600">
              {formatCurrency(payroll.netSalary)}
            </td>
            <td className="p-4 text-center">
              {payroll.status === "Đã thanh toán" ? (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  ✓ {payroll.status}
                </span>
              ) : (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  ⏳ {payroll.status}
                </span>
              )}
            </td>
            <td className="p-4">
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => onViewDetail(payroll)}
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-lg text-sm font-medium transition"
                >
                  <div className="flex flex-row items-center gap-1">
                    <FaRegEye />
                    <span>Xem</span>
                  </div>
                </button>
                <button
                  onClick={() => onUpdatePayroll(payroll)}
                  className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-1 rounded-lg text-sm font-medium transition"
                >
                  <div className="flex flex-row items-center gap-1">
                    <VscTools />
                    <span>Sửa</span>
                  </div>
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default PayrollBody;
