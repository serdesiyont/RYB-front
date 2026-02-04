import { School } from '@/lib/mockData';

interface SchoolRatingsGridProps {
  school: School;
}

export default function SchoolRatingsGrid({ school }: SchoolRatingsGridProps) {
  const ratingItems = [
    { icon: '👥', label: 'Reputation', value: school.ratings.reputation },
    { icon: '💰', label: 'Opportunities', value: school.ratings.opportunities },
    { icon: '📶', label: 'Internet', value: school.ratings.internet },
    { icon: '📍', label: 'Location', value: school.ratings.location },
    { icon: '🏗️', label: 'Facilities', value: school.ratings.facilities },
    { icon: '✈️', label: 'Safety', value: school.ratings.safety },
    { icon: '🍽️', label: 'Food', value: school.ratings.food },
    { icon: '🎪', label: 'Clubs', value: school.ratings.clubs },
    { icon: '😊', label: 'Happiness', value: school.ratings.happiness },
    { icon: '🤝', label: 'Social', value: school.ratings.social },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* Overall Quality */}
      <div className="flex items-center gap-8">
        <div className="text-center">
          <div className="text-9xl font-bold mb-2">{school.averageRating.toFixed(1)}</div>
          <p className="text-gray-600 text-sm">Overall Quality</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {ratingItems.slice(0, 5).map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <div className="bg-yellow-300 text-black font-bold px-3 py-1 rounded text-center text-sm">
                {item.value.toFixed(1)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side ratings */}
      <div className="grid grid-cols-2 gap-4">
        {ratingItems.slice(5).map((item, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <div className={`${
              item.value < 3 ? 'bg-red-300' : 'bg-yellow-300'
            } text-black font-bold px-3 py-1 rounded text-center text-sm`}>
              {item.value.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
