
export default function DailySaleSummary({ dailySaleReport }) {
  if (!dailySaleReport || Object.keys(dailySaleReport).length === 0) {
    return <div>Loading...</div>;
  }
  function format(sentence) {
    return sentence.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }
  return (
    <div className="bg-white overflow-x-scroll no-scrollbar">
      <h1 className="font-bold tracking-tight text-gray-900 m-2">Todays Sale</h1>
      <div className="flex justify-center">
        {Object.entries(dailySaleReport).map(([key, value]) => (
          <div key={key} className="w-32 h-20 bg-gray-100 rounded-xl mx-2 flex flex-col justify-center text-center">
            <p className="text-base leading-7 text-gray-600">{format(key)}</p>
            <p className="order-first font-semibold tracking-tight text-gray-900">£{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

  