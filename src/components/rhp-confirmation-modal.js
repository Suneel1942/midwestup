import React from "react"
import { Modal } from "react-responsive-modal"
import "react-responsive-modal/styles.css"

export const RHPConfirmationModal = props => {
  const { isOpen, handleClose } = props
  return (
    <Modal open={isOpen} onClose={() => handleClose(false)} {...props}>
      <div className="confirmation-modal-container">
        <div className="confirmation-heading">
          <h3>Disclaimer – Important</h3>
          <h3>
            THESE MATERIALS ARE NOT DIRECTED AT OR INTENDED TO BE ACCESSED BY PERSONS LOCATED
            OUTSIDE INDIA.
          </h3>
          <h3>
            IMPORTANT: You must read and agree with the terms and conditions of the following
            disclaimer before continuing.
          </h3>
        </div>
        <div className="confirmation-body">
          <p>
            The following disclaimer applies to the red herring prospectus of Midwest Limited (the
            <b>“Company”</b>) dated October 9, 2025 (the <b>“Red Herring Prospectus”</b>), which was
            filed with the Registrar of Companies, Telangana at Hyderabad and thereafter with the
            Securities and Exchange Board of India, BSE Limited and National Stock Exchange of India
            Limited, in relation to the initial public offering of the equity shares of face value
            of ₹5 each (the <b>“Equity Shares”</b>) of the Company (the <b>“Offer”</b>).
          </p>
          <p>
            <b>
              THE RED HERRING PROSPECTUS IS BEING MADE AVAILABLE ON THIS WEBSITE TO COMPLY WITH
              SECURITIES AND EXCHANGE BOARD OF INDIA (ISSUE OF CAPITAL AND DISCLOSURE REQUIREMENTS)
              REGULATIONS, 2018, AS AMENDED (“SEBI ICDR REGULATIONS”).
            </b>
          </p>
          <p>
            The Red Herring Prospectus is directed at, and is intended for distribution to, and use
            by, residents of India only. You may not distribute a copy of the Red Herring Prospectus
            to any person outside India.
          </p>
          <p>
            Access to the Red Herring Prospectus does not constitute a recommendation by the
            Company, the Selling Shareholders (as defined in the Red Herring Prospectus) or the
            Members of the Syndicate (as defined in the Red Herring Prospectus) to subscribe to the
            Equity Shares offered in the Offer.
          </p>
          <p>
            Any potential investor should note that investment in the Equity Shares involves a high
            degree of risk and for details relating to such risks, see the section titled “Risk
            Factors” on page 32 of the Red Herring Prospectus.
          </p>
          <p>
            The Equity Shares offered in the Offer have not been and will not be registered, listed
            or otherwise qualified in any jurisdiction except India and may not be offered or sold
            to persons outside of India except in compliance with the applicable laws of each such
            jurisdiction. In particular, the Equity Shares offered in the Offer have not been and
            will not be registered under the U.S. Securities Act of 1933, as amended (the{" "}
            <b>U.S. Securities Act</b>), or the securities laws of any state of the United States
            and may not be offered or sold in the United States (as defined in Regulation S under
            the U.S. Securities Act (<b>Regulation S</b>)) except pursuant to an exemption from, or
            in a transaction not subject to, the registration requirements of the U.S. Securities
            Act and applicable state securities laws. The Equity Shares offered in the Offer are
            being offered and sold only outside the United States in “offshore transactions” as
            defined in, and in reliance on, Regulation S.
          </p>
          <p>
            The information in the Red Herring Prospectus is as of the date thereof and none of the
            Company, the Book Running Lead Managers or their respective affiliates, directors,
            officers, agents, representatives, advisers or employees are under any obligation to
            update or revise the Red Herring Prospectus to reflect circumstances arising after the
            date thereof.{" "}
          </p>
          <p>
            No person outside India is eligible to Bid for Equity Shares in the Offer unless that
            person has received the preliminary offering memorandum for the Offer, which comprises
            the Red Herring Prospectus and the preliminary international wrap (which contains, among
            other things, the selling restrictions for the Offer outside India).
          </p>
          <p>
            You are responsible for protecting against viruses and other destructive items. You are
            accessing this website at your own risk and it is your responsibility to take
            precautions to ensure that it is free from viruses and other items of a destructive
            nature. None of the Company, its affiliates, directors, officers, agents,
            representatives, advisers or employees shall be liable or have any responsibility of any
            kind for any loss or damage that you incur in the event of any failure or disruption of
            this website, or from any other cause relating to your access to, inability to access,
            or use of this website.
          </p>
          <p>
            Failure to comply with this disclaimer may result in a violation of the applicable laws
            of jurisdictions outside India. If you are not in India, please exit this webpage.
          </p>
          <p>
            <b>Confirmation of your acceptance of the terms and conditions</b>
          </p>
          <p>
            By clicking on the “I Confirm” button below you represent to the Company and the Members
            of the Syndicate that:
          </p>
          <ol className="!list-decimal !pl-10">
            <li>
              You have read the disclaimer set out above and you agree to be bound by its terms; and
            </li>
            <li>You are located in India.</li>
          </ol>
          <p>
            If you cannot make these confirmations, you must press the button marked “I Do Not
            Confirm”.
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
