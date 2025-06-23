import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BriefcaseIcon, MapPinIcon } from "lucide-react";

export default function PeopleListItem({ person, onClick }) {
  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(person)}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            {person.avatarUrl ? (
              <AvatarImage src={person.avatarUrl} alt={person.name} />
            ) : (
              <AvatarFallback>
                {person.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{person.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {person.title}
            </p>
            {person.company && (
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                <BriefcaseIcon className="h-3 w-3" />

                <span>{person.company}</span>
              </div>
            )}
            {person.location && (
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <MapPinIcon className="h-3 w-3" />

                <span>{person.location}</span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {person.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
          {person.tags.length > 3 && (
            <Badge variant="outline">+{person.tags.length - 3}</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
