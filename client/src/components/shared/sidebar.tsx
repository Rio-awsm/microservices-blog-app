"use client";

import { blogCategories, useAppData } from "@/context/AppContext";
import { BoxSelect } from "lucide-react";
import { Input } from "../ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const SideBar = () => {
  const { searchQuery, setSearchQuery, setCategory } = useAppData();
  
  return (
    <Sidebar className="border-r border-gray-800/50 bg-gray-950/95 backdrop-blur-xl">
      <SidebarHeader className="bg-gray-950/95 backdrop-blur-sm text-2xl font-bold mt-5 text-white">
        Fresh Reads
      </SidebarHeader>
      
      <SidebarContent className="bg-gray-950/95 backdrop-blur-xl">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300">Search</SidebarGroupLabel>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Your Desired blog"
            className="bg-gray-900/50 border-gray-800/50 text-white placeholder:text-gray-500 focus:border-blue-500/50"
          />

          <SidebarGroupLabel className="text-gray-300">Categories</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={() => setCategory("")}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                <BoxSelect /> <span>All</span>
              </SidebarMenuButton>
              {blogCategories?.map((e, i) => {
                return (
                  <SidebarMenuButton 
                    key={i} 
                    onClick={() => setCategory(e)}
                    className="text-gray-300 hover:text-white hover:bg-gray-800/50"
                  >
                    <BoxSelect /> <span>{e}</span>
                  </SidebarMenuButton>
                );
              })}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;