"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLoginContext } from "@/context";
import axios from "axios";
import { Toaster, toast } from "sonner";
import defaultProfile from '../images/user.png'
// import type { Session } from "inspector/promises";

export default function MySession() {
  const [show, setShow] = useState(false)
  const {data:session, status} = useSession();
  const [userAgent, setUserAgent] = useState({
    email:session?.user?.email,
    password:"",
    fullName:session?.user?.name
  })
  const router = useRouter();
  const { isLoggedIn, setLogin } = useLoginContext();
  if(session) {
    setLogin(true)
  }
  const handleLogout = () => {
    signOut();
    setLogin(false);
  };
  const createAccount = () => {
  setShow(true);
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserAgent({...userAgent, [name]:value});
  }
  const create = async(e:React.FormEvent) => {
    e.preventDefault()
    if(userAgent.password != ""){
      if (userAgent.fullName!= "" && userAgent.password != "" && userAgent.email != "") {
        console.log(userAgent)
        console.log(session)
        // const res = await axios.post(`http://localhost:8005/auth/signup`,{email:session?.user?.email, password:userAgent.password, fullName:session?.user?.name})
        const res2 = await axios.post(`http://localhost:8005/auth/login`,{email:session?.user?.email, password:userAgent.password} )
        if (res2) {
          localStorage.setItem('authToken', res2.data.token)
          setShow(false)
          setLogin(true)
            toast.success('Logged In successfully')
          } else{
            toast.error('User already exists')
        }
      }
  }
}

  return (
    <div className="flex items-start flex-col gap-2  space-x-4">
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={session ? session?.user?.image : defaultProfile}
          className="rounded-full"
          width={40} // Increased size for better visibility
          height={40}
          alt="User Profile Picture"
        />
        <h1 className="text-blue-950 font-medium text-xl">
          {session?.user?.name || "Guest"}
        </h1>
      </div>
      {isLoggedIn ? (
     <div>
      <h1 className="text-gray-700 text-sm">you can't make any transaction unless you create an accout?</h1>
      <div className={`${show && 'flex-col'} flex flex-row gap-2 my-4`}>
  {!show && !isLoggedIn && (
        <button
        className="bg-blue-600 text-white rounded-md px-3 py-2 "
        onClick={createAccount}
      >
        Create account
      </button>
  )}
  {show &&(
    <form className="flex flex-col gap-2">
         <label htmlFor="password" className="text-gray-700">Enter Password pls? </label>
         <input title="." type="password" className="text-gray-600 bg-gray-200 rounded-md border-none focus:border-blue-400 focus:border-2 py-2" name="password" onChange={handleChange} />
         <button onClick={create} className="bg-blue-600 text-white px-2 py-2 rounded-lg">Create</button>
    </form>
  )}
        <button
          className="bg-blue-600 text-white rounded-md px-3 py-2 "
          onClick={handleLogout}
        >
        Signout
        </button>
      </div>
     </div>
      ) : (
        // TODO: Implement the code to push the user to the login page
        <button
          className="bg-blue-600 text-white rounded-md px-3 py-2 "
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      )}
      <Toaster/>
    </div>
  );
}
