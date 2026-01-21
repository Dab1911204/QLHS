const TabButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 -mb-px border-b-2 text-sm
      ${active ? "border-blue-500 text-blue-600 font-medium" : "border-transparent"}
    `}
  >
    {children}
  </button>
);
export default TabButton;