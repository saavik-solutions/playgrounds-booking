// pages/unauthorized.js
import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
      <p>Please contact the administrator or <Link href="/login">log in</Link> with the correct credentials.</p>
    </div>
  );
}
