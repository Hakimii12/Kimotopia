import { useState, useContext, use } from 'react';
import { ContextProvider } from '../../ContextApi/ContextApi'; // Import your context
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import { FiAtSign, FiEye, FiEyeOff, FiLock } from 'react-icons/fi';
function Login() {
  const { dark,auth,setAuth} = useContext(ContextProvider); // Get dark mode from context
  const navigate=useNavigate()
  console.log(auth)
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
        .post("http://localhost:4000/api/user/login",{username,
          password},{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials: true
        })
        .then((res)=>{
            if(res.data.message){
                toast.success(res.data.message)
            }
            navigate('/')
        }).catch((err)=>{
           toast.error(err.response.data.message)
           console.log(err.response.data.message)
        })
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-md p-8 rounded-xl shadow-lg transition-colors duration-300 ${dark ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className={`text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
          <div className="relative">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              <FiAtSign />
            </div>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              placeholder="Username"
              required
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                errors.username ? 'border-red-500' : dark ? 'border-gray-700' : 'border-gray-300'
              } ${dark ? 'bg-gray-700' : 'bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              <FiLock/>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Password"
              required
              className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                errors.password ? 'border-red-500' : dark ? 'border-gray-700' : 'border-gray-300'
              } ${dark ? 'bg-gray-700' : 'bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute inset-y-0 right-0 pr-3 flex items-center ${dark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                logging to an Account...
              </span>
            ) : 'Login'}
          </button>
        </form>

        <div className={`mt-6 text-center ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
          Don&apos;t have an acccount ?{' '}
          <Link to="/signUp" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          onClick={()=>{
            setAuth('signUp')
            // navigate("/signUp")
          }}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;