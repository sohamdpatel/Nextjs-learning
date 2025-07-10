import { connectDB } from '../../../../lib/db'
import {Job} from '../../../../models/job'
import { NextRequest, NextResponse } from 'next/server'
import { Types } from 'mongoose'

// PUT /api/jobs/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const jobId = params.id
    const data = await req.json()

    if (!Types.ObjectId.isValid(jobId)) {
      return NextResponse.json({ message: 'Invalid Job ID' }, { status: 400 })
    }

    const updated = await Job.findByIdAndUpdate(jobId, data, { new: true })

    if (!updated) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 })
    }

    return NextResponse.json(updated, { status: 200 })
  } catch (error) {
    console.error('PUT Error:', error)
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 })
  }
}

// DELETE /api/jobs/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const jobId = params.id
    console.log('DELETE jobId:', jobId);
    

    if (!Types.ObjectId.isValid(jobId)) {
      return NextResponse.json({ message: 'Invalid Job ID' }, { status: 400 })
    }

    await Job.findByIdAndDelete(jobId)

    return NextResponse.json({ message: 'Job deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('DELETE Error:', error)
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 })
  }
}
