export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Clear the JWT cookie
  res.setHeader('Set-Cookie', 'auth-token=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict');
  
  // Send success response
  res.status(200).json({ message: 'Logout successful' });
}
