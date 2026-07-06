/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/dashboard')
  })
  return (
    <div></div>
  )
}

export default page