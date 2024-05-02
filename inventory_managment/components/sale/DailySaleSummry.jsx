const stats = [
    { id: 1, name: 'So far today', value: '£1000' },
    { id: 2, name: 'Card', value: '£1000' },
    { id: 3, name: 'Cash', value: '£ 46,000' },
    { id: 4, name: 'Total', value: '46,000' },
  ]
  
  export default function DailySaleSummry() {
    return (
      <div className="bg-white overflow-x-scroll no-scrollbar">
          <div className=" flex jutify-center">
            {stats.map((stat) => (
              <div key={stat.id}class="w-32 h-20 bg-gray-100 rounded-xl mx-2 flex flex-col justify-center text-center">
                <p className="text-base leading-7 text-gray-600">{stat.value}</p>
                <p className="order-first font-semibold tracking-tight text-gray-900 ">{stat.name}</p>
              </div>
            ))}
          </div>
        </div>
    )
   }
  