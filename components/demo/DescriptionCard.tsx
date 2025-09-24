"use client";
import { homeService, queryKeys } from "@/service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface DescriptionCardProps {
  title?: string;
  description: string;
  className?: string;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({
  title,
  className = "",
}) => {
  const { data } = useQuery({
    queryKey: queryKeys.home,
    queryFn: homeService.getHome,
  });
  return (
    <div
      className={`md:col-span-2 lg:col-span-2 flex items-center p-6    ${className}`}
    >
      <div className="space-y-4">
        {title && (
          <div className="border-l-4 border-gray-800 pl-4">
            <h2 className="text-sm font-bold text-gray-500 tracking-wider uppercase">
              {title}
            </h2>
          </div>
        )}
        <div className="text-2xl md:text-3xl lg:text-2xl font-bold text-gray-800 leading-tight">
          {data?.description}
        </div>
      </div>
    </div>
  );
};

export default DescriptionCard;
