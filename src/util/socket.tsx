"use client";
import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_WEB_SOCKET_URL || 'http://localhost:5000'); 

export default socket;