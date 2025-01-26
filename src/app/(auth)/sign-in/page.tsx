import React from 'react'
import SignIn from '@/core/auth/forms/sign-in/sign-in'
import RequireAuth from '@/utils/require-auth'

function SignInPage() {
  return (
    <div>
      <RequireAuth>
      <SignIn />
      </RequireAuth>
    </div>
  )
}

export default SignInPage
