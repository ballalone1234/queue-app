"use client";
import { API_ENDPOINTS } from "@/endpoint/api";
import { Seat } from "@/interface";
import axios from "axios";
import Link from "next/link"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getUserId } from "@/util/store";
import { use } from 'react';


export default function SubmitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const seats = searchParams.get("seats") || "Default Seat";
  const [queue, setQueue] = useState([]);

  const BookedSeatId = async () => {
    const payload = {
      id: id,
      user_id : await getUserId()// Replace with actual user ID if available
    }
    const res = await axios.post(`${API_ENDPOINTS.booking}`, payload);
    if (res.status !== 200) {
      throw new Error('Failed to book seat');
    }
  }
const UnbookedSeatId = async () => {
  const payload = {
    id: id,
    user_id : await getUserId() // Replace with actual user ID if available
  }
  const res = await axios.post(`${API_ENDPOINTS.seats}/unbooking`, payload);
  if (res.status !== 200) {
    throw new Error('Failed to unbook seat');
  }
}

  useEffect(() => {
    BookedSeatId();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Submit</h1>

        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          <div className="border-2 border-gray-300 rounded p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-700 text-center">Done</h2>
          </div>

          <div className="flex justify-center">
            <div className="space-y-2">
              <div className="border-2 border-gray-300 rounded p-8 bg-white text-center min-w-[120px]">
                <h3 className="font-semibold text-gray-800">TIME</h3>
                <h3 className="font-semibold text-gray-800">{seats}</h3>
              </div>

              <div className="w-full bg-green-200 p-2 rounded text-gray-700 font-medium text-center">Selected</div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
            onClick={UnbookedSeatId}
              href="/"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors"
            >
              Book Another Room
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
