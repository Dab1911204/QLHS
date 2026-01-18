function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg p-6">
      <h2 className="text-xl font-bold text-blue-600 mb-6 text-center">
        TDS DMS
      </h2>

      <ul className="space-y-4 text-gray-700">
        <li className="font-semibold text-blue-500 cursor-pointer">
          Quản lý hồ sơ
        </li>
        <li className="cursor-pointer hover:text-blue-500">
          Thống kê
        </li>
        <li className="cursor-pointer hover:text-blue-500">
          Người dùng
        </li>
        <li className="cursor-pointer hover:text-blue-500">
          Cài đặt
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
