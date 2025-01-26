import SignUp from '@/core/auth/forms/sign-up/sign-up'
import RequireAuth from '@/utils/require-auth'
import React from 'react'

function SignUpPage() {
  return (
    <div>
      <RequireAuth>
      <SignUp />
      </RequireAuth>
    </div>
  )
}

export default SignUpPage
