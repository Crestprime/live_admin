import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useFetchData } from "@/hooks/useFetchData";
import { IRole } from "@/models/user";
import { CustomButton, FormInput, LoadingAnimation } from "../shared";
import { dateFormat } from "@/utils/dateFormat";
import { usePagintion } from "@/store/usePagination";
import { useEffect } from "react";
import CustomPagination from "../shared/customPagination";
import { capitalizeFLetter } from "@/utils/capitalLetter";
import { RiEdit2Line, RiUserAddLine } from "@remixicon/react";
import { DialogHeader, DialogFooter, DialogTrigger, Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import useAdmin from "@/hooks/useAdmin";
import CustomMultiSelect from "../shared/formMultiSelect";
import { FormikProvider } from "formik";
import { rolePermissions } from "@/utils/databank";

export default function RoleTable() {

    const { pageSize, page, updatePageSize, updatePage } = usePagintion((state) => state)
    const { formikRole, isOpenRole, setIsOpenRole, updateRoleManagement, setRoleId } = useAdmin()
    const { data, isLoading } = useFetchData<any>(`/admin-role`, ["role"], { limit: pageSize, page: page }, true);

    useEffect(() => {
        updatePage(1)
        updatePageSize(10)
    }, [])

    // const clickHandler = (item: IRole, e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.stopPropagation()
    //     setIsOpen(true)
    //     setRoledata(item)
    // }

    const clickHandlerEdit = (item: IRole, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setIsOpenRole(true)
        setRoleId(item?.id)
        formikRole.setValues({
            name: item?.name,
            permissions: item?.permissions
        })
    }

    return (

        <FormikProvider value={formikRole}>
            <div className=" w-full flex flex-col gap-6 " >

                <LoadingAnimation loading={isLoading} >

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Role Name</TableHead>
                                <TableHead>Permissions</TableHead>
                                <TableHead>Statue</TableHead>
                                <TableHead>Date Joined</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.data?.map((item: IRole, index: number) => {
                                return (
                                    <TableRow className={` h-[72px] px-3 ${(index % 2 === 0) ? "bg-gray25" : ""} `} key={index}>
                                        <TableCell className="">
                                            {item?.name}
                                        </TableCell>
                                        <TableCell className="">
                                            {item?.permissions?.map((item, index) => {
                                                return (
                                                    <p key={index} >{capitalizeFLetter(item)}</p>
                                                )
                                            })}
                                        </TableCell>
                                        <TableCell >
                                            <div className=" flex gap-2 items-center " >
                                                <div className={` ${item?.isActive ? " text-success800 bg-success100 " : " text-error800 bg-error100 "} h-[21px] rounded-2xl px-3 text-xs  w-fit flex justify-center items-center `} >
                                                    {item?.isActive ? "Active" : "Inactive"}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {dateFormat(item?.createdAt)}
                                        </TableCell>
                                        <TableCell>
                                            <div className=" flex gap-4 items-center " >
                                                {/* <button onClick={(e) => clickHandler(item, e)} className=" text-error600 " >
                                                    <RiDeleteBin2Line size={20} className="text-destructive" />
                                                </button> */}
                                                <button onClick={(e) => clickHandlerEdit(item, e)} className=" text-blue800 " >
                                                    <RiEdit2Line size={20} className="text-blue800" />
                                                </button>
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
                {/* <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <button className="hidden" />
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[320px]">
                        <DialogHeader className="flex flex-col items-start gap-2">
                            <div className="w-[48px] h-[48px] rounded-[10px] border border-gray-200 flex justify-center items-center">
                                <RiDeleteBin2Line size={24} className="text-destructive" />
                            </div>
                            <DialogTitle>Delete Role</DialogTitle>
                        </DialogHeader>

                        <div className="w-full flex flex-col gap-3 pb-5">
                            <p className="text-sm text-muted-foreground">
                                Are you sure you want to delete the
                                <span className="font-semibold text-foreground">
                                    {roledata?.name}
                                </span>
                                role? This action cannot be undone.
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
                                isLoading={deleteRole.isPending}
                                type="button"
                                onClick={() => deleteRole.mutate(roledata?.id)}
                                variant="destructive"
                                className="w-full rounded-full"
                            >
                                Delete
                            </CustomButton>
                        </DialogFooter>
                    </DialogContent>
                </Dialog> */}


                <Dialog open={isOpenRole} onOpenChange={setIsOpenRole} >
                    <DialogTrigger asChild>
                        <button className="hidden" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[400px]">
                        <DialogHeader className=' flex flex-col ' >
                            <div className=' w-[48px] h-[48px] mb-2 rounded-[10px] border border-gray200 flex justify-center items-center ' >
                                <RiUserAddLine size={"24px"} />
                            </div>
                            <DialogTitle >{"Role Creation"}</DialogTitle>
                        </DialogHeader>
                        <div className=' w-full flex flex-col gap-3 pb-5 ' >
                            <FormInput isDisabled={true} setValue={formikRole.setFieldValue} errors={formikRole?.errors} touched={formikRole?.touched} value={formikRole?.values} label="Name" name="name" placeholder="e.g Flora" />
                            <CustomMultiSelect label="Permissions" options={rolePermissions} name={"permissions"} />
                        </div>
                        <DialogFooter >
                            <Button variant={"outline"} onClick={() => setIsOpenRole(false)} className=" w-full rounded-full " >Cancel</Button>
                            <CustomButton type='button' isLoading={updateRoleManagement?.isPending} onClick={() => formikRole.handleSubmit()} variant={"main"} className=" w-full rounded-full " >Submit</CustomButton>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </FormikProvider>
    )
}
