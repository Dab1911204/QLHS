function Header() {
  return (
    <header className="h-20 bg-linear-to-r from-[#ff0000] to-[#c40003] shadow flex items-center justify-end px-6">

      {/* Thông tin user (demo) */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-sm">
          A
        </div>
      </div>
    </header>
  );
}

export default Header;
