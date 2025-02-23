'use client'
import { useRouter } from "next/navigation"
import { LinkButton } from "./buttons/LinkButton"
import { PrimaryButton } from "./buttons/PrimaryButton";

export const Appbar = () => {
    const router = useRouter();
    return <div className="flex border-b justify-between p-4">
        <div className="flex flex-col justify-center">
            Zapier
        </div>
        <div className="flex">
            <LinkButton onClick={()=>{}}>Contact Sales</LinkButton>
            <LinkButton onClick={()=>{
                router.push('/login')
            }}>Login</LinkButton>
            <PrimaryButton onClick={() => {
                router.push('/signup')
            }}>Signup</PrimaryButton>
        </div>
    </div>
}