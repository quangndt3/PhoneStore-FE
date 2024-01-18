import React from 'react'
import { check } from '../../components/check'

const Dashboar = () => {
  const account = JSON.parse(localStorage.getItem("acc")!)

  return (
    <div>Dashboar Chào: {account?.name}</div>
  )
}

export default Dashboar