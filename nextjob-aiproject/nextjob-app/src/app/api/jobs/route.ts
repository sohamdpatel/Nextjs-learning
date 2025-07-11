// /app/api/jobs/route.ts
import { connectDB } from '../../../lib/db'
import { Job } from '../../../models/job'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const searchTerm = searchParams.get('search') || '' // New: Get the search term from the URL
    const skip = (page - 1) * limit

    let query: any = {}; // Initialize an empty MongoDB query object

    // If a search term is provided, build the search query
    if (searchTerm) {
      query = {
        $or: [ // Use $or to search in multiple fields
          { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive regex search for 'title'
          { company: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive regex search for 'company'
        ],
      };
    }

    const jobs = await Job.find(query) // Apply the constructed query to find jobs
      .sort({ _id: -1 }) // Sort by creation date, newest first
      .skip(skip) // Skip documents for pagination
      .limit(limit) // Limit the number of documents returned
      .lean() // Return plain JavaScript objects instead of Mongoose documents

    const total = await Job.countDocuments(query) // Count total documents matching the query (for 'hasMore' logic)
    const hasMore = jobs.length === limit
 // Determine if there are more jobs to load

    return NextResponse.json({ jobs, hasMore })
  } catch (error) {
    console.error('Error loading jobs:', error); // Log the server-side error for debugging
    return NextResponse.json({ message: 'Error loading jobs', error }, { status: 500 })
  }
}   