"use client";
import axios from "axios";
import { Toaste, Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import defaultProfile from "../images/user.png";
import Image from "next/image";
import { useLoginContext } from "@/context";
const ProfileImage = ({ id }: { id: number }) => {
  const [imageUrl, setImageUrl] = useState("");
  const {isLoggedIn} = useLoginContext();

  useEffect(() => {
    const getProfileImage = async () => {
      try {
        const res = await axios.get(`http://localhost:8005/image/${id}`, {
          responseType: "blob", // Ensure image data is returned as a blob
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (res.status === 200) {
            console.log(res.data)
          const url = URL.createObjectURL(res.data);
          setImageUrl(url);
        }
      } catch (error) {
        toast.error("failed to get the profile image")
        console.error("Failed to get profile image", error);
      }
    };
    getProfileImage();
  }, [id]);

  return (
    <div>
    {!isLoggedIn ?( 
     <div>
           <Image alt="default profile" className="w-10 h-10 "  src={defaultProfile} width={10} height={10}/>
    
     </div>
    ) : (
        <Image width={10} height={10} className="h-10 w-10 rounded-lg " src={imageUrl ? imageUrl : defaultProfile} alt="Profile" />
    )
}
    <Toaster/>
    </div>
  );
};

export default ProfileImage;
