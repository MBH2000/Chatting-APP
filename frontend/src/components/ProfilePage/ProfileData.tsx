import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Profile_Edit_controllers, Profile_controllers } from "@/Controllers/User"
import { useAppDispatch, useAppSelector } from "@/Controllers/hooks"
import { Button } from "../ui/button"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form"
import { setAvatar, setEmail, setName } from "@/data/UserSchema"


const formSchema = z.object({
  name: z.string().min(6),
  email: z.string().email(),
  profilePic: z.any()
});

export const ProfileData = () => {
  const user=useAppSelector(state=>state.user)
  const dispatch = useAppDispatch();




    

    async function EditLog(values: z.infer<typeof formSchema>) {
      try {
        const formData = new FormData();
        if(values.profilePic)
        {
          formData.append('profilePic', values.profilePic[0]);
        }
        formData.append('name', values.name);
        formData.append('email', values.email);
        const response = await Profile_Edit_controllers(user,formData)
  
        if (response && response.error) {
          setErrorMessage(response.error);
        } else {
          setErrorMessage('');
          dispatch(setName(response.name));
          dispatch(setAvatar(response.profilePic));
          dispatch(setEmail(response.email));
          setEdit(false)
          Get_Profile(user)
        }
      } catch (error) {

      }        
    }

    interface UserProfile {
        profilePic: string
        name: string
        email: string
      }

      const [edit,setEdit]=useState(false)
      const [info,setInfo]=useState<UserProfile>({
        name:'',
        email:'',
        profilePic:''
      })

      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name:user.name,
          email:user.email
        },
      })

      const [loading,setLoading]=useState(false)
      const [errorMessage, setErrorMessage] =useState('')
    
        
      async function Get_Profile(data:any){
        const respones=await Profile_controllers(data)
    
        if (respones && respones.error){
            setErrorMessage(respones.error);
            console.log(errorMessage);
        }else{
            setInfo(respones)
            setLoading(true)
        }
        setTimeout(()=>{
      }, 2000);
        
      }
      useEffect(() => {
        setTimeout(()=>{
          Get_Profile(user)
      }, 2000);
    
      },[])

  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(EditLog)}>
        {
          !loading? 
            <div className="flex items-center justify-center" role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
            :
            <>
                
                    <div className="grid grid-flow-col gap-4 items-center"> {/* Apply grid layout with two columns and gap */}
                        <div className="flex flex-col items-center">
                            <Avatar className="h-32 w-32">
                                <AvatarImage src={`${info.profilePic}`} />
                                <AvatarFallback className="w-32 h-32">{info.name[0]}</AvatarFallback>
                            </Avatar>
                            <FormField
                              control={form.control}
                              name="profilePic"
                              render={({ field }) => (
                              <FormItem className='text-left'>
                                <FormControl>
                                  <Input
                                      className="w-20 h-0 pt-0 mt-2 bg-black border-white "
                                      disabled={!edit}
                                      id='picture'
                                      type='file'
                                      onChange={(e) => field.onChange(e.target.files)}
                                      multiple={false} // Allow only one file
                                    />
                                </FormControl>
                              </FormItem>
                              )}
                            />
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <FormField
                                  control={form.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem className='text-left'>
                                      <FormControl>
                                        <Input
                                          disabled={!edit}
                                          id="name"
                                          placeholder={info.name}
                                          className="col-span-3 w-60"
                                          required={false}
                                          {...field}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Username
                                </Label>
                                                                <FormField
                                  control={form.control}
                                  name="email"
                                  render={({ field }) => (
                                    <FormItem className='text-left'>
                                      <FormControl>
                                      <Input
                                    disabled={!edit}
                                    id="email"
                                    placeholder={info.email}
                                    className="col-span-3 w-60"
                                    {...field}
                                />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                
                            </div>
                        </div>
            
                    </div>
                
                {
                    edit?
                        <div className="flex space-x-4">
                          <Button
                            onClick={async () => {
                              setEdit(false);
                              Get_Profile(user);
                            }}
                            className="mt-9 w-full"
                          >
                            Cancel
                          </Button>
                          <Button
                            className="mt-9 w-full"
                            type="submit"
                          >
                            Save
                          </Button>
                        </div>

                    :
                    <Button onClick={async ()=>{
                        setEdit(true)
                    }} className="mt-9 w-full">
                        Edit
                    </Button>
                }
            </>
        }
        </form>
    </Form>    
  )
}
