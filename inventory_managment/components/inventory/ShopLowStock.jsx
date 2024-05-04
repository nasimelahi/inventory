export default function ShopLowStock({ lowStock }) {
    const data = lowStock || []; // Ensure data is an array
  
    if (data.length === 0) {
      return <div className="bg-gray-200 h-2/5 flex justify-center items-center">Loading...</div>;
    }
  
    const keys = Object.keys(data[0] || {}); // Get keys from the first object in data array
  
    return (
      <div className="bg-gray-200 h-2/5">
        <h1 className="font-bold tracking-tight text-gray-900 m-2">Stock</h1>
        <div className="relative overflow-hidden shadow-md rounded-lg px-2">
          <table className="table-fixed w-full text-left">
            <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-1 border text-center p-4" style={{ width: '52%' }}>Product Name</th>
              <th className="py-1 border text-center p-4">Stock</th>
              <th className="py-1 border text-center p-4">Edit</th>
            </tr>
            </thead>
            <tbody className="bg-white text-gray-500 bg-[#FFFFFF] text-[#6b7280]">
            {data.map((item, index) => (
              <tr key={index} className="py-2">
                <td className="py-2 border text-center p-4" style={{ width: '52%' }}>{item.name}</td>
                <td className="py-2 border text-center p-4">{item.unitinstock}</td>
                <td className="py-2 border text-center p-4" contentEditable="true">$ 299</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  