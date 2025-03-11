"use client";
import { experienceService } from "@/service";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/config";
import { Media } from "@/payload-types";
import { MaterialSymbolsLightPinDrop, MaterialSymbolsPerson } from "./icon";

export function Experience() {
  const { data: experiences } = useQuery({
    queryKey: queryKeys.experiences.all,
    queryFn: () => experienceService.getExperiences(),
  });

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-medium">Work Experience</h2>

      <div className="space-y-8">
        {experiences?.docs.map((exp, index) => (
          <div key={exp.company} className="group space-y-2">
            <div className="flex items-center justify-between">
              <a
                href={exp.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base flex items-center gap-2 font-medium hover:underline transition-colors"
              >
                {exp.companyLogo && (
                  <Image
                    src={(exp.companyLogo as Media).url ?? ""}
                    alt={exp.company}
                    width={12}
                    height={12}
                  />
                )}

                <span>{exp.company}</span>
              </a>
              <span className="text-sm text-muted-foreground">
                {exp.period}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="flex items-end gap-1.5 text-xs">
                {exp.position}
              </span>
              <span className="flex items-end gap-1 text-xs">
                {exp.companyLocation}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
