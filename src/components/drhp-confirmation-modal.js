import React from "react"
import { Modal } from "react-responsive-modal"

import "react-responsive-modal/styles.css"

export const DRHPConfirmationModal = props => {
  const { isOpen, handleClose } = props
  return (
    <Modal open={isOpen} onClose={() => handleClose(false)} {...props}>
      <div className="confirmation-modal-container">
        <div className="confirmation-heading">
          <h3>IMPORTANT NOTICE</h3>
          <h3>NOT FOR DISTRIBUTION TO ANY PERSON OR ADDRESS IN THE UNITED STATES.</h3>
          <h3>IMPORTANT: You must read the following notice before continuing.</h3>
        </div>
        <div className="confirmation-body">
          <p>
            The following notice applies to the Draft Red Herring Prospectus of Midwest Limited (the
            “<b>Company</b>”) dated September 30, 2024 (the “<b>Draft Red Herring Prospectus</b>”)
            filed with the Securities and Exchange Board of India (“<b>SEBI</b>”) and hosted on this
            website in connection with the initial public offering of the equity shares of our
            Company (the “Offer”). You are advised to read the following notice carefully before
            reading, accessing or making any other use of the Draft Red Herring Prospectus. By
            accessing the Draft Red Herring Prospectus, you agree to be bound by the following terms
            and conditions.
          </p>
          <p>
            The Draft Red Herring Prospectus is directed at, and is intended for distribution to,
            and use by, residents of India only. The information in this portion of our website,
            including the Draft Red Herring Prospectus, is not for publication or distribution,
            directly or indirectly, in or into the United States. No part of the contents of the
            Draft Red Herring Prospectus shall be copied or duplicated in any form by any means, or
            redistributed. The Draft Red Herring Prospectus has been hosted on this website as
            prescribed under Regulation 26(1) of the Securities and Exchange Board of India (Issue
            of Capital and Disclosure Requirements) Regulations, 2018, as amended (the “
            <b>SEBI ICDR Regulations</b>”).
          </p>
          <p>
            Our Company has taken all necessary steps to ensure that the contents of the Draft Red
            Herring Prospectus as appearing on this website are identical to the Draft Red Herring
            Prospectus filed with the SEBI. You are reminded that documents transmitted in
            electronic form may be altered or changed during the process of transmission and,
            consequently, neither our Company nor any of its affiliates accept any liability or
            responsibility whatsoever in respect of alterations or changes which have taken place
            during the course of transmission of electronic data. The equity shares offered in the
            Offer have not been and will not be registered, listed or otherwise qualified in any
            other jurisdiction except India and may not be offered or sold, and Bids may not be made
            by persons in any such jurisdiction, except in compliance with the applicable laws of
            such jurisdiction. In particular, the equity shares offered in the Offer have not been
            and will not be registered under the U.S. Securities Act of 1933, as amended (the “
            <b>U.S. Securities Act</b>”), or the securities laws of any state of the United States
            and may not be offered or sold in the United States (as defined in Regulation S under
            the U.S. Securities Act ("<b>Regulation S</b>")) except pursuant to an exemption from,
            or in a transaction not subject to, the registration requirements of the U.S. Securities
            Act and applicable state securities laws. The equity shares are being offered and sold
            only to persons outside the United States in “offshore transactions” as defined in and
            in accordance with Regulation S.
          </p>
          <p>
            Neither our Company, nor any of its affiliates is soliciting any action based on the
            Draft Red Herring Prospectus, and it shall not constitute an offer to sell or an
            invitation to subscribe to or purchase equity shares offered in the Offer in any
            jurisdiction including India. Potential investors should not rely on the Draft Red
            Herring Prospectus for any investment decision.
          </p>
          <p>
            Any decision on whether to invest in the equity shares described in the Draft Red
            Herring Prospectus may only be made after a red herring prospectus has been filed with
            the Registrar of Companies, Telangana at Hyderabad and the SEBI and must be made solely
            on the basis of such red herring prospectus as there may be material changes in the red
            herring prospectus compared to the Draft Red Herring Prospectus. Invitations to
            subscribe to or purchase the equity shares in the Offer will be made only pursuant to
            the red herring prospectus if the recipient is in India or the preliminary offering
            memorandum for the Offer, which comprises the red herring prospectus and the preliminary
            international wrap for the Offer, if the recipient is outside India. No person outside
            India is eligible to Bid for Equity Shares in the Offer unless that person has received
            the preliminary offering memorandum for the Offer, which contains the selling
            restrictions for the Offer outside India.
          </p>
          <p>
            <b>
              Any potential investor should note that investment in equity shares involves a high
              degree of risk and for details relating to such risk, please see the section titled “
              <i>Risk Factors</i>” of the red herring prospectus, when available.
            </b>
          </p>
          <p>
            Neither our Company nor any of its affiliates will be responsible for any loss or damage
            that could result from interception and interpretation by any third parties of any
            information being made available to you through this website. Our Company and its
            affiliates cannot and do not guarantee the accuracy, timeliness or completeness of the
            information being made available to you in the Draft Red Herring Prospectus beyond the
            date of the Draft Red Herring Prospectus. The information contained in the Draft Red
            Herring Prospectus may not be updated since its original publication date and may not
            reflect the latest updates. Our Company and its affiliates will not be responsible for
            any loss to any person or entity caused by any shortcoming, defect or inaccuracy which
            may have inadvertently or otherwise crept into the website. Neither our Company, nor any
            of its affiliates nor their directors, officers and employees will be liable or have any
            responsibility of any kind for any loss or damage that you incur in the event of any
            failure or disruption of this website, or resulting from the act or omission of any
            other party involved in making this website or the data contained therein available to
            you, or from any other cause relating to your access to, inability to access, or use of
            the website or these materials.
          </p>
          <p>
            If you are not permitted to view materials on this website or are in any doubt as to
            whether you are permitted to view these materials, please exit this webpage.
          </p>
          <p>
            To access this information, you must confirm by pressing on the button marked “I
            Confirm” that, at the time of access, you (a) are located and resident in India and (b)
            are not located inside the United States. If you cannot make this confirmation, you must
            press the button marked “I Do Not Confirm”.
          </p>
          <p>
            The documentation contained in these webpages is posted to comply with Indian legal and
            regulatory requirements. Making the information contained herein available in electronic
            format does not constitute an offer to sell or the solicitation of an offer to buy
            securities in our Company in the United States or in any jurisdiction outside India.
            Furthermore, it does not constitute a recommendation by our Company or any other party
            to sell or buy securities in our Company in the United States or in any other
            jurisdiction outside India.
          </p>
          <p className="confirmation-read">
            I have read the Legal Disclaimer and am entitled to receive information contained in
            this website. I hereby declare that I am a resident of India and am entitled to receive
            information contained on this website.
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
