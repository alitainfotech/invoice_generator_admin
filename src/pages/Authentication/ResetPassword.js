import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React from "react"
import { Row, Col, Alert, Card, CardBody, Container } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// action
import { userResetPassword } from "../../store/actions"

// import images
import logoSm from "../../assets/images/logo-sm.png"

const ResetPasswordPage = props => {
  let token = props.match.params.token
  function handleValidSubmit(event, values) {
    values = { ...values, token }
    props.userResetPassword(values, props.history)
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>
          Reset Password | Invoice - Responsive Bootstrap 5 Admin Dashboard
        </title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2"></i>
        </Link>
      </div>
      <div className="account-pages my-5 pt-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={4}>
              <Card className="overflow-hidden">
                <div className="bg-primary">
                  <div className="text-primary text-center p-4">
                    <h5 className="text-white font-size-20 p-2">
                      Reset Password
                    </h5>
                    <a href="index.html" className="logo logo-admin">
                      <img src={logoSm} height="24" alt="logo" />
                    </a>
                  </div>
                </div>
                <CardBody className="p-4">
                  {props.resetError && props.resetError ? (
                    <Alert
                      color="danger"
                      style={{ marginTop: "13px" }}
                      className="mt-5"
                    >
                      {props.resetError}
                    </Alert>
                  ) : null}
                  {props.resetSuccessMsg ? (
                    <Alert
                      color="success"
                      style={{ marginTop: "13px" }}
                      className="mt-5"
                    >
                      {props.resetSuccessMsg}
                    </Alert>
                  ) : null}

                  <AvForm
                    className="form-horizontal mt-4"
                    onValidSubmit={(e, v) => handleValidSubmit(e, v)}
                  >
                    <div className="mb-3">
                      <AvField
                        name="newPass"
                        label="New Password"
                        className="form-control"
                        placeholder="Enter New Password"
                        type="password"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <AvField
                        name="confPass"
                        label="Confirm Password"
                        className="form-control"
                        placeholder="Enter Confirm Password"
                        type="password"
                        required
                      />
                    </div>
                    <Row className="mb-3">
                      <Col className="text-end">
                        <button
                          className="btn btn-primary w-md waves-effect waves-light"
                          type="submit"
                        >
                          Submit
                        </button>
                      </Col>
                    </Row>
                  </AvForm>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Remember It ?{" "}
                  <Link to="/login" className="fw-medium text-primary">
                    {" "}
                    Sign In here{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Invoice. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ResetPasswordPage.propTypes = {
  resetError: PropTypes.any,
  resetSuccessMsg: PropTypes.any,
  history: PropTypes.object,
  userResetPassword: PropTypes.func,
}

const mapStatetoProps = state => {
  const { resetError, resetSuccessMsg } = state.ResetPassword
  return { resetError, resetSuccessMsg }
}

export default withRouter(
  connect(mapStatetoProps, { userResetPassword })(ResetPasswordPage)
)
