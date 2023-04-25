import React, { useState, useEffect } from "react"
import axios from "axios"
import MetaTags from "react-meta-tags"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
const API = "http://localhost:8000/admin"

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    Promise.all([axios.get(`${API}/getCountsOfUser`)]).then(([data1]) =>
      setUsers(data1.data.data)
    )
  }, [])

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
        label: "Registered date",
        field: "date",
        sort: "asc",
        width: 150,
      },
    ],
    rows: users,
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Users | Invoice - Admin Dashboard</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs maintitle="Dashboard" breadcrumbItem="Users" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4" style={{ textAlign: "center" }}>
                    Registered Users
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

export default Users
