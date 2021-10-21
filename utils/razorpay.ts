import { UserProfile } from "@auth0/nextjs-auth0";
import Booking from "../types/Booking";
import RazorpayOrder from "../types/RazorpayOrder";
interface GetOptionsProps{
    order:RazorpayOrder
    booking:Booking
    user:UserProfile | undefined
    callbackURL:string
}
const verifyPayment = async(response:any,booking:Booking) => {
    console.log('Response from verify payment',response)
    let data = await fetch('/api/verify-payment',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({response,booking})
    }).then(res => res.json())
    console.log(data)
}
const getOptions = ({order,booking,user,callbackURL}:GetOptionsProps) => {
    return  {
        "key": process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        "amount": order.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Creative World Inc",
        "description": "Test Transaction - Airbnb Clone",
        "image": "https://example.com/your_logo",
        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response : any){
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
            verifyPayment(response,booking)
        },
        "prefill": {
            "name": user?.name,
            "email": user?.email,
            "contact":"9999999999"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        },
        "callback_url":callbackURL,
        "redirect":true,
    }
}
export default {getOptions}