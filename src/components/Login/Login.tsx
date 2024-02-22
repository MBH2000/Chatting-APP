import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Login_controllers } from '@/Controllers/User';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import './Login.css'
import { useAppDispatch, useAppSelector } from '@/Controllers/hooks';
import {
  toggleIsLoggedIn,
  setName,
  setToken,
  setAvatar,
  setEmail
} from '../../data/UserSchema'
import ErrorMessagePopup from '../popup/ErrorMessagePopup';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12)
})

export function Login() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  
  const user=useAppSelector(state=>state.user)
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] =useState('')  

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await Login_controllers(values);
      if (response && response.error) {
         setErrorMessage(response.error)
      } else {
        dispatch(toggleIsLoggedIn())
        dispatch(setName(response.user.name))
        dispatch(setToken(response.token))
        dispatch(setAvatar(response.user.profilePic))
        dispatch(setEmail(response.user.email))
      }
    } catch (error) {
       setErrorMessage('An error occurred while Login.')
    }
  }
  const closeErrorMessage = () => {
    setErrorMessage('');
  };
  
  return (
    <>
      {user.isLoggedIn? 
        (<Navigate to='/'/>)
        : 
        (<div className='Login-div'>
          <Form {...form}>
            <h3 className='Login-text'>Login</h3>
            <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 Login-form">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className='text-left'>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input type='email' placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className='text-left'>
                    <FormLabel >password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className='Login-But' type="submit">Login</Button>
            </form>
            {errorMessage && <ErrorMessagePopup message={errorMessage} onClose={closeErrorMessage} />}
            <p className='bottom-log'>Dont have an account? Register <Link to={'/register'}>here</Link></p>
          </Form>
        </div>)
      }
    </>
  )

}
