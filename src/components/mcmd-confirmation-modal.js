import React from "react"
import { Modal } from "react-responsive-modal"
import "react-responsive-modal/styles.css"

export const MCMDConfirmationModal = props => {
  const { isOpen, handleClose } = props
  return (
    <Modal open={isOpen} onClose={() => handleClose(false)} {...props}>
      <div className="confirmation-modal-container">
        <div className="confirmation-heading">
          <h3>MATERIAL CONTRACTS AND DOCUMENTS FOR INSPECTION</h3>
          <p className="italic">
            Note: Capitalized terms not defined herein shall have the meaning ascribed to them in
            the Red Herring Prospectus and available at the following web-link:
            https://midwest.in/investors.
          </p>
        </div>
        <div className="confirmation-body">
          <p>
            The copies of the documents and contracts which have been entered or are to be entered
            into by Midwest Limited (the <b>“Company”</b>) not being contracts entered into in the
            ordinary course of business carried on by the Company includes contracts entered into
            until the date of the red herring prospectus dated October 09, 2025 (
            <b>“Red Herring Prospectus”</b>) which are or may be deemed material, as specified in
            the Red Herring Prospectus filed by the Company with the Registrar of Companies,
            Telangana at Hyderabad (<b>“Material Contracts and Documents”</b>) may be inspected at
            the Company’s Registered and Corporate Office between 10 a.m. and 5 p.m. IST on all
            Working Days from the date of the Red Herring Prospectus until the Bid/Offer Closing
            Date (except for such agreements executed after the Bid/Offer Closing Date). Any of the
            contracts or documents mentioned in the Red Herring Prospectus may be amended or
            modified at any time if so required in the interest of the Company or if required by the
            other parties, without reference to the Company’s Shareholders, subject to compliance
            with the provisions contained in the Companies Act and other relevant statutes.
          </p>
          <p>
            The Material Contracts and Documents can also be accessed by clicking the link below.
            The statements contained in the Material Contracts and Documents speak only as at the
            date as of which they are made, and the Company expressly disclaims any obligation or
            undertaking to supplement, amend or disseminate any updates or revisions to any
            statements contained therein to reflect any change in events, conditions or
            circumstances on which any such statements are based. This is not an offer document in
            terms of Companies Act or the SEBI ICDR Regulations and the documents available on this
            link do not constitute and should not be construed as an offer to sell or issue or
            recommendation or solicitation of an offer to buy or acquire securities of the Company
            or its affiliates in any jurisdiction or as an inducement to enter into investment
            activity. No part of these documents should form the basis of, or be relied on in
            connection with, any contract or commitment or investment decision whatsoever.
          </p>
          <p>
            You acknowledge and agree that the Material Contracts and Documents may contain
            confidential information, and the Company only authorizes you to inspect their contents
            in accordance with the requirements of applicable laws in relation to the Offer. You
            acknowledge that the content of the Material Contracts and Documents shall not be
            photographed, sold, reproduced, or distributed under any circumstances and for any
            purposes whatsoever.
          </p>
          <p>
            By accessing these documents, you accept that this disclaimer and any claims arising out
            of the use of the information from these documents shall be governed by the laws of
            India and only the courts in India, and no other courts, shall have jurisdiction over
            the same.
          </p>
        </div>
        <div className="confirmation-buttons-container">
          <button className="confirm-button" onClick={() => handleClose(true)}>
            I Confirm
          </button>
          <button className="not-confirm-button" onClick={() => handleClose(false)}>
            I Do Not Confirm
          </button>
        </div>
      </div>
    </Modal>
  )
}
