import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Media,
  Button,
} from "reactstrap"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// Redux
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/users/user-4.jpg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"

import axios from "axios"

const API = "http://localhost:8000/users"

const UserProfile = props => {
  const [data, setData] = useState({})

  const token = JSON.parse(localStorage.getItem("authUser"))

  useEffect(() => {
    Promise.all([axios.post(`${API}/get-profile`, { token: token })]).then(
      ([data1]) => setData(data1.data.data)
    )
  }, [])

  // const [email, setemail] = useState("")
  // const [name, setname] = useState("")
  // const [idx, setidx] = useState(1)

  // useEffect(() => {
  //   if (localStorage.getItem("authUser")) {
  //     const obj = JSON.parse(localStorage.getItem("authUser"))
  //     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
  //       setname(obj.displayName)
  //       setemail(obj.email)
  //       setidx(obj.uid)
  //     } else if (
  //       process.env.REACT_APP_DEFAULTAUTH === "fake" ||
  //       process.env.REACT_APP_DEFAULTAUTH === "jwt"
  //     ) {
  //       setname(obj.username)
  //       setemail(obj.email)
  //       setidx(obj.uid)
  //     }
  //     setTimeout(() => {
  //       props.resetProfileFlag()
  //     }, 3000)
  //   }
  // }, [props.success])

  function handleValidSubmit(event, values) {
    values = { ...values, token }
    props.editProfile(values)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Invoice - Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb maintitle="Dashboard" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {props.error && props.error ? (
                <Alert color="danger">{props.error}</Alert>
              ) : null}
              {props.success ? (
                <Alert color="success">{props.success}</Alert>
              ) : null}

              <Card>
                <CardBody>
                  <Row>
                    <Col lg="4">
                      <div className="ms-3" style={{ textAlign: "end" }}>
                        <img
                          src={avatar}
                          alt=""
                          className="avatar-md rounded-circle img-thumbnail"
                        />
                      </div>
                    </Col>
                    <Col lg="8">
                      <div className="align-self-center flex-1">
                        <div className="text-muted">
                          <h5>{data.name}</h5>
                          <p className="mb-1">Email: {data.email}</p>
                          <p className="mb-0">
                            Phone no: {data.phone ? data.phone : "-"}
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Edit Profile</h4>

          <Card>
            <CardBody>
              <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {
                  handleValidSubmit(e, v)
                }}
              >
                <div className="mb-3">
                  <AvField
                    name="name"
                    label="Name"
                    value={data.name || ""}
                    className="form-control"
                    placeholder="Enter Name"
                    type="text"
                    required
                  />
                  <AvField name="id" value={data.id || ""} type="hidden" />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Edit Profile
                  </Button>
                </div>
              </AvForm>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

UserProfile.propTypes = {
  editProfile: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any,
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, { editProfile, resetProfileFlag })(UserProfile)
)
