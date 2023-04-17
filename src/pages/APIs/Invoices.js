import React, { useState, useEffect } from "react"
import axios from "axios"
import MetaTags from "react-meta-tags"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"

import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
const API = "http://localhost:8000/admin"

const Invoices = () => {
  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    Promise.all([axios.get(`${API}/getCountsOfInvoices`)]).then(([data1]) =>
      setInvoices(data1.data)
    )
  }, []);

  invoices.forEach((el) => {
    el.access_path = (
      <a href={el.access_path ? el.access_path : "https://www.google.com/"} target="_blank">Click to see invoice</a>
    )
  })


  const data = {
    columns: [
      {
        label: "Invoice No.",
        field: "invoiceNumber",
        sort: "asc",
        width: 150,
      },
      {
        label: "Name",
        field: "clientName",
        sort: "asc",
        width: 150,
      },
      {
        label: "Email",
        field: "clientEmail",
        sort: "asc",
        width: 270,
      },
      {
        label: "View Invoice",
        field: "access_path",
        sort: "asc",
        width: 270,
      },
      {
        label: "Total Amount",
        field: "total",
        sort: "asc",
        width: 100,
      },
      {
        label: "Invoice date",
        field: "createdAt",
        sort: "asc",
        width: 150
      }
    ],
    rows: invoices,
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Invoices | Invoice - Admin Dashboard</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs maintitle="Dashboard" breadcrumbItem="Invoices" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <Link to="/add-clients" className="btn btn-primary"><i className="mdi mdi-account-plus" /> Add Clients</Link>
                  <CardTitle className="h4" style={{ textAlign: "center" }}>
                    All Invoices
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

export default Invoices
