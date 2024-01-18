import { useNavigate } from "react-router-dom";

const checkAdmin=()=>{
    const user = JSON.parse(localStorage.getItem("acc")!);
    if(user?.role!="admin"|| !user){
       const navigate = useNavigate()
        navigate("/")
    }
}
export default checkAdmin