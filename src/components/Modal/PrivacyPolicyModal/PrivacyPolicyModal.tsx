import React from 'react';
import { Modal, Typography } from 'antd';
import './PrivacyPolicyModal.css';

const { Title, Paragraph, Text } = Typography;

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      className="privacyPolicyModal"
      centered
    >
      <Title level={2} style={{color:"white"}}>Privacy Policy</Title>
      <Paragraph className="lastRevised">
        <Text strong>Last revised on June 14, 2024</Text>
      </Paragraph>
      <Paragraph>
        This Privacy Policy describes how Mindfans AI, Inc. ("Mindfans", "we", "us", "our") collects, uses and discloses information about you when you use our website (https://Mindfans.ai) and the tools, services, features and functionality offered on or through our website, including our generative artificial intelligence platform (collectively, the "Services"). For the purpose of this Privacy Policy, Mindfans is the data controller for your information, and "you" and "your" means you as the user of the Services. Please note that the Services are designed for users in the United States only and are not intended for users located outside the United States.
      </Paragraph>
      <Paragraph>
        Please read this Privacy Policy carefully. By using any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree to this Privacy Policy, please do not use or access the Services.
      </Paragraph>

      <Title level={4}>1. Changes to this Privacy Policy</Title>
      <Paragraph>
        We may modify this Privacy Policy from time to time, in which case we will update the "Last Revised" date at the top of this Privacy Policy, post the updated version on our Services and take any other steps required by applicable law. If you do not agree to any updates to this Privacy Policy, please do not continue to use or access the Services.
      </Paragraph>

      <Title level={4}>2. Collection of Information</Title>  
      <Paragraph>
        When you use or access the Services, we collect certain information about you from different sources.
      </Paragraph>
      <Title level={5}>Information You Provide to Us</Title>
      <Paragraph>
        Some features of the Services may require you to directly provide certain information. You may elect not to provide this information but doing so may prevent you from using or accessing these features. Information that you directly submit through our Services includes:
      </Paragraph>
      <Paragraph>
        - Contact information, such as your name, email address and name of your company.<br/>
        - Account and profile information, such as username or account handle, password and profile picture and other information you add to your account. If you choose to register an account, you are responsible for keeping your account credentials safe. We recommend you do not share your access details with anyone else. If you believe your account has been compromised, please contact us immediately.<br/>  
        - Payment and subscription information if you choose to use any of our paid Services, such as credit or debit card information and billing address, which is collected on our behalf by our payment processor, and information about your subscription tier and transaction history.<br/>
        - Your Content, such as text prompts, voice or audio recordings and other content that you upload to generate and return new content or outputs based on your Input. We also collect generated audio and other Output that is created through the Services, alongside certain metadata and feedback that you provide us about such content, each of which may constitute or contain personal information, depending on the substance and how it is associated with your account.<br/>
        - Other information you choose to provide in communications with us, which we use as described in this Privacy Policy or as otherwise disclosed at the time of collection.
      </Paragraph>
      <Title level={5}>Information Collected Automatically</Title>
      <Paragraph>
        We, and third parties on our behalf, may automatically collect certain information about your interactions with the Services and emails, including through cookies, pixels and other tracking technologies ("Tracking Technologies"). We collect and use this information to tailor your experience with the Services, run analytics, de-bug, and better understand user interactions with and improve the Services. We may associate this information with the device you use to access the Services, or email accounts you use to engage with us.  
      </Paragraph>
      <Paragraph>
        Such information includes:
      </Paragraph>
      <Paragraph>  
        - Device information, such as device type, operating system, screen size, unique device identifier, Internet protocol (IP) address, preferred language and browser information.<br/>
        - Location information, such as approximate location and, if you choose to provide it, precise geolocation.<br/>
        - Other information regarding your interaction with the Services or emails, such as browser type, log data, date and time stamps, emails you have opened and clickstream data (e.g., page requests, page views, how much time is spent on a page, content viewed or interacted with, text entered, etc.).
      </Paragraph>
      <Paragraph>
        For further information on how we use Tracking Technologies and your choices, see the section below, Cookies and Other Tracking Technologies.  
      </Paragraph>
      <Title level={5}>Information Collected from Other Sources</Title>
      <Paragraph>
        We may obtain information about you from outside sources, including:
      </Paragraph>
      <Paragraph>
        - Information we receive from Login integration partners, such as when you access the Services through GitHub or Google, which we use to maintain your account and login information. These partners provide information such as your name, email address and additional account information that is publicly accessible.<br/>
        - Information we receive from social media platforms, such as when you interact with us on Facebook or Instagram.  
      </Paragraph>
      <Paragraph>
        Any information received from outside sources will be treated in accordance with this Privacy Policy. We are not responsible for the accuracy of the information provided to us by third parties and are not responsible for any third party's policies or practices.
      </Paragraph>

      <Title level={4}>3. Use of Information</Title>
      <Paragraph>
        We may use any of the information described in this Privacy Policy to:
      </Paragraph>  
      <Paragraph>
        - Provide, operate and improve the Services, our products offerings and our business, including to generate Output and train and enhance the models that power our Services. You may request that we not use certain categories of your Content to train our models by completing this online form. Once we've processed your request, we will no longer use the selected categories of Content to train our models in the future, but this will not affect any uses of your Content (or improvements to the models as a result) prior to that date.<br/>
        - Personalize your experience and the Services, including remembering the devices from which you previously logged in and remembering your selections and preferences as you navigate the Services.<br/>
        - Enhance the safety and security of our Services, including to protect against and prevent fraud, protect against malicious, deceptive or illegal activity, or otherwise enforce our Acceptable Use Policy, as well as for troubleshooting, data analysis, testing, system maintenance and reporting.<br/>  
        - Conduct research and development, including to monitor and analyze trends and develop new features, products, services and models.<br/>
        - Communicate with you and engage in marketing and advertising activities, including for customer support purposes, to tell you or display marketing to you about products or services that may be of interest to you, offer promotions and respond to your queries. You may opt out of marketing emails using the opt-out or "unsubscribe" instructions provided in the email. However, after opting out you may still receive transactional emails from us such as emails about your account.<br/>
        - Comply with applicable legal obligations, enforce any applicable terms of service, protect the Services, our rights, and the rights of our employees, users or other individuals, and otherwise operate the Mindfans business.
      </Paragraph>
      <Paragraph>
        We may also aggregate or deidentify information and use that information for any lawful purpose.  
      </Paragraph>

      <Title level={4}>4. Disclosure of Information</Title>
      <Paragraph>
        We may disclose your information about you with third parties in the following circumstances:
      </Paragraph>
      <Paragraph>
        - To vendors or other service providers who help us provide, operate and improve the Services, including for cloud storage, payment processing, system administration, security, customer relationship management, marketing communications, data analytics and the deployment of Tracking Technologies.<br/>
        - When you request or direct us to disclose information, such as through your use of login integrations.<br/>
        - To our affiliates or others within our corporate group.<br/>
        - To third parties in connection with or anticipation of an asset sale, merger, bankruptcy, or other business transaction.<br/>
        - To our professional advisors, such as lawyers, auditors and insurers.<br/>
        - For legal and security reasons, to protect our Services and business and ensure the safety and security of us and others. For example, we may share your information with regulators, law enforcement agencies, public authorities, or any other relevant organizations to comply with applicable law or obligations thereunder, including cooperation with law enforcement, judicial orders, and regulatory inquiries, or to enforce the terms and policies applicable to our Services.
      </Paragraph>

      <Title level={4}>5. Cookies and Other Tracking Technologies</Title>
      <Paragraph>
        We use Tracking Technologies to collect information about your browsing activities, including your browsing over time and across different websites following your use of our Services. Most browsers accept Tracking Technologies automatically, but you may be able to control the way in which your devices permit the use of Tracking Technologies. If you so choose, you may block or delete certain Tracking Technologies from your browser; however, blocking or deleting Tracking Technologies may cause some of the Services, including login features and general functionality, to work incorrectly.
      </Paragraph>
      <Paragraph>
        Your browser settings may also allow you to transmit a "Do Not Track", "opt-out preference" signal or other mechanism for exercising your choices regarding the collection of your information when you visit various websites. Like many websites, our website is not designed to respond to such signals. To learn more about "Do Not Track" signals, you can visit http://www.allaboutdnt.com/.
      </Paragraph>

      <Title level={4}>6. Social Features</Title>
      <Paragraph>
        Certain features of the Services allow you to initiate interactions between the Services and third-party services or platforms, such as Facebook, LinkedIn, X (formerly Twitter) and email integrations ("Social Features"). Social Features include features that allow you to access our pages on third-party platforms, and from there "like" or "share" our content, or to access our Services through a login integration. Use of Social Features may allow a third party to collect and/or use your information. If you use Social Features, information you post or make accessible may be publicly displayed by the third-party service. Both we and the third party may have access to information about you and your use of both the Services and the third-party service. For more information, see the section below, Third Party Websites and Materials.
      </Paragraph>

      <Title level={4}>7. Third Party Websites and Materials</Title>
      <Paragraph>
        We may provide links to third-party websites or platforms, and display, or make available content, data, applications or materials from third parties. If you follow links to sites or platforms that we do not control and are not affiliated with us, you should review the applicable privacy notice, policies and other terms. We are not responsible for the privacy or security of, or information found on, these sites, or the accuracy, completeness or reliability of third-party materials. Information you provide on public or semi-public venues, such as third-party social networking platforms, may be viewable by other users of the Services and / or users of those third-party platforms without limitation as to its use. Our inclusion of such links does not, by itself, imply any endorsement of the content on such platforms or of their owners or operators.
      </Paragraph>

      <Title level={4}>8. Children's Privacy</Title>
      <Paragraph>
        Our Services are not intended for children, and we do not seek or knowingly collect any personal information from children. If we become aware that we have unknowingly collected information from a child, in particular children under 13 years of age, we will make commercially reasonable efforts to delete such information from our database. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the below information to request that it be deleted.
      </Paragraph>

      <Title level={4}>9. Data Security</Title>
      <Paragraph>
        Please note that any information you send to us electronically, while using the Services or otherwise interacting with us, may not be secure while in transit. We recommend that you do not use unsecure channels to send us sensitive or confidential information. Despite our reasonable efforts, no security measures are impenetrable, and we cannot guarantee "perfect security."
      </Paragraph>

      <Title level={4}>10. Contact Us</Title>
      <Paragraph>
        Should you have any questions about our privacy practices or this Privacy Policy, please email us at security@Mindfans.ai
      </Paragraph>
    </Modal>
  );
};

export default PrivacyPolicyModal; 