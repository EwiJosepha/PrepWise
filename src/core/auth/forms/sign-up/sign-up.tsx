'use client'
import Image from 'next/image'
import { Form, Formik } from 'formik'
import { SignUpValidationSchema } from '@/schemas/auth.schema/sign-up.schema'
import FormControl from '../form-control'
import image from '../../../../assets/images/sign-up-image.jpeg'
import Button from '@/components/button'
import Link from 'next/link'
import { createUser } from '@/utils/api'
import Toast from '@/components/notify/toast';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { baseUrl } from '@/lib/constant'
import { useState } from 'react'
const failed = () => toast.warn("Registration Failed")
const notify = () => toast.success("Registration successful")


function SignUp() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState(''); 
  const [hasApiError, setHasApiError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  const onSubmit = async (values: any, { resetForm }: { resetForm: () => void }) => {
    resetForm();
    try {
      setIsLoading(true)
      const data = await createUser(values);
      notify()
      router.push(baseUrl + '/dashboard')
      console.log('User created successfully:', data);
    } catch (error) {
      let apiErrorMessage = 'Login failed. Please try again.';
      if (error instanceof Error) {
        apiErrorMessage = error.message;
      } else if (typeof error === 'string') {
        apiErrorMessage = error;
        setHasApiError(true)
      }
      setErrorMessage(apiErrorMessage);
      failed();
    }finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='h-screen lg:py-10 py-2 bg-secondary'>
      <div className='flex flex-row justify-center  h-full gap-[93px] px-8'>
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
        <div className='flex-1 max-w-[640px]  pt-14'>
          <p className='font-bold text-5xl text-indigo-500 lg:pb-1 pb-10 text-center'>Prep Wise@</p>
          <Formik
            initialValues={initialValues}
            validationSchema={SignUpValidationSchema}
            onSubmit={onSubmit}
            validateOnMount

          >
            {({ isValid, isSubmitting, dirty }) => (
              <Form className="flex flex-col items-center">
                <div className='w-full flex flex-col gap-[19px] pb-8'>
                  <div className='flex flex-col lg:gap-[31px] gap-[19px] w-full'>
                    <FormControl
                      name='firstName'
                      control='text-input'
                      label={'First name'}
                      placeholder={'First name'}
                      type='text'
                    />
                    <FormControl
                      control='text-input'
                      type='text'
                      name='lastName'
                      label={'Last name'}
                      placeholder={'Last name'}
                    />
                  </div>

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
                    <FormControl
                      control='text-input'
                      name='confirmPassword'
                      type='password'
                      placeholder={'Confirm Password'}
                      label={'Confirm Password'}
                    />
                  </div>
                </div>

                <Button
                  variant='primary'
                  type='submit'
                  size='large'
                  isLoading={isLoading}
                  disabled={!isValid || !dirty || isSubmitting || isLoading || hasApiError}
                  className={`w-full rounded cursor-pointer ${!isSubmitting ? 'cursor-not-allowed' : ''}`}

                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
          <div className='h-[45px]' />
          {errorMessage && (
        <>
          <p className='text-red-500 text-sm text-left font-[300] font-primary'>
            {errorMessage}
          </p>
          <div className='h-[31px]' />
        </>
      )}
          <Toast />
          <div className='flex justify-center'>
            <p className='font-bold text-md text-white'

            > Already have an account?</p>
            <p>
              <Link
                href='/sign-in'
                className='text-indigo-500 pl-1 text-[16px] underline'
              >
                Login
              </Link>
            </p>
          </div>
          <div className='h-[25px] lg:h-[2px]'/>
          <p className='text-center text-[16px] text-slate-gray xl:pt-4 text-white'>
            ©2025 ALL RIGHTS RESERVED PrepWise@
          </p>
          <div className='h-[45px]' />
        </div>
      </div>
    </div>
  )
}

export default SignUp;
