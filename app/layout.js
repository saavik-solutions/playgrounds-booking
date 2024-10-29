export const metadata = {
  title: "Grounds Booking App",
  description: "App to Book Grounds for playing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
