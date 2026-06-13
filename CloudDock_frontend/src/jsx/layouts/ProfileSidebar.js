import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import profileImage from "../../images/profile/profile.png";
import avatar from "../../images/avatar/1.png"

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

function ProfileSidebar({ addClass, hideProfile }) {
   const {user,isAuthenticated,isLoading}=useAuth0();
   const [info,setinfo]=useState("");

   useEffect(()=>{

      const fetchData = async () => {
         try {
            const res=await axios.get(`/api/profiles/${isAuthenticated && user.email}`);
            console.log(res.data);
             setinfo(res.data);
            
      
         } catch (error) {
            console.log(error);
         }
        };
      
      console.log(info);
         
      
      
         fetchData();
     },[]);
   


   return (
      <PerfectScrollbar
         className={`profile-sidebar dz-scroll ${addClass}`}
         id="DZ_W_Sidebar"
      >
         <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 className="text-black">Profile</h5>
            <Link
               to="/app-profile"
               className="text-red text-primary edit-profile-link"
            >
               Edit
            </Link>
            <Link
               to="#"
               className="text-red d-none close-side"
               onClick={() => hideProfile()}
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x-circle"
               >
                  <circle cx={12} cy={12} r={10} />
                  <line x1={15} y1={9} x2={9} y2={15} />
                  <line x1={9} y1={9} x2={15} y2={15} />
               </svg>
            </Link>
         </div>
         <div className="profile-img mb-4">
            <img src={avatar} width={140} height={140} alt="" />
         </div>
         <div className="profile-info-bx mb-4">
            <h4 className="mb-1 fs-22">{isAuthenticated && info.username}</h4>
            <span>venki21122@gmail.com</span>
         </div>
         <div className="text-center mb-5">
            {/* <Link to="#" className="btn text-left light btn-dark d-block mb-3 ">
               <i className="fa fa-instagram scale5 mr-3" />
               /samuelanderson.404
            </Link> */}
            {/* <Link to="#" className="btn text-left light btn-dark d-block mb-3 ">
               <i className="fa fa-twitter scale5 mr-3" />
               /samuel.404nderson
            </Link> */}
            <Link to="#" className="btn text-left light btn-dark d-block mb-4 ">
               <i className="fa fa-github scale5 mr-3" />
               /Venki200221
            </Link>
            {/* <Link
               to="/app-profile"
               className="btn btn-outline-dark d-block btn-lg"
            >
               Edit Profile
            </Link> */}
         </div>
         <hr />
         {/* <div className="card-campaign mt-5">
            <h5>Ad Campaign Tutorials Video</h5>
            <Link to="#" className="fa fa-play" />
         </div> */}
      </PerfectScrollbar>
   );
}

export default ProfileSidebar;
