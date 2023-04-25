import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import axios from "axios"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

// import images
import servicesIcon1 from "../../assets/images/services-icon/01.png"
import servicesIcon2 from "../../assets/images/services-icon/02.png"
import servicesIcon3 from "../../assets/images/services-icon/03.png"

import "chartist/dist/scss/chartist.scss"

//i18n
import { withTranslation } from "react-i18next"

const API = "http://localhost:8000/admin"

const Dashboard = props => {
  const [data, setData] = useState({})

  useEffect(() => {
    Promise.all([axios.get(`${API}/getCountsForDashboard`)])
      // .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1]) => setData(data1.data.data))
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            Dashboard | Invoice - Responsive Bootstrap 5 Admin Dashboard
          </title>
        </MetaTags>
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">Dashboard</h6>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">
                    Welcome to Invoice Dashboard
                  </li>
                </ol>
              </Col>

              <Col md="4"></Col>
            </Row>
          </div>
          <Row>
            <Col xl={4} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon1} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Users
                    </h5>
                    <h4 className="fw-medium font-size-24">{data.user}</h4>
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="/users" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>
                    <p className="text-white-50 mb-0 mt-1">Click to view</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon2} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Clients
                    </h5>
                    <h4 className="fw-medium font-size-24">{data.client}</h4>
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="/clients" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>

                    <p className="text-white-50 mb-0 mt-1">Click to view</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon3} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Invoices
                    </h5>
                    <h4 className="fw-medium font-size-24">{data.invoice}</h4>
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="/invoices" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>

                    <p className="text-white-50 mb-0 mt-1">Click to view</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
}

export default withTranslation()(Dashboard)
