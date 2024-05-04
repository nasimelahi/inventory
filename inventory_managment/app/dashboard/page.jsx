'use client'
import { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import Header from '@/components/header/Header'
import PageTitle from '@/components/header/PageTitle'
import DailySaleSummry from '@/components/sale/DailySaleSummry'
import ShopLowStock from '@/components/inventory/ShopLowStock'
import { fetchData } from '@/redux/action/dashboardAction';


export default function Dashboard() {
  const date = new Date()
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const urls = [
      `http://localhost:5000/api/sales/daily-sales-report?date=${today}`,
      'http://localhost:5000/api/inventory/'
  ]
  const data = useSelector(state => state.dashboard.data)
  const dailySaleReport = data[0]
  const lowStock = data[1]?.data

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchData(urls));
  }, [dispatch]);

  return (
    <div>
      <Header/>
      <div className="min-h-full overflow-x-hidden">
        <PageTitle/>
        <DailySaleSummry dailySaleReport={dailySaleReport} />
        <ShopLowStock lowStock = {lowStock}/>
      </div>
    </div>
  )
}
