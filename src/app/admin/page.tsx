export default function AdminPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Quick Stats</h2>
          <p className="text-gray-600">Overview of your site's performance</p>
        </div>
        <div className="rounded-lg border p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Recent Activity</h2>
          <p className="text-gray-600">Latest updates and changes</p>
        </div>
        <div className="rounded-lg border p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Tasks</h2>
          <p className="text-gray-600">Pending items and to-dos</p>
        </div>
      </div>
    </div>
  );
} 