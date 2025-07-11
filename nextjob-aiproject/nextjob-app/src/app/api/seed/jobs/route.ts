import { connectDB } from '../../../../lib/db'
import { Job } from '../../../../models/job'
import { NextResponse } from 'next/server'

export async function POST() {
  await connectDB()

  const mockJobs = [
  {
    "title": "AI Ethics Specialist",
    "company": "DeepMind",
    "location": "London, UK",
    "type": "Full-time"
  },
  {
    "title": "Blockchain Developer",
    "company": "Polygon Labs",
    "location": "Bangalore, India",
    "type": "Remote"
  },
  {
    "title": "Technical Support Engineer",
    "company": "Zendesk",
    "location": "Pune, India",
    "type": "Full-time"
  },
  {
    "title": "Machine Learning Engineer",
    "company": "Hugging Face",
    "location": "Paris, France",
    "type": "Remote"
  },
  {
    "title": "Software QA Engineer",
    "company": "Zoho",
    "location": "Chennai, India",
    "type": "Full-time"
  },
  {
    "title": "Game Designer",
    "company": "Electronic Arts",
    "location": "Vancouver, Canada",
    "type": "Full-time"
  },
  {
    "title": "Data Visualization Specialist",
    "company": "Tableau",
    "location": "Austin, TX",
    "type": "Part-time"
  },
  {
    "title": "Junior React Developer",
    "company": "InnoTech",
    "location": "Indore, India",
    "type": "Internship"
  },
  {
    "title": "Senior DevOps Engineer",
    "company": "HashiCorp",
    "location": "Remote",
    "type": "Full-time"
  },
  {
    "title": "Cybersecurity Analyst",
    "company": "FireEye",
    "location": "Delhi, India",
    "type": "Full-time"
  },
  {
    "title": "Product Owner",
    "company": "Salesforce",
    "location": "Hyderabad, India",
    "type": "Full-time"
  },
  {
    "title": "UX Researcher",
    "company": "Adobe",
    "location": "Noida, India",
    "type": "Full-time"
  },
  {
    "title": "iOS Developer",
    "company": "Swiggy",
    "location": "Bangalore, India",
    "type": "Remote"
  },
  {
    "title": "Cloud Engineer",
    "company": "Oracle",
    "location": "Mumbai, India",
    "type": "Full-time"
  },
  {
    "title": "Full Stack Engineer",
    "company": "GitHub",
    "location": "Remote",
    "type": "Remote"
  },
  {
    "title": "Automation Test Engineer",
    "company": "Cognizant",
    "location": "Kochi, India",
    "type": "Full-time"
  },
  {
    "title": "Scrum Master",
    "company": "Infosys",
    "location": "Mysore, India",
    "type": "Part-time"
  },
  {
    "title": "Business Intelligence Analyst",
    "company": "Capgemini",
    "location": "Ahmedabad, India",
    "type": "Full-time"
  },
  {
    "title": "Web Designer",
    "company": "Wix",
    "location": "Tel Aviv, Israel",
    "type": "Remote"
  },
  {
    "title": "Python Developer",
    "company": "Spotify",
    "location": "Berlin, Germany",
    "type": "Full-time"
  },
  {
    "title": "System Administrator",
    "company": "Siemens",
    "location": "Gurgaon, India",
    "type": "Full-time"
  },
  {
    "title": "Junior UI Developer",
    "company": "Turing",
    "location": "Remote",
    "type": "Internship"
  },
  {
    "title": "Technical Recruiter",
    "company": "HackerRank",
    "location": "Bangalore, India",
    "type": "Full-time"
  },
  {
    "title": "Android Developer",
    "company": "Paytm",
    "location": "Noida, India",
    "type": "Full-time"
  },
  {
    "title": "Cloud Solutions Architect",
    "company": "IBM",
    "location": "Pune, India",
    "type": "Full-time"
  },
  {
    "title": "DevRel Engineer",
    "company": "Supabase",
    "location": "Remote",
    "type": "Remote"
  },
  {
    "title": "Frontend Engineer",
    "company": "Netflix",
    "location": "Los Gatos, CA",
    "type": "Full-time"
  },
  {
    "title": "Backend API Developer",
    "company": "Plaid",
    "location": "Bangalore, India",
    "type": "Full-time"
  },
  {
    "title": "RPA Developer",
    "company": "UiPath",
    "location": "Gurgaon, India",
    "type": "Full-time"
  },
  {
    "title": "Open Source Contributor",
    "company": "Mozilla",
    "location": "Remote",
    "type": "Part-time"
  }
]



  try {
    await Job.insertMany(mockJobs)
    return NextResponse.json({ message: 'Mock jobs inserted successfully!' })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
