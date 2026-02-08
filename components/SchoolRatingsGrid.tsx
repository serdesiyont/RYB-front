import { School } from "@/lib/mockData";

interface SchoolRatingsGridProps {
  school: School;
}

export default function SchoolRatingsGrid({ school }: SchoolRatingsGridProps) {
  const ratingItems = [
    { icon: "🛡️", label: "Safety", value: school.ratings.safety },
    { icon: "📍", label: "Location", value: school.ratings.location },
    { icon: "👥", label: "Reputation", value: school.ratings.reputation },
    { icon: "😊", label: "Happiness", value: school.ratings.happiness },
    { icon: "📈", label: "Opportunities", value: school.ratings.opportunities },
    { icon: "🛠️", label: "Facilities", value: school.ratings.facilities },
    { icon: "🎪", label: "Clubs", value: school.ratings.clubs },
    { icon: "📶", label: "Internet", value: school.ratings.internet },
    { icon: "🍽️", label: "Food", value: school.ratings.food },
    { icon: "🤝", label: "Social", value: school.ratings.social },
  ];

  const badgeColor = (value: number) => {
    if (value < 2) return "bg-red-500 text-white";
    if (value < 3) return "bg-pink-400 text-white";
    if (value < 4) return "bg-yellow-300 text-gray-900";
    return "bg-green-300 text-gray-900";
  };

  return (
    <div className="grid md:grid-cols-3 gap-1 items-start">
      {/* Overall Quality */}
      <div className="text-center md:text-left">
        <div className="text-7xl md:text-8xl font-bold leading-none mb-2">
          {school.averageRating.toFixed(1)}
        </div>
        <p className="text-gray-600 text-sm">Overall Quality</p>
      </div>

      {/* Ratings two-column grid */}
      <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
        {ratingItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-md bg-white p-3 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </div>
            <span
              className={`min-w-[3.5rem] text-center text-sm font-bold px-3 py-1 rounded ${badgeColor(
                item.value
              )}`}
            >
              {item.value.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
