function Header() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      {/* Tiêu đề */}
      <h1 className="text-xl font-semibold text-gray-800">
        TDS
      </h1>

      {/* Thông tin user (demo) */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Ngọc Ánh</span>
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
          A
        </div>
      </div>
    </header>
  );
}

export default Header;
