import { LoadingAnimation } from "@/components/shared";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { useFetchData } from "@/hooks/useFetchData";
import { IUser } from "@/models/user";
import { capitalizeFLetter } from "@/utils/capitalLetter";
import { dateFormat } from "@/utils/dateFormat";
import { formatNumber } from "@/utils/numberFormat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiArrowLeftLine } from "@remixicon/react";
// import { IUserInfo } from "@/models/user"; 
import { useNavigate, useSearchParams } from "react-router-dom";

// interface IProps {
//     "id": number,
//     "firstName": string,
//     "lastName": string,
//     "email": string,
//     "workspaces": Array<string>,
//     "position": string,
//     "createdAt": string,
//     "updatedAt": string,
//     "profilePicture": string
// }

export default function ClientDetails() {


    const [searchParams] = useSearchParams();
    const id: any = searchParams.get("id");
    const { data, isLoading } = useFetchData<IUser | any>(`/admin/details/${id}`, ["admin", id]);

    const navigate = useNavigate()

    return (
        <LoadingAnimation loading={isLoading} >
            <div className=" w-full flex h-auto gap-6 flex-col overflow-x-hidden " >
                <div className=" w-full p-6 gap-6 flex flex-col border border-gray-200 rounded-xl " >
                    <div className=" flex items-center gap-4 pb-6 border-b " >
                        <button onClick={() => navigate(-1)} >
                            <RiArrowLeftLine size={"20px"} />
                        </button>
                        <Avatar className=" w-10 " >
                            <AvatarImage src={data?.user?.profilePicture} alt="@shadcn" />
                            <AvatarFallback>{data?.user?.firstName?.slice(0, 1) + data?.user?.lastName?.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                        <div className=" flex flex-col gap-1 " >
                            <div className=" flex gap-2 items-center " >
                                <p className=" text-xl font-semibold " >{data?.firstName + " " + data?.lastName}</p>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full flex flex-col gap-3 " >
                        <p className=" text-sm text-gray-400 " >Personal Information</p>
                        <div className=" w-full flex gap-1 lg:flex-row flex-col " >
                            <div className=" w-full flex flex-col gap-1 " >
                                <div className="  w-full flex items-center" >
                                    <p className=" font-medium text-gray900 w-full max-w-[130px] " >Email:</p>
                                    <p className=" text-gray700 text-sm " >{data?.email}</p>
                                </div>
                                {/* <div className="  w-full flex items-center" >
                                    <p className=" font-medium text-gray900 w-full max-w-[130px] " >Phone number:</p>
                                    <p className=" text-gray700 text-sm " >{"---"}</p>
                                </div>  */}
                            </div>
                            {/* <div className="  w-full flex items-center" >
                                <p className=" font-medium text-gray900 w-full max-w-[130px] " >Address:</p>
                                <p className=" text-gray700 text-sm " >{"---"}</p>
                            </div> */}
                        </div>
                    </div>
                    <div className=" w-full flex flex-col gap-3 " >
                        <p className=" text-sm text-gray-400 " >Work Information</p>
                        <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-2 " >
                            <div className="  w-full flex items-center" >
                                <p className=" font-medium text-gray900 w-full max-w-[130px] " >Date Joined:</p>
                                <p className=" text-gray700 text-sm " >{dateFormat(data?.createdAt)}</p>
                            </div>
                            {/* <div className="  w-full flex items-center" >
                                <p className=" font-medium text-gray900 w-full max-w-[130px] " >Active Projects</p>
                                <p className=" text-gray700 text-sm " >{"---"}</p>
                            </div>
                            <div className="  w-full flex items-center" >
                                <p className=" font-medium text-gray900 w-full max-w-[130px] " >Status:</p>
                                <p className=" text-gray700 text-sm " >{"---"}</p>
                            </div> */}
                            <div className="  w-full flex items-center" >
                                <p className=" font-medium text-gray900 w-full max-w-[130px] " >Last Activity:</p>
                                <p className=" text-gray700 text-sm " >{dateFormat(data?.updatedAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-full flex flex-col gap-4 " >
                    <div className=" flex gap-2 items-center " >
                        <p>Active Projects</p>
                        <div className=" w-8 h-5 bg-gray-100 flex justify-center items-center text-[10px] rounded-lg " >
                            {data?.projects?.length}
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client</TableHead>
                                <TableHead>Property Name</TableHead>
                                <TableHead>Tenure</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Maturity Date</TableHead>
                                <TableHead>Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.projects?.map((item: any, index: number) => {
                                return (
                                    <TableRow className={` h-[72px] px-3 ${(index % 2 === 0) ? "bg-gray25" : ""} `} key={index}>
                                        <TableCell className="">{item?.userId}</TableCell>
                                        <TableCell className="">{item?.projectType}</TableCell>
                                        <TableCell className="">{item?.duration} Months</TableCell>
                                        <TableCell>
                                            <div className=" flex gap-2 items-center " >
                                                <div className={``} >
                                                    {capitalizeFLetter(item?.status)}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="">{dateFormat(item?.createdAt)}</TableCell>
                                        <TableCell className="">{formatNumber(item?.budget)}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </LoadingAnimation>
    )
}
