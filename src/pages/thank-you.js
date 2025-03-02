import * as React from "react"
import { navigate } from "gatsby"

import Layout from "../components/layout"

const ThankYouPage = () => (
  <Layout>
    <div className="thank-you-page">
      <h1>Thank you</h1>
      <p>Your form submission has been received and we will get back to you soon.</p>
      <button onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>
        Go Back
      </button>
    </div>
  </Layout>
)

export default ThankYouPage
