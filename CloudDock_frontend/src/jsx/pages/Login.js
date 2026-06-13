import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

const Login = ({ history }) => {
   const{loginWithRedirect}=useAuth0();
   // const [loginData, setLoginData] = useState({});
   // const handleBlur = (e) => {
   //    const newLoginData = { ...loginData };
   //    newLoginData[e.target.name] = e.target.value;
   //    setLoginData(newLoginData);
   // };


   // const submitHandler = (e) => {
   //    e.preventDefault();
   //    history.push("/");
   // };

  
    
   
   return (
      <div className="authincation h-100 p-meddle">
         <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
               <div className="col-md-6">
                  <div className="authincation-content">
                     <div className="row no-gutters">
                        <div className="col-xl-12">
                           <div className="auth-form">
                              <h4 className="text-center mb-4">
                                 Sign in your account
                              </h4>
                              {/* <form
                                 action=""
                                
                              >
                                 {/* <div className="form-group">
                                    <label className="mb-1">
                                       <strong>Email</strong>
                                    </label>
                                    <input
                                       type="email"
                                       className="form-control"
                                       placeholder="hello@example.com"
                                       name="email"
                                       value={email}
                                       onChange={(e)=> setEmail(e.target.value)}
                                       // onChange={handleBlur}
                                    />
                                 </div> */}
                                 {/* <div className="form-group">
                                    <label className="mb-1">
                                       <strong>Password</strong>
                                    </label>
                                    <input
                                       type="password"
                                       className="form-control"
                                       defaultValue="Password"
                                       name="password"
                                       value={password}
                                       onChange={(e)=> setPassword(e.target.value)}
                                       // onChange={handleBlur}
                                    />
                                 </div> */}
                                 {/* <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                    <div className="form-group">
                                       <div className="custom-control custom-checkbox ml-1">
                                          {/* <input
                                             type="checkbox"
                                             className="custom-control-input"
                                             id="basic_checkbox_1"
                                          />
                                          <label
                                             className="custom-control-label"
                                             htmlFor="basic_checkbox_1"
                                          >
                                             Remember my preference
                                          </label> 
                                       </div>
                                    </div>
                                    {/* <div className="form-group">
                                       <Link to="/page-forgot-password">
                                          Forgot Password?
                                       </Link>
                                    </div>
                                 </div> */}
                                 {/* <div className="text-center">
                                    <input
                                       type="submit"
                                       value="Sign Me In"
                                       className="btn btn-primary btn-block"
                                    />
                                 </div> 
                              </form> */}

                              <form>
                                 <div className="text-center">
                                  <button
                                    type="submit"
                                    className="btn bg-white text-primary btn-block"
                                    onClick={()=>loginWithRedirect()}
                                  >
                                    Sign In
                                  </button>
                                </div>
                              </form>


                              {/* <div className="new-account mt-3">
                                 <p>
                                    Don't have an account?{" "}
                                    <Link
                                       className="text-primary"
                                       to="/page-register"
                                    >
                                       Sign up
                                    </Link>
                                 </p>
                              </div> */}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;

// {/* 
// function Login() {
//    const [email, setEmail] = useState("");
//    const [password, setPassword] = useState("");
//    const [user, loading, error] = useAuthState(auth);
//    const navigate = useNavigate();
//    useEffect(() => {
//      if (loading) {
//        // maybe trigger a loading screen
//        return;
//      }
//      if (user) navigate("/dashboard");
//    }, [user, loading]);
//    return (
//      <div className="login">
//        <div className="login__container">
//          <input
//            type="text"
//            className="login__textBox"
//            value={email}
//            onChange={(e) => setEmail(e.target.value)}
//            placeholder="E-mail Address"
//          />
//          <input
//            type="password"
//            className="login__textBox"
//            value={password}
//            onChange={(e) => setPassword(e.target.value)}
//            placeholder="Password"
//          />
//          <button
//            className="login__btn"
//            onClick={() => signInWithEmailAndPassword(email, password)}
//          >
//            Login
//          </button>
//          <button className="login__btn login__google" onClick={signInWithGoogle}>
//            Login with Google
//          </button>
//          <div>
//            <Link to="/reset">Forgot Password</Link>
//          </div>
//          <div>
//            Don't have an account? <Link to="/register">Register</Link> now.
//          </div>
//        </div>
//      </div>
//    );
//  }
//  export default Login; */}