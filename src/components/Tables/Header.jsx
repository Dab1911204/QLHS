const Header = ({ titles }) => {
  return (
    <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <tr>
        {titles.map((element,index) => (
          <th key={index} className="p-4 text-left font-semibold">{element}</th>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
