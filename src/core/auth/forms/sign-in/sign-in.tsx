'use client'
import Image from 'next/image'
import { Form, Formik } from 'formik'
import { SignInValidationSchema } from '@/schemas/auth.schema/sign-in.schema'
import FormControl from '../form-control'
import image from '../../../../assets/images/sign-up-image.jpeg'
import Button from '@/components/button'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { baseUrl } from '@/lib/constant'
import { loginUser } from '@/services/user-api'
import { useState } from 'react'


const failed = () => toast.warn("Sign in successful")
const notify = () => toast.success("Registration successful")

function SignIn() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiError, setHasApiError] = useState(false);


  const initialValues = {
    email: "",
    password: "",
  }

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    setHasApiError(false)
    try {
      await loginUser(values);
      notify()
      setIsLoading(true)
      router.push(baseUrl + '/dashboard')
    } catch (error: unknown) {
      let apiErrorMessage = 'Login failed. Please try again.';
      if (error instanceof Error) {
        apiErrorMessage = error.message;
      } else if (typeof error === 'string') {
        apiErrorMessage = error;
      }
      setHasApiError(true)
      setErrorMessage(apiErrorMessage);
      failed();
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <div className='h-screen bg-secondary lg:py-10 py-2'>
      <div className='flex flex-row justify-center items-center  h-full gap-[93px] px-8'>
        <div className='flex-1 hidden lg:flex max-w-[692px] justify-center'>
          <div className='w-full h-full overflow-hidden rounded-lg xl:rounded-2xl'>
            <Image
              src={image}
              alt='Auth Image'
              width={500}
              height={500}
              className='w-full h-full object-cover'
            />
          </div>
        </div>
        <div className='flex-1 max-w-[640px]  pt-1'>
          <p className='font-bold text-5xl text-indigo-500 lg:pb-1 pb-10 text-center'>Prep Wise@</p>
          <Formik
            initialValues={initialValues}
            validationSchema={SignInValidationSchema}
            onSubmit={onSubmit}
            validateOnMount

          >
            {({ isSubmitting, isValid, dirty,  }) => (
              <Form className="flex flex-col items-center">
                <div className='w-full flex flex-col gap-[19px] pb-8'>
                  <div className='flex flex-col lg:gap-[31px] gap-[19px]'>
                    <FormControl
                      control='text-input'
                      name='email'
                      type='email'
                      placeholder={'Email'}
                      label={'Email'}
                    />
                  </div>

                  <div className='flex flex-col lg:gap-[31px] gap-[19px]'>
                    <FormControl
                      control='text-input'
                      name='password'
                      type='password'
                      placeholder={'Password'}
                      label={'Password'}
                    />
                  </div>
                </div>

                <Button
                  variant='primary'
                  type='submit'
                  size='large'
                  disabled={!isValid || !dirty || isSubmitting || isLoading || hasApiError}
                  isLoading={isLoading}
                  className={`w-full rounded cursor-pointer ${!isSubmitting ? 'cursor-not-allowed' : ''}`}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
          <div className='h-[31px]' />
          {errorMessage && (
            <>
              <p className='text-red-500 text-sm text-left font-[300] font-primary'>
                {errorMessage}
              </p>
              <div className='h-[31px]' />
            </>
          )}
          <div className='flex justify-center'>
            <p className='font-bold text-md text-white'

            > Don't have an account?</p>
            <p>
              <Link
                href='/sign-up'
                className='text-indigo-500 pl-1 text-[16px] underline'
              >
                Sign up
              </Link>
            </p>
          </div>
          <div className='h-[25px]' />
          <p className='text-center text-[16px] text-slate-gray xl:pt-4 text-white'>
            ©2025 ALL RIGHTS RESERVED PrepWise@
          </p>
          <div className='h-[25px]' />
        </div>
      </div>
    </div>
  )
}

export default SignIn;
