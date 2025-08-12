import React, { useContext } from 'react'
import Card from '../parts/Card.jsx'
import {UserContext} from '../context/User.context.jsx'

const TransactionCard = () => {
  const {income, expense} = useContext(UserContext)
  return (
    <div className=' flex flex-col gap-1 w-full md:flex-row'>
        <Card type={"Income"} amount={income || 0}/>
        <Card type={"Expense"} amount={expense || 0}/>
        <Card type={"Total"} amount={income - expense || 0}/>
    </div>
  )
}

export default TransactionCard