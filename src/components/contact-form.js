import React from "react";
import { navigate } from "gatsby";

export const ContactForm = () => {
  const handleSubmit = event => {
    event.preventDefault();
  
    const myForm = event.target;
    const formData = new FormData(myForm);
  
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
      .then(() => navigate("/thank-you/"))
      .catch(error => alert("There was an error submitting the form"));
  };
  return (
    <form
      name="home-contact-us"
      method="post"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="home-contact-us" />
      <input required type="text" name="first-name" placeholder="First Name" />
      <input required type="text" name="last-name" placeholder="Last Name" />
      <input required type="tel" name="phone" placeholder="Phone" />
      <input required type="email" name="email" placeholder="Email ID" />
      <textarea required name="message" placeholder="Message" />
      <button type="submit">Submit</button>
    </form>
  )
}
