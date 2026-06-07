import { CustomButton, LoadingAnimation } from "@/components/shared";
import InvestmentInfo from "./components/investmentInfo";
import ConstructionInfo from "./components/constructionInfo";
import PropertyStatistics from "./components/propertyStatistics";
import { useFetchData } from "@/hooks/useFetchData";
import { IReport } from "@/models/analytics";
import * as React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dateRangeOptions, getDateRange } from "@/utils/dateRange";
import { useReactToPrint } from "react-to-print";
import { dateFormat } from "@/utils/dateFormat";


export default function ReportPage() {

    const [selectedDate, setSelectedDate] = React.useState<{
        startDate: string | any;
        endDate: string | any;
    }>({
        startDate: "",
        endDate: "",
    });
    // /analytics/reports

    const { data, isLoading } = useFetchData<IReport>(`/analytics/reports`, ["analytics/reports", selectedDate?.startDate, selectedDate?.endDate], {
        startDate: selectedDate?.startDate,
        endDate: selectedDate?.endDate
    });

    const [selected, setSelected] = React.useState("ALL")


    const clickHandler = (item: string) => {
        const date = getDateRange(item)
        setSelectedDate({
            startDate: date?.start,
            endDate: date?.end
        })
        setSelected(item)
    }
    const contentRef = React.useRef<HTMLDivElement | any>(null);

    const reactToPrintFn = useReactToPrint({ contentRef, 
        documentTitle: "report "+dateFormat(new Date()),
        pageStyle: `
          @page {
            size: Legal landscape
          }   
        `, });

    return (
        <LoadingAnimation loading={isLoading} >
            <div className=" w-full flex flex-col h-full " >
                <div className=" w-full flex justify-between items-center border-b pb-5 px-4 " >
                    <div className=" flex flex-col " >
                        <h3 className=" font-semibold text-lg " >Reports & Analytics</h3>
                        <p className=" text-gray500 text-sm " >Track and analyze your real estate metrics</p>
                    </div>
                    <CustomButton variant={"main"} onClick={reactToPrintFn} className=" w-fit px-4 rounded-full " >Export</CustomButton>
                </div>
                <div className=" p-4 " >
                    <Tabs defaultValue={selected} >
                        <TabsList className="grid w-fit grid-cols-6 h-fit ">
                            <TabsTrigger onClick={() => { setSelectedDate({ startDate: "", endDate: "" }), setSelected("ALL") }} className=" h-[36px] " value={"ALL"} >All Time</TabsTrigger>
                            {dateRangeOptions?.map((item, index) => {
                                return (
                                    <TabsTrigger key={index} onClick={() => clickHandler(item?.value)} className=" h-[36px] " value={item?.value} >{item?.label}</TabsTrigger>
                                )
                            })}
                        </TabsList>
                    </Tabs>
                </div>
                
                <div ref={contentRef} className=" w-full flex flex-col gap-4 p-4  " >
                    {/* <div className=" w-full flex gap-4 " >
                        <SalesGraph />
                        <PropertiesChart />
                    </div> */}
                    <InvestmentInfo analytics={data as IReport} />
                    <ConstructionInfo analytics={data as IReport} />
                    {/* <div className=" w-full flex gap-4 " >
                        <div className=" w-[40%] " >
                            <CustomerChart />
                        </div>
                        <div className=" w-full " >

                        </div>
                    </div> */}

                    <div className=" w-full flex gap-4 " >
                        <div className=" w-[45%] " >
                            <PropertyStatistics analytics={data as IReport} />
                        </div>
                        {/* <div className=" w-full " >
                            <PropertyPerformance />
                        </div> */}
                    </div>
                </div>
            </div>
        </LoadingAnimation>
    )
}