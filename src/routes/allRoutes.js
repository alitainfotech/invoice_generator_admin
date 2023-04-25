import React from "react"
import { Redirect } from "react-router-dom"

/************************** ************************/
// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import ResetPwd from "../pages/Authentication/ResetPassword"

import EmailTemplates from "../pages/APIs/EmailTemplates"
import PDFTemplates from "../pages/APIs/pdfTemplates"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Users from "../pages/APIs/Users"
import Clients from "../pages/APIs/Clients"
import Invoices from "../pages/APIs/Invoices"

import AddClient from "../pages/APIs/AddClient"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

/************************** ************************/
import PagesMaintenance from "../pages/Utility/pages-maintenance"
import PagesComingsoon from "../pages/Utility/pages-comingsoon"
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"

const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/users", component: Users },
  { path: "/clients", component: Clients },
  { path: "/invoices", component: Invoices },

  { path: "/email-templates", component: EmailTemplates },
  { path: "/pdf-templates", component: PDFTemplates },

  { path: "/add-clients", component: AddClient },

  // //profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/reset-password/:token", component: ResetPwd },
  { path: "/register", component: Register },

  { path: "/pages-maintenance", component: PagesMaintenance },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },
]

export { userRoutes, authRoutes }
