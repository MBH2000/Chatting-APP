// import { useAppSelector } from "@/Controllers/hooks"
import {
    Get_Info,
} from './people-controllers'
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";


export const People = () => {
    let { state } = useLocation();
    const [info,setInfo]=useState({})
    const [loading,setLoading]=useState(false)
    const [errorMessage, setErrorMessage] =useState('')  


    // const user=useAppSelector(state=>state.user)
    async function Get_InfoFun(data:any){
        const respones=await Get_Info(data)

        if (respones && respones.error){
            setErrorMessage(respones.error);
            console.log(errorMessage);

        }else{
            setInfo(respones)
            setLoading(true)
            
        }
        
    }
    useEffect(() => {
        setTimeout(()=>{
            Get_InfoFun(state.id)
        }, 2000);
        
    },[])
  return (
    <div>
        {
           !loading? <div>loading
                <button onClick={()=>{console.log(info)}}>   test </button>
            </div>
             :
            <button onClick={()=>{console.log(info)}}>   test </button>

        }
    </div>

  )
}
