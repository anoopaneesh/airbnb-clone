import { Dialog, Transition } from "@headlessui/react"
import { XIcon } from "@heroicons/react/solid"
import facebook from "../images/facebook.svg";
import google from "../images/google.svg";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { FormEvent, useState } from "react";
interface DialogBoxProps{
    isOpen:boolean,
    setIsOpen:any
}
const DialogBox = ({isOpen,setIsOpen}:DialogBoxProps) => {
    const {signInWithEmail,signInWithGoogle,signInWithFacebook} = useAuth()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const handleSignInWithEmail = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        signInWithEmail(email,password)
        reset()
    }
    const handleGoogle = () => {
        signInWithGoogle()
        reset()
    }
    const handleFacebook = () => {
        signInWithFacebook()
        reset()
    }
    const reset = () => {
        setEmail("")
        setPassword("")
        setIsOpen(false)
    }
    return (
<Transition
show={isOpen}
enter="transition duration-100 ease-out"
enterFrom="transform scale-95 opacity-0"
enterTo="transform scale-100 opacity-100"
leave="transition duration-75 ease-out"
leaveFrom="transform scale-100 opacity-100"
leaveTo="transform scale-95 opacity-0"
>
<Dialog
open={isOpen}
onClose={() => setIsOpen(false)}
className="fixed z-10 inset-0 scrollbar-hide max-w-md md:max-w-lg mx-auto"
>

<div className="flex items-center justify-center min-h-screen">
  <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

  <div className="relative bg-white rounded-xl w-full px-8 py-8">
    <div onClick={()=>setIsOpen(false)} className="flex justify-between items-center pb-8 cursor-pointer">
      <XIcon  className="h-5"/>
      <h1 className="font-bold">Log in or sign up</h1>
      <div></div>
    </div>
    <hr />
    <form onSubmit={handleSignInWithEmail} className="flex flex-col space-y-4 mt-4">
      <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Enter your email" className="rounded-md border border-gray-500 p-2" required/>
      <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter your password" className="rounded-md border border-gray-500 p-2" required/>
      <button type="submit" className="rounded-md bg-red-400 text-white p-2">Continue</button>
    </form>
    <div className="flex space-x-2 justify-between items-center my-4">
      <div className="flex-grow border-t border-gray-200 h-1"></div>
      <p className="text-gray-500">or</p>
      <div className="flex-grow border-t border-gray-200 h-1"></div>
    </div>
    <div className="flex flex-col space-y-4">
      <div onClick={handleFacebook} className="rounded-md border border-gray-400 p-2 hover:border-black flex items-center justify-between cursor-pointer">
          <div className="relative h-6 w-6">
            <Image src={facebook} layout="fill" />
          </div>
          <h2 className="text-gray-600">Continue with facebook</h2>
          <div></div>
      </div>
      <div onClick={handleGoogle} className="rounded-md border border-gray-400 p-2 hover:border-black flex items-center justify-between cursor-pointer">
          <div className="relative h-6 w-6">
            <Image src={google} layout="fill" />
          </div>
          <h2 className="text-gray-600">Continue with google</h2>
          <div></div>
      </div>
    </div>
  </div>

</div>
</Dialog>
</Transition>
    )
}

export default DialogBox
