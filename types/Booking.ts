import Hotel from "./Hotels"

export default interface Booking {
  startDate: string;
  endDate: string;
  noOfDays: number;
  noOfGuests: number;
  user_id: string;
  hotel_id: string;
  total: number;
}

export type TripsResponse = Booking&{_id:string,razorpay_payment_id:string,razorpay_order_id:string,razorpay_signature:string,created_at:string}

export type CustomBooking = TripsResponse&{hotel:Hotel}