import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Register_controllers } from '@/Controllers/User';
import {
  toggleIsLoggedIn,
  setName,
  setToken,
  setAvatar,
  setEmail
} from '../../data/UserSchema'
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
import { Link } from 'react-router-dom';
import './Register.css'
import { Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/Controllers/hooks'
import ErrorMessagePopup from '../popup/ErrorMessagePopup';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"



const formSchema = z.object({
  name: z.string().min(6).max(20),
  email: z.string().email(),
  password: z.string().min(12),
  profilePic: z.any()
})

export function Register() {

  const user=useAppSelector(state=>state.user)
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })

  const [errorMessage, setErrorMessage] =useState('')  

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      if(values.profilePic)
      {formData.append('profilePic', values.profilePic[0]);}
      // Append other form values
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
  
      const response = await Register_controllers(formData);
  
      if (response && response.error) {
        setErrorMessage(response.error);
      } else {
        setErrorMessage('');
        dispatch(toggleIsLoggedIn());
        dispatch(setName(response.user.name));
        dispatch(setToken(response.token));
        dispatch(setAvatar(response.user.profilePic));
        dispatch(setEmail(response.user.email));
      }
    } catch (error) {
      setErrorMessage('An error occurred while registering.');
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
        (<div  className='Register-div'>
          <h3 className='Register-text'>Register</h3>
          <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 Register-form">
            <FormField
                control={form.control}
                name="profilePic"
                render={({ field }) => (
                  <FormItem className='text-left'>
                    <FormLabel>Picture</FormLabel>
                    <FormControl>
                      <Input
                        id='picture'
                        type='file'
                        onChange={(e) => field.onChange(e.target.files)}
                        multiple={false} // Allow only one file
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className='text-left'>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger >
                            <FormLabel>Username</FormLabel>
                          </TooltipTrigger>
                          <FormControl>
                            <Input type='name' placeholder="name" {...field} />
                          </FormControl>
                          <TooltipContent>
                            <FormMessage/>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className='text-left'>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger >
                            <FormLabel>Email</FormLabel>
                          </TooltipTrigger>
                          <FormControl>
                            <Input type='email' placeholder="example@example.com" {...field} />
                          </FormControl>
                          <TooltipContent>
                            <FormMessage/>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className='text-left'>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger >
                            <FormLabel>Password</FormLabel>
                          </TooltipTrigger>
                          <FormControl>
                            <Input type='password' placeholder="password" {...field}/>
                          </FormControl>
                          <TooltipContent>
                            <FormMessage/>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormItem>
                )}
              />
              <Button className='Register-But' type="submit">Register</Button>
            </form>
            {errorMessage && <ErrorMessagePopup message={errorMessage} onClose={closeErrorMessage} />}
          </Form>
          <p className='bottom'>Dont have an account? Register <Link to={'/login'}>here</Link></p>
        </div>)
      }
    </>
  )

}
