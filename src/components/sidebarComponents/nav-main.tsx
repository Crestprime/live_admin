"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useLinkStore } from "@/store/linkStore"
import { RiLock2Fill } from "@remixicon/react"

export function NavMain({
  items,
  permissions,
  role
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[],
  permissions?: string[],
  role?: string
}) {

  const navigate = useNavigate()
  const { setLinkPath } = useLinkStore((state) => state)

  const pathname = window.location.pathname
  const pathArray = pathname.split("/").filter(Boolean)

  const [activePath, setActivePath] = useState(pathname)

  useEffect(() => {
    setActivePath(pathname)
    setLinkPath(pathArray)
  }, [pathname])


  // ----------------------------------------------------------------
  // 🔥 SUPER ADMIN OVERRIDES
  // Staff + Role Management should be hidden if role !== "SUPER_ADMIN"
  // ----------------------------------------------------------------
  const restrictedTitles = ["Staff", "Role Management"]

  const roleFilteredItems = items.filter((item) => {
    const isRestricted = restrictedTitles.some((t) =>
      item.title.toLowerCase().includes(t.toLowerCase())
    )

    // hide restricted items if NOT SUPER_ADMIN
    if (isRestricted && role !== "SUPER_ADMIN") return false

    return true
  })


  // ----------------------------------------------------------------
  // 🔥 PERMISSION FILTER — after applying role filter
  // ----------------------------------------------------------------
  const filteredItems = roleFilteredItems.filter((item) => {
    const itemTitle = item.title.toLowerCase()

    return permissions?.some((perm) => {
      const p = perm.toLowerCase()
      return itemTitle.includes(p) || p.includes(itemTitle)
    })
  })

  const hideRoleItems = [...filteredItems,
    {
      title: "Role Management",
      url: "/dashboard/role",
      icon: RiLock2Fill,
      items: []
    },
  ]



  const clickHandler = (url: string) => {
    navigate(url)
  }



  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>

      <SidebarMenu>

        {(role !== "SUPER_ADMIN" ? filteredItems : hideRoleItems).map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={activePath.includes(item.url)}
          >
            <SidebarMenuItem>

              <SidebarMenuButton asChild tooltip={item.title}>
                {item.items && item.items.length > 0 ? (
                  <CollapsibleTrigger
                    className={
                      activePath.includes(item.url)
                        ? "text-gray700"
                        : "text-gray500"
                    }
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </CollapsibleTrigger>
                ) : (
                  <div
                    role="button"
                    onClick={() => clickHandler(item.url)}
                    className={
                      activePath.includes(item.url)
                        ? "bg-white shadow-lg text-gray700"
                        : "text-gray500"
                    }
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </div>
                )}
              </SidebarMenuButton>

              {/* SUB-MENU */}
              {item.items && item.items.length > 0 && (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.filter((item) => role !== "SUPER_ADMIN" ? item?.title !== "staff" : item).map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <div
                              role="button"
                              onClick={() => clickHandler(subItem.url)}
                              className={
                                activePath.includes(subItem.url)
                                  ? "bg-white shadow-lg text-gray700"
                                  : "text-gray500"
                              }
                            >
                              <span>{subItem.title}</span>
                            </div>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              )}

            </SidebarMenuItem>
          </Collapsible>
        ))}

      </SidebarMenu>
    </SidebarGroup>
  )
}
