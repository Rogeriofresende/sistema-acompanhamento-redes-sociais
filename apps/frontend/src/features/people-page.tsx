import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PEOPLE_DATA, getPersonById } from "@/features/people-data";
import { BrandButton } from "@/features/brand-button";
import RegisterGuestDialog from "@/features/register-guest-dialog";
import PersonDetailView from "@/polymet/components/person-detail-view";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, SearchIcon, UsersIcon } from "lucide-react";

export default function PeoplePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPeople, setFilteredPeople] = useState(PEOPLE_DATA);
  const [selectedPerson, setSelectedPerson] = useState(
    id ? getPersonById(id) : null
  );

  // Filter people based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPeople(PEOPLE_DATA);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = PEOPLE_DATA.filter(
        (person) =>
          person.name.toLowerCase().includes(query) ||
          (person.title && person.title.toLowerCase().includes(query)) ||
          (person.company && person.company.toLowerCase().includes(query)) ||
          person.tags.some((tag) => tag.toLowerCase().includes(query))
      );
      setFilteredPeople(filtered);
    }
  }, [searchQuery]);

  // Update selected person when ID param changes
  useEffect(() => {
    if (id) {
      const person = getPersonById(id);
      setSelectedPerson(person);
    } else {
      setSelectedPerson(null);
    }
  }, [id]);

  // Handle person selection
  const handlePersonClick = (person) => {
    navigate(`/podcast-guests/people/${person.id}`);
  };

  // Handle back button click
  const handleBackClick = () => {
    navigate("/podcast-guests/people");
    setSelectedPerson(null);
  };

  // Handle guest registration
  const handleGuestRegistration = (data) => {
    console.log("New guest registered:", data);
    // In a real app, we would add the new guest to the database
    // and update the list of people
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center">
          <UsersIcon className="h-6 w-6 mr-2 text-violet-600 dark:text-violet-400" />

          <h1 className="text-2xl font-bold">Podcast Guests</h1>
        </div>

        <RegisterGuestDialog
          trigger={
            <Button className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Cadastrar Novo Convidado
            </Button>
          }
          onSubmit={handleGuestRegistration}
        />
      </div>

      {selectedPerson ? (
        <PersonDetailView
          person={selectedPerson}
          onBackClick={handleBackClick}
        />
      ) : (
        <div>
          <div className="relative mb-6">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />

            <Input
              type="text"
              placeholder="Search people by name, title, company, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPeople.map((person, index) => (
              <div
                key={person.id}
                className="border dark:border-gray-800 rounded-lg p-4 cursor-pointer hover:border-violet-300 dark:hover:border-violet-700 transition-colors"
                onClick={() => handlePersonClick(person)}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                    {person.avatarUrl ? (
                      <img
                        src={person.avatarUrl}
                        alt={person.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg font-medium">
                        {person.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium truncate">
                      {person.name}
                    </h3>
                    {person.title && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {person.title}
                      </p>
                    )}
                    {person.company && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {person.company}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {person.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {person.tags.length > 3 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                      +{person.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredPeople.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No people found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
