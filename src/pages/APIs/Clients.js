import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import MetaTags from "react-meta-tags"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"

import logoDefault from "../../assets/images/bg.jpg"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
const API = "http://localhost:8000/admin"

const Clients = () => {
  const [clients, setClients] = useState([])

  useEffect(() => {
    Promise.all([axios.get(`${API}/getCountsOfClients`)]).then(([data1]) =>
      setClients(data1.data.data)
    )
  }, [])

  clients.forEach(el => {
    el.access_path = (
      <img
        src={el.access_path}
        alt="logo"
        width="50px"
        height="50px"
        onError={e => {
          e.target.onError = null
          e.target.src = logoDefault
        }}
      />
    )
  })

  const data = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 270,
      },
      {
        label: "Logo",
        field: "access_path",
        sort: "asc",
        width: 270,
      },
      {
        label: "User",
        field: "user",
        sort: "asc",
        width: 100,
      },
      {
        label: "Registered date",
        field: "date",
        sort: "asc",
        width: 150,
      },
    ],
    rows: clients,
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Clients | Invoice - Admin Dashboard</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs maintitle="Dashboard" breadcrumbItem="Clients" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <Link to="/add-clients" className="btn btn-primary">
                    <i className="mdi mdi-account-plus" /> Add Clients
                  </Link>
                  <CardTitle className="h4" style={{ textAlign: "center" }}>
                    Registered Clients
                  </CardTitle>
                  <p className="card-title-desc"> </p>

                  <MDBDataTable responsive striped bordered data={data} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Clients
