export interface FormFieldConfig {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea' | 'number';
  placeholder?: string;
  required: boolean;
  options?: string[];
  step?: number;
}

export interface RequiredDocumentConfig {
  id: string;
  name: string;
  required: boolean;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceConfig {
  id: string;
  name: string;
  category: string;
  description: string;
  eligibility: string;
  icon: string;
  processingDays: number;
  fee: string;
  requiredDocuments: RequiredDocumentConfig[];
  formFields: FormFieldConfig[];
  faq: FAQItem[];
  instructions: string[];
}

export const CATEGORIES = [
  "All Categories",
  "Identity",
  "Transport",
  "Elections",
  "Travel & Identity",
  "Civil Registration",
  "Revenue",
  "Social Welfare",
  "Food & Civil Supplies",
  "Land & Revenue",
  "Utilities",
  "Education",
  "Employment",
  "Social Security",
  "Health",
  "Agriculture",
  "Municipal Services",
  "Business & Trade"
] as const;

export const SERVICES_CONFIG: ServiceConfig[] = [
  {
    id: "pan-card",
    name: "PAN Card Application",
    category: "Identity",
    description: "Apply for a new Permanent Account Number (PAN) Card for tax and financial purposes.",
    eligibility: "Any Indian citizen, NRI, or entity paying taxes in India.",
    icon: "CreditCard",
    processingDays: 15,
    fee: "₹107 (Domestic) / ₹1017 (Foreign)",
    requiredDocuments: [
      { id: "identity_proof", name: "Identity Proof", required: true, description: "Aadhaar Card, Passport, or Voter ID" },
      { id: "address_proof", name: "Address Proof", required: true, description: "Utility Bill, Bank Statement, or Passport" },
      { id: "dob_proof", name: "Date of Birth Proof", required: true, description: "Birth Certificate, Metric Certificate, or Passport" },
      { id: "photograph", name: "Passport Photo", required: true, description: "Recent colored photograph (JPEG/PNG)" },
      { id: "signature", name: "Specimen Signature", required: true, description: "Digital scan of signature" }
    ],
    formFields: [
      { id: "fullName", label: "Full Name (as in Identity proof)", type: "text", required: true, placeholder: "e.g. Rahul Sharma" },
      { id: "fatherName", label: "Father's / Mother's Name", type: "text", required: true, placeholder: "e.g. Ramesh Sharma" },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Transgender"] },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit mobile number" },
      { id: "email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { id: "aadhaarNumber", label: "Aadhaar Number", type: "text", required: true, placeholder: "12-digit Aadhaar Number" },
      { id: "existingPanStatus", label: "PAN Application Type", type: "select", required: true, options: ["New PAN (Form 49A)", "Correction / Reprint"] },
      { id: "address", label: "Full Residential Address", type: "textarea", required: true, placeholder: "House No, Street, Landmark" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "e.g. Maharashtra" },
      { id: "district", label: "District", type: "text", required: true, placeholder: "e.g. Mumbai Suburban" },
      { id: "pincode", label: "Pincode", type: "text", required: true, placeholder: "6-digit Pincode" }
    ],
    faq: [
      { question: "What is a PAN card?", answer: "A Permanent Account Number (PAN) is a 10-digit alphanumeric code issued by the Income Tax Department of India." },
      { question: "Who requires a PAN card?", answer: "Anyone who earns taxable income, opens a bank account, or enters financial transactions above threshold limits." },
      { question: "Can I apply using Aadhaar authentication?", answer: "Yes, e-KYC using Aadhaar allows instant validation for PAN processing." }
    ],
    instructions: [
      "Fill out personal and contact information accurately.",
      "Ensure Aadhaar number matches your identity record.",
      "Upload clear scans of identity, address, DOB proof, and signature.",
      "Review the declaration and submit the application."
    ]
  },
  {
    id: "aadhaar-enrolment",
    name: "Aadhaar Enrolment / Update",
    category: "Identity",
    description: "Schedule enrolment for a new Aadhaar card or update demographics & biometrics.",
    eligibility: "Resident of India who has resided in India for 182 days or more in the past 12 months.",
    icon: "Fingerprint",
    processingDays: 30,
    fee: "Free for mandatory updates / ₹50 for demographic updates",
    requiredDocuments: [
      { id: "identity_proof", name: "Proof of Identity (PoI)", required: true, description: "Passport, Voter ID, PAN Card, or Driving Licence" },
      { id: "address_proof", name: "Proof of Address (PoA)", required: true, description: "Ration Card, Electricity Bill, or Bank Passbook" },
      { id: "dob_proof", name: "Proof of Date of Birth (DoB)", required: false, description: "Birth Certificate or SSLC Certificate" }
    ],
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, placeholder: "e.g. Priya V" },
      { id: "updateType", label: "Request Type", type: "select", required: true, options: ["New Enrolment", "Demographic Update (Address/Name/DOB)", "Mobile/Email Linkage"] },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Transgender"] },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit mobile number" },
      { id: "email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { id: "address", label: "Residential Address", type: "textarea", required: true, placeholder: "House/Building name, locality" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District", type: "text", required: true, placeholder: "District name" },
      { id: "pincode", label: "Pincode", type: "text", required: true, placeholder: "6-digit pincode" }
    ],
    faq: [
      { question: "What is Aadhaar?", answer: "Aadhaar is a 12-digit unique identity number issued by UIDAI on behalf of the Government of India." },
      { question: "Is Aadhaar mandatory for government services?", answer: "Yes, Aadhaar acts as the primary identity proof for most Direct Benefit Transfer (DBT) schemes." }
    ],
    instructions: [
      "Select whether you are enrolling as a new resident or requesting an update.",
      "Fill in demographic details matching your uploaded supporting documents.",
      "Submit the application to generate an Aadhaar Appointment Slips & Tracking ID."
    ]
  },
  {
    id: "driving-licence",
    name: "Driving Licence",
    category: "Transport",
    description: "Apply for Learner's Licence, Permanent Driving Licence, or Licence Renewal.",
    eligibility: "Age 18+ for motor vehicles with gear; Age 16+ for gearless 50cc scooters.",
    icon: "Car",
    processingDays: 20,
    fee: "₹200 for Learner Licence / ₹700 for Permanent DL",
    requiredDocuments: [
      { id: "identity_proof", name: "Identity Proof", required: true, description: "Aadhaar Card, Passport, or Voter ID" },
      { id: "address_proof", name: "Address Proof", required: true, description: "Utility bill or Ration Card" },
      { id: "dob_proof", name: "Age Proof", required: true, description: "School leaving certificate or Birth Certificate" },
      { id: "medical_cert", name: "Medical Certificate (Form 1A)", required: false, description: "Required if age is over 40" },
      { id: "photo", name: "Passport Photo", required: true, description: "Recent photograph" }
    ],
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, placeholder: "As per age proof" },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit number" },
      { id: "licenceType", label: "Licence Type", type: "select", required: true, options: ["Learner Licence", "Permanent DL", "Renewal", "Duplicate DL"] },
      { id: "vehicleCategory", label: "Vehicle Category", type: "select", required: true, options: ["Motor Cycle without Gear (MCWOG)", "Motor Cycle with Gear (MCWG)", "Light Motor Vehicle (LMV)", "Commercial / Transport"] },
      { id: "address", label: "Current Address", type: "textarea", required: true, placeholder: "Full address details" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District / RTO Office", type: "text", required: true, placeholder: "RTO Jurisdiction" }
    ],
    faq: [
      { question: "What is the validity of a Learner Licence?", answer: "A Learner Licence is valid for 6 months across India." },
      { question: "When can I apply for a Permanent Driving Licence?", answer: "You can apply 30 days after obtaining a Learner Licence." }
    ],
    instructions: [
      "Select your vehicle category and licence type.",
      "Fill out personal information and emergency contact details.",
      "Upload age proof, address proof, and medical certificate if applicable.",
      "Submit application to receive RTO slot confirmation."
    ]
  },
  {
    id: "voter-id",
    name: "Voter ID / Election Photo ID",
    category: "Elections",
    description: "Register as a new voter, transfer constituency, or update EPIC details.",
    eligibility: "Indian citizen who is 18 years of age or older on the qualifying date.",
    icon: "Vote",
    processingDays: 25,
    fee: "Free of cost",
    requiredDocuments: [
      { id: "age_proof", name: "Age Proof", required: true, description: "Aadhaar Card, Birth Certificate, or Class 10 Certificate" },
      { id: "address_proof", name: "Address Proof", required: true, description: "Electricity Bill, Water Bill, or Bank Passbook" },
      { id: "photo", name: "Photograph", required: true, description: "Passport size photograph with white background" }
    ],
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, placeholder: "Applicant's name" },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Third Gender"] },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "Mobile number linked for updates" },
      { id: "assemblyConstituency", label: "Assembly Constituency", type: "text", required: true, placeholder: "e.g. Bengaluru South" },
      { id: "address", label: "Full Address", type: "textarea", required: true, placeholder: "Residential address details" },
      { id: "state", label: "State / UT", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District", type: "text", required: true, placeholder: "District name" }
    ],
    faq: [
      { question: "What is EPIC number?", answer: "Electors Photo Identity Card (EPIC) number is the unique voter ID number assigned by ECI." },
      { question: "Can I register from my place of residence?", answer: "Yes, you must register at your ordinary place of residence." }
    ],
    instructions: [
      "Ensure you select the correct Assembly Constituency based on your pin code.",
      "Upload valid address proof corresponding to your current residence.",
      "Submit application for Booth Level Officer (BLO) verification."
    ]
  },
  {
    id: "passport-application",
    name: "Passport Application",
    category: "Travel & Identity",
    description: "Apply for Fresh Passport, Reissue of Passport, or Tatkaal Passport.",
    eligibility: "Indian Citizens by birth, descent, or registration.",
    icon: "Globe",
    processingDays: 30,
    fee: "₹1,500 (Normal 36 pages) / ₹3,500 (Tatkaal)",
    requiredDocuments: [
      { id: "address_proof", name: "Proof of Present Address", required: true, description: "Aadhaar Card, Bank Passbook, or Rent Agreement" },
      { id: "dob_proof", name: "Proof of Date of Birth", required: true, description: "Birth Certificate, Aadhaar, or School Certificate" },
      { id: "identity_proof", name: "Non-ECR Proof", required: false, description: "Matriculation Certificate for Non-ECR status" },
      { id: "photo", name: "Passport Photograph", required: true, description: "White background colored photograph" }
    ],
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, placeholder: "Given Name + Surname" },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "placeOfBirth", label: "Place of Birth", type: "text", required: true, placeholder: "Village / Town / City" },
      { id: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
      { id: "passportType", label: "Application Type", type: "select", required: true, options: ["Fresh Passport", "Re-issue of Passport", "Tatkaal Fresh"] },
      { id: "employmentType", label: "Employment Type", type: "select", required: true, options: ["Private", "Government", "Student", "Self Employed", "Retired"] },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit mobile" },
      { id: "email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { id: "address", label: "Permanent Residential Address", type: "textarea", required: true, placeholder: "Complete address" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District", type: "text", required: true, placeholder: "District name" }
    ],
    faq: [
      { question: "What is Non-ECR status?", answer: "Non-Emigration Check Required (ECR) status is given to applicants who have completed Class 10 education or above." },
      { question: "How long is a fresh passport valid?", answer: "10 years for adults, 5 years for minors under 18." }
    ],
    instructions: [
      "Select correct application type (Fresh vs Re-issue).",
      "Provide complete address details including nearest Police Station.",
      "Upload clean scans of address proof and date of birth proof."
    ]
  },
  {
    id: "birth-certificate",
    name: "Birth Certificate",
    category: "Civil Registration",
    description: "Register a newborn birth or request an official government Birth Certificate.",
    eligibility: "Parent/guardian of child born within state jurisdiction.",
    icon: "FileText",
    processingDays: 10,
    fee: "Free within 21 days / ₹50 late fee",
    requiredDocuments: [
      { id: "hospital_record", name: "Hospital Birth Discharge / Slip", required: true, description: "Institutional birth summary from doctor/hospital" },
      { id: "parent_id", name: "Parents Identity Proof", required: true, description: "Aadhaar Card or Passport of Parents" },
      { id: "address_proof", name: "Address Proof", required: true, description: "Ration Card, Electricity bill" }
    ],
    formFields: [
      { id: "childName", label: "Child's Name", type: "text", required: true, placeholder: "Name of the child" },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
      { id: "placeOfBirth", label: "Place of Birth", type: "select", required: true, options: ["Hospital / Institution", "House / Residence", "Other"] },
      { id: "hospitalName", label: "Hospital / Institution Name", type: "text", required: true, placeholder: "Name of hospital if applicable" },
      { id: "fatherName", label: "Father's Full Name", type: "text", required: true, placeholder: "Father's name" },
      { id: "motherName", label: "Mother's Full Name", type: "text", required: true, placeholder: "Mother's name" },
      { id: "address", label: "Parents Residential Address", type: "textarea", required: true, placeholder: "Full permanent address" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District", type: "text", required: true, placeholder: "District name" }
    ],
    faq: [
      { question: "Is birth registration mandatory?", answer: "Yes, registering a birth within 21 days is mandatory under the Registration of Births & Deaths Act." }
    ],
    instructions: [
      "Enter child details and exact hospital birth summary date.",
      "Upload hospital discharge certificate and parent IDs.",
      "Submit application to receive digital digitally signed certificate."
    ]
  },
  {
    id: "death-certificate",
    name: "Death Certificate",
    category: "Civil Registration",
    description: "Apply for official registration and issuance of Death Certificate.",
    eligibility: "Immediate family member or legal representative of deceased.",
    icon: "FileSpreadsheet",
    processingDays: 10,
    fee: "Free within 21 days / ₹30 late fee",
    requiredDocuments: [
      { id: "medical_record", name: "Medical Certificate / Hospital Slip", required: true, description: "Cause of Death / Hospital Discharge slip" },
      { id: "applicant_id", name: "Applicant Identity Proof", required: true, description: "Aadhaar Card or Voter ID of applicant" },
      { id: "address_proof", name: "Deceased Address Proof", required: true, description: "Aadhaar or Ration Card of deceased" }
    ],
    formFields: [
      { id: "deceasedName", label: "Deceased Full Name", type: "text", required: true, placeholder: "Full name of deceased person" },
      { id: "dateOfDeath", label: "Date of Death", type: "date", required: true },
      { id: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
      { id: "placeOfDeath", label: "Place of Death", type: "text", required: true, placeholder: "Hospital Name or Home address" },
      { id: "spouseOrFatherName", label: "Father's / Spouse's Name", type: "text", required: true, placeholder: "Name of spouse or parent" },
      { id: "address", label: "Address at Time of Death", type: "textarea", required: true, placeholder: "Full address details" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District", type: "text", required: true, placeholder: "District name" }
    ],
    faq: [
      { question: "Why is a death certificate needed?", answer: "It is required for legal claims, inheritance, insurance settlement, and closing bank accounts." }
    ],
    instructions: [
      "Provide details of deceased person and place of death.",
      "Upload medical cause of death certificate and applicant ID."
    ]
  },
  {
    id: "marriage-certificate",
    name: "Marriage Certificate",
    category: "Civil Registration",
    description: "Register solemnized marriage under Hindu Marriage Act or Special Marriage Act.",
    eligibility: "Groom age 21+, Bride age 18+; marriage solemnized legally.",
    icon: "Heart",
    processingDays: 15,
    fee: "₹100 (Hindu Marriage Act) / ₹150 (Special Marriage Act)",
    requiredDocuments: [
      { id: "identity_both", name: "ID Proof of Husband & Wife", required: true, description: "Aadhaar Cards or Passports of both spouses" },
      { id: "age_proof", name: "Age Proof of Both Spouses", required: true, description: "Birth Certificate or Metric Certificate" },
      { id: "marriage_photo", name: "Marriage Joint Photograph", required: true, description: "Joint photo of wedding ceremony" },
      { id: "wedding_card", name: "Wedding Card / Invitation", required: true, description: "Copy of marriage invitation card or hall receipt" }
    ],
    formFields: [
      { id: "husbandName", label: "Husband's Full Name", type: "text", required: true, placeholder: "Husband full name" },
      { id: "wifeName", label: "Wife's Full Name", type: "text", required: true, placeholder: "Wife full name" },
      { id: "marriageDate", label: "Date of Marriage", type: "date", required: true },
      { id: "marriagePlace", label: "Place of Marriage", type: "text", required: true, placeholder: "Venue / City / Town" },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "Primary mobile number" },
      { id: "address", label: "Current Joint Address", type: "textarea", required: true, placeholder: "Full address" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District / Sub-Registrar Office", type: "text", required: true, placeholder: "Sub-Registrar jurisdiction" }
    ],
    faq: [
      { question: "Is marriage registration compulsory?", answer: "Yes, compulsory registration of marriages has been mandated by the Supreme Court of India." }
    ],
    instructions: [
      "Fill in details for both husband and wife.",
      "Upload joint marriage photo, age proof, and invitation card."
    ]
  },
  {
    id: "income-certificate",
    name: "Income Certificate",
    category: "Revenue",
    description: "Official certificate issued by revenue department verifying total annual income of family.",
    eligibility: "Resident citizen requiring proof of annual family income for schemes or fee waivers.",
    icon: "BadgeDollarSign",
    processingDays: 14,
    fee: "₹25 - ₹50",
    requiredDocuments: [
      { id: "identity_proof", name: "Identity Proof", required: true, description: "Aadhaar Card or Voter ID" },
      { id: "address_proof", name: "Address Proof", required: true, description: "Ration Card or Electricity Bill" },
      { id: "income_proof", name: "Income Proof", required: true, description: "Salary Slip, Form 16, IT Returns, or Employer Certificate" },
      { id: "declaration", name: "Self Declaration Affidavit", required: true, description: "Signed income declaration form" }
    ],
    formFields: [
      { id: "applicantName", label: "Applicant's Name", type: "text", required: true, placeholder: "Full Name" },
      { id: "fatherName", label: "Father's / Husband's Name", type: "text", required: true, placeholder: "Parent or Spouse Name" },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "occupation", label: "Occupation / Source of Income", type: "select", required: true, options: ["Agriculture", "Salaried", "Business", "Daily Wage / Artisan", "Retired / Pensioner"] },
      { id: "annualIncome", label: "Total Annual Family Income (in INR)", type: "number", required: true, placeholder: "e.g. 150000" },
      { id: "purpose", label: "Purpose of Certificate", type: "select", required: true, options: ["Scholarship / Education Fee Waiver", "Government Welfare Scheme", "Housing Loan / Quota", "Other"] },
      { id: "address", label: "Full Residential Address", type: "textarea", required: true, placeholder: "Detailed residential address" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District / Taluk", type: "text", required: true, placeholder: "Taluk / Tehsildar Office" }
    ],
    faq: [
      { question: "What is the validity period of an Income Certificate?", answer: "Usually valid for 1 financial year (April to March)." }
    ],
    instructions: [
      "State accurate annual income from all family sources.",
      "Upload salary slips or self-declaration certified by village accountant."
    ]
  },
  {
    id: "caste-certificate",
    name: "Caste Certificate",
    category: "Revenue",
    description: "Issuance of SC / ST / OBC / EWS Caste Certificate for affirmative action benefits.",
    eligibility: "Resident belonging to recognized Scheduled Caste, Scheduled Tribe, or OBC category.",
    icon: "ShieldCheck",
    processingDays: 21,
    fee: "₹30",
    requiredDocuments: [
      { id: "identity_proof", name: "Applicant Identity Proof", required: true, description: "Aadhaar Card, Voter ID" },
      { id: "address_proof", name: "Address Proof", required: true, description: "Ration Card or Utility bill" },
      { id: "caste_proof", name: "Family Caste Proof", required: true, description: "Father's / Relative's Caste Certificate, School Leaving Cert" }
    ],
    formFields: [
      { id: "applicantName", label: "Applicant Name", type: "text", required: true, placeholder: "Full Name" },
      { id: "fatherName", label: "Father's / Mother's Name", type: "text", required: true, placeholder: "Parent Name" },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "community", label: "Category / Community", type: "select", required: true, options: ["Scheduled Caste (SC)", "Scheduled Tribe (ST)", "Other Backward Class (OBC)", "Economically Weaker Section (EWS)"] },
      { id: "subCaste", label: "Sub-Caste / Caste Name", type: "text", required: true, placeholder: "e.g. Mahar, Kurmi, Vankar" },
      { id: "purpose", label: "Purpose", type: "select", required: true, options: ["Educational Admission", "Government Employment", "Scholarship", "Other Benefits"] },
      { id: "address", label: "Residential Address", type: "textarea", required: true, placeholder: "Full address" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District / Tehsildar Office", type: "text", required: true, placeholder: "Tehsildar jurisdiction" }
    ],
    faq: [
      { question: "Does a Caste Certificate expire?", answer: "SC/ST certificates generally do not expire; OBC/EWS creamy layer status requires periodic annual renewal." }
    ],
    instructions: [
      "Select your exact category and sub-caste.",
      "Upload parent's caste proof or land revenue records."
    ]
  },
  {
    id: "residence-certificate",
    name: "Residence / Domicile Certificate",
    category: "Revenue",
    description: "Certificate proving continuous residency in a state or Union Territory.",
    eligibility: "Resident residing in the state for specified minimum duration (typically 3-10 years).",
    icon: "Home",
    processingDays: 14,
    fee: "₹25",
    requiredDocuments: [
      { id: "identity_proof", name: "Identity Proof", required: true, description: "Aadhaar Card, Passport" },
      { id: "address_proof", name: "Proof of Continuous Residence", required: true, description: "House Rent Agreement, Property Tax receipts, Electricity bills for past years" },
      { id: "education_proof", name: "School / College Certificate", required: false, description: "Bonafide or Marks Card showing study history in state" }
    ],
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, placeholder: "Full Name" },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "fatherName", label: "Father's / Spouse's Name", type: "text", required: true, placeholder: "Parent or Spouse name" },
      { id: "yearsOfResidence", label: "Years of Continuous Residence", type: "number", required: true, placeholder: "e.g. 10" },
      { id: "purpose", label: "Purpose", type: "select", required: true, options: ["State Educational Quota", "Government Job Requirement", "Ration Card / Housing", "Other"] },
      { id: "address", label: "Residential Address", type: "textarea", required: true, placeholder: "Full current address" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District", type: "text", required: true, placeholder: "District name" }
    ],
    faq: [
      { question: "What is a Domicile Certificate?", answer: "It certifies that a person is a permanent resident or domiciled in a particular State/UT." }
    ],
    instructions: [
      "Enter total years lived in the current address.",
      "Upload residence proof covering the continuous residency duration."
    ]
  },
  {
    id: "ration-card",
    name: "Ration Card",
    category: "Food & Civil Supplies",
    description: "Apply for New Ration Card (AAY / PHH / NPHH) for subsidized food grains and PDS benefits.",
    eligibility: "Head of family who is a resident citizen without an existing ration card.",
    icon: "ShoppingBag",
    processingDays: 20,
    fee: "Free / Nominal card fee ₹10",
    requiredDocuments: [
      { id: "family_id", name: "Aadhaar Copies of All Family Members", required: true, description: "Scanned Aadhaar cards for every family member" },
      { id: "address_proof", name: "Address Proof", required: true, description: "Electricity bill, Rent agreement, Water connection" },
      { id: "income_proof", name: "Income Certificate / Proof", required: true, description: "Income proof for category determination" }
    ],
    formFields: [
      { id: "headOfFamily", label: "Head of Family Name", type: "text", required: true, placeholder: "Name of Family Head (Female member preferred)" },
      { id: "familyMembers", label: "Total Number of Family Members", type: "number", required: true, placeholder: "e.g. 4" },
      { id: "cardType", label: "Ration Card Category Requested", type: "select", required: true, options: ["Priority Household (PHH)", "Antyodaya Anna Yojana (AAY - BPL)", "Non-Priority Household (NPHH - APL)"] },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit mobile" },
      { id: "address", label: "Residential Address", type: "textarea", required: true, placeholder: "Full home address" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District", type: "text", required: true, placeholder: "District name" },
      { id: "pincode", label: "Pincode", type: "text", required: true, placeholder: "6-digit Pincode" }
    ],
    faq: [
      { question: "Who is preferred as the head of family for ration cards?", answer: "Under NFSA rules, the eldest female member aged 18+ is designated as the head of household." }
    ],
    instructions: [
      "List all living members of the household.",
      "Upload Aadhaar cards for every listed member."
    ]
  },
  {
    id: "property-land-records",
    name: "Property / Land Record Request",
    category: "Land & Revenue",
    description: "Request official Certified Land Records (RoR / Patta / Khata Extract / Mutation Copy).",
    eligibility: "Landowner, legal heir, or interested party with survey/property identification details.",
    icon: "Landmark",
    processingDays: 7,
    fee: "₹15 - ₹50 per copy",
    requiredDocuments: [
      { id: "identity_proof", name: "Applicant Identity Proof", required: true, description: "Aadhaar Card or PAN Card" },
      { id: "ownership_doc", name: "Existing Sale Deed / Property Tax Receipt", required: true, description: "Previous title deed or land tax voucher" }
    ],
    formFields: [
      { id: "applicantName", label: "Applicant Name", type: "text", required: true, placeholder: "Full Name" },
      { id: "surveyNumber", label: "Survey Number / Property ID / Khasra No", type: "text", required: true, placeholder: "e.g. Survey No 142/A" },
      { id: "village", label: "Village / Town Name", type: "text", required: true, placeholder: "Village / Mauza name" },
      { id: "mandalTaluk", label: "Taluk / Tehsil / Mandal", type: "text", required: true, placeholder: "Taluk name" },
      { id: "district", label: "District", type: "text", required: true, placeholder: "District name" },
      { id: "propertyDetails", label: "Requested Document Type", type: "select", required: true, options: ["Record of Rights (RoR 7/12 or Khata Extract)", "Mutation Register Copy", "Encumbrance Certificate (EC)", "Land Boundary Survey Map"] },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "Mobile for updates" },
      { id: "address", label: "Postal Delivery Address", type: "textarea", required: true, placeholder: "Address for physical copy if needed" }
    ],
    faq: [
      { question: "What is Khata / Patta?", answer: "It is an official revenue account record identifying land ownership and tax assessment." }
    ],
    instructions: [
      "Provide accurate survey number and village details.",
      "Upload prior tax receipt or title deed scan."
    ]
  },
  {
    id: "electricity-connection",
    name: "Electricity Connection",
    category: "Utilities",
    description: "Apply for a new domestic or commercial power connection with state electricity board.",
    eligibility: "Owner or lawful occupant of premises.",
    icon: "Zap",
    processingDays: 10,
    fee: "Security Deposit + Connection fee based on sanctioned load",
    requiredDocuments: [
      { id: "identity_proof", name: "Identity Proof", required: true, description: "Aadhaar Card, Passport" },
      { id: "occupancy_proof", name: "Proof of Ownership / Occupancy", required: true, description: "Sale Deed, Rent Agreement, or Tax Bill" },
      { id: "premises_photo", name: "Premises Photo", required: true, description: "Photograph of building where meter is to be installed" }
    ],
    formFields: [
      { id: "applicantName", label: "Applicant Name", type: "text", required: true, placeholder: "Owner / Tenant Name" },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit mobile" },
      { id: "email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { id: "connectionType", label: "Connection Category", type: "select", required: true, options: ["Domestic (LT)", "Commercial (LT)", "Industrial (HT)", "Agricultural"] },
      { id: "loadRequirement", label: "Sanctioned Load (in kW)", type: "select", required: true, options: ["1 kW", "2 kW", "3 kW to 5 kW", "Above 5 kW"] },
      { id: "propertyOwnershipType", label: "Ownership Status", type: "select", required: true, options: ["Owned", "Rented / Leased", "Government Housing"] },
      { id: "address", label: "Premises Address for Connection", type: "textarea", required: true, placeholder: "Complete premises address with door no." },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District / Electrical Sub-Division", type: "text", required: true, placeholder: "Electricity Board Section" },
      { id: "pincode", label: "Pincode", type: "text", required: true, placeholder: "6-digit pincode" }
    ],
    faq: [
      { question: "How long does meter installation take?", answer: "Within 7-10 working days after site inspection." }
    ],
    instructions: [
      "Specify load requirement and supply type.",
      "Upload ownership deed or NOC from property owner."
    ]
  },
  {
    id: "water-connection",
    name: "Water Connection",
    category: "Utilities",
    description: "New residential or commercial municipal water supply line connection.",
    eligibility: "Property owner or tenant within municipal water network area.",
    icon: "Droplets",
    processingDays: 12,
    fee: "As per municipal tariff schedule",
    requiredDocuments: [
      { id: "identity_proof", name: "Identity Proof", required: true, description: "Aadhaar Card or Voter ID" },
      { id: "occupancy_proof", name: "Property Ownership Proof / Rent Agreement", required: true, description: "Tax receipt or deed" }
    ],
    formFields: [
      { id: "applicantName", label: "Applicant Name", type: "text", required: true, placeholder: "Full Name" },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit mobile" },
      { id: "propertyType", label: "Property Type", type: "select", required: true, options: ["Independent House", "Apartment / Flat", "Commercial Shop", "Institutional"] },
      { id: "connectionType", label: "Pipe Diameter", type: "select", required: true, options: ["0.5 inch Domestic", "0.75 inch Domestic", "1 inch Commercial"] },
      { id: "address", label: "Property Address", type: "textarea", required: true, placeholder: "Premises location" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District / Municipal Ward", type: "text", required: true, placeholder: "Ward No / Zone" },
      { id: "pincode", label: "Pincode", type: "text", required: true, placeholder: "Pincode" }
    ],
    faq: [
      { question: "Are water meters mandatory?", answer: "Yes, municipal guidelines require metered water connections." }
    ],
    instructions: [
      "Select connection diameter based on property size.",
      "Upload recent property tax paid receipt."
    ]
  },
  {
    id: "gas-connection",
    name: "Gas Connection",
    category: "Utilities",
    description: "Apply for a new LPG Cooking Gas connection (Indane / Bharatgas / HP Gas / PMUY).",
    eligibility: "Adult household resident not already having an active LPG connection in the same household.",
    icon: "Flame",
    processingDays: 7,
    fee: "₹1,450 to ₹3,200 (Includes cylinder deposit, regulator & hose)",
    requiredDocuments: [
      { id: "identity_proof", name: "Aadhaar Card of Applicant", required: true, description: "Aadhaar Card mandatory for subsidy link" },
      { id: "address_proof", name: "Proof of Address", required: true, description: "Rent receipt, Electricity bill, Water bill" },
      { id: "photo", name: "Passport Photograph", required: true, description: "Applicant photo" }
    ],
    formFields: [
      { id: "applicantName", label: "Applicant Full Name", type: "text", required: true, placeholder: "Name of adult applicant" },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit mobile" },
      { id: "connectionType", label: "LPG Scheme Type", type: "select", required: true, options: ["General LPG Connection (14.2 kg)", "PM Ujjwala Yojana (PMUY - Free Connection)", "5 kg Mini Cylinder"] },
      { id: "address", label: "Delivery Address", type: "textarea", required: true, placeholder: "Full home address" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District / Gas Distributor", type: "text", required: true, placeholder: "Distributor name or area" },
      { id: "pincode", label: "Pincode", type: "text", required: true, placeholder: "6-digit Pincode" }
    ],
    faq: [
      { question: "What is PM Ujjwala Yojana?", answer: "It is a scheme offering free LPG connections to women from below-poverty-line (BPL) households." }
    ],
    instructions: [
      "Ensure no member of your household currently has an active LPG connection.",
      "Upload Aadhaar and proof of residential address."
    ]
  },
  {
    id: "senior-citizen-certificate",
    name: "Senior Citizen Certificate",
    category: "Social Welfare",
    description: "Official identity card & certificate for citizens aged 60+ for concession & healthcare benefits.",
    eligibility: "Citizen of India aged 60 years or above.",
    icon: "UserCheck",
    processingDays: 7,
    fee: "Free of cost",
    requiredDocuments: [
      { id: "identity_proof", name: "Identity Proof", required: true, description: "Aadhaar Card, Passport, Voter ID" },
      { id: "dob_proof", name: "Age Proof", required: true, description: "Birth Certificate, Passport, SSLC Certificate, PAN Card" },
      { id: "address_proof", name: "Address Proof", required: true, description: "Ration Card or Utility bill" },
      { id: "photo", name: "Passport Photo", required: true, description: "Recent photo" }
    ],
    formFields: [
      { id: "applicantName", label: "Applicant Name", type: "text", required: true, placeholder: "Full Name" },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "age", label: "Current Age (Must be 60+)", type: "number", required: true, placeholder: "e.g. 64" },
      { id: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit mobile" },
      { id: "address", label: "Residential Address", type: "textarea", required: true, placeholder: "Full address" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District", type: "text", required: true, placeholder: "District name" }
    ],
    faq: [
      { question: "What are the benefits of Senior Citizen ID?", answer: "Provides travel concessions, priority queueing, specialized medical care benefits, and tax allowances." }
    ],
    instructions: [
      "Ensure proof clearly displays Date of Birth proving age 60+.",
      "Upload photo and address proof for ID issuance."
    ]
  },
  {
    id: "disability-certificate",
    name: "Disability Certificate",
    category: "Social Welfare",
    description: "UDID (Unique Disability ID) Card & Certificate issued by medical board.",
    eligibility: "Person with Benchmark Disability (40% or more disability).",
    icon: "Accessibility",
    processingDays: 25,
    fee: "Free of cost",
    requiredDocuments: [
      { id: "identity_proof", name: "Identity Proof", required: true, description: "Aadhaar Card or Voter ID" },
      { id: "medical_records", name: "Hospital Assessment / Medical Reports", required: true, description: "Disability diagnostic assessment by specialist doctor" },
      { id: "address_proof", name: "Address Proof", required: true, description: "Ration Card or Utility Bill" },
      { id: "photo", name: "Full Photograph showing disability", required: true, description: "Recent photograph" }
    ],
    formFields: [
      { id: "applicantName", label: "Applicant Name", type: "text", required: true, placeholder: "Full Name" },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
      { id: "disabilityType", label: "Disability Category", type: "select", required: true, options: ["Locomotor / Physical", "Visual Impairment", "Hearing Impairment", "Intellectual / Mental", "Multiple Disabilities"] },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit mobile" },
      { id: "address", label: "Residential Address", type: "textarea", required: true, placeholder: "Full residential address" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District / Government Hospital", type: "text", required: true, placeholder: "District Hospital name" }
    ],
    faq: [
      { question: "What is UDID?", answer: "Unique Disability ID card is a single national identity card valid across India for disabled citizens." }
    ],
    instructions: [
      "Select your primary disability category.",
      "Upload medical board diagnostic reports."
    ]
  },
  {
    id: "student-scholarship",
    name: "Student Scholarship Application",
    category: "Education",
    description: "Apply for Pre-Matric, Post-Matric, and Merit-cum-Means National & State Scholarships.",
    eligibility: "Enrolled student meeting family income eligibility criteria (typically annual income < ₹2.5 Lakhs).",
    icon: "GraduationCap",
    processingDays: 30,
    fee: "Free of cost",
    requiredDocuments: [
      { id: "student_id", name: "Student ID / Fee Receipt", required: true, description: "Current academic year enrollment proof" },
      { id: "academic_records", name: "Previous Year Marks Card", required: true, description: "Marks sheet of last qualifying examination" },
      { id: "income_cert", name: "Family Income Certificate", required: true, description: "Official income certificate" },
      { id: "bank_passbook", name: "Bank Passbook Copy", required: true, description: "Bank passbook page showing IFSC and Account number" },
      { id: "address_proof", name: "Address Proof", required: true, description: "Aadhaar Card" },
      { id: "photo", name: "Passport Photo", required: true, description: "Student photograph" }
    ],
    formFields: [
      { id: "studentName", label: "Student Full Name", type: "text", required: true, placeholder: "Name as per mark sheet" },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
      { id: "institution", label: "School / College / Institute Name", type: "text", required: true, placeholder: "Name of institute" },
      { id: "course", label: "Course / Grade Name", type: "text", required: true, placeholder: "e.g. B.Tech / Class 12 / BA" },
      { id: "year", label: "Current Year / Semester", type: "select", required: true, options: ["1st Year", "2nd Year", "3rd Year", "4th Year", "School Student"] },
      { id: "rollNumber", label: "Student Roll / Enrollment No", type: "text", required: true, placeholder: "Institute roll number" },
      { id: "parentName", label: "Parent / Guardian Name", type: "text", required: true, placeholder: "Father/Mother name" },
      { id: "familyIncome", label: "Annual Family Income (INR)", type: "number", required: true, placeholder: "e.g. 180000" },
      { id: "address", label: "Permanent Address", type: "textarea", required: true, placeholder: "Full home address" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District", type: "text", required: true, placeholder: "District name" }
    ],
    faq: [
      { question: "How is scholarship money disbursed?", answer: "Directly transferred to student's Aadhaar-seeded bank account via Direct Benefit Transfer (DBT)." }
    ],
    instructions: [
      "Fill in academic details and bank account details accurately.",
      "Upload previous year marks sheet and valid income certificate."
    ]
  },
  {
    id: "bonafide-certificate",
    name: "Educational Bonafide Certificate",
    category: "Education",
    description: "Request official Bonafide Certificate from Educational Board / Authority.",
    eligibility: "Enrolled student or alumnus of recognized educational institution.",
    icon: "BookOpen",
    processingDays: 5,
    fee: "₹20 - ₹50",
    requiredDocuments: [
      { id: "student_id", name: "Student ID Card", required: true, description: "Valid student identity card scan" },
      { id: "enrollment_proof", name: "Admission Receipt / Hall Ticket", required: true, description: "Proof of enrollment" }
    ],
    formFields: [
      { id: "studentName", label: "Student Name", type: "text", required: true, placeholder: "Full Name" },
      { id: "institution", label: "Institution / School Name", type: "text", required: true, placeholder: "Full institution name" },
      { id: "course", label: "Course / Stream", type: "text", required: true, placeholder: "e.g. Higher Secondary / B.Sc" },
      { id: "year", label: "Current Academic Year", type: "text", required: true, placeholder: "e.g. 2025-2026" },
      { id: "rollNumber", label: "Roll Number / Register No", type: "text", required: true, placeholder: "University / School Register No" },
      { id: "purpose", label: "Purpose of Certificate", type: "select", required: true, options: ["Passport Application", "Bank Account Opening", "Bus / Rail Concession", "Scholarship", "Other"] },
      { id: "address", label: "Residential Address", type: "textarea", required: true, placeholder: "Full address" }
    ],
    faq: [
      { question: "What is a Bonafide Certificate?", answer: "An official document proving that a student belongs to a specific institution during an academic year." }
    ],
    instructions: [
      "Specify purpose of bonafide certificate.",
      "Upload current student ID card."
    ]
  },
  {
    id: "job-application-assistance",
    name: "Government Job Application Assistance",
    category: "Employment",
    description: "Assistance with public sector job applications (UPSC, SSC, State PSC, Railway, Banking).",
    eligibility: "Citizen meeting qualification, age, and physical standard criteria specified in job notification.",
    icon: "Briefcase",
    processingDays: 3,
    fee: "Free advisory",
    requiredDocuments: [
      { id: "identity_proof", name: "Identity Proof", required: true, description: "Aadhaar Card or PAN Card" },
      { id: "educational_certs", name: "Educational Certificates & Marksheets", required: true, description: "Degree / Class 10 / 12 Certificates" },
      { id: "category_cert", name: "Category / Reservation Certificate", required: false, description: "Caste / EWS / Ex-Serviceman Certificate if claiming quota" },
      { id: "photo", name: "Passport Photo", required: true, description: "Standard passport photo" },
      { id: "signature", name: "Scanned Signature", required: true, description: "Clear signature image" }
    ],
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, placeholder: "As per matriculation cert" },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit mobile" },
      { id: "email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { id: "qualification", label: "Highest Qualification", type: "select", required: true, options: ["Class 10th", "Class 12th", "Diploma", "Graduate (BA/B.Sc/B.Tech/B.Com)", "Post Graduate / Doctorate"] },
      { id: "category", label: "Category", type: "select", required: true, options: ["General / UR", "OBC", "SC", "ST", "EWS"] },
      { id: "address", label: "Address for Correspondence", type: "textarea", required: true, placeholder: "Full address" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District", type: "text", required: true, placeholder: "District name" }
    ],
    faq: [
      { question: "Does this portal automatically submit to recruitment boards?", answer: "This platform prepares your validated dossier and guides you through official recruitment portals." }
    ],
    instructions: [
      "Select highest qualification and category.",
      "Upload educational documents and scanned signature."
    ]
  },
  {
    id: "employment-exchange",
    name: "Employment / Job Seeker Registration",
    category: "Employment",
    description: "Register with National Career Service (NCS) & State Employment Exchange.",
    eligibility: "Unemployed job seeker aged 18-45 residing in the state.",
    icon: "UserPlus",
    processingDays: 5,
    fee: "Free of cost",
    requiredDocuments: [
      { id: "identity_proof", name: "Identity Proof", required: true, description: "Aadhaar Card" },
      { id: "educational_cert", name: "Educational Certificates", required: true, description: "Degree / Diploma certificates" },
      { id: "experience_cert", name: "Experience Certificate", required: false, description: "Previous work experience proof" },
      { id: "photo", name: "Passport Photo", required: true, description: "Recent photo" }
    ],
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, placeholder: "Full Name" },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit mobile" },
      { id: "email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { id: "qualification", label: "Highest Qualification", type: "text", required: true, placeholder: "e.g. B.Com, ITI Electrician" },
      { id: "skills", label: "Key Skills / Specialization", type: "textarea", required: true, placeholder: "e.g. Tally, Data Entry, Java, Welding" },
      { id: "experience", label: "Total Work Experience (Years)", type: "select", required: true, options: ["Fresher (0 Years)", "1-2 Years", "3-5 Years", "5+ Years"] },
      { id: "address", label: "Residential Address", type: "textarea", required: true, placeholder: "Full address" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District", type: "text", required: true, placeholder: "District name" }
    ],
    faq: [
      { question: "What is an Employment Exchange Card?", answer: "It provides a registration number used for government job seniority and job fair invites." }
    ],
    instructions: [
      "Detail your skills and educational background.",
      "Upload qualification mark sheets for registration."
    ]
  },
  {
    id: "pension-application",
    name: "Pension Application",
    category: "Social Security",
    description: "Application for Central/State Government Employee Service Pension & Family Pension.",
    eligibility: "Retired government employee or surviving spouse of deceased pensioner.",
    icon: "Clock",
    processingDays: 30,
    fee: "Free of cost",
    requiredDocuments: [
      { id: "identity_proof", name: "Identity Proof", required: true, description: "Aadhaar Card, PAN Card" },
      { id: "age_proof", name: "Age / Retirement Order", required: true, description: "Superannuation order or PPO copy" },
      { id: "address_proof", name: "Address Proof", required: true, description: "Utility bill or Bank Passbook" },
      { id: "bank_proof", name: "Bank Passbook / Cancelled Cheque", required: true, description: "Single/Joint bank account passbook copy" }
    ],
    formFields: [
      { id: "applicantName", label: "Pensioner Name", type: "text", required: true, placeholder: "Full Name" },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "age", label: "Age", type: "number", required: true, placeholder: "Current Age" },
      { id: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
      { id: "pensionType", label: "Pension Category", type: "select", required: true, options: ["Superannuation Service Pension", "Family Pension", "Invalid / Disability Pension", "Voluntary Retirement"] },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit mobile" },
      { id: "address", label: "Residential Address", type: "textarea", required: true, placeholder: "Full address" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District", type: "text", required: true, placeholder: "District name" },
      { id: "bankDetails", label: "Bank Account No & IFSC", type: "text", required: true, placeholder: "e.g. SBIN0001234 - Acc: 123456789" }
    ],
    faq: [
      { question: "What is PPO?", answer: "Pension Payment Order (PPO) is a unique number allotted to every pensioner." }
    ],
    instructions: [
      "Provide pension payment details and retirement order reference.",
      "Upload bank passbook page displaying IFSC."
    ]
  },
  {
    id: "old-age-pension",
    name: "Old Age Pension",
    category: "Social Welfare",
    description: "Indira Gandhi National Old Age Pension Scheme (IGNOAPS) financial assistance for elderly BPL citizens.",
    eligibility: "Senior citizens aged 60+ belonging to Below Poverty Line (BPL) household.",
    icon: "HeartHandshake",
    processingDays: 20,
    fee: "Free of cost",
    requiredDocuments: [
      { id: "identity_proof", name: "Aadhaar Card", required: true, description: "Aadhaar mandatory" },
      { id: "age_proof", name: "Age Proof", required: true, description: "Aadhaar, Voter ID, or Medical officer age cert" },
      { id: "income_cert", name: "BPL Ration Card / Income Cert", required: true, description: "BPL card copy or BPL list record" },
      { id: "address_proof", name: "Address Proof", required: true, description: "Ration Card or Electoral Roll extract" },
      { id: "bank_proof", name: "Bank Passbook Copy", required: true, description: "Account copy for monthly pension transfer" }
    ],
    formFields: [
      { id: "applicantName", label: "Applicant Name", type: "text", required: true, placeholder: "Full Name" },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "age", label: "Age (60+)", type: "number", required: true, placeholder: "e.g. 65" },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "Mobile number" },
      { id: "address", label: "Residential Address", type: "textarea", required: true, placeholder: "Full address" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District / Village Panchayat", type: "text", required: true, placeholder: "Gram Panchayat / Ward" },
      { id: "annualIncome", label: "Annual Family Income (INR)", type: "number", required: true, placeholder: "Income details" },
      { id: "bankDetails", label: "Bank Account & IFSC Code", type: "text", required: true, placeholder: "Bank Name, Acc No, IFSC" }
    ],
    faq: [
      { question: "How much monthly pension is provided?", answer: "Financial assistance ranges from ₹500 to ₹2,000 per month based on state supplementary funds." }
    ],
    instructions: [
      "Submit BPL details and age verification proof.",
      "Upload Aadhaar and bank passbook."
    ]
  },
  {
    id: "widow-pension",
    name: "Widow Pension",
    category: "Social Welfare",
    description: "Indira Gandhi National Widow Pension Scheme (IGNWPS) for destitute widows.",
    eligibility: "Widow aged 40-79 living below the poverty line.",
    icon: "ShieldAlert",
    processingDays: 20,
    fee: "Free of cost",
    requiredDocuments: [
      { id: "identity_proof", name: "Aadhaar Card", required: true, description: "Applicant Aadhaar" },
      { id: "address_proof", name: "Address Proof", required: true, description: "Ration Card or Voter ID" },
      { id: "death_cert", name: "Death Certificate of Husband", required: true, description: "Official death certificate of spouse" },
      { id: "income_proof", name: "Income / BPL Proof", required: true, description: "BPL card or Tehsildar income cert" },
      { id: "bank_proof", name: "Bank Passbook", required: true, description: "Bank passbook page" }
    ],
    formFields: [
      { id: "applicantName", label: "Applicant Name", type: "text", required: true, placeholder: "Full Name" },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "maritalStatus", label: "Marital Status", type: "select", required: true, options: ["Widowed"] },
      { id: "spouseName", label: "Late Husband's Name", type: "text", required: true, placeholder: "Husband's full name" },
      { id: "dateOfSpouseDeath", label: "Date of Spouse's Death", type: "date", required: true },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit mobile" },
      { id: "address", label: "Residential Address", type: "textarea", required: true, placeholder: "Full address" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District", type: "text", required: true, placeholder: "District name" },
      { id: "income", label: "Annual Income (INR)", type: "number", required: true, placeholder: "e.g. 45000" },
      { id: "bankDetails", label: "Bank Account Number & IFSC", type: "text", required: true, placeholder: "Bank Name, Acc No, IFSC" }
    ],
    faq: [
      { question: "Is husband's death certificate compulsory?", answer: "Yes, an official death certificate issued by a registrar is mandatory." }
    ],
    instructions: [
      "Upload spouse's death certificate and BPL income certificate."
    ]
  },
  {
    id: "health-scheme",
    name: "Health Scheme Registration",
    category: "Health",
    description: "Ayushman Bharat PM-JAY / State Health Insurance Scheme Card enrolment.",
    eligibility: "Families listed under SECC database or eligible BPL / Low Income categories.",
    icon: "Activity",
    processingDays: 7,
    fee: "Free of cost",
    requiredDocuments: [
      { id: "identity_proof", name: "Aadhaar Card", required: true, description: "Aadhaar card for biometric verification" },
      { id: "address_proof", name: "Ration Card", required: true, description: "Ration Card showing family listing" },
      { id: "income_doc", name: "Income / SECC Proof", required: false, description: "SECC card or eligibility slip" }
    ],
    formFields: [
      { id: "applicantName", label: "Head of Household Name", type: "text", required: true, placeholder: "Full Name" },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
      { id: "familyMembers", label: "Number of Family Members Covered", type: "number", required: true, placeholder: "e.g. 5" },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit mobile" },
      { id: "address", label: "Residential Address", type: "textarea", required: true, placeholder: "Full address" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District", type: "text", required: true, placeholder: "District name" },
      { id: "incomeInfo", label: "Ration Card / SECC Household ID", type: "text", required: true, placeholder: "Ration Card No or PMJAY HHID" }
    ],
    faq: [
      { question: "What coverage does Ayushman PM-JAY provide?", answer: "Health cover of up to ₹5 Lakhs per family per year for secondary and tertiary hospital care." }
    ],
    instructions: [
      "Enter Ration Card or SECC Household ID.",
      "Upload Aadhaar card copies of household members."
    ]
  },
  {
    id: "agricultural-subsidy",
    name: "Agricultural Subsidy Assistance",
    category: "Agriculture",
    description: "PM-KISAN Samman Nidhi, seed/fertilizer subsidies, and farm equipment assistance.",
    eligibility: "Landholding farmer with cultivable land in their name.",
    icon: "Sprout",
    processingDays: 15,
    fee: "Free of cost",
    requiredDocuments: [
      { id: "identity_proof", name: "Aadhaar Card", required: true, description: "Mandatory Aadhaar proof" },
      { id: "land_record", name: "Land Ownership Record (7/12 / Patta / Khasra)", required: true, description: "Land title document showing farmer name" },
      { id: "bank_proof", name: "Bank Passbook Copy", required: true, description: "Passbook page with IFSC for DBT transfer" },
      { id: "farmer_cert", name: "Farmer Registration Certificate", required: false, description: "State agriculture card" }
    ],
    formFields: [
      { id: "farmerName", label: "Farmer Full Name", type: "text", required: true, placeholder: "Name as per land record" },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "Aadhaar linked mobile" },
      { id: "address", label: "Farm / Residential Address", type: "textarea", required: true, placeholder: "Full address" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District", type: "text", required: true, placeholder: "District name" },
      { id: "village", label: "Village / Panchayat", type: "text", required: true, placeholder: "Village name" },
      { id: "landArea", label: "Total Land Area (in Acres/Hectares)", type: "text", required: true, placeholder: "e.g. 2.5 Acres" },
      { id: "surveyNumber", label: "Survey / Khasra / Khatoni Number", type: "text", required: true, placeholder: "Survey number" },
      { id: "cropDetails", label: "Primary Cultivated Crops", type: "text", required: true, placeholder: "e.g. Paddy, Wheat, Cotton" },
      { id: "bankAccount", label: "Bank Account & IFSC Code", type: "text", required: true, placeholder: "Bank Name, Acc No, IFSC" }
    ],
    faq: [
      { question: "What is PM-KISAN?", answer: "PM-KISAN provides an income support of ₹6,000 per year in three equal installments to farmer families." }
    ],
    instructions: [
      "Ensure land survey number matches official land revenue records.",
      "Upload land Patta / 7/12 extract and bank passbook."
    ]
  },
  {
    id: "building-permission",
    name: "Building / Construction Permission Request",
    category: "Municipal Services",
    description: "Obtain Municipal Plan Approval & Building Construction Permit.",
    eligibility: "Plot owner or authorized developer with clean title deed.",
    icon: "Building",
    processingDays: 30,
    fee: "Scrutiny & Plan approval fee calculated per sq ft",
    requiredDocuments: [
      { id: "identity_proof", name: "Applicant Identity Proof", required: true, description: "Aadhaar Card or PAN Card" },
      { id: "ownership_doc", name: "Property Ownership Deed / Khata", required: true, description: "Registered Sale Deed & Property Tax Certificate" },
      { id: "building_plan", name: "Licensed Architect Building Plan", required: true, description: "Blueprints signed by registered architect/engineer" },
      { id: "site_photo", name: "Vacant Site Photograph", required: true, description: "Photograph of site location" }
    ],
    formFields: [
      { id: "applicantName", label: "Applicant Name", type: "text", required: true, placeholder: "Owner / Developer Name" },
      { id: "propertyAddress", label: "Site Address", type: "textarea", required: true, placeholder: "Plot location details" },
      { id: "surveyNumber", label: "Survey / Property Khata Number", type: "text", required: true, placeholder: "Property ID" },
      { id: "buildingType", label: "Proposed Building Category", type: "select", required: true, options: ["Residential Single Family", "Multi-Family Apartment", "Commercial Complex", "Industrial Warehouse"] },
      { id: "plotArea", label: "Plot Area (sq. ft)", type: "number", required: true, placeholder: "e.g. 2400" },
      { id: "proposedConstructionArea", label: "Total Built-Up Area (sq. ft)", type: "number", required: true, placeholder: "e.g. 3600" },
      { id: "floors", label: "Number of Proposed Floors", type: "select", required: true, options: ["Ground Floor", "G + 1 Floor", "G + 2 Floors", "G + 3 Floors or Multi-storey"] },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit mobile" },
      { id: "email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { id: "localAuthority", label: "Municipal Corporation / Panchayat", type: "text", required: true, placeholder: "Municipal body name" }
    ],
    faq: [
      { question: "What happens if construction starts without plan approval?", answer: "Unapproved constructions are subject to municipal stop-work notices and fines." }
    ],
    instructions: [
      "Provide blueprint specifications certified by a licensed structural engineer.",
      "Upload ownership title deed and site photos."
    ]
  },
  {
    id: "business-licence",
    name: "Business / Shop Licence Assistance",
    category: "Business & Trade",
    description: "Shop & Establishment Act Registration and Trade Licence issuance.",
    eligibility: "Business proprietor, partner, or company director operating commercial shop or establishment.",
    icon: "Store",
    processingDays: 7,
    fee: "₹250 - ₹2,500 based on employee count",
    requiredDocuments: [
      { id: "identity_proof", name: "Proprietor / Director Identity Proof", required: true, description: "Aadhaar Card or PAN Card" },
      { id: "address_proof", name: "Business Premises Rental / Ownership Proof", required: true, description: "Rent Agreement or Electricity bill of shop" },
      { id: "business_photo", name: "Shop Board Photograph", required: true, description: "Photo of shop entrance showing business name board" }
    ],
    formFields: [
      { id: "businessName", label: "Business / Shop Name", type: "text", required: true, placeholder: "Trade Name" },
      { id: "ownerName", label: "Proprietor / Managing Partner Name", type: "text", required: true, placeholder: "Owner full name" },
      { id: "businessType", label: "Entity Type", type: "select", required: true, options: ["Sole Proprietorship", "Partnership Firm", "Private Limited Company", "LLP"] },
      { id: "businessActivity", label: "Nature of Business Activity", type: "select", required: true, options: ["Retail Trade", "Wholesale Trading", "Restaurant / Food Eatery", "IT Services / Consultancy", "Manufacturing / Artisan"] },
      { id: "businessAddress", label: "Complete Business Address", type: "textarea", required: true, placeholder: "Shop door no, street, area" },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit mobile" },
      { id: "email", label: "Business Email", type: "email", required: true, placeholder: "business@example.com" },
      { id: "state", label: "State", type: "text", required: true, placeholder: "State name" },
      { id: "district", label: "District", type: "text", required: true, placeholder: "District name" },
      { id: "pincode", label: "Pincode", type: "text", required: true, placeholder: "6-digit pincode" }
    ],
    faq: [
      { question: "Is Shop & Establishment registration mandatory?", answer: "Yes, every commercial establishment employing people or operating trade must register within 30 days of opening." }
    ],
    instructions: [
      "Select entity type and nature of trade.",
      "Upload rent agreement and shop board photograph."
    ]
  },
  {
    id: "vehicle-registration",
    name: "Vehicle Registration Assistance",
    category: "Transport",
    description: "New Vehicle Registration (Form 20) & Transfer of Ownership (Form 29/30) at RTO.",
    eligibility: "Purchaser or transferee of motor vehicle.",
    icon: "Shield",
    processingDays: 10,
    fee: "Road tax + Registration fee per vehicle class",
    requiredDocuments: [
      { id: "identity_proof", name: "Identity Proof", required: true, description: "Aadhaar Card or PAN Card" },
      { id: "address_proof", name: "Address Proof", required: true, description: "Passport, Electricity Bill, Voter ID" },
      { id: "purchase_invoice", name: "Dealer Sales Invoice & Form 21", required: true, description: "Invoice copy from authorized dealer" },
      { id: "insurance_doc", name: "Valid Vehicle Insurance Certificate", required: true, description: "Motor insurance policy" }
    ],
    formFields: [
      { id: "ownerName", label: "Vehicle Owner Full Name", type: "text", required: true, placeholder: "Owner Name" },
      { id: "vehicleType", label: "Vehicle Category", type: "select", required: true, options: ["Two Wheeler (Scooter/Motorcycle)", "Four Wheeler Private Car", "Commercial Light Motor Vehicle", "Commercial Heavy Vehicle"] },
      { id: "vehicleModel", label: "Vehicle Model & Variant", type: "text", required: true, placeholder: "e.g. Hyundai Creta SX" },
      { id: "manufacturer", label: "Manufacturer Name", type: "text", required: true, placeholder: "e.g. Hyundai / Hero / Tata" },
      { id: "purchaseDate", label: "Date of Purchase", type: "date", required: true },
      { id: "dealerName", label: "Dealer Name & City", type: "text", required: true, placeholder: "Dealer agency name" },
      { id: "chassisNumber", label: "Chassis Number", type: "text", required: true, placeholder: "17-digit Chassis VIN" },
      { id: "engineNumber", label: "Engine / Motor Number", type: "text", required: true, placeholder: "Engine number" },
      { id: "address", label: "Owner Residential Address", type: "textarea", required: true, placeholder: "Full address" },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit mobile" }
    ],
    faq: [
      { question: "What is HSRP?", answer: "High Security Registration Plate (HSRP) is mandatory for all registered vehicles." }
    ],
    instructions: [
      "Enter exact chassis and engine numbers matching dealer sale invoice.",
      "Upload dealer sales invoice and motor insurance certificate."
    ]
  }
];

export function getServiceById(id: string): ServiceConfig | undefined {
  return SERVICES_CONFIG.find(s => s.id === id);
}

export function searchServices(query: string, category?: string): ServiceConfig[] {
  const q = query.toLowerCase().trim();
  return SERVICES_CONFIG.filter(service => {
    const matchesCategory = !category || category === "All Categories" || service.category.toLowerCase() === category.toLowerCase();
    if (!matchesCategory) return false;
    if (!q) return true;
    return (
      service.name.toLowerCase().includes(q) ||
      service.description.toLowerCase().includes(q) ||
      service.category.toLowerCase().includes(q) ||
      service.instructions.some(inst => inst.toLowerCase().includes(q)) ||
      service.faq.some(f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q))
    );
  });
}
