import React from 'react'
import Card from '../parts/Card.jsx'

const TransactionCard = () => {
  return (
    <div className=' flex flex-col gap-1 w-full md:flex-row'>
        <Card type={"Income"} amount={20000}/>
        <Card type={"Expense"} amount={20000}/>
        <Card type={"Total"} amount={20000}/>
    </div>
  )
}

export default TransactionCard