"use client";
import { homeService, queryKeys } from "@/service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface ResumeCardProps {
  className?: string;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ className = "" }) => {
  const { data } = useQuery({
    queryKey: queryKeys.home,
    queryFn: homeService.getHome,
  });
  return (
    <div
      className={`bg-white border border-gray-200  p-8 relative overflow-hidden md:col-span-2 lg:col-span-1 shadow-sm ${className}`}
    >
      <div className="relative z-10">
        {/* Header with accent line */}
        <div className="border-l-4 border-[#1F1F1F] pl-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {data?.name}
          </h1>
          <p className="text-lg text-gray-600">Full Stack Engineer</p>
        </div>

        {/* Contact Info with resume-style layout */}
        <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span>524000659@qq.com</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Wechat - BarrySong97</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Gui Zhou, China</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/BarrySong97"
              target="_blank"
              className="underline"
            >
              https://github.com/BarrySong97
            </a>
          </div>
        </div>

        {/* Decorative accent */}
      </div>
    </div>
  );
};

export default ResumeCard;
