const Tab = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`pb-3 px-1 font-medium transition ${
        active
          ? "border-b-2 border-blue-600 text-blue-600"
          : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {label}
    </button>
  );
}
export default Tab;