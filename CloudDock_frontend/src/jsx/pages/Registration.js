import React, { useState , useEffect } from "react";
import { Link,useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";

function Register() {
   // const [registrationData, setRegistrationData] = useState({});
   // const handleBlur = (e) => {
   //    const newRegistrationData = { ...registrationData };
   //    newRegistrationData[e.target.name] = e.target.value;
   //    setRegistrationData(newRegistrationData);
   // };
   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/dashboard");
  }, [user, loading]);


   // const submitHandler = (e) => {
   //    e.preventDefault();
   //    history.push("/");
   // };
   // async function registerUser(event){
   //    event.preventDefault();
   //    const response = await fetch("http://localhost:3000/react/page-register",{
   //       method: "POST",
   //       headers: {
   //          'Content-Type': "application/json"
   //       },
   //       body: JSON.stringify({
   //          name,
   //          email,
   //          password,
   //       }),
   //    })
   //    const data = await response.json();

   //    if(data.status==="ok"){
   //       history.push("/page-login")
   //    }
   //    console.log(data);
   // }
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
                                 Sign up your account
                              </h4>
                              <form
                                 action=""
                                 onSubmit={register}
                              >
                                 <div className="form-group">
                                    <label className="mb-1">
                                       <strong>Username</strong>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                      placeholder="Full Name"
                                     />
                                 </div>
                                 <div className="form-group">
                                    <label className="mb-1">
                                       <strong>Email</strong>
                                    </label>
                                    <input
                                     type="text"
                                     className="form-control"
                                     value={email}
                                     onChange={(e) => setEmail(e.target.value)}
                                     placeholder="E-mail Address"
                                     />
                                 </div>
                                 <div className="form-group">
                                    <label className="mb-1">
                                       <strong>Password</strong>
                                    </label>
                                    <input
                                       type="password"
                                       className="form-control"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       placeholder="Password"
                                    />
                                 </div>
                                 <div className="text-center mt-4">
                                    <input
                                       type="submit"
                                       value=" Sign me up"
                                       className="btn btn-primary btn-block"
                                    />
                                 </div>
                              </form>
                              <div className="new-account mt-3">
                                 <p>
                                    Already have an account?{" "}
                                    <Link
                                       className="text-primary"
                                       to="/page-login"
                                    >
                                       Sign in
                                    </Link>
                                 </p>
                              </div>
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

export default Register;
