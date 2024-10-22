"use client"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLoginContext } from "@/context";


export default  function Session() {
  const router = useRouter()
  const {isLoggedIn,setLogin} = useLoginContext();
  const [image, setImage] = useState()
  const [session, setSession]  = useState()
useEffect(() =>  {
  try {
    const session =  getServerSession(authOptions);
      setImage(session?.user?.image || // Use session's user image if available
      "https://lh3.googleusercontent.com/a/ACg8ocJ85iOD2U5DrMttFd_WHfYnRIDpU7xZhT-aN4haPXBLA1GyUxY=s96-c")
      setSession(session)
   } catch (error) {
    console.log(error)
   }
},[])

const handleLogout = () => {
signOut();
setLogin(false)

}
  

  return (
    <div className="flex items-start flex-col gap-2  space-x-4">
    <div className="flex items-center gap-4 mb-4">
    <Image
        src={image}
        className="rounded-full"
        width={40} // Increased size for better visibility
        height={40}
        alt="User Profile Picture"
      />
      <h1 className="text-blue-950 font-medium text-xl">
        {session?.user?.name || "Guest"}
      </h1>
    </div>
    {
      isLoggedIn ? (
        <button
        className="bg-blue-600 text-white rounded-md px-3 py-2 "
         onClick={handleLogout}>
          Signout
        </button>
      ): (
        <button
        className="bg-blue-600 text-white rounded-md px-3 py-2 "
         onClick={() => router.push('/login')}>
          Login
        </button>
      )
    }
    </div>
  );
}
