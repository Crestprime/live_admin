import { Iinvestment } from "@/models/investment";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "@/services/httpService";
import toast from "react-hot-toast";
import { useState } from "react";




const useInvestment = () => {


    const userId = Cookies.get("userid")
    const queryClient = useQueryClient()

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
        mutationFn: (data: Iinvestment) => httpService.put(`/investment-plan/create`, data),
        onError: (error: any) => {
            toast.error(error?.response?.data?.message)
        },
        onSuccess: (data: any) => {
            toast.success(data?.data?.message)
        },
    });


    const { mutate: updateInvestment, isPending: isLoading } = useMutation({
        mutationFn: (data: {
            payload: {
                status: "PENDING" | "RUNNING" | "SUSPENDED";
            };
            id: string;
        }) =>
            httpService.put(
                `/investment-plan/update/${data?.id}`,
                data.payload,
            ),
        onError: (error: any) => {
            toast.error(error?.response?.data?.message);
        },
        onSuccess: (data: any) => {
            toast.success(data?.data?.message);
            queryClient.invalidateQueries({
                queryKey: ["investment-detail-plans"],
            });
        },
    });

    return { 
        isPending, 
        mutate,
        setPayload,
        payload,
        isSuccess,
        updateInvestment,
        isLoading
    }
}

export default useInvestment