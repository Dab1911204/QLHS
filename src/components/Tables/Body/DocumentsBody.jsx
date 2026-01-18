const DocumentsBody = ({items,search,handleDelete}) => {
  return (
    <>
      <tbody>
        {items
          .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
          .map((record, index) => (
            <tr key={record.id} className="border-t hover:bg-gray-50">
              <td className="p-4">{index + 1}</td>
              <td className="p-4">{record.name}</td>
              <td className="p-4">{record.type}</td>
              <td className="p-4">{record.date}</td>
              <td className="p-4">
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                  {record.status}
                </span>
              </td>
              <td className="p-4 space-x-2">
                <button className="px-3 py-1 border rounded-lg">Xem</button>
                <button className="px-3 py-1 border rounded-lg">Sửa</button>
                <button
                  onClick={() => handleDelete(record.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default DocumentsBody;
