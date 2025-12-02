import { useState } from "react";
import PinInput from 'react-pin-input';
import useAuth from "@/hooks/useAuth";
import CustomButton from "../shared/customButton";
import Cookies from "js-cookie";


export default function LoginPage() {

    const [pin, setPin] = useState("") 
    const { verifyEmail, verifyPending, seconds, resendOtp, resendPending } = useAuth()

    const email = Cookies.get("email") 

    const submit = (event: any) => {
        event.preventDefault();
        verifyEmail({
            token: pin
        })
    } 

    return (
        <form onSubmit={submit} className=" w-full h-screen flex flex-col items-center justify-center " >
            <div className=" max-w-[438px] flex flex-col items-center text-center " >
            <img className=" w-[133px] " src="/favicon.png" alt="logo" />
                <h3 className=" text-headerTextColor font-semibold text-2xl mt-6 " >Check your email for a code</h3>
                <p className=" text-bodyTextColor mt-2 leading-[22.4px]  " >We sent an OTP code sent to <span className=" text-headerTextColor " >{email}</span></p>
                <div className=" flex flex-col w-full gap-2 items-center mt-4 " >
                    <PinInput
                        length={6}
                        initialValue=""
                        secret
                        secretDelay={100}
                        onChange={(value) =>  setPin(value)}
                        type="numeric"
                        inputMode="number"
                        style={{ padding: '0px' }}
                        inputStyle={{ borderColor: '#D0D5DD', borderRadius: "8px" }}
                        inputFocusStyle={{ borderColor: 'blue' }}
                        onComplete={(value) => verifyEmail({
                            token: value
                        })}
                        autoSelect={true}
                        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                    />
                    <CustomButton variant={"main"} type="submit" isLoading={verifyPending} className="w-full rounded-full mt-4 h-[44px] " >
                        Continue
                    </CustomButton>
                    <p className=" text-sm text-center mt-3 " >{`Didn't get any code?`} {seconds > 0 ? <span className=" text-primaryColor outline-none bg-transparent font-medium ">00 : {seconds >= 10 ? seconds : "0"+seconds }</span> : <button type="button" onClick={()=> resendOtp({email: email+""})} disabled={resendPending} className=" text-primaryColor outline-none bg-transparent font-medium underline " >{resendPending ?  "Loading.." : "Resend Code"}</button>}</p>
                </div>
            </div>
        </form>
    )
}
