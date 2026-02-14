export default function AdminTestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Admin Test Page</h1>
        <p className="text-lg">This page works! The admin routing is functional.</p>
        <a href="/admin/login" className="text-blue-500 underline">Go to Login</a>
      </div>
    </div>
  )
}
