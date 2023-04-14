import PropTypes from "prop-types"
import { connect } from "react-redux"
import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { Row, Col, Card, CardBody, Container, Alert } from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import axios from "axios"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { addClient, addClientFailed } from "../../store/actions"

const API = "http://localhost:8000/admin"

const AddClient = props => {
  const [users, setUsers] = useState([]);
  const [inputs, setInputs] = useState({});

  const [isValid, setIsValid] = useState(false);

  const [file, setFile] = useState({
    image_file: null,
    image_preview: "",
    formattedSize: "",
  })

  useEffect(() => {
    Promise.all([axios.get(`${API}/getUserName`)]).then(([data1]) =>
      setUsers(data1.data.data)
    )
  }, []);

  useEffect(() => {
    setIsValid(inputs.user ? true : false);
  }, [inputs.user]);

  useEffect(() => {
    props.addClientFailed("")
  }, [])


  const handleValidSubmit = (event, values) => {
    let formData = new FormData()
    formData.append("businessNo", inputs.businessNo);
    formData.append("name", inputs.name);
    formData.append("email", inputs.email);
    formData.append("phone", inputs.phone);
    formData.append("address", inputs.address);
    formData.append("files", file.image_file);
    formData.append("user", inputs.user);
    props.addClient(formData);
  }

  const handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  };

  function handleAcceptedFiles(event) {
    let files = event.target.files;
    let image_as_base64 = URL.createObjectURL(files[0])
    let image_as_files = files[0]
    setFile({
      image_preview: image_as_base64,
      image_file: image_as_files,
      formattedSize: formatBytes(image_as_files.size),
    })
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Clients | Invoice - Admin Dashboard</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs maintitle="Dashboard" breadcrumbItem="Clients" />
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={4}>
                <Card className="overflow-hidden">
                  <CardBody className="p-4">
                    <div className="p-3">
                      <AvForm
                        className="mt-4"
                        onValidSubmit={(e, v) => {
                          handleValidSubmit(e, v)
                        }}
                      >
                        {props.user && props.user ? (
                          <Alert color="success">
                            Client added successfully!
                          </Alert>
                        ) : null}

                        {props.addingError && props.addingError ? (
                          <Alert color="danger">{props.addingError}</Alert>
                        ) : null}

                        <div className="mb-3">
                          <AvField
                            name="businessNo"
                            label="Business No."
                            type="text"
                            value=""
                            required
                            placeholder="Enter Business Number"
                            onChange={handleChange}
                          />
                        </div>

                        <div className="mb-3">
                          <AvField
                            name="name"
                            label="Name"
                            type="text"
                            value=""
                            required
                            placeholder="Enter name"
                            onChange={handleChange}
                          />
                        </div>

                        <div className="mb-3">
                          <AvField
                            name="email"
                            label="Email"
                            type="email"
                            value=""
                            required
                            placeholder="Enter email"
                            onChange={handleChange}
                          />
                        </div>

                        <div className="mb-3">
                          <AvField
                            name="phone"
                            label="Phone"
                            type="number"
                            value=""
                            required
                            placeholder="Enter phone number"
                            onChange={handleChange}
                          />
                        </div>

                        <div className="mb-3">
                          <AvField
                            name="address"
                            label="Address"
                            type="textarea"
                            value=""
                            required
                            placeholder="Enter your address"
                            onChange={handleChange}
                          />
                        </div>

                        <div className="mb-3">
                          <AvField
                            name="files"
                            label="Select Logo"
                            type="file"
                            accept="image/*"
                            value=""
                            required
                            onChange={handleAcceptedFiles}
                          />
                        </div>

                        <div className="mb-3">
                          <div className="form-group">
                            <select
                              className="form-control"
                              name="user"
                              onChange={handleChange}
                              required
                            >
                              <option value="">---Select User---</option>
                              {users.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                            {!isValid && <p>You must choose user</p>}
                          </div>
                        </div>

                        <div className="mb-3 row">
                          <div className="col-12 text-center">
                            <button
                              className="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                              disabled={!isValid}
                            >
                              Add Client
                            </button>
                          </div>
                        </div>
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>

        </div>
      </div >
    </React.Fragment >
  )
}

AddClient.propTypes = {
  addClient: PropTypes.func,
  addClientFailed: PropTypes.func,
  addingError: PropTypes.any,
  user: PropTypes.any,
}

const mapStatetoProps = state => {
  const { user, addingError, loading } = state.client
  return { user, addingError, loading }
}

export default connect(mapStatetoProps, {
  addClient,
  addClientFailed,
})(AddClient)

