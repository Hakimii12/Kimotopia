import SignUp from "@/Components/SignUp"
import Login from "@/Components/Login"
import { useLocation } from "react-router-dom"
function Authentication() {
  const auth=useLocation().pathname.slice(1)
  return (
    <div>
      {auth === "login" ? <Login/> : auth === "signUp" ? <SignUp /> : null}
    </div>
  )
}
export default Authentication
