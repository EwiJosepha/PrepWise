import React from 'react'
import Dashboard from '@/core/dashboard-comp'
import RequireAuth from '@/utils/require-auth'

function Dashboardd() {
  return (
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  )
}

export default Dashboardd
