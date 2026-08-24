export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export type Section = { id: string; title: string; blocks: Block[] };

export const effectiveDate = "September 14, 2025 | Ver. 1.3";

export const sections: Section[] = [
  {
    id: "general-terms",
    title: "General Terms of Service",
    blocks: [
      {
        type: "p",
        text: "These General Terms of Service (\"General Terms\") are a legal agreement between you (\"you,\" \"your\") and eatOS, Services (P) Limited (\"eatOS,\" \"we,\" \"our\" or \"us\") and govern your use of eatOS's services, including mobile applications, websites, software, hardware, and other products and services (collectively, the \"Services\"). If you are using the Services on behalf of a business, that business accepts these terms. By using any of the Services you agree to these General Terms and any policies referenced within (\"Policies\"), including terms that limit our liability (see Section 18) and require individual arbitration for any potential legal dispute (see Section 21). You also agree to any additional terms specific to Services you use (\"Additional Terms\"), such as those listed below, which become part of your agreement with us. You should read all of our terms carefully.",
      },
      {
        type: "ul",
        items: [
          "Payment Terms: These terms apply to all payments made through the Services.",
          "Point of Sale Additional Terms of Service: These terms apply when you use eatOS Point of Sale.",
          "Mobile Wallet Terms of Service: These terms apply when you use any Third Party Wallets on eatOS Point of Sale.",
          "Value Added Services (VAS) Terms of Service: These terms apply when you use and Value Added Services (VAS) on eatOS Point of Sale.",
          "Online Payment Gateway Terms of Service: These terms apply when you use Online payment gateway Service of eatOS.",
          "Money Transfer Terms of Service: These terms apply when you use Money Transfer service on eatOS Point of Sale.",
        ],
      },
    ],
  },
  {
    id: "privacy",
    title: "1. Privacy",
    blocks: [
      {
        type: "p",
        text: "You agree to eatOS’s Privacy Policy, which explains how we collect, use and protect the personal information you provide to us.",
      },
      {
        type: "p",
        text: "eatOS will process certain of your customers’ or employees’ personal data on behalf of your business as a service provider (“data processor”). In such circumstances, you agree that you will comply with the data protection laws applicable to you and will provide data subjects with information on the processing of their personal information which satisfies the transparency requirements of such data protection laws and which ensures that personal data may be processed fairly, lawfully and in a transparent manner.",
      },
    ],
  },
  {
    id: "account-registration",
    title: "2. eatOS account registration",
    blocks: [
      {
        type: "p",
        text: "You must create an account with us (an “eatOS Account”) to use the Services. During registration we will ask you for information, including your name and other personal information. You must provide accurate and complete information in response to our questions, and keep that information current. You are fully responsible for all activity that occurs under your eatOS Account, including for any actions taken by persons to whom you have granted access to the eatOS Account. We reserve the right to suspend or terminate the eatOS Account of any user who provides inaccurate, untrue, or incomplete information, or who fails to comply with the account registration requirements.",
      },
    ],
  },
  {
    id: "revisions",
    title: "3. Revisions, disclosures and notices",
    blocks: [
      {
        type: "p",
        text: "We may amend the General Terms, any Additional Terms, or our Policies, at any time with notice that we deem to be reasonable in the circumstances, by posting the revised version on our website or communicating it to you through the Services (each a “Revised Version”). The Revised Version will be effective as of the time it is posted, but will not apply retroactively. Your continued use of the Services after the posting of a Revised Version constitutes your acceptance of such Revised Version. Any Dispute that arose before the changes will be governed by the General Terms, Additional Terms or Policies in place when the Dispute arose.",
      },
      {
        type: "p",
        text: "You agree to eatOS’s E-Sign Consent. We may provide disclosures and notices required by law and other information about your eatOS Account to you electronically, by posting it on our website, pushing notifications through the Services, or by emailing it to the email address listed in your eatOS Account. Electronic disclosures and notices have the same meaning and effect as if we had provided you with paper copies. Such disclosures and notices are considered received by you within twenty-four (24) hours of the time posted to our website, or within twenty-four (24) hours of the time emailed to you unless we receive notice that the email was not delivered. If you wish to withdraw your consent to receiving electronic communications, contact eatOS Support. If we are not able to support your request, you may need to terminate your eatOS Account.",
      },
    ],
  },
  {
    id: "restrictions",
    title: "4. Restrictions",
    blocks: [
      {
        type: "p",
        text: "You may not, nor may you permit any third party, directly or indirectly, to:",
      },
      {
        type: "ul",
        items: [
          "export the Services, which may be subject to export restrictions imposed by Indian law;",
          "access or monitor any material or information on any eatOS system using any manual process or robot, spider, scraper, or other automated means;",
          "except to the extent that any restriction is expressly prohibited by law, violate the restrictions in any robot exclusion headers on any Service, work around, bypass, or circumvent any of the technical limitations of the Services, use any tool to enable features or functionalities that are otherwise disabled in the Services, or decompile, disassemble or otherwise reverse engineer the Services;",
          "perform or attempt to perform any actions that would interfere with the proper working of the Services, prevent access to or use of the Services by our other customers, or impose an unreasonable or disproportionately large load on our infrastructure;",
          "copy, reproduce, alter, modify, create derivative works, publicly display, republish, upload, post, transmit, resell or distribute in any way material, information or Services from eatOS;",
          "use and benefit from the Services via a rental, lease, timesharing, service bureau or other arrangement;",
          "transfer any rights granted to you under these General Terms;",
          "use the Services in a way that distracts or prevents you from obeying traffic or safety laws;",
          "use the Services for the sale of firearms, firearm parts, ammunition, weapons or other devices designed to cause physical harm;",
          "use the Services for any illegal activity or goods or in any way that exposes you, other eatOS users, our partners, or eatOS to harm; or",
          "otherwise use the Services except as expressly allowed under these General Terms and applicable Additional Terms.",
        ],
      },
      {
        type: "p",
        text: "If we reasonably suspect that your eatOS Account has been used for an unauthorized, illegal, or criminal purpose, you give us express authorization to share information about you, your eatOS Account, and any of your transactions with any and all law enforcement agencies.",
      },
    ],
  },
  {
    id: "devices-carriers",
    title: "5. Compatible mobile devices and third party carriers",
    blocks: [
      {
        type: "p",
        text: "We do not warrant that the Services will be compatible with your mobile device or carrier. Your use of the Services may be subject to the terms of your agreements with your mobile device manufacturer or your carrier. You may not use a modified device to use the Services if the modification is contrary to the manufacturer’s software or hardware guidelines, including disabling hardware or software controls, sometimes referred to as “jail broken.”",
      },
    ],
  },
  {
    id: "your-content",
    title: "6. Your content",
    blocks: [
      {
        type: "p",
        text: "The Services may include functionality for uploading or providing photos, logos, products, loyalty programs, promotions, advertisements and other materials or information (“Content”).",
      },
      {
        type: "p",
        text: "You grant us and our subsidiaries, affiliates, and successors a worldwide, non-exclusive, royalty-free, fully-paid, transferable, and sub-licensable right to use, reproduce, modify, adapt, publish, prepare derivative works of, distribute, publicly perform, and publicly display your Content throughout the world in any media in order to provide and promote the Services. You retain all rights in your Content, subject to the rights you granted to us in these General Terms. You may modify or remove your Content via your eatOS Account or by terminating your eatOS Account, but your Content may persist in historical, archived or cached copies and versions thereof available on or through the Services.",
      },
      {
        type: "p",
        text: "You will not upload or provide Content or otherwise post, transmit, distribute, or disseminate through the Services any material that: (a) is false, misleading, unlawful, obscene, indecent, lewd, pornographic, defamatory, libelous, threatening, harassing, hateful, abusive, or inflammatory; (b) encourages conduct that would be considered a criminal offense or gives rise to civil liability; (c) breaches any duty toward or rights of any person or entity, including rights of publicity, privacy or trademark; (d) contains corrupted data or any other harmful, disruptive, or destructive files; (e) advertises products or services competitive with eatOS’s or its partners’ products and services, as determined by us in our sole discretion; or (f) in our sole judgment, is objectionable, restricts or inhibits any person or entity from using or enjoying any portion of the Services, or which may expose eatOS, its affiliates or its customers to harm or liability of any nature.",
      },
      {
        type: "p",
        text: "Although we have no obligation to monitor any Content, we have absolute discretion to remove Content at any time and for any reason without notice. You understand that by using the Services, you may be exposed to Content that is offensive, indecent, or objectionable. We take no responsibility and assume no liability for any Content, including any loss or damage to any of your Content.",
      },
    ],
  },
  {
    id: "infringement",
    title: "7. Copyright and trademark infringement",
    blocks: [
      {
        type: "p",
        text: "We respect the copyright and trademark rights of others and ask you to do the same. We have adopted a Copyright & Trademark Policy regarding claims that third party material infringes the copyrights or trademarks of others. We respond to all valid notices of such copyright and trademark infringement, and our policy is to suspend or terminate the access privileges of those who infringe the copyrights and trademarks of others.",
      },
    ],
  },
  {
    id: "security",
    title: "8. Security",
    blocks: [
      {
        type: "p",
        text: "We have implemented technical and organisational measures designed to secure your personal information from accidental loss and from unauthorised access, use, alteration, or disclosure. However, we cannot guarantee that unauthorised third parties will never be able to defeat those measures or use your personal information for improper purposes. You provide your personal information at your own risk.",
      },
      {
        type: "p",
        text: "You will immediately take all reasonable steps to mitigate the effects of a security breach and will cooperate with eatOS and provide all information requested by eatOS to remediate the breach. Any assistance provided by eatOS in relation to a security breach does not in any way operate as acceptance or acknowledgement that eatOS is in any way responsible or liable to you or any other party in connection with such breach.",
      },
      {
        type: "p",
        text: "You are responsible for safeguarding your password and for restricting access to the Services from your compatible mobile devices and computer(s). You will immediately notify us of any unauthorized use of your password or eatOS Account or any other breach of security. In the event of any dispute between two or more parties as to account ownership, we will be the sole arbiter of such dispute in our sole discretion. Our decision (which may include termination or suspension of any eatOS Account subject to dispute) will be final and binding on all parties.",
      },
    ],
  },
  {
    id: "communications",
    title: "9. Communications",
    blocks: [
      {
        type: "p",
        text: "We have implemented technical and organisational measures designed to secure your personal information from accidental loss and from unauthorised access, use, alteration, or disclosure. However, we cannot guarantee that unauthorised third parties will never be able to defeat those measures or use your personal information for improper purposes. You provide your personal information at your own risk.",
      },
      {
        type: "p",
        text: "You will immediately take all reasonable steps to mitigate the effects of a security breach and will cooperate with eatOS and provide all information requested by eatOS to remediate the breach. You are responsible for safeguarding your password and for restricting access to the Services from your compatible mobile devices and computer(s), and you will immediately notify us of any unauthorized use of your password or eatOS Account or any other breach of security.",
      },
    ],
  },
  {
    id: "paid-services",
    title: "10. Paid services",
    blocks: [
      {
        type: "p",
        text: "eatOS offers some services to be paid for on a recurring basis (“Subscription Plans”) or on an as-used basis (“A La Carte Services” and, together with the Subscription Services, “Paid Services”). eatOS has the right to change, delete, discontinue or impose conditions on Paid Services or any feature or aspect of a Paid Service. Subscription Services may subject you to recurring fees and/or terms. By signing up for a Subscription Service, including after any free trial period, you agree to pay us the subscription fee and any applicable taxes as set forth in your eatOS Account settings or as otherwise agreed in writing (“Subscription Fee”). A La Carte Services may subject you to fees charged per usage and/or terms. By using an A La Carte Service, you agree to pay the fees and any taxes incurred at the time of usage (“A La Carte Fees” and, together with Subscription Fees, the “Paid Service Fees”).",
      },
      {
        type: "p",
        text: "Paid Service Fees may be paid by debit card, credit card, or deducted from your transaction proceeds. If you link a debit or credit card to your account, you authorize us to collect Paid Service Fees by debit from your linked debit card or charge to your linked credit card. Regardless of payment device, we reserve the right to collect Paid Service Fees by deduction from your transaction proceeds, the Balance (as defined in the Payment Terms) in your eatOS Account or your linked bank account.",
      },
      {
        type: "p",
        text: "Unless otherwise provided in a Subscription Service’s terms, Subscription Fees will be charged on the 1st of every month until cancelled. You may cancel a Subscription Service at any time from your eatOS Account settings. If you cancel a Subscription Service, you will continue to have access to that Subscription Service through the end of your then current billing period, but you will not be entitled to a refund or credit for any Subscription Fee already due or paid. We reserve the right to change our Subscription Fee upon seven (7) days’ advance notice. Your continued use of Subscription Services after notice of a change to our Subscription Fee will constitute your agreement to such changes.",
      },
    ],
  },
  {
    id: "taxes",
    title: "11. Taxes",
    blocks: [
      {
        type: "p",
        text: "Taxes include any and all present or future taxes, charges, fees, levies or other assessments, including, without limitation, income, telecommunications, value-added, goods and services tax or similar taxes, gross receipts, excise, real or personal property, sales, withholding, social security, occupation, use, severance, environmental, license, net worth, payroll, employment, franchise, transfer and recording taxes, fees and charges, imposed by any domestic or foreign taxing authority (“Taxes”).",
      },
      {
        type: "p",
        text: "Unless otherwise stated, all Paid Service Fees are exclusive of any Taxes. You are responsible and liable for determining any and all Taxes required to be assessed, incurred, collected, paid or withheld for your use of the Services. You also are responsible and liable for (a) determining whether Taxes apply to your sale of products and services, payments received, and any other transactions arising from or out of your use of the Services, and (b) calculating, collecting, reporting or remitting any Taxes to the appropriate tax and revenue authorities. eatOS specifically disclaims any liability for such Taxes.",
      },
      {
        type: "p",
        text: "Notwithstanding the foregoing, eatOS may charge Taxes, as required by law, which you agree to pay, unless you provide eatOS with timely appropriate, complete, and accurate information and documentation satisfying the legal and tax requirements of the relevant governmental or tax authority to establish that the otherwise applicable Tax is not required to be charged by eatOS.",
      },
      {
        type: "p",
        text: "eatOS may be obligated under applicable laws to report certain information to tax and revenue authorities (“Tax Information”) and/or to you with respect to your use of the Services. Upon request, you shall provide eatOS with the necessary information to complete any applicable Tax Information reporting and recertify such information from time to time, as may be required by applicable law. If you use our Services you acknowledge that we will report to the applicable tax and revenue authorities the required Tax Information (including the total amount of payments you received during the relevant reporting period). We also may, but are not obligated to, send to you the Tax Information reported.",
      },
    ],
  },
  {
    id: "termination",
    title: "12. Termination",
    blocks: [
      {
        type: "p",
        text: "We may terminate these General Terms or any Additional Terms, or suspend or terminate your eatOS Account or your access to any Service, at any time for any reason. We will take reasonable steps to notify you of termination by email or at the next time you attempt to access your eatOS Account. You may also terminate the General Terms and Additional Terms applicable to your eatOS Account by deactivating your eatOS Account at any time.",
      },
      {
        type: "p",
        text: "Hardware including credit card readers, bluetooth printers, bar code readers, cash drawers, tablets, phones and any and all hardware sold by eatOS is non-refundable, all sales are final at the time of ordering.",
      },
    ],
  },
  {
    id: "termination-provider",
    title: "13. Termination by service provider",
    blocks: [
      {
        type: "p",
        text: "In the event of non-usage of the POS machine, i.e., no transaction is done on the POS machine by the merchant for a period of three (3) months or more, eatOS may terminate this Agreement or deactivate the services for the usage of both the eatOS application and hardware device with immediate effect, at any time. The merchant will not be entitled to any refund in any such case.",
      },
    ],
  },
  {
    id: "effect-of-termination",
    title: "14. Effect of termination",
    blocks: [
      {
        type: "p",
        text: "If these General Terms or your eatOS Account is terminated or suspended for any reason: (a) the license and any other rights granted under these General Terms and any Additional Terms will end; (b) we may (but have no obligation to) delete your information and account data stored on our servers; and (c) we will not be liable to you or any third party for compensation, reimbursement, or damages for any termination or suspension of the Services, or for deletion of your information or account data. In addition to any payment obligations under the Payment Terms, certain sections of these General Terms survive and remain in effect in accordance with their terms upon termination.",
      },
    ],
  },
  {
    id: "your-license",
    title: "15. Your license",
    blocks: [
      {
        type: "p",
        text: "We grant you a limited, non-exclusive, revocable, non-transferable, non-sub-licensable license to use the software that is part of the Services, as authorized in these General Terms. We may make software updates to the Services available to you, which you must install to continue using the Services. Any such software updates may be subject to additional terms made known to you at that time.",
      },
    ],
  },
  {
    id: "ownership",
    title: "16. Ownership",
    blocks: [
      {
        type: "p",
        text: "We reserve all rights not expressly granted to you in these General Terms. We own all rights, title, interest, copyright and other worldwide Intellectual Property Rights (as defined below) in the Services and all copies of the Services. These General Terms do not grant you any rights to our trademarks or service marks.",
      },
      {
        type: "p",
        text: "For the purposes of these General Terms, “Intellectual Property Rights” means all patent rights, copyright rights, mask work rights, moral rights, rights of publicity, trademark, trade dress and service mark rights, goodwill, trade secret rights, and other intellectual property rights that may exist now or come into existence in the future, and all of their applications, registrations, renewals and extensions, under the laws of any state, country, territory or other jurisdiction.",
      },
      {
        type: "p",
        text: "You may submit comments or ideas about the Services (“Ideas”). By submitting any Idea, you agree that your disclosure is gratuitous, unsolicited, and without restriction, that it will not place us under any fiduciary, confidentiality or other obligation, and that we are free to use the Idea without any additional compensation to you, and/or to disclose the Idea on a non-confidential basis or otherwise to anyone.",
      },
    ],
  },
  {
    id: "indemnity",
    title: "17. Indemnity",
    blocks: [
      {
        type: "p",
        text: "You will indemnify, defend, and hold us and our processors (and our respective employees, directors, agents, affiliates and representatives) harmless from and against any and all claims, costs, losses, damages, judgments, tax assessments, penalties, interest, and expenses (including without limitation reasonable attorneys’ fees) arising out of any claim, action, audit, investigation, inquiry, or other proceeding instituted by a person or entity that arises out of or relates to: (a) any actual or alleged breach of your representations, warranties, or obligations set forth in these General Terms or any Additional Terms; (b) your wrongful or improper use of the Services; (c) your violation of any third-party right, including without limitation any right of privacy, publicity rights or Intellectual Property Rights; (d) your violation of any law, rule or regulation of India, Singapore or any other country; and (e) any other party’s access and/or use of the Services with your unique name, password or other appropriate security code.",
      },
    ],
  },
  {
    id: "representations",
    title: "18. Representations and warranties",
    blocks: [
      {
        type: "p",
        text: "You represent and warrant to us that: (a) you are at least eighteen (18) years of age; (b) you are eligible to register and use the Services and have the right, power, and ability to enter into and perform under these General Terms; (c) any information you provide in connection with the Services, including your business name, accurately and truthfully represents your business or personal identity under which you sell goods and services; (d) you and all transactions initiated by you will comply with all federal, state, and local laws, rules, and regulations applicable to you and/or your business, including the Health Insurance Portability and Accountability Act (“HIPAA”); (e) you will not use the Services, directly or indirectly, for any fraudulent undertaking or in any manner so as to interfere with the operation of the Services; and (f) your use of the Services will be in compliance with these General Terms and applicable Additional Terms.",
      },
    ],
  },
  {
    id: "no-warranties",
    title: "19. No warranties",
    blocks: [
      {
        type: "p",
        text: "The use of “eatOS” in sections 18 and 19 means eatOS, its processors, its suppliers, and its licensors (and their respective subsidiaries, affiliates, agents, directors, and employees).",
      },
      {
        type: "p",
        text: "The Services are provided “as is” without representation or warranty, whether express, implied, or statutory. Without limiting the foregoing, eatOS specifically disclaims any implied warranties of merchantability, fitness for a particular purpose, or non-infringement.",
      },
      {
        type: "p",
        text: "eatOS does not warrant or guarantee that the Services are accurate, reliable or correct; that the Services will meet your requirements; that the Services will be available at any particular time or location, uninterrupted, error-free, without defect or secure; that any defects or errors will be corrected; or that the Services are free of viruses or other harmful components.",
      },
      {
        type: "p",
        text: "eatOS does not warrant, endorse, guarantee, or assume responsibility for any product or services advertised or offered by a third party, and does not have control of, or liability for, goods or services that are paid for using the Services.",
      },
    ],
  },
  {
    id: "liability",
    title: "20. Limitations of liability and damages",
    blocks: [
      {
        type: "p",
        text: "To the maximum extent permitted by applicable law, in no event will eatOS be liable for any direct, indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses, that result from the use of, inability to use, or unavailability of the Service. In all cases, eatOS will not be liable for any loss or damage that is not reasonably foreseeable.",
      },
    ],
  },
  {
    id: "third-party-products",
    title: "21. Third party products",
    blocks: [
      {
        type: "p",
        text: "All third party hardware and other products included or sold with the Services are provided solely according to the warranty and other terms specified by the manufacturer, who is solely responsible for service and support for its product. For service, support, or warranty assistance, you should contact the manufacturer directly. eatOS makes no representations or warranties, express or implied, with respect to such third party products, and expressly disclaims any warranty or condition of merchantability, non-infringement, or fitness for a particular purpose.",
      },
    ],
  },
  {
    id: "disputes",
    title: "22. Disputes",
    blocks: [
      {
        type: "p",
        text: "“Disputes” are defined as any claim, controversy, or dispute between you and eatOS, its processors, suppliers or licensors (or their respective affiliates, agents, directors or employees), including any claims relating in any way to these General Terms, any Additional Terms, or the Services, or any other aspect of our relationship.",
      },
    ],
  },
  {
    id: "arbitration",
    title: "23. Binding individual arbitration",
    blocks: [
      {
        type: "p",
        text: "You and eatOS agree to arbitrate any and all Disputes by a neutral arbitrator who has the power to award the same damages and relief that a court can. Any arbitration under these General Terms will only be on an individual basis; class arbitrations, class actions, private attorney general actions, representative actions and consolidation with other arbitrations are not permitted. You waive any right to have your case decided by a jury and you waive any right to participate in a class action against eatOS. If any provision of this arbitration agreement is found unenforceable, the unenforceable provision will be severed, and the remaining arbitration terms will be enforced (but in no case will there be a class or representative arbitration). All Disputes will be resolved finally and exclusively by binding individual arbitration with a single arbitrator administered under the Indian Arbitration Act at New Delhi, India.",
      },
      {
        type: "p",
        text: "Consumer claimants (individuals whose transaction is intended for personal, family, or household use) may elect to pursue their claims in their local small-claims court rather than through arbitration so long as their matter remains in small claims court and proceeds only on an individual (non-class or non-representative) basis. Any arbitration hearing will occur in New Delhi, India, or another mutually agreeable location. The arbitrator’s award will be binding on the parties and may be entered as a judgment in any court of competent jurisdiction. We will pay the arbitration fees due for individual arbitrations brought in accordance with this section. If you prevail on any claim for which you are legally entitled to attorney’s fees, you may seek to recover those fees from the arbitrator. For any claim where you are seeking relief, we will not seek to have you pay our attorney’s fees, even if fees might otherwise be awarded, unless the arbitrator determines that your claim was frivolous. For purposes of this arbitration provision, references to you and eatOS also include respective subsidiaries, affiliates, agents, employees, predecessors, successors and assigns as well as authorized users or beneficiaries of the Services. Subject to and without waiver of the arbitration provisions above, you agree that any judicial proceedings (other than small claims actions in consumer cases) will be brought in, and you hereby consent to the exclusive jurisdiction and venue of, the courts of New Delhi, India.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "24. Governing law",
    blocks: [
      {
        type: "p",
        text: "These General Terms and any Dispute will be governed by New Delhi, India law and/or applicable Arbitration Act as applied to agreements entered into and to be performed entirely within New Delhi, India, without regard to its choice of law or conflicts of law principles.",
      },
    ],
  },
  {
    id: "time-to-dispute",
    title: "25. Limitation on time to initiate a dispute",
    blocks: [
      {
        type: "p",
        text: "Any action or proceeding by you relating to any Dispute must commence within one year after the cause of action accrues.",
      },
    ],
  },
  {
    id: "assignment",
    title: "26. Assignment",
    blocks: [
      {
        type: "p",
        text: "These General Terms, and any rights and licenses granted hereunder, may not be transferred or assigned by you and any attempted transfer or assignment will be null and void.",
      },
    ],
  },
  {
    id: "third-party-services",
    title: "27. Third party services and links to other web sites",
    blocks: [
      {
        type: "p",
        text: "You may be offered services, products and promotions provided by third parties and not by eatOS (“Third Party Services”). If you decide to use Third Party Services, you will be responsible for reviewing and understanding the terms and conditions for these services. We are not responsible for the performance of any Third Party Services. The Services may contain links to third party websites. The inclusion of any website link does not imply an approval, endorsement, or recommendation by eatOS. Such third party websites are not governed by these General Terms. You access any such website at your own risk. We expressly disclaim any liability for these websites. When you use a link to go from the Services to a third party website, our Privacy Policy is no longer in effect. Your browsing and interaction on a third party website, including those that have a link in the Services, is subject to that website’s own terms, rules and policies.",
      },
    ],
  },
  {
    id: "other-provisions",
    title: "28. Other provisions",
    blocks: [
      {
        type: "p",
        text: "These General Terms, and any applicable Additional Terms or Policies, are a complete statement of the agreement between you and eatOS regarding the Services. In the event of a conflict between these General Terms and any other eatOS agreement or Policy, these General Terms will prevail and control the subject matter of such conflict. If any provision of these General Terms or any Additional Term is invalid or unenforceable under applicable law, then it will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, and the remaining provisions will continue in full force and effect. These General Terms do not limit any rights that we may have under trade secret, copyright, patent, or other laws. No waiver of any term of these General Terms will be deemed a further or continuing waiver of such term or any other term.",
      },
    ],
  },
];