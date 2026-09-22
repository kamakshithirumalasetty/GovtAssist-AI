import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SERVICES_CONFIG } from "../src/config/services";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing records
  await prisma.adminAction.deleteMany();
  await prisma.applicationDocument.deleteMany();
  await prisma.application.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.service.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("Admin@123456", 10);
  const citizenPasswordHash = await bcrypt.hash("Citizen@123456", 10);

  // 1. Seed Admin Account
  const admin = await prisma.user.create({
    data: {
      id: "admin-user-001",
      name: "Government Administrator",
      email: "admin@govassist.demo",
      phone: "9876543210",
      passwordHash: passwordHash,
      role: "ADMIN",
      dateOfBirth: "1985-05-15",
      gender: "Male",
      address: "Central Secretariat, District Administrative Block",
      state: "New Delhi",
      district: "Central Delhi",
      pincode: "110001",
    }
  });
  console.log("✅ Admin seeded: admin@govassist.demo");

  // 2. Seed Demo Citizens
  const citizen1 = await prisma.user.create({
    data: {
      id: "citizen-user-001",
      name: "Rahul Sharma",
      email: "rahul.sharma@demo.com",
      phone: "9812345678",
      passwordHash: citizenPasswordHash,
      role: "CITIZEN",
      dateOfBirth: "1994-08-20",
      gender: "Male",
      address: "Flat 402, Sunshine Apartments, MG Road",
      state: "Maharashtra",
      district: "Mumbai",
      pincode: "400001",
    }
  });

  const citizen2 = await prisma.user.create({
    data: {
      id: "citizen-user-002",
      name: "Priya Verma",
      email: "priya.verma@demo.com",
      phone: "9823456789",
      passwordHash: citizenPasswordHash,
      role: "CITIZEN",
      dateOfBirth: "1998-11-12",
      gender: "Female",
      address: "12/B Rose Garden Colony, Indiranagar",
      state: "Karnataka",
      district: "Bengaluru",
      pincode: "560038",
    }
  });

  const citizen3 = await prisma.user.create({
    data: {
      id: "citizen-user-003",
      name: "Amit Patel",
      email: "amit.patel@demo.com",
      phone: "9834567890",
      passwordHash: citizenPasswordHash,
      role: "CITIZEN",
      dateOfBirth: "1988-03-25",
      gender: "Male",
      address: "Plot 88, Green Park Extension, SG Highway",
      state: "Gujarat",
      district: "Ahmedabad",
      pincode: "380015",
    }
  });
  console.log("✅ 3 Demo Citizens seeded");

  // 3. Seed 30 Services
  for (const s of SERVICES_CONFIG) {
    await prisma.service.create({
      data: {
        id: s.id,
        name: s.name,
        category: s.category,
        description: s.description,
        eligibility: s.eligibility,
        icon: s.icon,
      }
    });
  }
  console.log(`✅ ${SERVICES_CONFIG.length} Services seeded into DB`);

  // 4. Seed Sample Applications with different statuses
  // App 1: Approved PAN Card for Rahul
  const app1 = await prisma.application.create({
    data: {
      id: "app-001",
      applicationNumber: "GOV-2026-000001",
      userId: citizen1.id,
      serviceId: "pan-card",
      status: "APPROVED",
      formData: JSON.stringify({
        fullName: "Rahul Sharma",
        fatherName: "Ramesh Sharma",
        dob: "1994-08-20",
        gender: "Male",
        mobile: "9812345678",
        email: "rahul.sharma@demo.com",
        aadhaarNumber: "998877665544",
        existingPanStatus: "New PAN (Form 49A)",
        address: "Flat 402, Sunshine Apartments, MG Road",
        state: "Maharashtra",
        district: "Mumbai",
        pincode: "400001"
      }),
      submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      reviewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      documents: {
        create: [
          { documentType: "Identity Proof", fileName: "aadhaar_rahul.pdf", fileUrl: "/demo/aadhaar_sample.pdf" },
          { documentType: "Address Proof", fileName: "electricity_bill.pdf", fileUrl: "/demo/bill_sample.pdf" },
          { documentType: "Photograph", fileName: "rahul_photo.png", fileUrl: "/demo/photo_sample.png" }
        ]
      }
    }
  });

  await prisma.adminAction.create({
    data: {
      applicationId: app1.id,
      adminId: admin.id,
      action: "APPROVED",
      reason: "All identity proof document verification verified successfully.",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  });

  // App 2: Under Review Driving Licence for Priya
  const app2 = await prisma.application.create({
    data: {
      id: "app-002",
      applicationNumber: "GOV-2026-000002",
      userId: citizen2.id,
      serviceId: "driving-licence",
      status: "UNDER_REVIEW",
      formData: JSON.stringify({
        fullName: "Priya Verma",
        dob: "1998-11-12",
        gender: "Female",
        mobile: "9823456789",
        licenceType: "Learner Licence",
        vehicleCategory: "Light Motor Vehicle (LMV)",
        address: "12/B Rose Garden Colony, Indiranagar",
        state: "Karnataka",
        district: "Bengaluru East RTO"
      }),
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      documents: {
        create: [
          { documentType: "Age Proof", fileName: "birth_certificate_priya.pdf", fileUrl: "/demo/birth_sample.pdf" },
          { documentType: "Address Proof", fileName: "passport_priya.pdf", fileUrl: "/demo/passport_sample.pdf" }
        ]
      }
    }
  });

  // App 3: Rejected Student Scholarship for Amit
  const app3 = await prisma.application.create({
    data: {
      id: "app-003",
      applicationNumber: "GOV-2026-000003",
      userId: citizen3.id,
      serviceId: "student-scholarship",
      status: "REJECTED",
      rejectionReason: "Uploaded income certificate document is expired (issued > 12 months ago). Please upload a current valid Income Certificate.",
      formData: JSON.stringify({
        studentName: "Amit Patel",
        dob: "1998-03-25",
        institution: "Gujarat Technological University",
        course: "B.Tech Computer Science",
        year: "3rd Year",
        rollNumber: "GTU2023CS045",
        parentName: "Kishore Patel",
        familyIncome: "320000",
        address: "Plot 88, Green Park Extension, SG Highway",
        state: "Gujarat",
        district: "Ahmedabad"
      }),
      submittedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      reviewedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      documents: {
        create: [
          { documentType: "Student ID", fileName: "student_id_amit.jpg", fileUrl: "/demo/id_sample.jpg" },
          { documentType: "Family Income Certificate", fileName: "old_income_cert.pdf", fileUrl: "/demo/income_sample.pdf" }
        ]
      }
    }
  });

  await prisma.adminAction.create({
    data: {
      applicationId: app3.id,
      adminId: admin.id,
      action: "REJECTED",
      reason: "Uploaded income certificate document is expired (issued > 12 months ago). Please upload a current valid Income Certificate.",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  });

  // App 4: Pending Submitted Passport for Rahul
  const app4 = await prisma.application.create({
    data: {
      id: "app-004",
      applicationNumber: "GOV-2026-000004",
      userId: citizen1.id,
      serviceId: "passport-application",
      status: "SUBMITTED",
      formData: JSON.stringify({
        fullName: "Rahul Sharma",
        dob: "1994-08-20",
        placeOfBirth: "Mumbai",
        gender: "Male",
        passportType: "Fresh Passport",
        employmentType: "Private",
        mobile: "9812345678",
        email: "rahul.sharma@demo.com",
        address: "Flat 402, Sunshine Apartments, MG Road",
        state: "Maharashtra",
        district: "Mumbai City"
      }),
      submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      documents: {
        create: [
          { documentType: "Address Proof", fileName: "rent_agreement.pdf", fileUrl: "/demo/rent_sample.pdf" },
          { documentType: "DOB Proof", fileName: "10th_marksheet.pdf", fileUrl: "/demo/marksheet_sample.pdf" }
        ]
      }
    }
  });

  console.log("✅ Sample Applications seeded");

  // 5. Seed Sample Notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: citizen1.id,
        title: "Application Approved",
        message: "Your PAN Card Application (GOV-2026-000001) has been approved by the Administrator.",
        read: false,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        userId: citizen2.id,
        title: "Application Under Review",
        message: "Your Driving Licence application (GOV-2026-000002) is currently under review at RTO Bengaluru East.",
        read: false,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        userId: citizen3.id,
        title: "Application Rejected",
        message: "Your Student Scholarship Application (GOV-2026-000003) was rejected: Income certificate expired.",
        read: false,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        userId: admin.id,
        title: "New Application Received",
        message: "New Passport Application (GOV-2026-000004) received from Rahul Sharma.",
        read: false,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
      }
    ]
  });

  console.log("✅ Sample Notifications seeded");
  console.log("🚀 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
