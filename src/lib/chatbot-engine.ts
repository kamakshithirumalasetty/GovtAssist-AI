import { SERVICES_CONFIG, ServiceConfig } from "@/config/services";

export interface ChatActionButton {
  label: string;
  actionType: "VIEW_REQUIREMENTS" | "APPLY_NOW" | "VIEW_SERVICE" | "TRACK_APPLICATION" | "ASK_QUESTION";
  serviceId?: string;
  targetUrl?: string;
}

export interface ChatbotResponse {
  text: string;
  detectedService?: ServiceConfig;
  actionButtons?: ChatActionButton[];
  suggestedQuestions?: string[];
  isDemoDisclaimer?: boolean;
}

export function processUserChatMessage(userQuery: string): ChatbotResponse {
  const query = userQuery.toLowerCase().trim();

  // 1. Application Tracking Intent
  if (query.includes("track") || query.includes("status") || query.includes("gov-2026")) {
    const match = userQuery.match(/GOV-\d{4}-\d{6}/i);
    if (match) {
      const appNum = match[0].toUpperCase();
      return {
        text: `I can help you track application **${appNum}**. You can view live real-time status details directly in your Citizen Dashboard or click below.`,
        actionButtons: [
          {
            label: `Track ${appNum}`,
            actionType: "TRACK_APPLICATION",
            targetUrl: `/citizen/track?id=${appNum}`
          }
        ],
        suggestedQuestions: ["Show all my applications", "How long does verification take?", "What if my application is rejected?"]
      };
    }
    return {
      text: "You can track any application status by entering your Application ID (e.g. `GOV-2026-000001`) or visiting the Application Tracking page.",
      actionButtons: [
        {
          label: "Go to Application Tracker",
          actionType: "TRACK_APPLICATION",
          targetUrl: "/citizen/track"
        }
      ],
      suggestedQuestions: ["How to find my Application ID?", "What do application statuses mean?"]
    };
  }

  // 2. Exact or Intent Service Matcher
  let matchedService: ServiceConfig | undefined;

  // Search by service ID, name, or keywords
  for (const service of SERVICES_CONFIG) {
    const sName = service.name.toLowerCase();
    const sId = service.id.toLowerCase();

    if (query.includes(sId) || query.includes(sName)) {
      matchedService = service;
      break;
    }
  }

  // Secondary keyword map if exact name isn't in query string
  if (!matchedService) {
    if (query.includes("pan") || query.includes("tax card") || query.includes("form 49a")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "pan-card");
    } else if (query.includes("aadhaar") || query.includes("uidai") || query.includes("biometric")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "aadhaar-enrolment");
    } else if (query.includes("licence") || query.includes("license") || query.includes("driving") || query.includes("rto") || query.includes("dl")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "driving-licence");
    } else if (query.includes("voter") || query.includes("epic") || query.includes("election")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "voter-id");
    } else if (query.includes("passport") || query.includes("tatkaal") || query.includes("travel doc")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "passport-application");
    } else if (query.includes("birth") || query.includes("newborn")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "birth-certificate");
    } else if (query.includes("death")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "death-certificate");
    } else if (query.includes("marriage") || query.includes("wedding")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "marriage-certificate");
    } else if (query.includes("income") || query.includes("salary proof")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "income-certificate");
    } else if (query.includes("caste") || query.includes("obc") || query.includes("sc") || query.includes("st") || query.includes("ews")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "caste-certificate");
    } else if (query.includes("domicile") || query.includes("residence") || query.includes("resident")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "residence-certificate");
    } else if (query.includes("ration") || query.includes("pds") || query.includes("food card")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "ration-card");
    } else if (query.includes("land") || query.includes("khasra") || query.includes("patta") || query.includes("7/12") || query.includes("khata")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "property-land-records");
    } else if (query.includes("electricity") || query.includes("power meter") || query.includes("light connection")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "electricity-connection");
    } else if (query.includes("water connection") || query.includes("water tap")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "water-connection");
    } else if (query.includes("gas") || query.includes("lpg") || query.includes("ujjwala") || query.includes("cylinder")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "gas-connection");
    } else if (query.includes("senior citizen")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "senior-citizen-certificate");
    } else if (query.includes("disability") || query.includes("udid") || query.includes("handicap")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "disability-certificate");
    } else if (query.includes("scholarship") || query.includes("student grant") || query.includes("fee waiver")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "student-scholarship");
    } else if (query.includes("bonafide")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "bonafide-certificate");
    } else if (query.includes("job application") || query.includes("government job") || query.includes("upsc") || query.includes("ssc")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "job-application-assistance");
    } else if (query.includes("employment exchange") || query.includes("job seeker") || query.includes("ncs")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "employment-exchange");
    } else if (query.includes("old age pension") || query.includes("ignoaps")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "old-age-pension");
    } else if (query.includes("widow pension") || query.includes("ignwps")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "widow-pension");
    } else if (query.includes("pension")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "pension-application");
    } else if (query.includes("health") || query.includes("ayushman") || query.includes("pmjay") || query.includes("medical card")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "health-scheme");
    } else if (query.includes("farmer") || query.includes("agriculture") || query.includes("pm-kisan") || query.includes("crop")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "agricultural-subsidy");
    } else if (query.includes("building") || query.includes("construction") || query.includes("plan approval")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "building-permission");
    } else if (query.includes("business") || query.includes("shop licence") || query.includes("trade licence")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "business-licence");
    } else if (query.includes("vehicle") || query.includes("car registration") || query.includes("rc")) {
      matchedService = SERVICES_CONFIG.find(s => s.id === "vehicle-registration");
    }
  }

  // 3. Service Action Trigger Response
  if (matchedService) {
    const docs = matchedService.requiredDocuments.map(d => `• **${d.name}**: ${d.description}`).join("\n");
    const faqs = matchedService.faq.map(f => `**Q: ${f.question}**\n${f.answer}`).join("\n\n");

    if (query.includes("requirement") || query.includes("document") || query.includes("eligibility") || query.includes("what is required")) {
      return {
        text: `Here are the eligibility and required documents for **${matchedService.name}**:\n\n**Eligibility:** ${matchedService.eligibility}\n\n**Required Documents:**\n${docs}\n\n**Processing Time:** ~${matchedService.processingDays} days | **Govt Fee:** ${matchedService.fee}`,
        detectedService: matchedService,
        actionButtons: [
          { label: "Apply Now", actionType: "APPLY_NOW", serviceId: matchedService.id, targetUrl: `/citizen/apply/${matchedService.id}` },
          { label: "View Service Details", actionType: "VIEW_SERVICE", serviceId: matchedService.id, targetUrl: `/services/${matchedService.id}` }
        ],
        suggestedQuestions: [
          `How do I apply for ${matchedService.name}?`,
          `What are the FAQs for ${matchedService.name}?`,
          "Explore all 30 services"
        ]
      };
    }

    return {
      text: `I can certainly assist you with **${matchedService.name}**!\n\n${matchedService.description}\n\n• **Category:** ${matchedService.category}\n• **Estimated Processing:** ${matchedService.processingDays} days\n• **Official Fee:** ${matchedService.fee}\n\nWould you like to review requirements or start your online application now?`,
      detectedService: matchedService,
      actionButtons: [
        { label: "Apply Now", actionType: "APPLY_NOW", serviceId: matchedService.id, targetUrl: `/citizen/apply/${matchedService.id}` },
        { label: "View Requirements", actionType: "VIEW_REQUIREMENTS", serviceId: matchedService.id, targetUrl: `/services/${matchedService.id}` },
        { label: "View Service Details", actionType: "VIEW_SERVICE", serviceId: matchedService.id, targetUrl: `/services/${matchedService.id}` }
      ],
      suggestedQuestions: [
        `What documents are needed for ${matchedService.name}?`,
        "Show me all available services",
        "Track an application"
      ]
    };
  }

  // 4. Listing / General Service Discovery Intent
  if (query.includes("service") || query.includes("list") || query.includes("available") || query.includes("help me find")) {
    return {
      text: "We offer **30 centralized digital government services** across 12 categories including Identity Cards, Revenue Certificates, Transport Licences, Social Welfare, Pensions, Utilities, Education, and Agriculture.",
      actionButtons: [
        { label: "Browse All 30 Services", actionType: "VIEW_SERVICE", targetUrl: "/services" },
        { label: "Identity & Tax Services", actionType: "VIEW_SERVICE", targetUrl: "/services?category=Identity" },
        { label: "Social Welfare & Pensions", actionType: "VIEW_SERVICE", targetUrl: "/services?category=Social Welfare" }
      ],
      suggestedQuestions: [
        "How can I apply for a PAN Card?",
        "I need a Driving Licence",
        "How to apply for Student Scholarship?"
      ]
    };
  }

  // 5. Default Fallback Guidance Response
  return {
    text: "I am your **AI Government Services Assistant**. I can help you discover requirements, check eligibility, upload documents, and submit applications for 30 digital government services.\n\n*Note: I provide general educational and application guidance based on standardized state government regulations. Please ensure all uploaded documents are accurate.*",
    suggestedQuestions: [
      "How can I apply for a PAN Card?",
      "I need a new Aadhaar Card",
      "How do I renew my driving licence?",
      "Show me available government services",
      "Track my application"
    ],
    isDemoDisclaimer: true
  };
}
