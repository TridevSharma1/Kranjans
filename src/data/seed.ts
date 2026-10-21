// Mock data — the single source of seed records. Edits made in the app persist to localStorage.
export const foundation = {
  name: "Kranjal Foundation",
  tagline: "Together We Build Better Lives",
  address: "Pune, Maharashtra - 586119",
  phone: "+91 91759 55009",
  email: "kranjalfoundation@gmail.com",
  registration: "MH/2016/0123456",
  pan: "AABTK1234F",
  certificate80G: "80G/PN/2019-20/1123",
  certificate12A: "12A/PN/2019-20/0456",
  founded: "2016",
  social: { facebook: "#", instagram: "#", twitter: "#", linkedin: "#", youtube: "#" },
};

export const content = {
  heroTitle: "Kranjal Foundation",
  heroSubtitle: "Together We Build Better Lives",
  heroText: "From village classrooms to health camps, we stand beside communities across Maharashtra to create dignity, opportunity and hope.",
  mission: "To empower underserved communities through education, healthcare, nutrition and livelihood programs that create lasting change.",
  vision: "A just and compassionate society where every person has the opportunity to live with dignity and reach their full potential.",
  values: "Compassion, Integrity, Inclusion, Accountability and Community-led action guide everything we do.",
  aboutIntro: "Kranjal Foundation is a registered non-profit based in Pune, Maharashtra. Since 2016 we have worked with rural and urban communities to bridge gaps in education, health, food security and women's livelihoods.",
  history: "What began as a weekend tutoring circle for 20 children in 2016 has grown into a multi-program foundation reaching over 48,000 people across 120 villages. Every milestone has been built by volunteers, donors and community leaders who believed change is possible.",
};

export const stats = [
  { label: "Lives Impacted", value: 48500, suffix: "+" },
  { label: "Villages Reached", value: 120, suffix: "" },
  { label: "Active Volunteers", value: 850, suffix: "+" },
  { label: "Programs Running", value: 24, suffix: "" },
];

export const departments = [
  { id: "d1", name: "Programs", head: "Anita Deshmukh", description: "Designs and runs field programs" },
  { id: "d2", name: "Operations", head: "Rahul Patil", description: "Logistics, admin and procurement" },
  { id: "d3", name: "Finance", head: "Sneha Kulkarni", description: "Accounts, audit and compliance" },
  { id: "d4", name: "Outreach", head: "Vikram Joshi", description: "Partnerships, fundraising & media" },
  { id: "d5", name: "Healthcare", head: "Dr. Meera Rao", description: "Health camps and awareness" },
];

export const designations = [
  { id: "g1", title: "Program Director", level: "Senior" },
  { id: "g2", title: "Program Coordinator", level: "Mid" },
  { id: "g3", title: "Field Officer", level: "Junior" },
  { id: "g4", title: "Accountant", level: "Mid" },
  { id: "g5", title: "Medical Officer", level: "Senior" },
  { id: "g6", title: "Outreach Executive", level: "Junior" },
];

export const employees = [
  { id: "EMP-0001", name: "Anita Deshmukh", email: "anita@kranjal.org", phone: "9876500001", department: "Programs", designation: "Program Director", joiningDate: "2017-04-10", salary: 65000, status: "Active", cardStatus: "Active", cardExpiry: "2027-12-31", bloodGroup: "B+", photo: "" },
  { id: "EMP-0002", name: "Rahul Patil", email: "rahul@kranjal.org", phone: "9876500002", department: "Operations", designation: "Program Coordinator", joiningDate: "2018-06-01", salary: 42000, status: "Active", cardStatus: "Active", cardExpiry: "2027-06-30", bloodGroup: "O+", photo: "" },
  { id: "EMP-0003", name: "Sneha Kulkarni", email: "sneha@kranjal.org", phone: "9876500003", department: "Finance", designation: "Accountant", joiningDate: "2019-01-15", salary: 38000, status: "Active", cardStatus: "Active", cardExpiry: "2026-12-31", bloodGroup: "A+", photo: "" },
  { id: "EMP-0004", name: "Vikram Joshi", email: "vikram@kranjal.org", phone: "9876500004", department: "Outreach", designation: "Outreach Executive", joiningDate: "2020-03-20", salary: 30000, status: "Active", cardStatus: "Active", cardExpiry: "2026-03-31", bloodGroup: "AB+", photo: "" },
  { id: "EMP-0005", name: "Dr. Meera Rao", email: "meera@kranjal.org", phone: "9876500005", department: "Healthcare", designation: "Medical Officer", joiningDate: "2018-09-05", salary: 72000, status: "Active", cardStatus: "Active", cardExpiry: "2027-09-30", bloodGroup: "O-", photo: "" },
  { id: "EMP-0006", name: "Kiran More", email: "kiran@kranjal.org", phone: "9876500006", department: "Programs", designation: "Field Officer", joiningDate: "2021-07-12", salary: 24000, status: "On Leave", cardStatus: "Active", cardExpiry: "2025-07-31", bloodGroup: "B-", photo: "" },
  { id: "EMP-0007", name: "Pooja Shinde", email: "pooja@kranjal.org", phone: "9876500007", department: "Programs", designation: "Program Coordinator", joiningDate: "2022-02-01", salary: 40000, status: "Inactive", cardStatus: "Revoked", cardExpiry: "2026-02-28", bloodGroup: "A-", photo: "" },
  { id: "EMP-0008", name: "Amit Gaikwad", email: "amit@kranjal.org", phone: "9876500008", department: "Operations", designation: "Field Officer", joiningDate: "2023-05-18", salary: 25000, status: "Active", cardStatus: "Active", cardExpiry: "2028-05-31", bloodGroup: "O+", photo: "" },
];

export const users = [
  { id: "u1", name: "Admin", email: "admin@kranjal.org", password: "admin123", role: "admin", status: "Active", employeeId: "" },
  { id: "u2", name: "Rahul Patil", email: "user@kranjal.org", password: "user123", role: "user", status: "Active", employeeId: "EMP-0002" },
  { id: "u3", name: "Anita Deshmukh", email: "anita@kranjal.org", password: "anita123", role: "user", status: "Active", employeeId: "EMP-0001" },
  { id: "u4", name: "Pooja Shinde", email: "pooja@kranjal.org", password: "pooja123", role: "user", status: "Disabled", employeeId: "EMP-0007" },
];

export const programs = [
  { id: "p1", title: "Shiksha Setu", category: "Education", image: "education", description: "After-school learning centres giving rural children foundational literacy, numeracy and digital skills.", objectives: "Improve learning outcomes; reduce dropouts; build digital literacy", beneficiaries: 12400, status: "Active" },
  { id: "p2", title: "Arogya Camps", category: "Health", image: "health", description: "Free monthly health check-up camps with doctors, medicines and referrals for villages without clinics.", objectives: "Early diagnosis; maternal care; awareness", beneficiaries: 18300, status: "Active" },
  { id: "p3", title: "Annapurna Meals", category: "Food", image: "hero", description: "Nutritious meals for children and elderly, plus ration kits for families in crisis.", objectives: "End child hunger; support elderly; disaster relief", beneficiaries: 9600, status: "Active" },
  { id: "p4", title: "Sakhi Udyog", category: "Women Empowerment", image: "women", description: "Tailoring, micro-enterprise and financial literacy training for women's self-help groups.", objectives: "Income generation; financial inclusion; leadership", beneficiaries: 3200, status: "Active" },
  { id: "p5", title: "Kaushal Yuva", category: "Skill Development", image: "education", description: "Vocational and job-readiness training for youth with placement support.", objectives: "Employability; certification; placements", beneficiaries: 2800, status: "Active" },
  { id: "p6", title: "Harit Gaon", category: "Environment", image: "hero", description: "Tree plantation, water conservation and clean-village drives led by local youth.", objectives: "Plant 50,000 trees; water harvesting; sanitation", beneficiaries: 2200, status: "Active" },
];

export const events = [
  { id: "e1", title: "Mega Health Camp — Baramati", date: "2026-11-15", location: "Baramati, Pune", category: "Health", image: "health", description: "Free check-ups, eye screening and medicines for 1,000+ villagers.", status: "Upcoming" },
  { id: "e2", title: "Volunteer Orientation Day", date: "2026-11-29", location: "Kranjal Office, Pune", category: "Volunteer", image: "hero", description: "Meet the team, learn about our programs and pick your first project.", status: "Upcoming" },
  { id: "e3", title: "Sakhi Udyog Exhibition", date: "2026-12-12", location: "Shivajinagar, Pune", category: "Women Empowerment", image: "women", description: "Products made by women's self-help groups on display and sale.", status: "Upcoming" },
  { id: "e4", title: "Back to School Drive", date: "2026-06-10", location: "Daund Taluka", category: "Education", image: "education", description: "Distributed 4,000 school kits to children in 40 villages.", status: "Completed" },
  { id: "e5", title: "Monsoon Tree Plantation", date: "2026-07-20", location: "Mulshi", category: "Environment", image: "hero", description: "5,000 saplings planted with 300 volunteers.", status: "Completed" },
];

export const gallery = [
  { id: "g1", title: "Learning centre, Daund", category: "Education", image: "education" },
  { id: "g2", title: "Health camp, Baramati", category: "Health", image: "health" },
  { id: "g3", title: "Book distribution", category: "Education", image: "hero" },
  { id: "g4", title: "Tailoring batch 12", category: "Women Empowerment", image: "women" },
  { id: "g5", title: "Meal drive", category: "Food", image: "hero" },
  { id: "g6", title: "Youth skill lab", category: "Skill Development", image: "education" },
  { id: "g7", title: "Eye screening", category: "Health", image: "health" },
  { id: "g8", title: "Green village drive", category: "Environment", image: "hero" },
  { id: "g9", title: "SHG meeting", category: "Women Empowerment", image: "women" },
];

export const certificates = [
  { id: "c1", number: "KF-CERT-2026-0001", type: "Volunteer Certificate", recipient: "Priya Nair", issueDate: "2026-03-15", expiryDate: "", description: "for 120 hours of dedicated volunteering in Shiksha Setu", status: "Valid", employeeId: "" },
  { id: "c2", number: "KF-CERT-2026-0002", type: "Internship Certificate", recipient: "Rahul Patil", issueDate: "2026-01-10", expiryDate: "", description: "for successfully completing a 3-month internship in Operations", status: "Valid", employeeId: "EMP-0002" },
  { id: "c3", number: "KF-CERT-2025-0014", type: "Training Certificate", recipient: "Rahul Patil", issueDate: "2025-02-01", expiryDate: "2026-02-01", description: "for completing First-Aid & Emergency Response training", status: "Valid", employeeId: "EMP-0002" },
  { id: "c4", number: "KF-CERT-2025-0020", type: "Participation Certificate", recipient: "Sahil Kapoor", issueDate: "2025-07-20", expiryDate: "", description: "for participating in Monsoon Tree Plantation", status: "Revoked", employeeId: "" },
  { id: "c5", number: "KF-CERT-2026-0003", type: "Appreciation Certificate", recipient: "Anita Deshmukh", issueDate: "2026-08-15", expiryDate: "", description: "in recognition of outstanding leadership", status: "Valid", employeeId: "EMP-0001" },
];

export const letters = [
  { id: "l1", reference: "KF/HR/2018/0002", employeeId: "EMP-0002", name: "Rahul Patil", designation: "Program Coordinator", department: "Operations", salary: 42000, joiningDate: "2018-06-01", issueDate: "2018-05-20" },
  { id: "l2", reference: "KF/HR/2017/0001", employeeId: "EMP-0001", name: "Anita Deshmukh", designation: "Program Director", department: "Programs", salary: 65000, joiningDate: "2017-04-10", issueDate: "2017-03-28" },
];

export const campaigns = [
  { id: "cp1", title: "Educate a Child", goal: 500000, raised: 342000, image: "education", description: "₹1,200 sponsors a child's learning for a full year." },
  { id: "cp2", title: "Health for All", goal: 800000, raised: 515000, image: "health", description: "Fund medicines and doctors for village health camps." },
  { id: "cp3", title: "Empower Her", goal: 400000, raised: 168000, image: "women", description: "Sewing machines and training for women entrepreneurs." },
];

export const donations = [
  { id: "dn1", receipt: "KF-RCPT-1001", donor: "Rahul Patil", email: "user@kranjal.org", phone: "9876500002", amount: 5000, campaign: "Educate a Child", method: "UPI", status: "Success", date: "2026-09-12", pan: "" },
  { id: "dn2", receipt: "KF-RCPT-1002", donor: "Neha Sharma", email: "neha@example.com", phone: "9811111111", amount: 25000, campaign: "Health for All", method: "Card", status: "Success", date: "2026-09-20", pan: "" },
  { id: "dn3", receipt: "KF-RCPT-1003", donor: "Arjun Mehta", email: "arjun@example.com", phone: "9822222222", amount: 2000, campaign: "Empower Her", method: "Net Banking", status: "Pending", date: "2026-10-02", pan: "" },
  { id: "dn4", receipt: "KF-RCPT-1004", donor: "Rahul Patil", email: "user@kranjal.org", phone: "9876500002", amount: 1500, campaign: "Health for All", method: "UPI", status: "Success", date: "2026-10-05", pan: "" },
  { id: "dn5", receipt: "KF-RCPT-1005", donor: "Fatima Shaikh", email: "fatima@example.com", phone: "9833333333", amount: 10000, campaign: "Educate a Child", method: "UPI", status: "Success", date: "2026-10-10", pan: "" },
  { id: "dn6", receipt: "KF-RCPT-1006", donor: "Rohan Desai", email: "rohan@example.com", phone: "9844444444", amount: 750, campaign: "Empower Her", method: "Card", status: "Failed", date: "2026-10-14", pan: "" },
];

export const volunteers = [
  { id: "v1", name: "Priya Nair", phone: "9900000001", email: "priya@example.com", address: "Kothrud, Pune", skills: "Teaching", availability: "Weekends", interest: "Education", status: "Approved", date: "2026-02-10" },
  { id: "v2", name: "Sahil Kapoor", phone: "9900000002", email: "sahil@example.com", address: "Hadapsar, Pune", skills: "Photography", availability: "Flexible", interest: "Environment", status: "Pending", date: "2026-09-28" },
  { id: "v3", name: "Dr. Kavya Iyer", phone: "9900000003", email: "kavya@example.com", address: "Aundh, Pune", skills: "Medicine", availability: "Monthly", interest: "Health", status: "Approved", date: "2026-05-14" },
];

export const testimonials = [
  { id: "t1", name: "Sunita Pawar", role: "Sakhi Udyog member", quote: "The tailoring training changed my life. Today I run my own small shop and my daughters go to college." },
  { id: "t2", name: "Ramesh Jadhav", role: "Parent, Daund", quote: "My son could barely read. After a year at the Shiksha Setu centre he tops his class." },
  { id: "t3", name: "Neha Sharma", role: "Monthly donor", quote: "Kranjal shares updates and receipts for every rupee. I've never felt more confident about giving." },
];

export const stories = [
  { id: "s1", title: "From dropout to engineer", text: "Ganesh rejoined school through our learning centre and is now studying engineering on a scholarship.", image: "education" },
  { id: "s2", title: "A village without anaemia", text: "Regular camps and nutrition kits cut anaemia among women in Malegaon by 60% in two years.", image: "health" },
  { id: "s3", title: "Sunita's boutique", text: "After Sakhi Udyog training, Sunita now employs four other women from her village.", image: "women" },
];

export const team = [
  { name: "Krishna Ranjale", role: "Founder & Chairperson" },
  { name: "Anita Deshmukh", role: "Program Director" },
  { name: "Dr. Meera Rao", role: "Head of Healthcare" },
  { name: "Sneha Kulkarni", role: "Finance Lead" },
];

export const activities = [
  { id: "a1", text: "New donation of ₹10,000 from Fatima Shaikh", time: "2 hours ago" },
  { id: "a2", text: "Volunteer Sahil Kapoor registered", time: "Yesterday" },
  { id: "a3", text: "Certificate KF-CERT-2026-0003 issued", time: "2 days ago" },
  { id: "a4", text: "Event 'Mega Health Camp' published", time: "4 days ago" },
];
