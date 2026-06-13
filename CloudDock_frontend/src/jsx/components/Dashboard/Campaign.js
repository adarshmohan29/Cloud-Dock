import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChartDoughnut2 from "../charts/Chartjs/donught2";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

function Campaign() {
  const [instances, setInstances] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch instance data from the API
    axios
      .get("http://localhost:3000/api/details/instances")
      .then((response) => {
        setInstances(response.data); // Update instances state with API response
      })
      .catch((error) => {
        console.error("Error fetching instance data:", error);
      });
  }, []);

  const handleStartInstance = async (instanceId) => {
    try {
      // Trigger API to start the instance
      await axios.post(`http://localhost:3000/api/details/instances/${instanceId}/start`);
      setSuccessMessage(`Instance ${instanceId} has been started successfully.`);
      setShowModal(true);
    } catch (error) {
      console.error("Error starting instance:", error);
      setErrorMessage(`Failed to start instance ${instanceId}.`);
      setShowModal(true);
    }
  };

  const handleStopInstance = async (instanceId) => {
    try {
      // Trigger API to stop the instance
      await axios.post(`http://localhost:3000/api/details/instances/${instanceId}/stop`);
      setSuccessMessage(`Instance ${instanceId} has been stopped successfully.`);
      setShowModal(true);
    } catch (error) {
      console.error("Error stopping instance:", error);
      setErrorMessage(`Failed to stop instance ${instanceId}.`);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const d = new Date();

  return (
    <>
      <div className="form-head d-flex mb-0 mb-lg-4 align-items-start">
        <div className="mr-auto d-none d-lg-block">
          <h2 className="text-black font-w600">Instances</h2>
          <p className="mb-0">Current Instance list</p>
        </div>
        <div className="d-none d-lg-flex align-items-center">
          <div className="text-right">
            <h3 className="fs-20 text-black mb-0">{d.getHours() + ':' + d.getMinutes()}</h3>
            <span className="fs-14">{d.toDateString()}</span>
          </div>
          <Link
            className="ml-4 text-black p-3 rounded border text-center width60"
            to="/campaign"
          >
            <i className="las la-cog scale5" />
          </Link>
        </div>
      </div>

      <div className="row">
        {instances.map((instance) => (
          <div
            key={instance.instanceId}
            className="col-lg-4 col-md-6 col-sm-12 mb-4"
          >
            <div className="card">
              <div className="card-body">
                <div className="media">
                  <div className="mr-4">
                    <ChartDoughnut2
                      backgroundColor={instance.status === "running" ? "#52B141" : "#FF0000"}
                      height="90"
                      width="90"
                      value={instance.status === "running" ? 100 : 100}
                    />
                    <small>
                      {instance.status}
                    </small>
                  </div>
                  <div className="media-body">
                    <h3 className="fs-20">
                      <Link className="text-black" to="/">
                        {instance.name}
                      </Link>
                    </h3>
                    <p className="text-muted">{instance.region}</p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-sm-6">
                    <p className="text-muted mb-1">Total Active Hours</p>
                    <h3 className="fs-20 text-black">
                      {(instance.hoursActive / 60).toFixed(3)}
                    </h3>
                  </div>
                  <div className="col-sm-6">
                    <p className="text-muted mb-1">Public IP Address</p>
                    <h3 className="fs-20 text-black">
                      {instance.publicIpAddress === "N/A" ? (
                        "N/A"
                      ) : (
                        <span style={{ color
: instance.status === "running" ? "#52B141" : "#FF0000" }}>
                          {instance.publicIpAddress}
                        </span>
                      )}
                    </h3>
                  </div>
                </div>
                <div className="text-right mt-3">
                  {instance.status === "stopped" && (
                    <button
                      className="btn bgl-primary text-primary mr-2"
                      onClick={() => handleStartInstance(instance.instanceId)}
                    >
                      <i className="las la-play"></i> Start
                    </button>
                  )}
                  {instance.status === "running" && (
                    <button
                      className="btn bgl-danger text-danger mr-2"
                      onClick={() => handleStopInstance(instance.instanceId)}
                    >
                      <i className="las la-stop-circle"></i> Stop
                    </button>
                  )}
                  <Link
                    to="/campaign"
                    className={`btn ${
                      instance.status === "running"
                        ? "bgl-primary text-primary"
                        : "bgl-danger text-danger"
                    }`}
                  >
                    {instance.status}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for success and error messages */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{successMessage ? "Success" : "Error"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage || errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Campaign;
