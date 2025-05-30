type User = { _id: string; username: string; token: string; room?: string };
type Seat = { _id: string; seat_number: string; is_available: boolean; user_id?: string; room_id?: string; };
type Room = { _id: string; name: string; max_member: number ; is_available: boolean; member_count: number; };
export type { User , Seat , Room};