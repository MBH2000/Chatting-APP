import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppSelector, useAppDispatch } from '@/Controllers/hooks'
import {
  toggleIsLoggedIn,
  setName,
  setToken,
  setEmail,
  setAvatar
} from '../../data/UserSchema'
import { Logout_controllers } from '@/Controllers/User';
import { ProfileData } from "./ProfileData"

export const ProfilePage = () => {
  
  const user=useAppSelector(state=>state.user)
  const dispatch = useAppDispatch();




  async function Logout(){
    dispatch(toggleIsLoggedIn())
    dispatch(setName(''))
    dispatch(setToken(''))
    dispatch(setEmail(''))
    dispatch(setAvatar(''))



    await Logout_controllers(user)
  }
  return (

    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className={[ `controls`  ].join(' ')}>
          <Avatar>
            <AvatarImage src={`${user.avatar}`} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DialogTrigger>Profile</DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a onClick={Logout}>
                Log Out
              </a>
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>



      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        <ProfileData />
      </DialogContent>
    </Dialog>
  )
}
