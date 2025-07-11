'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

type Job = {
  _id: string
  title: string
  company: string
  type: string
}

export default function MyJobsPageClient() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('') // New: State for the search query
  const [initialLoadComplete, setInitialLoadComplete] = useState(false); // New: Tracks if the very first load is done
  const observerRef = useRef<HTMLDivElement | null>(null)

 const loadJobs = useCallback(async (reset = false) => {
  // Prevent loading if no more data and not resetting
  if ((!hasMore && !reset) || loading) return;

  setLoading(true);
  try {
    const currentPage = reset ? 1 : page;
    console.log('Loading jobs with search term:', searchTerm, 'Page:', currentPage, 'Reset:', reset);
    
    const query = new URLSearchParams();
    query.append('page', currentPage.toString());
    query.append('limit', '10');
    if (searchTerm) {
      query.append('search', searchTerm);
    }

    const res = await fetch(`/api/jobs?${query.toString()}`);
    const data = await res.json();
    console.log();
    

    if (reset) {
      setJobs(data.jobs);
      setPage(2); // After reset, next page should be 2
    } else {
      const newJobs = data.jobs.filter((newJob: Job) =>
        !jobs.some(existingJob => existingJob._id === newJob._id)
      );
      setJobs((prev) => [...prev, ...newJobs]);
      setPage((prev) => prev + 1); // Only increment if not resetting
    }

    setHasMore(data.hasMore);
  } catch (err) {
    console.error('Failed to load jobs:', err);
  } finally {
    setLoading(false);
    setInitialLoadComplete(true);
  }
  console.log('Jobs loaded:', jobs, 'Search term:', searchTerm, 'Page:', page, 'Has more:', hasMore, 'Loading:', loading);
  
}, [page, hasMore, loading, searchTerm, jobs]);

  // Effect to handle initial load and changes to search term
  useEffect(() => {
      // When searchTerm changes, or on initial component mount, reset and fetch the first page
      setJobs([]); // Clear previous jobs
      setPage(1); // Reset page to 1
      setHasMore(true); // Assume there's more data for the new query
      setInitialLoadComplete(false); // Reset initial load flag
      loadJobs(true); // Trigger a new load, resetting pagination
      console.log('Loading jobs with search term:', jobs, searchTerm);
  }, [searchTerm]); // This effect runs when searchTerm changes, or once on mount

  // Effect for Intersection Observer (infinite scrolling)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Trigger loadJobs if the observer target is intersecting, there's more data,
        // not currently loading, and the initial load sequence is complete.
        if (entries[0].isIntersecting && hasMore && !loading && initialLoadComplete) {
          loadJobs();
        }
      },
      { threshold: 1 } // Trigger when the entire element is visible
    );

    const current = observerRef.current;
    if (current) observer.observe(current);
    console.log("In observe effect", jobs, hasMore, loading, initialLoadComplete);

    return () => {
      if (current) observer.unobserve(current);
    };
    
  }, [loadJobs, hasMore, loading, initialLoadComplete]); // Dependencies for observer effect

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this job?')
    if (!confirmed) return

    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setJobs((prev) => prev.filter((job) => job._id !== id))
      } else {
        console.error('Failed to delete job')
      }
    } catch (error) {
      console.error('Error deleting job:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Jobs</h1>

      {/* Search Input Field */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or company..."
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Conditional Messages for Loading and No Jobs */}
      {loading && jobs.length === 0 && <p className="text-gray-500">Loading jobs...</p>}
      {!loading && jobs.length === 0 && !hasMore && searchTerm === '' && (
        <p className="text-gray-500">No jobs found.</p>
      )}
      {!loading && jobs.length === 0 && !hasMore && searchTerm !== '' && (
        <p className="text-gray-500">No jobs found matching "{searchTerm}".</p>
      )}

      <ul>
        {jobs.map((job) => (
          <li key={job._id} className="border p-4 rounded mb-4">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-gray-600 text-sm">{job.company}</p>
            <div className="flex gap-4 mt-2">
              <Link
                href={`/dashboard/job/${job._id}`}
                className="text-blue-600 text-sm"
              >
                View
              </Link>
              <Link
                href={`/dashboard/job/${job._id}/edit`}
                className="text-green-600 text-sm"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(job._id)}
                className="text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Observer Element for Infinite Scroll */}
      <div ref={observerRef} className="h-10 mt-10 text-center">
        {loading && jobs.length > 0 && <p className="text-gray-500">Loading more jobs...</p>}
        {!hasMore && !loading && jobs.length > 0 && <p className="text-gray-400">No more jobs.</p>}
      </div>
    </div>
  )
}