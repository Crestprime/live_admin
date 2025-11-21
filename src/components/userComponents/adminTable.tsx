import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useFetchData } from "@/hooks/useFetchData";
import { IUser } from "@/models/user";
import { LoadingAnimation } from "../shared";
import { dateFormat } from "@/utils/dateFormat";
import { useNavigate } from "react-router-dom";
import { usePagintion } from "@/store/usePagination";
import { useEffect } from "react";
import CustomPagination from "../shared/customPagination";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useFilterStore } from "@/store/filterStore";

export default function AdminTable() {

    const navigate = useNavigate()
    const { pageSize, page, updatePageSize, updatePage } = usePagintion((state) => state)
    const { search } = useFilterStore((state) => state);

    const { data, isLoading } = useFetchData<any>(`/admin`, ["admin"], {
        limit: pageSize,
        page: page,
        search: search
    }, true);

    useEffect(() => {
        updatePage(1)
        updatePageSize(10)
    }, [])

    console.log(data);
    


    return (
        <div className=" w-full flex flex-col gap-6 " >

            <LoadingAnimation loading={isLoading} >

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Staff Name</TableHead>
                            <TableHead>Role</TableHead>
                            {/* <TableHead>Department</TableHead> */}
                            <TableHead>Active Projects</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date Joined</TableHead>
                            <TableHead>Last Activity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.map((item: IUser, index: number) => {
                            return (
                                <TableRow role="button" onClick={() => navigate(`/dashboard/users/admin/details?id=${item?.id}`
                                )} className={` h-[72px] px-3 ${(index % 2 === 0) ? "bg-gray25" : ""} `} key={index}>
                                    <TableCell className="">
                                        <div className=" flex gap-2 items-center " >
                                            <Avatar>
                                                <AvatarImage src={item?.profilePicture} alt="@shadcn" />
                                                <AvatarFallback>{item?.firstName?.slice(0, 1)+item?.lastName?.slice(0, 1)}</AvatarFallback>
                                            </Avatar>
                                            <p>{item?.firstName + " " + item?.lastName}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell >
                                        {item?.position}
                                    </TableCell>
                                    <TableCell>
                                        {item?.projects?.length}
                                    </TableCell>
                                    <TableCell>
                                        <div className=" px-4 flex h-[21px] justify-center items-center w-fit font-medium text-sm rounded-full bg-success100 text-success800 " >
                                            Verified
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {dateFormat(item?.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                        <div className=" flex flex-col " >
                                            <p>{dateFormat(item?.updatedAt)}</p>
                                            <p>(Login)</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </LoadingAnimation>
            {data?.total > pageSize && (
                <CustomPagination totalElement={data?.total} />
            )}
        </div>
    )
}
