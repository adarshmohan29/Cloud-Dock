import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import Select from 'react-select';
import { Modal, ProgressBar } from 'react-bootstrap';

require("dotenv").config()

const baseUrl = 'http://localhost:3000/api/aws/create-instance'

function NewCompaign() {
   const [activeBudget, setActiveBudget] = useState("AWS");
   const [instance_name, setInstanceName] = useState("")
   const [email, setEmail] = useState("")
   const [description, setDescription] = useState("")
   const [title, setTitle] = useState("")
   const [selectedFramework, setSelectedFramework] = useState("");
   const [repositories, setRepositories] = useState([]);
   const [selectedRepository, setSelectedRepository] = useState("");
   const [selectedRepositoryCloneUrl, setSelectedRepositoryCloneUrl] = useState("");
   const [res_instance_id, set_response_instance_id] = useState("");
   const [error, setError] = useState(null); // State for holding error message
   const [showErrorModal, setShowErrorModal] = useState(false); // State for showing error modal
   const [showModal, setShowModal] = useState(false); // Modal visibility
   const [progress, setProgress] = useState(0); // API call progress
   const [allCallsSucceeded, setAllCallsSucceeded] = useState(false); // Flag for all API calls success
   const [errorOccurred, setErrorOccurred] = useState(false); // Flag for error occurrence
   const [firstApiResponse, setFirstApiResponse] = useState(null); // Response of the first API call
   const [secondApiResponse, setSecondApiResponse] = useState(null);
   const [thirdApiResponse, setThirdApiResponse] = useState(null); // Response of the third API call
   const [fourthApiResponse, setFourthApiResponse] = useState(null); // Response of the fourth API call
   const [fifthApiResponse, setFifthApiResponse] = useState(null); // Response of the fifth API call


   const [logText, setLogText] = useState(""); // Logs to display in the modal

   const handleSubmit = async (e) => {
      e.preventDefault();

      setShowModal(true); // Show the modal on button click

      try {
         // Call the instance creation API
         const response = await axios.post("http://localhost:3000/api/aws/create-instance", {
            instance_name: instance_name,
         });
         console.log('API Response:', response.data.instanceId);

         setFirstApiResponse(response.data); // Save response of the first API call
         setLogText(prevText => prevText + 'Deployment Logs: ' + JSON.stringify(response.data) + '\n');
         setProgress(20); // Update progress to 20%

         // Delay for 50 seconds
         await new Promise(resolve => setTimeout(resolve, 50000));

         if (!errorOccurred) {
            // Call other APIs only if no error has occurred
            // Second API call
            console.log('Second api calling...');
            setLogText(prevText => prevText + 'Docker installation calling...\n');
            const installResponse = await axios.post(`http://localhost:3000/api/install/instance/${response.data.instanceId}/docker-compose`);
            console.log('Install API Response:', installResponse.data);

            setSecondApiResponse(installResponse.data); // Save response of the second API call
            setLogText(prevText => prevText + 'Docker installation success: ' + JSON.stringify(installResponse.data) + '\n');
            setProgress(40); // Update progress to 40%

            // Third API call
            console.log('Third API calling...');
            setLogText(prevText => prevText + 'Code repository cloning....\n');
            const gitRepoResponse = await axios.post(`http://localhost:3000/api/code/instance/${response.data.instanceId}/git-repo`, {
               gitRepo: selectedRepositoryCloneUrl
            });
            console.log('Code Repository Cloned', gitRepoResponse.data);

            setThirdApiResponse(gitRepoResponse.data); // Save response of the third API call
            setLogText(prevText => prevText + 'Git Repo API Response: ' + JSON.stringify(gitRepoResponse.data) + '\n');
            setProgress(60); // Update progress to 60%

            // Fourth API call
            console.log('Adding caddy server configs and calling...');
            setLogText(prevText => prevText + 'Adding Docker file templates and caddy configs...\n');
            const dockerFilesResponse = await axios.post(`http://localhost:3000/api/code/instance/${response.data.instanceId}/dockerfiles`, {
               language: selectedFramework
            });
            console.log('Docker Files API Response:', dockerFilesResponse.data);

            setFourthApiResponse(dockerFilesResponse.data); // Save response of the fourth API call
            setLogText(prevText => prevText + 'Docker Files API Response: ' + JSON.stringify(dockerFilesResponse.data) + '\n');
            setProgress(80); // Update progress to 80%

            // Fifth API call
            console.log('Fifth API calling...');
            setLogText(prevText => prevText + 'Starting Your App...\n');
            const startWebsiteResponse = await axios.post(`http://localhost:3000/api/code/instance/${response.data.instanceId}/startWebsite`);
            console.log('Start Website API Response:', startWebsiteResponse.data);

            setFifthApiResponse(startWebsiteResponse.data); // Save response of the fifth API call
            setLogText(prevText => prevText + 'Start App: ' + JSON.stringify(startWebsiteResponse.data) + '\n');
            setProgress(100); // Update progress to 100%

            // All API calls succeeded
            setAllCallsSucceeded(true);
         }

      } catch (error) {
         console.error('Error calling API:', error);
         setErrorOccurred(true); // Set flag to indicate error occurrence
         setLogText(prevText => prevText + 'Error calling API: ' + error + '\n');
         // Handle error
      } finally {
         // Close the modal only if all API calls are done or error occurs
         if (allCallsSucceeded || errorOccurred) {
            setShowModal(false);
         }
      }
   };
   useEffect(() => {
      // Fetch repositories from the endpoint
      axios.get("http://localhost:3000/api/github/allrepos")
         .then(response => {
            setRepositories(response.data);
         })
         .catch(error => {
            console.error('Error fetching repositories:', error);
            setError('Error fetching repositories. Please try again later.'); // Set error message
            setShowErrorModal(true); // Show error modal
         });
   }, []);

   const handleRepositoryChange = (selectedOption) => {
      if (selectedOption) {
         setSelectedRepository(selectedOption.value);
         setSelectedRepositoryCloneUrl(selectedOption.cloneUrl);
      } else {
         setSelectedRepository("");
         setSelectedRepositoryCloneUrl("");
      }
   };
   console.log(selectedFramework);
   console.log(selectedRepositoryCloneUrl)
   console.log()
   return (
      <>


         <div className="form-head d-flex mb-2 mb-sm-3 mb-lg-5 align-items-center">
            <div className="mr-auto d-none d-lg-block">
               <h2 className="text-black font-w600">New Deployment</h2>
               <div>
                  <Link
                     to="/new-compaign"
                     className="fs-18 text-primary font-w600"
                  >
                     Deployment
                  </Link>
                  <Link to="/new-compaign" className="fs-18">
                     / new Instance
                  </Link>
               </div>
            </div>
         </div>
         <div className="col-xl-9 col-xxl-8 col-lg-12">
            <div className="row">
               <div className="col-xl-12">
                  <div className="card">
                     <div className="card-header pb-0 border-0">
                        <h3 className="fs-20 text-black">
                           Create your Instance
                        </h3>
                     </div>
                     <div className="card-body">
                        <form onSubmit={handleSubmit}>
                           <div className="form-group col-xl-12">
                              <label className="text-black font-w500 mb-3">
                                 Select Your Cloud Provider
                              </label>
                              <span className="text-danger ml-1"></span>
                              <div
                                 className="btn-group budget-check"
                                 data-toggle="buttons"
                              >
                                 <label
                                    className={`btn btn-outline-primary light btn-sm ${activeBudget === "AWS"
                                       ? "active"
                                       : ""
                                       }`}
                                    onClick={() =>
                                       setActiveBudget("AWS")
                                    }
                                 >
                                    <input
                                       type="radio"
                                       className="position-absolute invisible"
                                       name="options"
                                       id="option2"
                                    />
                                    AWS
                                 </label>
                                 <label
                                    className={`btn btn-outline-primary light btn-sm ${activeBudget === "AZURE"
                                       ? "active"
                                       : ""
                                       }`}
                                    onClick={() =>
                                       setActiveBudget("AZURE")
                                    }
                                 >
                                    <input
                                       type="radio"
                                       className="position-absolute invisible"
                                       name="options"
                                       id="option3"
                                    />
                                    AZURE
                                 </label>
                                 <label
                                    className={`btn btn-outline-primary light btn-sm ${activeBudget === "GCP"
                                       ? "active"
                                       : ""
                                       }`}
                                    onClick={() =>
                                       setActiveBudget("GCP")
                                    }
                                 >
                                    <input
                                       type="radio"
                                       className="position-absolute invisible"
                                       name="options"
                                       id="option4"
                                    />
                                    GCP
                                 </label>
                              </div>
                              <input
                                 type="text"
                                 className="form-control fs-24 text-center text-black mb-3"
                                 placeholder=""
                                 value={activeBudget}
                              />
                           </div>
                           <div className="form-row">
                              <div className="form-group col-xl-12">
                                 <label className="text-black font-w500 mb-3">
                                    INSTANCE NAME
                                 </label>
                                 <span className="text-danger ml-1">*</span>
                                 <input
                                    type="text"
                                    className="form-control"
                                    placeholder="--"
                                    value={instance_name}
                                    onChange={(e) => setInstanceName(e.target.value)}
                                 />
                              </div>
                              <div className="form-group col-xl-12">
                                 <label className="text-black font-w500 mb-3">
                                    ACCESS KEY
                                 </label>
                                 <span className="text-danger ml-1">*</span>
                                 <input
                                    type="text"
                                    className="form-control"
                                    placeholder="--"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                 />
                              </div>
                              <div className="form-group col-xl-12">
                                 <label className="text-black font-w500 mb-3">
                                    SECRET KEY
                                 </label>
                                 <span className="text-danger ml-1">*</span>
                                 <input
                                    type="text"
                                    className="form-control"
                                    placeholder="--"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                 />
                              </div>
                              <div className="form-group col-xl-12">
                                 <label className="text-black font-w500 mb-3">
                                    Select Repository
                                 </label>
                                 <span className="text-danger ml-1">*</span>

                                 <Select
                                    options={repositories.map(repo => ({
                                       value: repo.name,
                                       label: repo.name,
                                       cloneUrl: repo.clone_url
                                    }))}
                                    value={{ value: selectedRepository, label: selectedRepository }}
                                    onChange={handleRepositoryChange}
                                    placeholder="Select Repository"
                                    menuPlacement="auto"
                                 />

                              </div>
                              <div className="form-group col-xl-12">
                                 <label className="text-black font-w500 mb-3">
                                    Framework
                                 </label>
                                 <span className="text-danger ml-1">*</span>

                                 <Select
                                    options={[
                                       { value: "nodejs", label: "Node.js" },
                                       { value: "react", label: "React" },
                                       { value: "django", label: "Django" }
                                    ]}
                                    value={{ value: selectedFramework, label: selectedFramework }}
                                    onChange={(selectedOption) => setSelectedFramework(selectedOption.value)}
                                    placeholder="Select Framework"
                                    menuPlacement="auto"
                                 />
                              </div>
                              <div className="form-group col-xl-12">
                                 <label className="text-black font-w500 mb-3">
                                    Description
                                 </label>
                                 <textarea
                                    className="form-control"
                                    rows={13}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                 />
                              </div>

                           </div>
                           <div>
                              <button type="submit" className="btn btn-primary ml-3">
                                 DEPLOY
                              </button>

                              <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
                                 <Modal.Header closeButton>
                                    <Modal.Title>API Calls in Progress</Modal.Title>
                                 </Modal.Header>
                                 <Modal.Body style={{ textAlign: 'center' }}>
                                    {errorOccurred ? (
                                       <p style={{ color: 'red' }}>Error occurred during API calls. Please try again later.</p>
                                    ) : (
                                       <>
                                          <p>Deployment in progress...</p>
                                          <ProgressBar now={progress} label={`${progress}%`} />
                                          <div style={{ whiteSpace: 'pre-line', marginTop: '20px' }}>
                                             <pre>{logText}</pre>
                                          </div>
                                       </>
                                    )}
                                 </Modal.Body>
                                 {allCallsSucceeded }
                              </Modal>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default NewCompaign;


