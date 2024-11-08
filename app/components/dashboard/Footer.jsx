import Link from 'next/link';

export default function Footer() {
  return (
    <div className="w-full bg-white mt-4 p-6 text-center rounded-t-lg shadow-lg">
      <h2 className="text-lg font-semibold">Book Venues to Play with Friends</h2>
      <p className="text-gray-500 mb-4">Get your squad to play together!</p>

      <Link href="/bookings">
        <button className="mt-4 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition duration-200">
          READY.SET.GO
        </button>
      </Link>
    </div>
  );
}
