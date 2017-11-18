import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import footer from "react-bootstrap/lib/ModalHeader";
import { Panel, Grid, Row, Col, Button, Modal } from 'react-bootstrap';

class PrivacyPolicyModal extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Modal {...this.props} className="policy-modal">
        <div className="close-modal" onClick={this.props.onHide}>
          <div className="lr">
            <div className="rl">
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="modal-body">
                <h3>MEDFELLOW CORPORATION</h3>
                <h4>PRIVACY POLICY</h4>
                <p>MedFellow Corporation ("MedFellow") is committed to protecting the privacy of individuals who visit www.medfellow.com (the "Site").</p>
                <h4>What this Privacy Policy Covers</h4>
                <p>This privacy policy covers the Site’s treatment of personally identifiable information collected through the Site.</p>
                <p>This privacy policy does not apply to the practices of companies that MedFellow does not own or control, or of persons that MedFellow does not employ or manage, including any third-party content contributors bound by contract and any third-party websites to which MedFellow websites link.</p>
                <h4>Data Controller</h4>
                <p>The data controller of this website is MedFellow whose office is situated at 2 East End Ave, Apt 1E, New York, NY 10075.</p>
                <h4>Information collected and purpose</h4>
                <p>When you visit our Site, we automatically process the following information:</p>
                <ul>
                  <li>The requested web page or download;</li>
                  <li>Whether the request was successful or not; and</li>
                  <li>The date and time when you accessed the site</li>
                </ul>
                <p>Additionally, we collect the information you enter into the Site you when you register on our site or subscribe to any of our email newsletters.  When you create an account with MedFellow, you may be required to provide personal data for the purposes of creating and maintaining an account, including contact data (such as your name, address, and email address) and demographic data (such as your zip code, age and income).  If you complete transactions with us online—including purchasing packages of tutoring hours—you will be asked to provide additional information, including personal and financial information required to process those transactions. If you apply to be listed as a tutor, the profile that you create on our Site will be publicly accessible to our customers.</p>
                <p>You will be asked to create a Username and password once you have created an account on the Site. Usernames and passwords are a way to identify you on the Site.  If someone has your Username and password, they can use it to access the information you have entered into your profile and through the Site.</p>
                <h4>Use of Cookies, Pixels, and other Technology</h4>
                <p>We currently use cookies or pixels as well as other technology and local storage to provide and evaluate a range of products and services.</p>
                <p>We may ask other partners to serve ads or services to computers, mobile phones or other devices, which may use a cookie, pixel or other similar technology placed by MedFellow or the third party.</p>
                <p>If you want to learn more about how advertisers generally use cookies and the choices advertisers provide, you can visit the Network Advertising Initiative, the Digital Advertising Alliance, the Internet Advertising Bureau (US), or the Internet Advertising Bureau (EU).</p>
                <p>Refer to your browser or device's settings and help material to learn what controls you can use to remove or block cookies or other similar technologies or block or remove other data stored on your computer or device. If you do this, it may affect your ability to use the Site or other websites and apps.</p>
                <h4>Social Media Widgets</h4>
                <p>Our Site includes social media features, such as the Facebook Like button and widgets, such as the “Share” button. These features may collect your IP address, which page you are visiting on our Site, and may set a cookie to enable the feature to function properly. These social media features and widgets are either hosted by a third party or hosted directly on our Site. Your interactions with these features are governed by the privacy policy of the company providing it.</p>
                <h4>Referral Program</h4>
                <p>If you choose to use our referral service to refer a friend to our Site, we will ask you for your friend’s name and email address. We will automatically send your friend a one-time email inviting him or her to visit the Site. We store this information for the sole purpose of sending this one-time email and tracking the success of our referral program.  Your friend may contact us at info@medfellow.com to request that we remove this information from our database.</p>
                <h4>How we Use the Information We Receive</h4>
                <p>We use the information we receive about you in connection with the services and features we provide to you and other users, our partners, the advertisers that purchase ads on the site (if applicable), and the developers that build the Site and any of its interactive features. For example, we may use the information we receive about you:</p>
                <ul>
                  <li>as part of our efforts to keep MedFellow products, services and integrations safe and secure;</li>
                  <li>to protect MedFellow’s or others' rights or property;</li>
                  <li>to personalize your experience (your information helps us to better respond to your individual needs);</li>
                  <li>to improve our website (we continually strive to improve our website offerings based on the information and feedback we receive from you);</li>
                  <li>to improve customer service (your information helps us to more effectively respond to your customer service requests and support needs);</li>
                  <li>for internal operations, including troubleshooting, data analysis, testing, research and service improvement;</li>
                  <li>to keep student records;</li>
                  <li>to send periodic emails</li>
                </ul>
                <p>We may also share your information with the tutor(s) who may or will be tutoring you so that they may evaluate the engagement and personalize and tailor the tutoring to you. In each case, we collect and provide this information only insofar as is necessary or appropriate to fulfill the purpose of your interaction with a tutor. </p>
                <p>The email address you provide us may be used to send you information and updates pertaining to your order, in addition to receiving occasional company news, updates, related product or service information, etc.  If you would like to unsubscribe from receiving future emails, please follow the unsubscribe instructions at the bottom of each email.</p>
                <p>While you are allowing us to use the information we receive about you, you always own all of your information. Your trust is important to us, which is why we don't share information we receive about you with others unless we have:</p>
                <ul>
                  <li>received your permission; or</li>
                  <li>given you notice, such as by telling you about it in this policy.</li>
                </ul>
                <p>We store data for as long as it is necessary to provide products and services to you and others, including those described above. Typically, information associated with your account will be kept until your account is deleted.</p>
                <p>We may enable access to public information that has been shared through our services.  We may allow service providers to access information so they can help us provide services.</p>
                <h4>Your rights as data subject</h4>
                <p>You have the right to access the data held about you by MedFellow, which you can exercise by submitting your request in writing to info@medfellow.com.</p>
                <p>We request that you inform us of any change to the personal data held by MedFellow. If you believe that information held about you is inaccurate, you may request correction of that data. You also have the right to request that we block or erase data that has been processed unlawfully.</p>
                <h4>Information Sharing and Disclosure</h4>
                <p>MedFellow may disclose your personal information to third parties, including tutors, who work on behalf of MedFellow to provide products and services requested by you. We will share personal information for these purposes only with third parties whose privacy policies are consistent with ours or who agree to abide by this policy.</p>
                <p>MedFellow may otherwise disclose your personal information when:</p>
                <ul>
                  <li>We have your express consent to share the information for a specified purpose;</li>
                  <li>We need to respond to subpoenas, court orders or such other legal process;</li>
                  <li>We need to protect the personal safety of the users of our websites or defend the rights or property of MedFellow; or</li>
                  <li>Your actions on our Site violate the MedFellow Terms of Use or any of our usage guidelines for specific products or services.</li>
                </ul>
                <p>We may also release your information when we reasonably believe release is appropriate to comply with the law, enforce our site policies, or protect our or others’ rights, property, or safety.</p>
                <p>We may provide non-personally identifiable visitor information to third parties for marketing, advertising, or other uses.</p>
                <h4>Links to other Web Sites</h4>
                <p>Our Site may connect you to the websites of other organizations and agencies and third party products. When connecting to other websites from our Site, you will no longer be subject to this policy but to the privacy policy of the new site.  These third party sites have separate and independent privacy policies, and we have no responsibility or liability for the content and activities of these linked sites. We do, however, seek to protect the integrity of our services and welcome any feedback about third party websites to which our Site links.</p>
                <h4>California Online Privacy Protection Act Compliance</h4>
                <p>Because we value your privacy we have taken the necessary precautions to be in compliance with the California Online Privacy Protection Act. We therefore will not distribute your personal information to outside parties without your consent.</p>
                <h4>Children’s Online Privacy Protection Act Compliance</h4>
                <p>We are in compliance with the requirements of COPPA (Childrens Online Privacy Protection Act).  Our website, products and services are all directed to people who are at least 13 years old or older, and we do not collect any information from anyone under 13 years of age.</p>
                <h4>Online Privacy Policy Only</h4>
                <p>This online privacy policy applies only to information collected through our Site and not to information collected offline.</p>
                <h4>Consent</h4>
                <p>By using this Site, you consent to this Privacy Policy, including the collection and use of your personal data described on this page.</p>
                <p>If you have provided personal information to MedFellow and no longer consent to its use or disclosure as outlined herein, please notify MedFellow at info@medfellow.com.</p>
                <h4>Changes to this Privacy Policy</h4>
                <p>If there are any changes to this privacy policy, we will replace this page with an updated version. For that reason, you should check the "Privacy Policy" page any time you access our Site so that you are aware of any changes that may have been made since your last visit.</p>
                <p>This privacy policy was last modified on September 01, 2016.</p>
                <div className="text-center">
                  <button type="button" className="btn btn-default btn-sm" onClick={this.props.onHide}><i className="fa fa-times"></i> Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

class TermsAndConditionsModal extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Modal {...this.props} className="policy-modal">
        <div className="close-modal" onClick={this.props.onHide}>
          <div className="lr">
            <div className="rl">
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="modal-body">
                <h3>MEDFELLOW CORPORATION</h3>
                <h4>TERMS AND CONDITIONS OF USE</h4>
                <p>In using this website you are deemed to have read and agreed to the following terms and conditions:</p>
                <p>These terms and conditions of use constitute a legal agreement (“Agreement”) between you and MedFellow Corporation, a Delaware corporation (“MedFellow”). By accessing the MedFellow website, currently located at www.medfellow.com (the “Site”), you become a “User” and agree to, and are bound by, the terms and conditions of this Agreement for as long as you continue to use the Site or the services MedFellow provides (the “Service”).  Your use of, or participation in, additional services may be subject to additional terms.  Any additional terms will be either listed in this Agreement or will be presented to you for your acceptance when you sign up to those additional services.</p>
                <p>This Agreement is subject to change by Pluto Prep in its sole discretion at any time, with or without notice. Your continued use of the Site, or the Service after the posting of revisions to this Agreement will constitute your acceptance of those revisions. Please consult the end of this Agreement to determine when the Agreement was last revised.</p>
                <h4>USE OF MEDFELLOW</h4>
                <p><strong>Minimum Age:</strong> You must be at least 13 years old to access and register for the Site.</p>
                <p><strong>Terms and Termination:</strong>  This Agreement will become effective upon your acceptance of the Agreement by your use of the Site and will remain in effect in perpetuity unless terminated under its terms. Either you or MedFellow may terminate your account at any time, for any reason or no reason, without explanation, effective upon sending written notice to the other party. MedFellow reserves the right to immediately suspend or terminate your access to the Service, without notice, for any reason or no reason. We also reserve the right to remove your account information or data from the Service and any other records at any time at our sole discretion.</p>
                <p><strong>Exclusive Use:</strong> Your account is for your personal use only. You may not authorize others to use your account, and you may not assign or otherwise transfer your account to any other person or entity. You acknowledge that MedFellow is not responsible for third-party access to your account that results from theft or misappropriation of your mobile devices, usernames or passwords.</p>
                <p><strong>Geographic Limitations:</strong> MedFellow is intended for use in the United States and internationally. You will only use the Service in a manner consistent with this Agreement and any and all applicable local, state, national and international laws and regulations, including, but not limited to, United States export control laws. You are not located in, under the control of, or a national or resident of any country which the United States has (i) embargoed goods, (ii) identified as a Specially Designated National, or (iii) placed on the Commerce Department’s Table of Deny Orders. Registration for, and use of, the Service is void where prohibited.</p>
                <p><strong>Information Submitted:</strong>  You are solely responsible for, and assume all liability regarding, (i) the information and content you contribute to the Service and (ii) the information and content you post, transmit, publish, or otherwise make available (hereinafter “post”) through the Service, if applicable.</p>
                <p><strong>No False Information:</strong> You will not provide inaccurate, misleading or false information to MedFellow, MedFellow’s tutors (“Tutors”) or to any other User. If information provided to MedFellow, a Tutor or another User subsequently becomes inaccurate, misleading or false, you will promptly notify MedFellow of such change.</p>
                <p><strong>No Guarantees:</strong> You understand that MedFellow makes no guarantees, either express or implied, regarding your chances of achieving a particular score, scoring within a particular percentile, or improving your score on the Medical College Admissions Test (“MCAT”) or any other test or academic subjects related to the Service.  MedFellow makes no representation regarding how well its practice tests simulate the actual MCAT or any other test.</p>
                <p><strong>No Affiliation:</strong> MedFellow practice exams and study materials are created and owned solely by MedFellow.  MedFellow is not in any way associated or affiliated with the Association of American Medical Colleges.  The Association of American Medical Colleges does not review or provide any input whatsoever, to the MedFellow team regarding any of its products, including but not limited to practice MCATs.</p>
                <p><strong>Posting and Communication Restrictions:</strong> You will not post on the Site, transmit to other Users, communicate any content (or links thereto), or otherwise engage in any activity on the Site and through the Service, that:</p>
                <ul>
                  <li>is intended to defraud, swindle or deceive others;</li>
                  <li>is intended to or tends to harass, annoy, threaten or intimidate other Users, or MedFellow personnel;</li>
                  <li>disseminates another person’s personal information without his or her permission, or collects or solicits another person’s personal information for commercial or unlawful purposes;</li>
                  <li>impersonates, or otherwise misrepresents affiliation, connection or association with, any person or entity;</li>
                  <li>collects or solicits personal information about anyone under 18;</li>
                  <li>promotes racism, bigotry, hatred or physical harm of any kind against any group or individual;</li>
                  <li>is defamatory, inaccurate, abusive, obscene, profane, offensive, sexually oriented, obscene or otherwise objectionable;</li>
                  <li>contains others’ copyrighted content (e.g., music, movies, videos, photographs, images, software, etc.) without obtaining permission first;</li>
                  <li>contains video, audio photographs, or images of another person without his or her permission (or in the case of a minor, the minor’s legal guardian);</li>
                  <li>promotes or enables illegal or unlawful activities;</li>
                  <li>contains viruses, time bombs, trojan horses, cancelbots, worms or other harmful, or disruptive codes, components or devices;</li>
                  <li>promotes or solicits involvement in or support of a political platform, religion, cult, or sect;</li>
                  <li>is off-topic, meaningless, or otherwise intended to annoy or interfere with others’ enjoyment of the Site or Service;</li>
                  <li>solicits gambling or engages in any gambling or similar activity;</li>
                  <li>uses scripts, bots or other automated technology to access the Service;</li>
                  <li>uses the Service for chain letter, junk mail or spam e-mails; or</li>
                  <li>is in any way used for or in connection with spamming, phishing, trolling, or similar activities.</li>
                </ul>
                <p><strong>No Advertising or Commercial Solicitation:</strong> You will not advertise or solicit any User to buy or sell any products or services through the Service nor will you solicit or advertise any User, other than MedFellow itself, to donate to any charities through the Service. Further, you will not use any information obtained from the Service in order to contact, advertise to, solicit, or sell to any User without their prior explicit consent.</p>
                <h4>FEES AND BILLING</h4>
                <p>Except as required by law, all fees are nonrefundable. MedFellow reserves the right to refuse or terminate any purchase or attempted purchase at any time in its sole discretion. You understand and agree that if you authorize a payment transaction with your credit card, debit card, or other payment method, but your charge is rejected for any reason, there may be a hold on your use of that transaction amount for several days.</p>
                <h4>PROPRIETARY RIGHTS</h4>
                <p><strong>Ownership of Proprietary Information:</strong> You acknowledge and agree that MedFellow is the owner of valuable proprietary information, including without limitation, the website content, practice tests and questions, study aids, software code and other intellectual property used to operate the Site and the Service (collectively, “Confidential Information”). MedFellow owns and hereby retains all proprietary rights in the Service and the Site, including but not limited to, all Confidential Information.</p>
                <p><strong>Use License:</strong> MedFellow grants you a terminable non-exclusive, non-transferable license to use the Site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: (1) modify or copy the materials, (2) use the materials for any commercial purpose, or for any public display (commercial or non-commercial), (3) attempt to decompile or reverse engineer any software contained on the Site, (4) remove any copyright or other proprietary notations from the materials, or (5) transfer the materials to another person or "mirror" the materials on any other server. This license will automatically terminate if you violate any of these restrictions and may be terminated by MedFellow at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</p>
                <p><strong>Partners and Third Party Advertisers:</strong>  MedFellow may post third party copyrighted information, whether or not it is identified as copyrighted.  You agree that you will not copy, modify, publish, transmit, distribute, perform, display, commercially use, or sell any third party proprietary information available via the Service.</p>
                <p><strong>License to Posted Content:</strong> By uploading any of your information and content to any profile pages or public area of the Service, you automatically grant, and you represent and warrant that you have the right to grant, to MedFellow an irrevocable, perpetual, non-exclusive, fully-paid, worldwide license to use, reproduce, publicly perform, publicly display and distribute such information and content, and to prepare derivative works of, or incorporate into other works, such information and content, and to grant and authorize sub-licenses of the foregoing.</p>
                <h4>USER INFORMATION</h4>
                <p><strong>Privacy Policy:</strong> For information about the collection and possible use of information and material provided by you, please click on MedFellow’s Privacy Policy. By using the Site or the Service, you are consenting to the terms of this Privacy Policy.</p>
                <p><strong>Links from this Website:</strong> MedFellow does not monitor or review the content of other parties’ websites which are linked to from this Site. Opinions expressed or material appearing on other websites are not necessarily shared or endorsed by MedFellow. MedFellow is not responsible for the privacy practices, or content, of other websites. MedFellow will not accept any responsibility for any loss or damage resulting from your disclosure of personal information to third parties on other websites.</p>
                <p><strong>Disclosure By Law:</strong>  You acknowledge and agree that MedFellow may disclose information you provide if required to do so by law, at the request of a third party, or if we, in our sole discretion, believe that disclosure is reasonable to (1) comply with the law, requests or orders from law enforcement, or any legal process (whether or not such disclosure is required by applicable law); (2) protect or defend MedFellow’s, or a third party’s, rights or property; or (3) protect someone’s health or safety, such as when harm or violence against any person (including the User) is threatened.</p>
                <p><strong>Use of Anonymous Information for Research and Marketing:</strong>  By using the Service, you agree to allow MedFellow to anonymously use information from you and your experiences through the Service for research and marketing development purposes and to improve the Service.</p>
                <p><strong>Communication and Privacy:</strong> We may use your email address to send you our newsletter, or messages notifying you of any new products or services we are offering, any potential issues with your account, or purchases, important changes to the Service or special offers. Further, we may contact you by telephone if you voluntarily provide us with your telephone number, in order to communicate with you regarding the Service. If you do not want to receive such email messages or telephone calls (including at any wireless number you may have voluntarily provided us), please refer to our Privacy Policy to review and update your options.</p>
                <h4>DISCLAIMER OF WARRANTY</h4>
                <p><strong>No Warranties:</strong> THIS SECTION WILL APPLY TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW. MEDFELLOW PROVIDES THE SERVICE ON AN “AS IS” AND “AS AVAILABLE” BASIS AND GRANTS NO WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE WITH RESPECT TO THE SERVICE OR THE SITE (INCLUDING ALL INFORMATION CONTAINED ON THE SITE), INCLUDING ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT. MEDFELLOW DOES NOTWARRANT THAT YOUR USE OF THE SERVICE WILL BE SECURE, UNINTERRUPTED, ALWAYS AVAILABLE, ERROR-FREE OR WILL MEET YOUR REQUIREMENTS, OR THAT ANY DEFECTS IN THESERVICE WILL BE CORRECTED. MEDFELLOW DISCLAIMS LIABILITY FOR, AND NO WARRANTY IS MADE WITH RESPECT TO, THE CONNECTIVITY AND AVAILABILITY OF THE SERVICE.</p>
                <p>MEDFELLOW DOES NOT: (I) GUARANTEE THE ACCURACY, COMPLETENESS OR USEFULNESS OF ANY INFORMATION PROVIDED ON THE SERVICE, OR (II) ADOPT, ENDORSE OR ACCEPT RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY OPINION, ADVICE, OR STATEMENT MADE BY ANY PARTY OTHER THAN MEDFELLOW. </p>
                <p><strong>Third Party Content:</strong>  The Site contains opinions, advice, statements, offers, and other information and content produced by third parties, including Tutors.  The authors of that information and content are solely responsibility for it, and you rely on that information or content at your own risk. We generally do not control, and we make no representations or warranties regarding the reliability of, any verification service or any information provided by such verification service we use to confirm the validity of our tutors’ claimed educational credentials and lack of criminal history.</p>
                <h4>LIMITATION OF LIABILITY AND INDEMNIFICATION</h4>
                <p><strong>Incidental Damages and Aggregate Liability:</strong>  IN NO EVENT WILL MEDFELLOW OR ANY OF ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS OR CONTENT OR SERVICE PROVIDERS (INCLUDING TUTORS) BE LIABLE FOR ANY INCIDENTAL, SPECIAL, CONSEQUENTIAL OR INDIRECT DAMAGES ARISING OUT OF OR RELATING TO THE USE OR INABILITY TO USE THE SERVICE, INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OR CORRUPTION OF DATA OR PROGRAMS, SERVICE INTERRUPTIONS AND PROCUREMENT OF SUBSTITUTE SERVICES, EVEN IF MEDFELLOW KNOWS OR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. UNDER NO CIRCUMSTANCES WILL MEDFELLOW’S AGGREGATE LIABILITY TO ANY USER EXCEED THE TOTAL OF THE FEES PAID TO MEDFELLOW BY THAT USER.</p>
                <p><strong>No Liability for non-MedFellow Actions:</strong> TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL MEDFELLOW BE LIABLE FOR ANY DAMAGES, WHETHER DIRECT, INDIRECT, GENERAL, SPECIAL, COMPENSATORY, CONSEQUENTIAL, AND/OR INCIDENTAL, ARISING OUT OF OR RELATING TO THE CONDUCT OF YOU OR ANYONE ELSE IN CONNECTION WITH THE USE OF THE SERVICE OR PARTICIPATION IN ANY EVENT, INCLUDING WITHOUT LIMITATION, BODILY INJURY, EMOTIONAL DISTRESS, AND/OR ANYOTHER DAMAGES RESULTING FROM COMMUNICATIONS OR MEETINGS WITH OTHER USERS. THIS INCLUDES ANY CLAIMS, LOSSES OR DAMAGES ARISING FROM THE CONDUCT OF USERS WHO HAVE REGISTERED UNDER FALSE PRETENSES OR WHO ATTEMPT TO DEFRAUD OR HARM YOU.</p>
                <p><strong>Indemnification:</strong> You agree to indemnify, defend and hold harmless MedFellow, its directors, officers employees, agents and content or service providers (including Tutors), for any losses, costs, liabilities and expenses (including reasonable attorneys’ fees) relating to or arising out of (a) your use of or inability to use the Service, (b) your violation of any terms of this Agreement or your violation of any rights of a third party, or (c) your violation of any applicable laws, rules or regulations. MedFellow reserves the right, at its own cost, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will fully cooperate with MedFellow in asserting any available defenses.</p>
                <h4>GENERAL PROVISIONS</h4>
                <p><strong>Complaints:</strong> To resolve a complaint regarding the Service, you should e-mail us at info@medfellow.com.</p>
                <p><strong>Controlling Law:</strong>  Any disputes arising out of or related to this Agreement or any use by you of the Service or participation in any Event shall be governed by the internal laws of the State of Massachusetts, without regard to its choice of law rules and without regard to conflicts of laws principles, except that the Arbitration provision shall be governed by the Federal Arbitration Act.</p>
                <p><strong>Miscellaneous:</strong>  This Agreement, which you accept upon registration for the Service, the Privacy Policy, and any applicable payment or purchase terms comprise the entire agreement between you and MedFellow regarding the use of the Service, superseding any prior agreements between you and MedFellow related to the Service (including, but not limited to, any prior versions of this Agreement). Unless otherwise explicitly stated, the Agreement will survive termination of your account. The failure of MedFellow to exercise or enforce any right or provision of this Agreement does not constitute a waiver of such right or provision. If any provision of this Agreement is held invalid, the remainder of this Agreement will continue in full force and effect. The Section titles in this Agreement are for convenience only and have no legal or contractual effect.</p>
                <p><strong>Waiver:</strong>  Failure of either party to insist upon strict performance of any provision of this Agreement or or to exercise any right or remedy to which it is entitled hereunder will not constitute a waiver thereof and will not diminish the obligations under this Agreement.</p>
                <p><strong>Arbitration:</strong>  We will make every reasonable effort to resolve any disagreements that you have with MedFellow. If those efforts fail, by using the Service you agree that any claim, dispute, or controversy you may have against MedFellow arising out of, relating to, or connected in any way with this Agreement, the Service shall be resolved exclusively by final and binding arbitration administered by the American Arbitration Association (“AAA”) and conducted before a single arbitrator pursuant to the applicable Rules and Procedures established by AAA (“Rules and Procedures”). You agree further that: (a) the arbitration shall be held at a location determined by AAA pursuant to the Rules and Procedures (provided that such location is reasonably convenient for you), or at such other location as may be mutually agreed upon by you and MedFellow; (b) the arbitrator shall apply Massachusetts law consistent with the Federal Arbitration Act and applicable statutes of limitations, and shall honor claims of privilege recognized at law; (c) there shall be no authority for any claims to be arbitrated on a class or representative basis; arbitration can decide only your and/or MedFellow’s individual claims; and the arbitrator may not consolidate or join the claims of other persons or parties who may be similarly situated; (d) in the event that you are able to demonstrate that the costs of arbitration will be prohibitive as compared to the costs of litigation, MedFellow will pay as much of your filing and hearing fees in connection with the arbitration as the arbitrator deems necessary to prevent the arbitration from being cost-prohibitive; and (e) with the exception of subpart (c) above, if any part of this arbitration provision is deemed to be invalid, unenforceable or illegal, or otherwise conflicts with the Rules and Procedures established by AAA, then the balance of this arbitration provision will remain in effect and be construed in accordance with its terms as if the invalid, unenforceable, illegal or conflicting provision were not contained herein. If, however, subpart (c) is found to be invalid, unenforceable or illegal, then the entirety of this paragraph will be null and void, and neither you nor MedFellow will be entitled to arbitrate their dispute.</p>
                <h4>Digital Millennium Copyright Act Notice</h4>
                <p>If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible on the Site, please notify MedFellow’s designated agent, as set forth in the Digital Millennium Copyright Act of 1998 (“DMCA”). For your complaint to be valid under the DMCA, you must provide the following information in writing:</p>
                <ul>
                  <li>An electronic or physical signature of a person authorized to act on behalf of the copyright owner;</li>
                  <li>Identification of the copyrighted work that you claim is being infringed;</li>
                  <li>Identification of the material that is claimed to be infringing and where it is located on the Site;</li>
                  <li>Information reasonably sufficient to permit MedFellow to contact you, such as your address, telephone number, and e-mail address;</li>
                  <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or law; and</li>
                  <li>A statement, made under penalty of perjury, that the above information is accurate, and that you are the copyright owner or are authorized to act on behalf of the owner.</li>
                </ul>
                <p>The above information must be submitted to the following DMCA Designated Agent: joe@medfellow.com.</p>
                <p>Date of Last Revision: This Agreement was last revised on September 01, 2016.</p>
                <div className="text-center">
                  <button type="button" className="btn btn-default btn-sm" onClick={this.props.onHide}><i className="fa fa-times"></i> Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { tsShow: false, ppShow: false }
  }

  render() {
    let tsClose = () => this.setState({ tsShow: false });
    let ppClose = () => this.setState({ ppShow: false });
    return (
      <div>
        <footer>
          <div className="footer-above">
            <div className="container">
              <Row className="show-grid">
                <Col xs={12} md={6} className="footer-col">
                  <div className="copyrights">&copy; Medfellow 2016</div>
                  <ul className="site-map">
                    <li>About Us</li>
                    <li>|</li>
                    <li><a href="#" onClick={() => this.setState({ tsShow: true })}>Terms of Service</a></li>
                    <li>|</li>
                    <li><a href="#" onClick={() => this.setState({ ppShow: true })}>Privacy Policy</a></li>
                    <li>|</li>
                    <li>Contact Us</li>
                  </ul>
                </Col>
              </Row>
            </div>
          </div>
        </footer>
        <div className="scroll-top page-scroll hidden-sm hidden-xs hidden-lg hidden-md">
          <a className="btn btn-primary" href="#page-top">
            <i className="fa fa-chevron-up"></i>
          </a>
        </div>
        <TermsAndConditionsModal show={this.state.tsShow} onHide={tsClose} />
        <PrivacyPolicyModal show={this.state.ppShow} onHide={ppClose} />
      </div>
    );
  }
};

export default Footer;
