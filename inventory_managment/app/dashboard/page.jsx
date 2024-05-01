import React from 'react'
import SearchBar from '@/components/searchBar/SearchBar'
import Header from '@/components/header/Header'
import PageTitle from '@/components/header/PageTitle'
import MainBody from '@/components/mainBody/MainBody'
import DailySaleSummry from '@/components/sale/DailySaleSummry'


export default function Dashboard() {
  return (
    <div>
      <Header/>
      <div className="min-h-full overflow-x-hidden">
        <PageTitle/>
        <DailySaleSummry/>
        <MainBody/>
      </div>
    </div>
  )
}
