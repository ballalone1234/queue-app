"use client";
import Link from "next/link"
import { useEffect, useState } from 'react';
import axios from "axios";
import  {Room} from "@/interface"
import { API_ENDPOINTS } from "../endpoint/api";
import socket from "@/util/socket";
export default function IndexPage() {


   const [rooms, setRooms] = useState<Room[]>([]);
  const fetchRooms = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.rooms); // Adjust the endpoint as needed
        if (response.status !== 200) {
          throw new Error('Failed to fetch rooms');
        }
        const data = response.data as Room[];
        console.log("Fetched rooms:", data);
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
  useEffect(() => {
    fetchRooms();
      socket.on('roomUpdated', (newSeats :any) => {
            console.log("Received room update:", newSeats);
            setRooms(newSeats);
        });
        return () => {
            socket.off('roomUpdated');
        };
  }
  , []);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Index</h1>

        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          <div className="border-2 border-gray-300 rounded p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-700 text-center">Please Select Room</h2>
          </div>

          { rooms.length > 0 && (
            <div className="space-y-4 mb-6">
              {rooms.map((room) => (
                <Link key={room._id} href={`/room/${room._id}?room_name=${room.name}`} className="block" >
                  <div className="border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-white p-4 text-center">
                      <h3 className="font-semibold text-gray-800">ROOM</h3>
                      <h3 className="font-semibold text-gray-800">{room.name}</h3>
                    </div>
                    <div className={`p-2 text-center ${room.member_count >= room.max_member ? 'bg-red-500' : 'bg-green-200'}`}>
                      <span className="text-sm text-white">{room.member_count >= room.max_member ? `Lock (${room.member_count}/${room.max_member})` : `Available (${room.member_count}/${room.max_member})`}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {/* <div className="grid grid-cols-2 gap-4">
            <Link href="/room/a" className="block">
              <div className="border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-white p-4 text-center">
                  <h3 className="font-semibold text-gray-800">ROOM</h3>
                  <h3 className="font-semibold text-gray-800">A</h3>
                </div>
                <div className="bg-green-200 p-2 text-center">
                  <span className="text-sm text-gray-700">Available (0/5)</span>
                </div>
              </div>
            </Link>

            <div className="border-2 border-gray-300 rounded-lg overflow-hidden opacity-75 cursor-not-allowed">
              <div className="bg-white p-4 text-center">
                <h3 className="font-semibold text-gray-800">ROOM</h3>
                <h3 className="font-semibold text-gray-800">B</h3>
              </div>
              <div className="bg-red-500 p-2 text-center">
                <span className="text-sm text-white">Lock (5/5)</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
