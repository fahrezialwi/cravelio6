import React, { Component } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

class TermsAndConditions extends Component {

    componentDidMount() {
        document.title = 'Terms & Conditions - Cravelio'
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container container-height">
                    <div className="row row-top row-bottom">
                        <div className="col-12">
                            <h3>Terms of Use</h3>
                            
                            <p>
                                TERMS OF USE BELOW MUST BE READ BEFORE USING THIS SITE. THE USAGE OF THIS SITE INDICATES ACCEPTANCE OF  THE TERMS AND CONDITIONS BELOW.
                            </p>
                            <p>www.cravelio.com site ("Site") is managed by Cravelio ("we", "us", or "our"). By accessing and/or use of the Site, you acknowledge that you have read and understood, and agree to the Terms of Use set out below and other terms and conditions in relation to the Site, including but not limited to confidentiality and FAQs, which form an integral part of these Terms of Use (“Terms”). You must be at least eighteen (18) years old to use the Site.
                            </p>
                            <p>
                                Please note that we may change, modify, add and delete these Terms at any time without prior notice. The Terms must be read periodically. By continuing to use this Site after such changes to these Terms, visitors, users or Registered Users ("you" or "user") agree and consent to the changes. If you use any of our other services, then your usage is based on the submission to and acceptance of the terms and conditions applicable to such services.
                            </p>

                            <ol className="nestedNumbering">
                            <li className="nestedTitle">SCOPE OF OUR SERVICES
                                <ol className="nestedNumbering">
                                    <li>Through the Site, Cravelio provides an online platform where you can browse different types of airlines, train and other transportation services, temporary accommodation and lodging (as applicable), and cards, as well as make a reservation and/or purchase (“Services”). Users can make bookings of services provided by hotels, airlines, train or other transportation operators, events promoter, tourist attraction operator, travel agency, telecommunication operator and/or any other service provider in cooperation with Cravelio (“Vendors”) on the Site. By placing an order through the Site, you will be able to book and/or purchase the airline tickets, train or other transportation tickets, hotel rooms, event entrance tickets, tourist attraction entrance tickets, tour packages, prepaid credits, voucher for prepaid sim-card, or other services. We will provide a booking confirmation via email. We reserve the right to refuse the booking for reasons set forth below.</li>
                                    <li>Although we will use our expertise with caution in performing the services, we do not verify, and do not guarantee, that all information provided is accurate, complete, correct or the latest available, and we are not responsible for any errors (including placement and typing errors), obstruction (either because of temporary and/or partial, damage, repair or improvement to the site or otherwise), inaccurate, misleading or false information or non-delivery of information. </li>
                                    <li>Changes in market conditions or circumstances that occur can lead to changes in a short time causing the information provided to be inaccurate or not applicable. In case of any problems, contact customer service and they will assist you.</li>
                                    <li>This Site does not make any representations and should not be construed as making any recommendations or suggestions of the level of service quality or rating of the Vendors listed on the Site. We hereby declare denial of any claims, losses or liability with respect to the quality or status of existing Vendors listed on the Site (who provide airline, hotel or other services). Vendors may be introduced in the form of different classes based on factors including but not limited to their reviews, ratings or any other factors. The given rating is calculated based on automated algorithms that can be updated and changed as per our discretion.</li>
                                    <li>We have the right to not accept any user or booking (or in certain cases cancel the booking confirmation) at our sole discretion and for any cause without giving reasons for the rejection/refusal/cancellation. The reasons for rejecting a user or booking or cancelling a booking confirmation may include but are not limited to: breach of these Terms, trade or economic sanctions by global or national authorities, embargo, prohibitions in regulations, fraud or theft (or indication or suspicion of fraud or theft), suspicion of criminal activity, suspicious ordering, services not being available or no longer being made available by the Vendor, user providing inaccurate, erroneous or misleading information, problems with credit card electronic communications, information or transactions, inappropriate behavior, threats, insults, refusal to provide information, practical impediments, communication difficulties or breakdowns, a Real Mistake (hereinafter described below), history of breaches of these Terms, or being placed on any “black lists” or “watch lists” by governments or international organizations. We can at anytime delete or remove ("Removed") membership of the user of this Site, either temporarily or permanently. Removed Users are prohibited to attempt using the Site in any other name or through other users (hereinafter described in the Fraud Prevention Mechanism condition).</li>
                                    <li>In a particular case, we may cancel or reject reservations with respect to the "Real Mistake", which does not depend on where the error originated. A Real Mistake is a fault on the Site (for example, in terms of price) which no reasonable person would consider appropriate or to make business sense. The amount charged shall be reimbursed without further charges in such a case.</li>
                                    <li>Every payment related to the booking or reservation of the Services shall be made directly to Cravelio bank account or Cravelio payment channels. Cravelio shall  not be responsible for the validity of the reservation, if the payment is not being made directly to Cravelio bank account or Cravelio payment channels.</li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">CANCELLATIONS
                                <ol className="nestedNumbering">
                                <li>By making a booking, order or reservation through the Site, you accept and agree to the terms and conditions of applicable Vendors, including policies regarding cancellation and/or absence, or your specific requests which may be given to the Vendors. Cravelio is not responsible for any violation of these terms and conditions which are agreed on between the Vendor and the user, or which are based on the user’s specific requests, so please read the Vendors’ terms and conditions carefully.</li>
                                <li>Regarding refunds, Cravelio may be able to withhold or take part of the amount paid to reimburse the costs that have been incurred in connection with the cancellation.</li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">SPECIAL REQUESTS
                                <ol className="nestedNumbering">
                                <li>In the event of any special requests (for example: rooms to be easily accessible by wheelchair, wheelchair assistance for people with disabilities at the hotels or airplanes, change of name, change of date, adding “frequent flyer” points or equivalent, availability of the event’s seat tickets, special equipment/tools needed for the tour packages or equivalent), the user can insert the request when making a booking on the Site or contact the Vendor directly (as applicable). The request will be addressed at the Vendor’s and Cravelio’s discretion, based on availability and other factors. our special requests may be subject to additional charges and/or fees by the relevant Vendor based on the discretion and/or policy of the relevant Vendor.  Cravelio is not responsible for the availability and/or fulfillment of your special requests by the Vendor.</li>
                                <li>In the event of rescheduling (including but not limited to changes of date, route and/or passenger) by the user, Cravelio reserves its rights to cancel any new bookings created through the rescheduling process if the initial booking is no longer valid (including but not limited to instances where the ticket has actually been used or refunded).</li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">TRAVEL ADVICE
                                <ol className="nestedNumbering">
                                    <li>By displaying particular destinations, Cravelio does not represent or warrant that travel to such points is advisable or risk-free and Cravelio must not be held liable for damages or losses that may result from travel to such destinations. Under no circumstances shall Cravelio be held liable for any adverse incidents occurring during your trip or your stay. You are personally responsible for the selection of travel, travel route and destination, for the entire duration of your trip. Cravelio is not responsible for any loss that occurs when you fail to bring required travel documents, such as your passport, e-ticket, e-voucher, and any other reasons caused by your willful misconduct and/or negligence.  Cravelio shall also not responsible for any willful misconduct and/or negligence caused by the Vendor.</li>
                                    <li>Should you purchase roundtrip tickets under the same Airline Booking Code (Passenger Name Record, abbreviated as PNR), both the departure and return tickets must be used in full, as written in the itinerary of your Cravelio e-ticket. Use of (i) only the departure or the return ticket; or (ii) partial use of any segment of the roundtrip flight, may cause the other ticket to be invalid and not refundable. Cravelio will not be responsible for any consequence resulting from violation of these terms and conditions.</li>
                                    <li>You shall be solely responsible to obtain, maintain and have available for presentation, the proper and valid travel permits or foreign entry requirements (including, but not limited to, visas or other travel permits and documents, whether for transit or otherwise) applicable to you prior to finalizing your travel arrangements in accordance with the prevailing laws of the country you are traveling from, into, over or transiting in. Cravelio has no obligation and shall not be responsible to notify you of the travel arrangements and permits necessary for you to be able to carry out your travel plans. Cravelio reserves its right to limit its liability in the case of any losses or damages arising out of or in relation to your travel permits.
                                    </li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">RATINGS
                                <ol className="nestedNumbering">
                                    <li>Ratings shown on the Site are only provided for the information of users only, and existing ratings are based on information given by third parties such as suppliers, users or other review websites. We do not verify the rating given and are therefore not responsible for the accuracy of the existing rating. We hereby declare denial of any claims, losses or liability with respect to the ratings shown on the Site.</li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">PRICE AND PROMOTION
                                <ol className="nestedNumbering">
                                    <li>We may offer lower prices and/ or promotions from time to time. Please note that these may involve different conditions and requirements as it relates to booking and refund policies.</li>
                                    <li>If there is any promotion provided directly by the Vendor, then the rights and authority over the promotion will be fully under the Vendor and may not be applied for the reservation conducted through Cravelio.</li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">ADDITIONAL CHARGES &amp; REFUNDS
                                <ol className="nestedNumbering">
                                <li>Each price listed on the Site is only available with certain conditions and these prices may change depending on the availability of booking, length of booking and/or other factors. Available prices can include additional taxes and other charges, but in certain circumstances it may not include taxes and other service charges (e.g., tips for tour guides, other facilities charges (if any), and other charges/fees which may arise from the use of services other than those provided by Cravelio (if any)); The user agrees that they are responsible for verifying the total cost to be paid and other terms and details when the confirmation email is sent. The user must verify the booking on the booking sheet; the user can cancel the booking at any time before the final confirmation is done. Prices shown are detailed so that users can see the amount to be paid, any additional costs due to the use of credit cards or inter-bank fees charged for the shipping fees will be charged to the user. If there is a discrepancy in the amount paid, Cravelio will provide an email notification of the amount to be paid by the user. In the event that a user cancels the booking before paying in full any existing shortcomings, Cravelio has sole discretion whether to refund the amount paid or refund an amount reduced by the costs incurred by Cravelio as a result of non-payment of the cost of these shortcomings by users in accordance with procedures prescribed by Cravelio. If the user has any doubt about the service, the user can contact Cravelio customer service (during customer service operational hours). For any other cancellations, Cravelio will work with you to refund amounts already paid by you, reduced by the costs incurred by Cravelio, e.g. inter-bank transfer fees. Refunds may not be immediate depending on your initial mode of payment. You can contact Cravelio customer service for further details on the estimated duration for receiving your refund and we will assist you as best as we can.</li>
                                <li>Cravelio shall not be held responsible or liable for any cancelled issuing of e-tickets, e-vouchers, or other transactions caused by inaccurate transfer amounts, or exceeding the time limit for transfers or any payment that is not being made directly to Cravelio bank account or Cravelio payment channels. For real-time inter bank transfers, you must use an ATM. After completing the inter-bank transfer, please confirm your payment by filling in the payment confirmation form.</li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">ADDITIONAL CHARGES FROM HOTELS
                                <ol className="nestedNumbering">
                                    <li>Please note that all prices for hotel reservations provided through our Site (the “Hotel Price”) are based on your selections, such as for the requested period of stay and number of guests, unless otherwise specified. Hotel room reservation rates are quoted per room and per night. You are responsible for verifying whether your selection and any additional requests or services are reflected in the price displayed on the Site (such as the Hotel Information provided before the final booking confirmation) and/ or in the email-coupon confirmation. Breakfast is usually not included, unless otherwise stated. Hotel resort fees and other mandatory costs (see description below) and local taxes, tourist, or occupancy charges (if any) will be paid by you, and are usually not taken into account in the Hotel Price unless otherwise stated. You are responsible for verifying any explanations or policies provided by the hotel on the Site. Insurance of any kind is not included in the rate, unless otherwise stated. The standard hotel room reservation is for one or two guests; an additional charge will usually be required for an extra bed. The hotel can refuse to accept additional guests if not notified in advance.</li>
                                    <li>Please note that some hotels may charge you a resort fee, but may require additional charges (or the like) to use certain services. The resort fee is usually not included in the Hotel Price; more details will be included in the hotel’s description on the Site. You may also be charged directly by the hotel for products and services including but not limited to: energy surcharge, baggage handling fees, the cost of delivery of newspapers, in-room security costs, travel/tour fees, or the cost for cleaning the rooms under extraordinary circumstances. This practice of additional hotel charges is beyond Cravelio’s control.</li>
                                    <li>Optional incidental expenses and personal consumption charges (such as those incurred during the Hotel stay) are not usually included in the Hotel Price. Such charges include but are not limited to: parking fees, in-room minibar charges, telephone charges, room service, food and beverage costs, special (gala) dinner costs, movie rentals / movies-on-demand, and Internet usage costs. During certain peak holiday seasons, some hotels may make their special dinners compulsory (such as for the New Year, Christmas, Chinese New Year and other events). Such charges are not included in the room rate, but will be displayed on the booking form. Please refer to more details listed under "Hotel Information", "Requirements Booking", "Cancellation Policy" or similar headings on the Site. If you are unsure whether or not a charge is included in the tariff, please contact our customer service team to clarify.</li>
                                    <li>Certain hotels may add fees for transport or transfer to and from the airport. This is a common practice for travelling between islands (such as the Maldives), in order to reach the hotel. Such transportation is always governed by the hotel, and is offered by or on behalf of the hotel, which is responsible for the transportation service. Cravelio does not arrange any transport and is not responsible for such transport service. You agree that Cravelio is not responsible for the quality, safety, frequency or service level of the transportation services, and for any loss or damage that may result from the use of such transportation services.</li>
                                    <li>In some jurisdictions, hotels may be required by law to directly collect occupancy tax or local city tax from guests. Government authorities may also declare additional taxes and may require the hotel to collect such taxes directly. You agree to pay any and all of such taxes/costs to the hotel directly upon checkout, unless otherwise specified. If you have any questions, please contact Cravelio Customer Service regarding any additional costs that may be included in the Hotel Price.</li>
                                </ol>
                            </li>

                            <li className="nestedTitle">USER ACCOUNT
                                <ol className="nestedNumbering">
                                    <li>For registration purposes, we will collect and process your personal information, such as your name, electronic mail (e-mail) address, and your mobile phone number when you register. You must provide us with an accurate, complete, and latest information and agree to provide us with any proof of identity that we may reasonably request.</li>
                                    <li>Only you can use your own account and you represent and warrant that you will not authorize any other party to use your identity or your account for any reason, unless permitted by Cravelio.</li>
                                    <li>You cannot assign or transfer your account to any other party. </li>
                                    <li>You must maintain the security and confidentiality of your account password and any identification we provide to you. In the event of any disclosure of your password, in any way whatsoever resulting in any unauthorized use of your account or identity, order(s) received from such unauthorized use shall still be considered as valid orders and we will process such order(s).  You hereby declare that Cravelio is not responsible for any loss or damage arising from the misuse of your account.</li>
                                    <li>If you no longer have control over your account, you are required to immediately notify us (e.g., your account is hacked in any way or your phone is stolen) so we can temporarily block and/or inactivate your account properly. Please note that you are responsible for your use of your account and may be liable for your account even if your account is misused by others.</li>
                                    <li>Cravelio has the full right to temporarily block, delete, or inactivate the User’s account at our sole discretion and for any cause without giving reasons for blocking, deletion, or inactivation of the User’s account. The reasons for blocking, deletion, or inactivation of the User’s account may include but are not limited to: 
                                        <ol className="lowerAlpha">
                                            <li>breach of these Terms, </li>
                                            <li>prohibitions in regulations, </li>
                                            <li>fraud or theft (or indication or suspicion of fraud or theft), </li>
                                            <li>suspicion of criminal activity, </li>
                                            <li>suspicious ordering, </li>
                                            <li>User providing inaccurate, erroneous or misleading information, </li>
                                            <li>inappropriate behavior, threats, or insults, </li>
                                            <li>refusal to provide information, </li>
                                            <li>practical impediments, </li>
                                            <li>communication difficulties or breakdowns, or </li>
                                            <li>User is listed on any “black lists” or “watch lists” by governments or international organizations.</li>
                                        </ol>
                                    </li>
                                </ol>
                            </li>

                            <li className="nestedTitle">MEMBERSHIP PROGRAM
                                <ol className="nestedNumbering">
                                    <li>By registering with Cravelio, you will automatically be a member of our loyalty program named “CravelioClub” operated by Cravelio.</li>
                                    <li>As a member of CravelioClub, you will gain access to the points, promotions, discounts, features, or other benefits offered by Cravelio and/or third party merchants as made available from time to time in the Application.  For avoidance of any doubt, we may from time to time change, remove, or make unavailable part or whole points, promotions, discounts, features, or other benefits offered by us.</li>
                                    <li>For full information regarding points and its qualification, please refer to <a href="https://www.cravelio.com/en/loyalty-points">https://www.cravelio.com/en/loyalty-points</a></li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">PAYMENT DETAILS AND PROCEDURES
                                <ol className="nestedNumbering">
                                <li>Payments are made in the amount and currency as stated not including bank fees or any other charges by Cravelio.</li>
                                <li>Cravelio does not collect taxes or levies. If a hotel or city destination charges taxes, those taxes are the responsibility of the user.</li>
                                <li>For all forms of reservations, you must make payment within the specified time limit. If the payment is not made, then Cravelio reserves the right to cancel all reservations.</li>
                                <li>Payment methods include but are not limited to bank transfer and credit card. For payment by bank transfer, you must provide the bank transfer receipt as proof of payment of reservations listed in the Cravelio confirmation email. You must follow the procedures contained in the confirmation email.</li>
                                <li>For other payment methods such as credit card, you must follow the procedures stated by Cravelio and/or the relevant payment service provider.</li>
                                <li>After you make full payment, Cravelio will place the order and issue a reservation code, which will be accompanied by:
                                    <ol className="decimal">
                                    <li>Booking Code;</li>
                                    <li>Customer Name;</li>
                                    <li>Number Booking;</li>
                                    <li>Booking Details; and</li>
                                    <li>Phone Number / Extension.</li>
                                    </ol>
                                </li>
                                </ol>
                            </li>
                            
                            
                            <li className="nestedTitle">PAYMENT BY CREDIT CARD &amp; FRAUD
                                <ol className="nestedNumbering">
                                <li>For payment of bookings placed through this Site, your credit card will be billed by Cravelio for the full price at the time of booking and confirmation of the booking (any refund that may be given will depend on the conditions of the existing reservations). You must check the booking details thoroughly each time before you make a reservation. Cravelio will process any refund, as applicable, within a reasonable period. For certain reservations, you may have to pay the Vendor deirectly. In order to safeguard and encrypt Your credit card information when in transit to us, we use encryption technology such as Transport Layer Security (“TLS”) or Secure Sockets Layer (“SSL”) to ensure the integrity of your information. </li>
                                <li>In the case of credit card fraud or unauthorized use of your credit card by a third party, you must contact your bank or card issuer immediately after realizing such unauthorized use. In such a case, Cravelio takes no responsibility over any case of credit card fraud or unauthorized use of your credit card by a third party, regardless of whether such fraud or unauthorized use was carried out through Cravelio services (including, but not limited to, CravelioQuick). Cravelio is not obliged to make refunds or repayments to you as a result of such fraud. As part of our goodwill, we may provide a form of compensation to you subject to review and approval by us. You shall only be eligible to request compensation only if such reservations have been made through our secure servers and the fraud or unauthorized use of your credit card is a result of our default or negligence and through no fault of your own while using the secure server. We accept no liability of the fraud or unauthorized use of your credit card if it was done through applications or servers other than our own or if it is as a result of a fault or negligence of your own. If you suspect any unauthorized reservations or fraud committed on Cravelio, you must contact our Customer Service team immediately.</li>
                                <li>To make a reservation you must be aged over eighteen (18) years old and have full legal capacity to make the transaction (or have authorization from your legal guardian). You must use a credit or debit card that you own, issued in your name, and make sure that there are sufficient funds to cover the transaction costs. Any fees incurred by you for authorizing a transaction that results in an over-drawing of your account are not the responsibility of Cravelio.</li>
                                <li>You shall ensure that the details you provide to us are completely accurate. Cravelio reserves the right to not accept certain credit cards. Cravelio can add or remove other payment methods at our sole discretion.</li>
                                <li>In certain cases, we may require additional information or verification to validate and confirm the booking, as described in more detail on the Site. Reservations are not confirmed until you have received a confirmation email with an e-ticket or voucher and there is the possibility that the Vendor can implement fraud examination mechanisms during the booking process. If fraud occurs or is determined to occur, then the booking will be void. Cravelio shall not bear any responsibility for such cancellations by the Vendor. If you choose not to submit additional information, reservations will not be completed and will be voided.</li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">RIGHTS AND OBLIGATIONS
                                <ol className="nestedNumbering">
                                <li>Cravelio hereby grants the user certain limited rights (constituting a “Limited Licence”), which cannot be transferred or assigned, to access and use the Site to the extent expressly permitted by these Terms. In connection with this Limited Licence, we are not granting you any other rights or licences with respect to use of the Site; rights or licenses not expressly granted, are wholly owned by Cravelio or other third party owners of such licence. Content available on the Site (including the software infrastructure used to provide the Content) is wholly owned by Cravelio or its suppliers and service providers, including but not limited to its Vendors (as applicable). You can use the site to place orders and you hereby guarantee that you will not submit false reservation requests. You hereby declare to ensure that the payment information you provide is accurate. You also guarantee providing an accurate email and mailing address as well as other details of your contact information.</li>
                                <li>In relation to the Terms of Use of the Site, you agree to not use the Site or the Content for commercial purposes or either directly or indirectly for other than personal use or for unlawful purposes (prohibited by law) or do any acts that violate the Terms. Except with the written consent of Cravelio, you agree not to modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative creations from, transfer, sell or re-sell any information, software, products or services obtained in connection with the Site. In addition, you agree not to:
                                    <ol className="decimal">
                                        <li>use this Site or the Content for commercial purposes without permission from Cravelio;</li>
                                        <li>access, monitor or copy any Content on the Site using technology, software, or any program either manually or automatically for any purpose without written permission from Cravelio;</li>
                                        <li>perform any action that imposes or may impose, an unreasonable burden on our Site or Site infrastructure;</li>
                                        <li>make a major link to this Site (including but not limited to the booking path) for any purpose without the written consent from Cravelio;</li>
                                        <li>resell, use, copy, perform surveillance (such as using or installing spider or scrape programs), display, download or perform any Content production, software, products, services available through the Site for commercial purposes or objectives/activities of competition;</li>
                                        <li>reproduce the Site (through a "frame" or "mirror") or set up a part of this Site on any other web site without prior written consent;</li>
                                        <li>send an announcement to or through the Site that violates any law, regulation, or rules, or which can support unlawful or criminal activities;</li>
                                        <li>transmit or provide links to any materials that defame, slander, or lie;</li>
                                        <li>transmit or provide links to each announcement containing the terms of defamation, slander, and lies;</li>
                                        <li>transmit or conduct announcements that may infringe upon the intellectual property or other rights of a particular entity or person, including but not limited to copyrights, patents, trademarks, trade secrets, confidential information or publications;</li>
                                        <li>transmit announcements where prohibited by applicable law or violate the rights and obligations that exist based on the contractual relationship;</li>
                                        <li>imitate any person or entity for any purposes;</li>
                                        <li>manipulate or falsify information with the aim to disguise the origin of statements provided;</li>
                                        <li>use the Site in any manner which could damage, disable, obstruct, or interfere with the use of the Site or other users of computer equipment, or cause damage, disruption or limit the functionality of the software, hardware or telecommunications equipment;</li>
                                        <li>gain unauthorized access or perform unauthorized modification to the Site or other related website, other accounts, computer systems, networks connected to the Site through hacking, password theft or other similar matters;</li>
                                        <li>obtain or attempt to obtain any materials or information by ways that are not intentionally supplied by the site (including but not limited to other destinations provided by this Site). This includes but is not limited to, obtaining or collecting information about others such as email addresses;</li>
                                        <li>engage in fraudulent acts or actions that aim to manipulate a search engine results page (“SERP”) or perform search engine optimization (“SEO”). SEO practices considered unethical or to constitute "spamdexing" include but are not limited to cloaking, metadata, title tags, content scraping, link schemes, google bomb, search keywords, hidden text or hidden links, link schemes, comments containing spam and other matters; or</li>
                                        <li>any other action which may adversely affect or result in damage to the Site, Cravelio or its affiliates and employees, or Cravelio’s reputation.</li>
                                    </ol>
                                </li>
                                    <li>Unless expressly specified otherwise, the web site is not allowed to make links to other pages other than the Main Site pages or frames or web page or material contained in it, or making links to aspects of the Site in the form of an email with a commercial purpose without the express written approval of Cravelio.</li>
                                    <li>By placing an order through this Site, you hereby represent and warrant that you are not subject to any prohibitions or restrictions by any sanctions program, or subject to any penalties under any anti-money laundering regime.</li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">RIGHTS TO USER CONTENT
                                <ol className="nestedNumbering">
                                    <li>By completing a booking, you hereby agree to receive electronic mail containing an invitation to provide reviews or content reviews with respect to the selection of Vendors. Cravelio has sole discretion whether your review will appear on the site. Cravelio can display the review, which may contain comments, level of service and your name.</li>
                                    <li>In providing a review, you agree to ensure that:
                                        <ol className="lowerAlpha">
                                            <li>you own and control all of the rights to the reviews that you provide to the Site;</li>
                                            <li>the content of the review is accurate and contains no misrepresentations; and</li>
                                            <li>the use or performance or transmission of the content of the review does not violate the Terms or applicable laws and regulations, you are not violating any third party’s rights, and you are not causing injury to any party. </li>
                                        </ol>
                                    </li>
                                    
                                    <li>You must bear all responsibility for the content of the reviews that you provide or submit. You allow Cravelio to act when there is a party that violates your rights or the rights of Cravelio.</li>
                                    <li>Content review provided will be deemed to not contain confidential information and Cravelio shall have no obligation to treat the content review as confidential information. Without limiting the provisions contained in the Terms, Cravelio has sole discretion to use the content review as deemed appropriate, including but not limited to removing, cutting, modifying, or otherwise editing the review. Cravelio shall have no obligation to pay for the content that you submit in a review, including but not limited to content review that has been changed, eliminated or cut. Cravelio shall have no obligation to provide or include or mention authors or other third parties.</li>
                                    <li>In any case, you hereby agree that with respect to the content of the reviews:
                                        <ol className="lowerAlpha">
                                            <li>You do not require any attribution or identification on any derivative works;</li>
                                            <li>You consent that all content of reviews submitted to Cravelio may be used by Cravelio and its employees, successors, and transfer recipients in any way, at any time. This includes but is not limited to publishing, modification, and reproduction of the review either in its entirety or in partial form;</li>
                                            <li>You hereby waive all rights and agree not to claim any rights in the content review; and</li>
                                        </ol>
                                    </li>
                                </ol>
                            </li>
                                
                            <li className="nestedTitle">USAGE RESTRICTIONS
                                <ol className="nestedNumbering">
                                    <li>You hereby agree to not use the Site or the Content for unlawful or unauthorized activity. You agree that you will not use any equipment, software, or other technologies that may obstruct or attempt to obstruct the operation of this Site. You agree to not use this Site or its Content for commercial purposes. You agree not to seek, create, search for, use or send automated agents or other forms of technology to collect or obtain information from this Site, or otherwise interact with this Site.</li>
                                </ol>
                            </li> 
                            
                            <li className="nestedTitle">INTELLECTUAL PROPERTY RIGHTS
                                <ol className="nestedNumbering">
                                    <li>All Intellectual Property Rights on this Site are owned by Cravelio. All information and materials, including but not limited to: software, text, data, graphics, images, sounds, videos, trade marks, logos, icons, html codes and other codes on this website are prohibited to be published, modified, copied, reproduced, duplicated or altered in any way outside the area of this Site without the express written permission of Cravelio. If you violate these rights, Cravelio reserves the right to bring a civil claim for the full amount of damages or losses suffered. These violations may also constitute criminal offences.</li>
                                    <li>Cravelio and/or its affiliated companies are the owners of certain intellectual property rights (“Intellectual Property Rights”), including but not limited to the domain name, Site, trade marks, content, copyright, service marks, logos, symbols or other designs etc. Nothing in this Agreement shall be construed as granting you a licence or any rights, implied or otherwise, to use, possess, distribute or modify any of Cravelio’s Intellectual Property. Other product and company names contained on the Site, including names, trademarks, marks, service marks, logos, symbols or other designs may be owned or licensed for use by third parties. Use of third party intellectual property rights on the Site is not considered a recommendation or sponsorship for the Site by third parties. Cravelio owns copyright to the Site, and you are prohibited to use, possess, distribute or modify any of the Intellectual Property without express approval from Cravelio.</li>
                                    <li>The Site contains Cravelio’s Intellectual Property, including but not limited to text, software, photos, graphics, video, music and sound. The whole of the Site’s Content is protected by copyright laws. We and our licensors own the copyright and/or other rights over the selection, coordination, arrangement, and repair of the Content and the original content. You must not modify, reproduce, copy, perform, display, publish, or exploit the Content, in whole or in part, unless you have express written consent from Cravelio.</li>
                                    <li>Unless specified otherwise, the software required for the provision of services, the software available for use on this Site, and Intellectual Property Rights in the Content on the Site are owned by Cravelio, its affiliated or associated companies, licensors, suppliers and content providers. Cravelio shall not be responsible for intellectual property owned by third parties or for infringement of intellectual property rights owned by third parties.</li>
                                    <li>You can use the information on the Site only for personal, non-commercial use. Unless specified otherwise, and expressly permitted by the copyright laws, you may not copy, reproduce, redistribute, retransmit, publish or otherwise commercially exploit any downloads you make from the Site without the permission of the owner of the intellectual property rights. Even if you obtain the necessary permission, you are forbidden to make changes or deletions. You hereby accept and agree that downloading any Intellectual Property does not grant you any rights over them.</li>
                                    <li>We may provide links onto other sites maintained by other parties. By clicking on the link, you hereby represent, acknowledge and agree that such action is your voluntary action to view or enter other sites that Cravelio does not supervise or bear responsibility for.</li>
                                    <li>Cravelio in making the Site, preparing the source code and performing software support, can license the use of open source software from third parties through the GNU General Public Licence (“GPL”), Any use by Cravelio of open source software and the intellectual property rights of a third party are with the necessary licences or permits.</li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">CLAIMS OF INTELLECTUAL PROPERTY RIGHTS INFRINGEMENT
                                <ol className="nestedNumbering">
                                    <li>If there is evidence of violations of your Intellectual Property Rights, you or your representative (collectively, the "Sender") may send a notice containing the following details listed below:
                                        <ol className="decimal">
                                            <li>Name and address of the Sender;</li>
                                            <li>In case the Sender is not the owner of the Intellectual Property Rights or license exclusive then it must include the name and address of the owner of the Intellectual Property Rights;</li>
                                            <li>In case the Sender’s address is not in Singapore, the Sender shall provide a temporary address in Singapore;</li>
                                            <li>Sender’s telephone number, facsimile (if any) and electronic mail address;</li>
                                            <li>Sufficient details so as to prove the existence of intellectual property rights violations, including online addresses of electronic copies ;</li>
                                            <li>Sender’s request to remove or disable access to the infringing electronic copy or version;</li>
                                            <li>A statement that the Sender in good faith recognizes the violations as identified in paragraph (5) of this Clause;</li>
                                            <li>A statement that the information provided in the notice is accurate;</li>
                                            <li>A statement that the Sender (a) is the owner or exclusive holder of the intellectual property rights that are being violated; or (b) has the legal authority to act on the owner or exclusive holder's behalf; and</li>
                                            <li>The statement that the Sender subjects to Singapore law and that all claims, disputes, controversies or differences arising out of intellectual property rights infringement shall first be submitted to the Singapore Mediation Centre for resolution by mediation in accordance with the Mediation Procedure. The Sender should state that they agree to participate in the mediation in good faith and agree to abide by the terms of any settlement reached. </li>
                                        </ol>
                                    </li>
                                    
                                    <li>The letter must be signed by the sender and delivered physically and via email to the following address:
                                        <p>2 Shenton Way, #18-01 <br/> Singapore 068804, Singapore</p>
                                    </li>
                                    <li>We will review and handle notifications in accordance with the above requirements and in accordance with Singapore law.</li>
                                    <li>You agree to not hold Cravelio responsible for losses or damages that may occur as a result of fraud, forgery or false accusations of intellectual property rights infringement.</li>
                                </ol>
                            </li>
                            
                            
                            <li className="nestedTitle">DISCLAIMER
                                <ol className="nestedNumbering">
                                    <li>YOU HEREBY DECLARE TO AND AGREE THAT TO THE EXTENT WHERE PERMITTED BY APPLICABLE LAW:
                                        <ol className="lowerAlpha">
                                            <li>THE SERVICE AND THE CONTENT OF THIS SITE ARE PROVIDED ON THE BASIS OF "AS IS" AND "AS AVAILABLE". WE HEREBY EXPRESSLY STATE THAT WE DO NOT MAKE ANY KIND OF GUARANTEE OR WARRANT, WHETHER EXPRESS OR IMPLIED, WITH RESPECT TO THE MERCHANTABILITY OF A PRODUCT OR SERVICE, OR SUITABILITY OF THE PRODUCTS AND SERVICES WE PROVIDE FOR A PARTICULAR PURPOSE AND AGAINST NON-INFRINGEMENT WHERE APPLICABLE;</li>
                                            <li>WE DO NOT GUARANTEE THAT: (i) THE FUNCTIONS, SERVICES AND SECURITY FEATURES PROVIDED IN THIS SITE WILL BE UNINTERRUPTED OR FREE FROM ERROR; (ii) ERRORS OR FAILURE WILL BE REPAIRED; OR (iii) THE SITE OR THE SERVER PROVIDE SERVICES THAT ARE FREE FROM VIRUSES, MALWARE OR HARMFUL COMPONENTS;</li>
                                            <li>WE DO NOT WARRANT THE ACCURACY, AUTHENTICITY, INTEGRITY OR QUALITY OF THE CONTENT, SITES OR RESOURCES AVAILABLE TO AND FROM THE SITE INCLUDING, BUT NOT LIMITED TO, ANY GUARANTEE THAT THE CONTENT, SITES OR RESOURCES ARE FREE FROM SOURCE MATERIAL THAT IS MALICIOUS, INDECENT, OR CONTROVERSIAL;</li>
                                            <li>WE DO NOT GUARANTEE OR WARRANT THAT YOU WILL BE GRANTED VALID TRAVEL PERMITS APPLICABLE TO YOU. WE DO NOT HAVE ANY RESPONSIBILITY TO NOTIFY YOU OR INDEMNIFY YOU IN THE EVENT THAT YOU SUFFER LOSSES OR DAMAGES RELATING TO YOUR LACK OF VISA OR TRAVEL PERMITS (INCLUDING, BUT NOT LIMITED TO, REFUSAL OF ENTRY, DEPORTATION).
                                            </li>
                                            <li>ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THIS SERVICE IS AT YOUR SOLE RESPONSIBILITY AND RISK. YOU VOLUNTARILY ASSUME SUCH RISK, AND YOU WILL BE FULLY RESPONSIBLE FOR DAMAGE TO YOUR COMPUTER SYSTEM OR LOSS OF DATA THAT RESULTS FROM DOWNLOADING ANY MATERIALS THAT ARE PROVIDED.</li>
                                        </ol> 
                                    </li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">LIMITATION OF LIABILITY
                                <ol className="nestedNumbering">
                                    <li>WITHOUT PREJUDICE TO WHAT IS SET OUT IN THESE TERMS, EACH PARTY’S LIABILITY IS LIMITED AND EXCLUDED TO THE MAXIMUM EXTENT PERMITTED BY LAW, SUCH AS FOR PERSONAL INJURY AND DEATH. WE SHALL NOT BE LIABLE FOR ANY LOSSES OR DAMAGES, WHETHER DIRECT OR INDIRECT, RESULTING FROM OR CONNECTED TO YOUR USE OF THIS SITE OR USE OF THE LINKS ON THE SITE, INCLUDING BUT NOT LIMITED TO SPECIAL, INCIDENTAL, PUNITIVE OR CONSEQUENTIAL DAMAGES OR OTHER ECONOMIC LOSS, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF LOSS OR DAMAGE THAT MAY OCCUR. THE ONLY AVAILABLE REMEDY FOR YOU IS TERMINATION OF USE OF THIS SITE.</li>
                                </ol>
                            </li>
                            
                            
                            <li className="nestedTitle">INDEMNIFICATION
                                <ol className="nestedNumbering">
                                    <li>You hereby agree to indemnify and hold harmless Cravelio and its employees, affiliates, staff and partners, from and against any and all claims, demands, liability, damage or loss including legal fees, which arise as a result of claims of third parties in connection with: (a) your use of the Site; (b) Content that is given, provided or accessed through this Site; (c) your violation of the Terms; (d) violation of any other rights or obligations; and/or (e) any act or omission by you, whether negligent, unlawful or otherwise.</li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">THIRD PARTY LINKS AND CONTENTS
                                <ol className="nestedNumbering">
                                    <li>The Site may contain links to websites operated by parties other than Cravelio. We do not control those sites or links and are not responsible for the content or privacy or other activities of such sites. We, or other third parties, may upload automated search results or provide links to other sites. We provide opportunities for third parties to deliver, load, transmit or otherwise make available any information, data, text, images, sound, graphics, video, messages, reviews, or other materials ("Content") through this Site. We do not review and/or do not have control over the site, source, and the Content. You agree that we are not responsible for the content or the availability of such sites and resources, and we do not endorse or recommend and are not responsible for the origin of the site or the Content. You hereby agree to release us from and against any and all liabilities, expenses, loss, or damage, directly or indirectly caused or allegedly caused by or in connection with the use of or account for the Content, site or resource.</li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">TERMINATION
                                <ol className="nestedNumbering">
                                    <li>Cravelio has sole and full discretion to change, postpone, discontinue or stop this Site and/or part of the Site, including services or products that are made available in this Site, and/ or usage of this Site, or part thereof, at any time for any reason without prior notification to you.</li>
                                    <li>In the event of termination, you remain bound by the obligations in these Terms, including but not limited to the warranties, indemnification, waiver and limitation of liabilities that you have agreed to.</li>
                                    <li>Cravelio shall not be liable to you or any third-party for any termination or suspension of your access to the Site.</li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">PRIVACY
                                <ol className="nestedNumbering">
                                    <li>Cravelio values Users’ confidentiality. Cravelio will endeavour to comply with the requirements of relevant data protection legislation when performing its obligations under these Terms. A separate Privacy Policy document sets out rights and obligations of Cravelio and the user in relation to privacy, available <a href="https://www.cravelio.com/en-id/privacypolicy">here</a>.</li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">GOVERNING LAW
                                <ol className="nestedNumbering">
                                    <li>These Terms shall be governed by and interpreted in accordance solely with the Laws of Singapore.</li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">DISPUTE RESOLUTION
                                <ol className="nestedNumbering">
                                <li>In the event of a dispute arising out of or in connection with these Terms, both Parties shall first discuss in good faith to reach an amicable resolution within sixty (60) days from the date of the notice of dispute. However, if such dispute may not be settled by mutual consultation within sixty (60) days, it shall be referred to mediation at the Singapore Mediation Centre in accordance with the Mediation Procedure. If the dispute remains unresolved, it shall be submitted to the exclusive jurisdiction of the courts of the Republic of Singapore.</li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">GENERAL
                                <ol className="nestedNumbering">
                                    <li>These Terms shall constitute the entire agreement and understanding between you and Cravelio on the subject matter thereof, and shall supersede all prior agreements, whether written or oral, between you and Cravelio concerning the subject matter thereof.</li>
                                    <li>To clarify, Cravelio does not manage or control the Vendors.</li>
                                    <li>If you use the Site for or on behalf of a third-party ("Third-party"), such as a family member or a traveling companion, you are responsible for any error in the accuracy of information provided in connection with such use. In addition, you must inform the Third-party of all applicable terms and conditions. When using the Site for or on behalf of a Third-party, you agree to indemnify and hold Cravelio harmless from and against any and all liabilities, losses, damages, suits and claims including legal fees, arising from or connected to the breach of these Terms or negligence by you and/or the Third-party.</li>
                                    <li>These Terms are drawn up in the English language. Any translation into another language is for convenience and information purposes only. In case of conflict between the English language version and any such translation, the English language version shall prevail. Headings in this Agreement are inserted for convenience only and shall not affect the interpretation or construction of these Terms.</li>
                                    <li>In the event that any provision is determined to be unenforceable or invalid, by any court of competent jurisdiction, such provision shall nonetheless be enforced to the fullest extent permitted by applicable law and such determination shall not affect the validity and enforceability of any other remaining provisions. The severed provision shall be replaced by a provision approximating as much as possible the original wording and intent.</li>
                                    <li>Failure by either Party to enforce any provision of these Terms at any time shall not be construed as a waiver of each Party’s rights to enforce the breach of such provision or any other provision in these Terms or as a waiver of any continuing, succeeding or subsequent breach of any provision or other provisions of these Terms.</li>
                                    <li>You may not assign or transfer your rights or obligations under these Terms, without our prior written consent.</li>
                                    <li>We reserve the right to amend or repeal the Terms (or parts thereof) in our sole discretion. We may amend the Terms at any time by posting a variation on the Site. The latest version of the Terms will supersede all previous versions.</li>
                                    <li>Except where expressly stated, nothing in these Terms is intended to grant to any third party any right to enforce any term or to confer on any third party any benefits under these Terms. The application of the Contracts (Rights of Third Parties) Act (Cap. 53B) and any re-enactment is expressly excluded.</li>
                                    <li>Notices given pursuant to these Terms shall be deemed sufficiently given if they are in writing and forwarded by registered post or recorded delivery service or equivalent to either Party (at our registered address, or otherwise notified).</li>
                                    <li>By using our Services, you acknowledge that we may need to comply with additional terms and conditions provided by our suppliers that may be applicable for certain products.  Specifically for certain hotel products provided by EAN.com L.P. (“EAN”), you agree that you will comply with the applicable EAN terms &amp; conditions as stipulated in http://developer.ean.com/terms/en/.</li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">FORCE MAJEURE
                                <ol className="nestedNumbering">
                                    <li>Cravelio shall not be liable for any non-performance or violation of these Terms, such as for transaction failure, restricted access to the Site, or any damage or harm to users caused by any act or condition beyond the reasonable control of either You or Us (“Force Majeure Event”). Force Majeure Events include but are not limited to natural disaster (floods, earthquakes), epidemic, riot, a declaration of war, war, military action, terrorist action, embargo, sanctions, changes in laws or regulations, lightning, hurricanes / typhoons / cyclones, labor strikes, demonstrations, airline or hotel bankruptcy or insolvency, and so forth.</li>
                                    <li>Cravelio shall not be responsible for any damages or losses caused by any means to any party if Cravelio cannot process your order because of the Force Majeure Event.</li>
                                </ol>
                            </li>
                            
                            <li className="nestedTitle">ABOUT Cravelio – FAQS
                                <ol className="nestedNumbering">
                                    <li>If you have any further questions please refer to the <a href="https://www.cravelio.com/en-id/faq">FAQs</a>.</li>
                                </ol>
                            </li>
                        
                            <li className="nestedTitle">OTHERS
                                <ol className="nestedNumbering">
                                    <li>Certain products offered through this Platform are subject to the terms and conditions that can be accessed <a href="http://developer.ean.com/terms/en/">here</a> ("Secondary TnC").  Your acceptance to this Terms and Conditions shall also constitute acceptance to the Secondary TnC. If you are not sure whether your reservation is subject to the Secondary TnC, please contact us to confirm before you execute the transaction.</li>
                                </ol>
                            </li>
                            </ol>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default TermsAndConditions