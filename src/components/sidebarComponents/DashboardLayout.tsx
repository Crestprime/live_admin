import { Outlet, useNavigate } from "react-router-dom"
import { AppSidebar } from "./app-sidebar"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "../ui/breadcrumb";
import { useLinkStore } from "@/store/linkStore";
import { useFilterStore } from "@/store/filterStore";
import { useEffect } from "react";
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"

export default function DashboardLayout() {

  const { linkPath } = useLinkStore((state) => state)
  const { setSearch } = useFilterStore((state) => state);
  const navigate = useNavigate()

  useEffect(()=> {
    setSearch("")
  }, [linkPath])

  return (
    <SidebarProvider className=" p-3 !bg-[#f2f4f7] font-OpenRunde-Regular " >
      {/* <div className=" w-fit " > */}
      <AppSidebar />
      {/* </div> */}
      <SidebarInset className=" flex-1 relative rounded-lg h-full overflow-y-auto " >
        <header className="flex h-16 w-fit shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
            <Breadcrumb>
              <BreadcrumbList> 
                {linkPath?.map((item, index) => {
                  return (
                    <div key={index} className=" flex gap-2 items-center " >
                      <BreadcrumbItem>
                        {index === 0 ? (
                          <BreadcrumbLink href={index === 0 ? "/dashboard" : ""} >{item}</BreadcrumbLink>
                        ) : index === linkPath?.length - 1 ? (
                          <>
                            {item?.includes("deta") ? (
                              <Breadcrumb onClick={() => navigate(-1)} role="button" className=" text-blue-500 " >{item}</Breadcrumb>
                            ) : (
                              <Breadcrumb >{item}</Breadcrumb>
                            )}
                          </>
                        ) : (
                          <Breadcrumb>{item}</Breadcrumb>
                        )}
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                    </div>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 overflow-x-hidden flex-col gap-4 p-4 pt-0">
          {/* {children} */}
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
