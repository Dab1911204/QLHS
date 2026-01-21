const Header = ({ titles }) => {
  return (
    <thead className="bg-gray-50 text-center">
      <tr>
        {titles.map((element,index) => (
          <th key={index} className="p-4 text-left">{element}</th>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
