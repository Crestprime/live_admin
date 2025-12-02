import { Input } from "../ui/input"; 
import useAuth from "@/hooks/useAuth";
import CustomButton from "../shared/customButton";
import { useState } from "react";
import Cookies from "js-cookie";


export default function LoginPage() { 

    const [email, setEmail] = useState("")

    const { signIn, signInPending  } = useAuth()

    const submit = (event: any) => {
        event.preventDefault(); 
        Cookies.set("email", email) 
        signIn({
            email: email
        })
    }

    return (
        <form onSubmit={submit} className=" w-full h-screen flex flex-col items-center justify-center " >
            <div className=" max-w-[370px] flex flex-col items-center text-center " >
                <img className=" w-[133px] " src="/favicon.png" alt="logo" />
                <h3 className=" text-headerTextColor font-semibold text-2xl mt-6 " >Welcome Back to Capital City</h3>
                <p className=" text-bodyTextColor text-xs mt-2 " >Login to continue to manage your projects, investments, and more.</p>
                <div className=" flex flex-col w-full gap-2 items-start mt-4 " >
                    <p className=" text-sm font-medium text-bodyTextColor " >Email</p>
                    <Input onChange={(e)=> setEmail(e.target.value)} className=" h-[42px] border border-gray200 outline-none " height={"42px"} width={"100%"} placeholder="example@domain.com" /> 
                    <CustomButton variant={"main"} disabled={!email} type="submit" isLoading={signInPending} className="w-full disabled:cursor-not-allowed rounded-full mt-4 h-[44px] " >
                        Continue 
                    </CustomButton>
                </div>
            </div>
        </form>
    )
}
