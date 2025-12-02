import { Iinvestment } from "@/models/investment";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import httpService from "@/services/httpService";
import toast from "react-hot-toast";
import { useState } from "react";




const useInvestment = () => {


    const userId = Cookies.get("userid")

    const [payload, setPayload] = useState<Iinvestment>({
        "duration": "",
        "roi": "",
        "paymentFrequency": "",
        "minimiumInvestmentAmount": "",
        "propertyId": "",
        "status": "PENDING",
        "createdBy": userId
    })

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: (data: Iinvestment) => httpService.post(`/investment-plan/create`, data),
        onError: (error: any) => {
            toast.error(error?.response?.data?.message)
        },
        onSuccess: (data: any) => {
            toast.success(data?.data?.message)
        },
    });

    return { 
        isPending, 
        mutate,
        setPayload,
        payload,
        isSuccess
    }
}

export default useInvestment