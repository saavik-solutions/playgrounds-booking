export default function MapSection() {
  return (
    <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
      {/* Map Image */}
      <img
        src="/map.png" // Placeholder for your map background image
        alt="Map"
        className="absolute w-full h-full object-cover"
      />

      {/* User Avatars with Messages */}
      <div className="relative z-10 flex flex-wrap items-center justify-center space-x-4">
        {/* Sample user message */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/avatar1.png"
            alt="User 1"
            className="w-16 h-16 rounded-full border-4 border-orange-400"
          />
          <p className="text-white bg-gray-800 rounded-full px-3 py-1 mt-2 text-sm">Hey!</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <img
            src="/avatar2.png"
            alt="User 2"
            className="w-16 h-16 rounded-full border-4 border-orange-400"
          />
          <p className="text-white bg-gray-800 rounded-full px-3 py-1 mt-2 text-sm">I'm available!</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <img
            src="/avatar3.png"
            alt="User 3"
            className="w-16 h-16 rounded-full border-4 border-orange-400"
          />
          <p className="text-white bg-gray-800 rounded-full px-3 py-1 mt-2 text-sm">I'm always in!</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <img
            src="/avatar4.png"
            alt="User 4"
            className="w-16 h-16 rounded-full border-4 border-orange-400"
          />
          <p className="text-white bg-gray-800 rounded-full px-3 py-1 mt-2 text-sm">Wanna play today?</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <img
            src="/avatar5.png"
            alt="User 5"
            className="w-16 h-16 rounded-full border-4 border-orange-400"
          />
          <p className="text-white bg-gray-800 rounded-full px-3 py-1 mt-2 text-sm">At 7?</p>
        </div>
      </div>
    </div>
  );
}
