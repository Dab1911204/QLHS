const StatCard = ({ title, value, bgColor }) =>{
  return (
    <div
      className={`${bgColor} rounded-2xl shadow-lg p-4 text-white transform hover:scale-105 transition`}
    >
      <p className="text-sm font-medium opacity-90">{title}</p>
      <p className="text-4xl font-bold mt-2">{value}</p>
      <div className="mt-4 h-1 w-12 bg-white opacity-50 rounded-full"></div>
    </div>
  );
}

export default StatCard;