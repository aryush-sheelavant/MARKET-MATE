export interface Job {
  id: string
  title: string
  company: string
  companyLogo: string
  location: string
  type: "remote" | "onsite" | "hybrid"
  salary: number
  salaryType: "month" | "project"
  description: string
  skills: string[]
  postedAt: Date
  category: string
}

export interface Student {
  id: string
  name: string
  avatar: string
  college: string
  skills: string[]
  rating: number
  reviewCount: number
  completedJobs: number
  bio: string
  verified: boolean
}

export interface Application {
  id: string
  jobId: string
  jobTitle: string
  company: string
  status: "pending" | "accepted" | "rejected"
  appliedAt: Date
}

export interface Review {
  id: string
  studentId: string
  studentName: string
  merchantName: string
  rating: number
  comment: string
  createdAt: Date
}

export const jobs: Job[] = [
  {
    id: "1",
    title: "Social Media Manager",
    company: "TechStart Cafe",
    companyLogo: "/cafe-logo.png",
    location: "Bangalore",
    type: "hybrid",
    salary: 15000,
    salaryType: "month",
    description:
      "Manage our social media presence across Instagram, Facebook, and Twitter. Create engaging content and grow our online community.",
    skills: ["Instagram", "Content Creation", "Canva", "Analytics"],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    category: "Social Media",
  },
  {
    id: "2",
    title: "Content Creator",
    company: "Bangalore Bakes",
    companyLogo: "/bakery-logo.png",
    location: "Bangalore",
    type: "remote",
    salary: 8000,
    salaryType: "project",
    description:
      "Create mouth-watering food photography and short videos for our bakery. Must have good photography skills.",
    skills: ["Photography", "Video Editing", "Food Styling", "Reels"],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    category: "Content Creation",
  },
  {
    id: "3",
    title: "Digital Marketing Intern",
    company: "Fashion Forward",
    companyLogo: "/abstract-fashion-logo.png",
    location: "Mysore",
    type: "onsite",
    salary: 12000,
    salaryType: "month",
    description:
      "Help us run digital ad campaigns on Google and Meta platforms. Learn and grow with a fast-paced fashion startup.",
    skills: ["Google Ads", "Meta Ads", "SEO", "Analytics"],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    category: "Digital Advertising",
  },
  {
    id: "4",
    title: "Brand Ambassador",
    company: "FitLife Gym",
    companyLogo: "/abstract-gym-logo.png",
    location: "Bangalore",
    type: "onsite",
    salary: 5000,
    salaryType: "project",
    description:
      "Promote our gym on campus and help us reach more fitness enthusiasts. Commission-based incentives available.",
    skills: ["Public Speaking", "Networking", "Sales", "Fitness"],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    category: "Field Marketing",
  },
  {
    id: "5",
    title: "Video Editor",
    company: "EduTech Solutions",
    companyLogo: "/education-tech-logo.png",
    location: "Remote",
    type: "remote",
    salary: 20000,
    salaryType: "month",
    description:
      "Edit educational videos for our online learning platform. Experience with Premiere Pro or DaVinci Resolve required.",
    skills: ["Premiere Pro", "After Effects", "Motion Graphics", "YouTube"],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    category: "Video Production",
  },
  {
    id: "6",
    title: "Event Promoter",
    company: "Namma Events",
    companyLogo: "/events-company-logo.jpg",
    location: "Bangalore",
    type: "onsite",
    salary: 3000,
    salaryType: "project",
    description:
      "Help promote upcoming events on college campuses. Great networking opportunity with event organizers.",
    skills: ["Event Marketing", "Campus Outreach", "Social Media", "Communication"],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
    category: "Field Marketing",
  },
]

export const students: Student[] = [
  {
    id: "1",
    name: "Priya Sharma",
    avatar: "/indian-female-student-portrait.png",
    college: "Christ University, Bangalore",
    skills: ["Social Media", "Content Writing", "Canva", "Photography"],
    rating: 4.9,
    reviewCount: 23,
    completedJobs: 15,
    bio: "Marketing student with a passion for social media. I've helped 10+ local businesses grow their online presence.",
    verified: true,
  },
  {
    id: "2",
    name: "Rahul Gowda",
    avatar: "/indian-male-student-portrait.png",
    college: "PES University, Bangalore",
    skills: ["Video Editing", "YouTube", "Premiere Pro", "After Effects"],
    rating: 4.7,
    reviewCount: 18,
    completedJobs: 12,
    bio: "Film production enthusiast creating engaging video content. Specialized in short-form content for social media.",
    verified: true,
  },
  {
    id: "3",
    name: "Ananya Reddy",
    avatar: "/indian-female-student-smiling.png",
    college: "Mount Carmel College, Bangalore",
    skills: ["Google Ads", "Meta Ads", "SEO", "Analytics"],
    rating: 4.8,
    reviewCount: 15,
    completedJobs: 10,
    bio: "Digital marketing certified professional. I help businesses get more customers through targeted online advertising.",
    verified: true,
  },
  {
    id: "4",
    name: "Karthik Kumar",
    avatar: "/indian-male-college-student.jpg",
    college: "RV College of Engineering",
    skills: ["Graphic Design", "UI/UX", "Figma", "Illustrator"],
    rating: 4.6,
    reviewCount: 12,
    completedJobs: 8,
    bio: "Design enthusiast turning ideas into visual stories. Love working on brand identities and marketing materials.",
    verified: false,
  },
]

export const reviews: Review[] = [
  {
    id: "1",
    studentId: "1",
    studentName: "Priya Sharma",
    merchantName: "TechStart Cafe",
    rating: 5,
    comment: "Priya did an excellent job managing our social media. Our followers increased by 40% in just 2 months!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Rahul Gowda",
    merchantName: "Bangalore Bakes",
    rating: 5,
    comment: "Amazing video work! The reels Rahul created went viral and brought us many new customers.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
  },
  {
    id: "3",
    studentId: "1",
    studentName: "Priya Sharma",
    merchantName: "Fashion Forward",
    rating: 4,
    comment: "Great content creation skills. Very professional and met all deadlines.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
  },
]
