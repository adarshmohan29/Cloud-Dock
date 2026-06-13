import React, { useState } from "react";



import axios from 'axios'


const baseUrl = 'http://localhost:3001/api/pitch/verify'
const rejectUrl='http://localhost:3001/api/pitch/reject'

function AdminApprove() {
   
const [email,setEmail] = useState("")

const [title,setTitle] = useState("")

  let Pitch=(e)=>{
   e.preventDefault()

   async function request(){
      
     await axios
    .post(baseUrl, email,title)
      .then(response => {
         /*console.log(response)*/
        setEmail('')
        setTitle('')
        console.log('Thank you for the feedback')
      })
      .catch((er)=>{console.log(er)})
    }
    
    request();

  }
  let Reject=(e)=>{
   e.preventDefault()

   async function rejectRequest(){
      
     await axios
    .post(rejectUrl, email,title)
      .then(response => {
         /*console.log(response)*/
        setEmail('')
        setTitle('')
        console.log('Thank you for the feedback')
      })
      .catch((er)=>{console.log(er)})
    }
    
    rejectRequest()

  }
  
 

   return (
     
      <>
         <div className="form-head d-flex mb-2 mb-sm-3 mb-lg-5 align-items-center">
            <div className="mr-auto d-none d-lg-block">
               <h2 className="text-black font-w600">Kindly approve or reject the pitch</h2>
               
            </div>
   
         </div>
         <div className="row">
            <div className="col-xl-9 col-xxl-8 col-lg-8">
               <div className="row">
                  <div className="col-xl-12">
                     <div className="card">
                        <div className="card-header pb-0 border-0">
                           <h3 className="fs-20 text-black">
                              Please enter the pitch publisher's details
                           </h3>
                        </div>
                        <div className="card-body">
                           <form>
                              <div className="form-row">
                                 
                                 <div className="form-group col-xl-12">
                                    <label className="text-black font-w500 mb-3">
                                        Title
                                    </label>
                                    <span className="text-danger ml-1">*</span>
                                    <input
                                       type="text"
                                       className="form-control"
                                       placeholder="--"
                                       value={title}
                                       onChange={(e)=>setTitle(e.target.value)}
                                    />
                                 </div>
                                 <div className="form-group col-xl-12">
                                    <label className="text-black font-w500 mb-3">
                                      Email
                                    </label>
                                    <span className="text-danger ml-1">*</span>
                                    <input
                                       type="email"
                                       className="form-control"
                                       placeholder="--"
                                       value={email}
                                       onChange={(e)=>setEmail(e.target.value)}
                                    />
                                 </div>
                                 <div>
               <button className="btn btn-primary ml-3" onClick={Pitch}>
                 APPROVE
               </button>
            </div>
            
            <div>
            <button className="btn btn-danger ml-3" onClick={Reject}>
                 REJECT
               </button>
   </div>
                              
                           </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </div>
         
      </>
     
   );
}

export default AdminApprove;