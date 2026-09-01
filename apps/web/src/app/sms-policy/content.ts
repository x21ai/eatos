export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export type Section = { id: string; title: string; blocks: Block[] };

export const effectiveDate = "February 9, 2026";

export const intro =
  "These SMS Terms govern the delivery of text messages sent by or on behalf of eatOS to users who have opted in to receive SMS communications. By consenting to receive SMS messages from eatOS, you agree to these SMS Terms, our Privacy Policy, and our Terms & Conditions.";

export const sections: Section[] = [
  {
    id: "types-of-messages",
    title: "1. Types of Messages",
    blocks: [
      {
        type: "p",
        text: "eatOS sends transactional and operational SMS messages related to your account and use of our services. These messages may include, but are not limited to:",
      },
      {
        type: "ul",
        items: [
          "Account security alerts",
          "One-time passwords (OTP) and login verification codes",
          "Order confirmations and order updates",
          "Payment confirmations and digital receipts",
          "Service notifications related to your eatOS account",
        ],
      },
      {
        type: "p",
        text: "If you separately opt in to marketing messages, you may also receive promotional or informational SMS messages as described at the time of opt-in.",
      },
    ],
  },
  {
    id: "message-frequency",
    title: "2. Message Frequency",
    blocks: [
      {
        type: "p",
        text: "Message frequency varies based on your account activity and usage of eatOS services. Active users may receive multiple messages per week depending on logins, transactions, and system notifications.",
      },
    ],
  },
  {
    id: "consent-and-opt-in",
    title: "3. Consent and Opt-In",
    blocks: [
      { type: "p", text: "You consent to receive SMS messages from eatOS by:" },
      {
        type: "ul",
        items: [
          "Checking an SMS consent box during signup or checkout",
          "Providing your phone number and agreeing to receive SMS messages",
          "Initiating contact with eatOS via SMS",
          "Providing verbal consent during a support or onboarding interaction",
        ],
      },
      {
        type: "p",
        text: "Consent to receive SMS messages is not required to make purchases unless SMS delivery is necessary for core functionality such as account security or transaction confirmation.",
      },
    ],
  },
  {
    id: "opt-out-and-help",
    title: "4. Opt-Out and Help",
    blocks: [
      { type: "p", text: "You may opt out of SMS messages at any time by replying:" },
      {
        type: "ul",
        items: ["STOP to unsubscribe", "HELP to receive assistance"],
      },
      {
        type: "p",
        text: "After opting out, you may no longer receive important transactional messages, which could limit your ability to use certain eatOS features such as login verification or real-time notifications.",
      },
    ],
  },
  {
    id: "message-and-data-rates",
    title: "5. Message and Data Rates",
    blocks: [
      {
        type: "p",
        text: "Message and data rates may apply based on your mobile carrier plan. eatOS does not charge for SMS messages, but your carrier may.",
      },
      {
        type: "p",
        text: "Supported carriers include major U.S. carriers such as AT&T, Verizon, T-Mobile, Sprint, and others.",
      },
    ],
  },
  {
    id: "privacy-and-data-use",
    title: "6. Privacy and Data Use",
    blocks: [
      {
        type: "p",
        text: "We respect your privacy. Phone numbers collected for SMS messaging are used solely in accordance with our Privacy Policy and are not sold to third parties. SMS data may be processed by trusted service providers for message delivery and compliance purposes.",
      },
      {
        type: "p",
        text: "View our full Privacy Policy here: https://eatos.com/privacy-policy",
      },
    ],
  },
  {
    id: "service-availability",
    title: "7. Service Availability",
    blocks: [
      {
        type: "p",
        text: "SMS delivery is subject to carrier availability and may not be available in all regions or on all devices. eatOS is not responsible for delayed or undelivered messages.",
      },
    ],
  },
  {
    id: "contact-information",
    title: "8. Contact Information",
    blocks: [
      { type: "p", text: "For questions or support related to SMS messaging:" },
      {
        type: "ul",
        items: [
          "Reply HELP to any message",
          "Visit https://eatos.com/support",
          "Call +1.302.721.2345",
        ],
      },
    ],
  },
  {
    id: "changes-to-sms-terms",
    title: "9. Changes to SMS Terms",
    blocks: [
      {
        type: "p",
        text: "eatOS may update these SMS Terms from time to time. Changes will be posted on this page with an updated effective date. Continued use of SMS services constitutes acceptance of the updated terms.",
      },
    ],
  },
];
