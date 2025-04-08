import { FC } from "react";
import { cn } from "@/lib/utils";

interface LocationsProps extends React.HTMLAttributes<HTMLDivElement> {
  locations?: string[];
}

const defaultLocations = ["Europe", "North America", "Australia"];

export const Locations: FC<LocationsProps> = ({
  locations = defaultLocations,
  className,
  ...props
}) => {
  return (
    <div className={cn("w-full py-4", className)} {...props}>
      <h2 className="mb-4 text-sm font-medium uppercase tracking-wider">
        Locations
      </h2>
      <div className="flex space-x-6">
        {locations.map((location) => (
          <div
            key={location}
            className="text-base font-normal hover:text-gray-600 cursor-pointer transition-colors whitespace-nowrap"
          >
            {location}
          </div>
        ))}
      </div>
    </div>
  );
};
