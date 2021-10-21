import RazorpayOrder from "../types/RazorpayOrder";

const verifyPayment = async(response:any) => {
    console.log('Response from verify payment',response)
    let data = await fetch('/api/verify-payment',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(response)
    }).then(res => res.json())
    console.log(data)
}
const getOptions = ({amount,id}:RazorpayOrder) => {
    return  {
        "key": process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        "amount": amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Creative World Inc",
        "description": "Test Transaction - Airbnb Clone",
        "image": "https://example.com/your_logo",
        "order_id": id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response : any){
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
            verifyPayment(response)
        },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    }
}
export default {getOptions}