import { Search_controllers } from "./search-controler";
import { useState } from "react";
import { Search } from "lucide-react"
import './search.css'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { buttonVariants } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";


export const SearchComponent = () => {
    const [searchVal, setSearchVal] = useState('');
    const [result, setResult] = useState([]);
  
    const handleInput = (e: any) => {
      const value = e.target.value;
      setSearchVal(value);
      search(value);
    }
  
    async function search(value: any) {
      const response = await Search_controllers(value);
      if (response && response.error) {
        setResult([]);  
      } else {
        setResult(response);
      }
    }
  
    return (

      <Dialog>
        <DialogTrigger className={[buttonVariants({ variant: "outline" }), `search`  ].join(' ')}>
          <Search/>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="flex flex-col items-center border-b px-3" cmdk-input-wrapper="">
              <div className="flex items-center"> {/* Container for input field and search icon */}
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <input
                  onChange={handleInput}
                  value={searchVal}
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search"
                  className="flex h-11 search-input rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              {result.length > 0 && ( 
                <div className="results-wrap mt-2 result"> 
                  <ul>
                    {result.slice(0, 10).map((user: any, index: number) => (  
                      <li key={index} className='list-item'>
                        <DialogFooter className='list-item'>
                          <DialogClose asChild>
                            <Link to={`/user`}  state={{ id: user._id }} className="flex items-center">
                              <Avatar className="mr-2">
                                <AvatarImage src={`${user.profilePic}`} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                              </Avatar>
                              <h1 className="text-left mt-1">{user.name}</h1>
                            </Link>
                          </DialogClose>
                        </DialogFooter>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
        
  }
  