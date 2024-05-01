const stats = [
    { id: 1, name: 'So far today', value: '£1000' },
    { id: 2, name: 'Card', value: '£1000' },
    { id: 3, name: 'Cash', value: '£ 46,000' },
    { id: 4, name: 'Total', value: '46,000' },
  ]
  
  export default function DailySaleSummry() {
    return (
      <div className="bg-white overflow-x-scroll no-scrollbar">
          <div className="">
            <dl className="flex grid-cols-4 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.id} className="mx-auto w-80 flex flex-col gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
    )
   }
  