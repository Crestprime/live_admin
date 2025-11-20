import { useFetchData } from "@/hooks/useFetchData";
import { FooterCard, HeaderCard, SalesCard } from "../homeComponents";
import { Button } from "../ui/button";
import { IHome } from "@/models/analytics";
import { LoadingAnimation } from "../shared";
import { AdminBtn } from "./adminPage/adminBtn";
import { useUserStore } from "@/store/userStore";
import { dateFormat } from "@/utils/dateFormat";


export default function HomePage() {

    const { data, isLoading } = useFetchData<IHome>(`/analytics/home`, ["home"]); 
    const { userDetails } = useUserStore((state) => state)


    return (
        <LoadingAnimation loading={isLoading} >
            <div className=" w-full flex h-auto gap-6 flex-col  " >
                <div className=" w-full flex justify-between pb-4 border-b items-center " >
                    <div className=" flex flex-col  " >
                        <h3 className=" font-semibold text-lg " >Hey, {userDetails?.firstName}</h3>
                        <p className=" text-sm text-bodyTextColor " >{dateFormat(userDetails?.createdAt)}</p>
                    </div>
                    <div className=" flex gap-4  " >
                        <Button variant={"main"} className=" h-[40px] text-sm font-medium rounded-full " >
                            Add Listing
                        </Button>
                        <AdminBtn variant="outline" />
                    </div>
                </div>
                <HeaderCard data={data as IHome} />
                <SalesCard data={data as IHome} />
                <FooterCard />
            </div>
        </LoadingAnimation>
    )
}
