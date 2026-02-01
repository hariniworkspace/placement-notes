import dayjs from "dayjs";

const StreakCalendar = ({ activity }) => {
  const today = dayjs();
  const days = [];

  for (let i = 180; i >= 0; i--) {
    days.push(today.subtract(i, "day"));
  }

  return (
    <div className="bg-white rounded-2xl border p-6 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-4">
        🔥 Daily Streak
      </h3>

      <div className="grid grid-cols-14 gap-2">
        {days.map((day) => {
          const active = activity.some(
            (d) => dayjs(d).format("YYYY-MM-DD") === day.format("YYYY-MM-DD")
          );

          return (
            <div
              key={day.format("YYYY-MM-DD")}
              title={day.format("DD MMM YYYY")}
              className={`w-4 h-4 rounded-md ${
                active ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StreakCalendar;
