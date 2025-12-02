import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useFetchData } from "@/hooks/useFetchData";
import { IAdmin } from "@/models/user";
import { CustomButton, LoadingAnimation } from "../shared";
import { dateFormat } from "@/utils/dateFormat";
import { useNavigate } from "react-router-dom";
import { usePagintion } from "@/store/usePagination";
import { useEffect, useState } from "react";
import CustomPagination from "../shared/customPagination";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useFilterStore } from "@/store/filterStore";
import { RiDeleteBin2Line } from "@remixicon/react";
import useAdmin from "@/hooks/useAdmin";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

export default function AdminTable() {

    const navigate = useNavigate()
    const { pageSize, page, updatePageSize, updatePage } = usePagintion((state) => state)
    const { search } = useFilterStore((state) => state);
    const [adminId, setAdminId] = useState<IAdmin>({} as IAdmin)

    const { deleteAdmin, isOpen, setIsOpen } = useAdmin()

    const { data, isLoading } = useFetchData<any>(`/admin`, ["admin"], {
        limit: pageSize,
        page: page,
        search: search
    }, true);

    useEffect(() => {
        updatePage(1)
        updatePageSize(10)
    }, [])


    const clickHandler = (item: IAdmin, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setIsOpen(true)
        setAdminId(item)
    }

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
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.map((item: IAdmin, index: number) => {
                            return (
                                <TableRow role="button" onClick={() => navigate(`/dashboard/users/admin/details?id=${item?.id}`
                                )} className={` h-[72px] px-3 ${(index % 2 === 0) ? "bg-gray25" : ""} `} key={index}>
                                    <TableCell className="">
                                        <div className=" flex gap-2 items-center " >
                                            <Avatar>
                                                <AvatarImage src={item?.profilePicture} alt="@shadcn" />
                                                <AvatarFallback>{item?.firstName?.slice(0, 1) + item?.lastName?.slice(0, 1)}</AvatarFallback>
                                            </Avatar>
                                            <p>{item?.firstName + " " + item?.lastName}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell >
                                        {item?.role}
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

                                    <TableCell>
                                        <button onClick={(e) => clickHandler(item, e)} className=" text-error600 " >
                                            <RiDeleteBin2Line size={20} className="text-destructive" />
                                        </button>
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

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <button className="hidden" />
                </DialogTrigger>

                <DialogContent className="sm:max-w-[320px]">
                    <DialogHeader className="flex flex-col items-start gap-2">
                        <div className="w-[48px] h-[48px] rounded-[10px] border border-gray-200 flex justify-center items-center">
                            <RiDeleteBin2Line size={24} className="text-destructive" />
                        </div>
                        <DialogTitle>Delete Admin</DialogTitle>
                    </DialogHeader>

                    <div className="w-full flex flex-col gap-3 pb-5">
                        <p className="text-sm text-muted-foreground">
                            Are you sure you want to delete the{" "}
                            <span className="font-semibold text-foreground">
                                {adminId?.firstName + " " + adminId?.lastName}
                            </span>{" "}
                            admin? This action cannot be undone.
                        </p>
                    </div>

                    <DialogFooter className="flex flex-col gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            className="w-full rounded-full"
                        >
                            Cancel
                        </Button>

                        <CustomButton
                            isLoading={deleteAdmin.isPending}
                            type="button"
                            onClick={() => deleteAdmin.mutate(adminId?.id.toString())}
                            variant="destructive"
                            className="w-full rounded-full"
                        >
                            Delete
                        </CustomButton>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
