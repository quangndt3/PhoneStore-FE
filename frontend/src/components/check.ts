import { useNavigate } from "react-router-dom";
interface Iuser{
    role:string
}
export const check=()=>{
    const user:Iuser = JSON.parse(localStorage.getItem("acc")!);
    if(user?.role!="admin" || !user){

       const url="/"
       window.location.href= url
    }
}