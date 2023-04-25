import PropTypes from "prop-types"
import { connect } from "react-redux"
import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Alert,
  Label,
  Input,
  Button,
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import axios from "axios"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Formik, Form, Field, FieldArray } from "formik"

import { addInvoice, addInvoiceFailed } from "../../store/actions"

const API = "http://localhost:8000/admin"

const AddInvoice = props => {
  const [users, setUsers] = useState([])
  const [clients, setClients] = useState([])

  const [total, setTotal] = useState(0)

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/getUserName`),
      axios.get(`${API}/getClientName`),
    ])
      // .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(
        ([data1, data2]) => (
          setUsers(data1.data.data), setClients(data2.data.data)
        )
      )
  }, [])

  useEffect(() => {
    props.addInvoiceFailed("")
  }, [])

  const handleValidSubmit = values => {
    values.total = total
    values.paymentDetails = {
      amountPaid: values.total,
      datePaid: new Date(),
      paymentMethod: "Cash",
      paidBy: values.client,
    }
    props.addInvoice(values)
  }

  const getRandomId = (min = 0, max = 500000) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const num = Math.floor(Math.random() * (max - min + 1)) + min
    return "INV" + num.toString().padStart(6, "0")
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Invoice | Invoice - Admin Dashboard</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs maintitle="Dashboard" breadcrumbItem="Invoice" />
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={4}>
                <Card className="overflow-hidden">
                  <CardBody className="p-4">
                    <div className="p-3">
                      <Formik
                        initialValues={{
                          invoiceNo: getRandomId(),
                          client: "",
                          user: "",
                          items: [{ itemName: "", unitPrice: "", quantity: 1 }],
                          balanceDue: 0,
                          dueDate: new Date().toISOString().substring(0, 10),
                          note: "",
                        }}
                        onSubmit={values => handleValidSubmit(values)}
                        render={({ handleChange, values, setFieldValue }) => (
                          <Form>
                            {props.user && props.user ? (
                              <Alert color="success">
                                Invoice added successfully!
                              </Alert>
                            ) : null}

                            {props.addingError && props.addingError ? (
                              <Alert color="danger">{props.addingError}</Alert>
                            ) : null}

                            <div className="mb-3">
                              <Field
                                className="form-control"
                                name="invoiceNo"
                                label="Invoice No."
                                type="text"
                                value={values.invoiceNo}
                                readOnly={true}
                              />
                            </div>

                            <div className="mb-3">
                              <Field
                                as="select"
                                className="form-control"
                                name="client"
                                required
                              >
                                <option value="">---Select Client---</option>
                                {clients.map((item, index) => (
                                  <option key={index} value={item.id}>
                                    {item.name} ({item.userId.name})
                                  </option>
                                ))}
                              </Field>
                            </div>

                            <div className="mb-3">
                              <Field
                                as="select"
                                className="form-control"
                                name="user"
                                required
                              >
                                <option value="">---Select User---</option>
                                {users.map((item, index) => (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </Field>
                            </div>

                            <div className="mb-3">
                              <FieldArray
                                name="items"
                                render={arrayHelpers => (
                                  <div>
                                    {values.items && values.items.length > 0 ? (
                                      values.items.map((item, index) => (
                                        <div key={index} className="row">
                                          <div className="col-md-5">
                                            <Field
                                              className="form-control"
                                              type="text"
                                              name={`items.${index}.itemName`}
                                              placeholder="Item name"
                                              required
                                            />
                                          </div>
                                          <div className="col-md-4">
                                            <Field
                                              className="form-control"
                                              type="number"
                                              min="0"
                                              name={`items.${index}.unitPrice`}
                                              placeholder="Price"
                                              required
                                              handleChange={e =>
                                                setTotal(
                                                  total +
                                                    parseInt(e.target.value)
                                                )
                                              }
                                            />
                                          </div>
                                          <div className="col-md-1">
                                            <button
                                              className="form-control"
                                              type="button"
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                            >
                                              -
                                            </button>
                                          </div>
                                          <div className="col-md-1">
                                            <button
                                              className="form-control"
                                              style={{
                                                backgroundColor: "black",
                                                color: "white",
                                              }}
                                              type="button"
                                              onClick={() =>
                                                arrayHelpers.insert(index, "")
                                              }
                                            >
                                              +
                                            </button>
                                          </div>
                                        </div>
                                      ))
                                    ) : (
                                      <button
                                        className="form-control"
                                        style={{
                                          backgroundColor: "black",
                                          color: "white",
                                        }}
                                        type="button"
                                        onClick={() => arrayHelpers.push("")}
                                      >
                                        Add item
                                      </button>
                                    )}
                                  </div>
                                )}
                              />
                            </div>
                            <div className="mb-3">
                              <Field
                                className="form-control"
                                name="total"
                                label="Total"
                                type="number"
                                value={total}
                                readOnly={true}
                              />
                            </div>

                            <div className="mb-3">
                              <Field
                                className="form-control"
                                name="balanceDue"
                                label="Balance Due"
                                type="number"
                                value={values.balanceDue}
                                readOnly={true}
                              />
                            </div>

                            <div className="mb-3">
                              <Field
                                className="form-control"
                                name="dueDate"
                                label="Due Date"
                                type="date"
                                value={values.dueDate}
                                required
                                placeholder="Enter Due Date"
                              />
                            </div>

                            <div className="mb-3">
                              <Field
                                className="form-control"
                                name="note"
                                label="Note"
                                type="textarea"
                                value={values.note}
                                placeholder="Enter note"
                              />
                            </div>

                            <div className="mb-3 row">
                              <div className="col-12 text-center">
                                <button
                                  className="btn btn-primary w-md waves-effect waves-light"
                                  type="submit"
                                >
                                  Add Invoice
                                </button>
                              </div>
                            </div>
                          </Form>
                        )}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  )
}

AddInvoice.propTypes = {
  addInvoice: PropTypes.func,
  addInvoiceFailed: PropTypes.func,
  addingError: PropTypes.any,
  user: PropTypes.any,
}

const mapStatetoProps = state => {
  const { user, addingError, loading } = state.invoice
  return { user, addingError, loading }
}

export default connect(mapStatetoProps, {
  addInvoice,
  addInvoiceFailed,
})(AddInvoice)
