import { Link } from 'react-router-dom';
import { useAppSelector} from '@/Controllers/hooks'
import './Navbar.css'
import { ModeToggle } from '../../Controllers/mode-toggle';
import {buttonVariants } from "@/components/ui/button"
import { SearchComponent } from '../Search/SearchComponent';
import { ProfilePage } from '../ProfilePage/ProfilePage';



export const NavBar = () => {

  const user=useAppSelector(state=>state.user)

  return (
    <nav className='nav-bar'>
      <Link to="/" className={[buttonVariants({ variant: "outline" }), `navbar-link`  ].join(' ')}>
         Home
      </Link>
      <ModeToggle/>
      <SearchComponent/>
      {user.isLoggedIn? 
        (
          <ProfilePage/>

        )
        :
        (
          <Link to="/login" className={[buttonVariants({ variant: "outline" }), `controls`  ].join(' ')}>
              Login/Register
          </Link>
        )
      }
            
    </nav>
  )
}

   

