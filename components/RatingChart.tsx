interface RatingChartProps {
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export default function RatingChart({ ratingDistribution }: RatingChartProps) {
  const total = Object.values(ratingDistribution).reduce((a, b) => a + b, 0);
  const maxCount = Math.max(...Object.values(ratingDistribution), 1);

  const ratings = [
    { label: 'Awesome 5', value: ratingDistribution[5], count: 5 },
    { label: 'Great 4', value: ratingDistribution[4], count: 4 },
    { label: 'Good 3', value: ratingDistribution[3], count: 3 },
    { label: 'OK 2', value: ratingDistribution[2], count: 2 },
    { label: 'Awful 1', value: ratingDistribution[1], count: 1 },
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="font-bold text-lg mb-6">Rating Distribution</h3>

      <div className="space-y-4">
        {ratings.map((rating, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="w-24">
              <p className="text-sm font-medium">{rating.label}</p>
            </div>

            <div className="flex-1">
              <div className="h-8 bg-blue-600 rounded" style={{
                width: `${rating.value > 0 ? (rating.value / maxCount) * 100 : 5}%`,
              }}/>
            </div>

            <div className="w-12 text-right">
              <p className="text-sm font-semibold">{rating.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
