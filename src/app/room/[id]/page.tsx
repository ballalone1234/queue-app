"use client";
import { API_ENDPOINTS } from "@/endpoint/api";
import { Seat } from "@/interface";
import axios from "axios";
import Link from "next/link"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { use } from 'react';
import socket from "@/util/socket";
import { getUserId } from "@/util/store";
// import socket from "@/util/socket";

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
    const searchParams = useSearchParams();
    const {id} = use(params);
    const roomName = searchParams.get("room_name") || "Default Room Name";
    const [seatSlots, setSeatSlots] = useState<Seat[]>([]);
    const user_id = getUserId();
    console.log("User ID:", user_id);
    const fetchSeats = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINTS.seats}/${id}`); // Adjust the endpoint as needed
            if (response.status !== 200) {
                throw new Error('Failed to fetch rooms');
            }
            const data = response.data as Seat[];
            console.log("Fetched seats:", data);
            for (let i = 0; i < data.length; i++) {
                console.log("Seat data:", data[i]);
                console.log("Seat user_id:", data[i].user_id);
                if (data[i].user_id === user_id) {
                    console.log("Seat belongs to current user:", data[i]);
                    data[i].is_available = true; // Mark the seat as available if it belongs to the current user
                }
            }
            setSeatSlots(data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    useEffect(() => {
        fetchSeats();
        socket.on('seatUpdated', (newSeats: any) => {
            console.log("Received seat update:", newSeats);
            setSeatSlots(newSeats);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-8">ROOM</h1>
                <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                    <div className="border-2 border-gray-300 rounded p-4 mb-6">
                        <h2 className="text-lg font-semibold text-gray-700 text-center">ROOM {roomName.toUpperCase()}</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {seatSlots.map((slot) => (
                            <div key={slot._id} className="space-y-2">
                                <div className="border-2 border-gray-300 rounded p-4 bg-white text-center">
                                    <h3 className="font-semibold text-gray-800">TIME</h3>
                                    <h3 className="font-semibold text-gray-800">{slot.seat_number}</h3>
                                </div>
                                {slot.is_available || slot.user_id == user_id ? (
                                    <Link href={`/submit/${slot._id}?seats=${slot.seat_number}`} className="block w-full">
                                        <button className="w-full bg-green-200 hover:bg-green-300 transition-colors p-2 rounded text-gray-700 font-medium">
                                            {slot?.user_id == user_id ? "This your room" : "Select"}
                                        </button>
                                    </Link>
                                ) : (
                                    <div className="w-full bg-gray-600 p-2 rounded text-white font-medium text-center cursor-not-allowed">
                                        Booked
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}