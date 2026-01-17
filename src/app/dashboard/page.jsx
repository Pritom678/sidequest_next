"use client";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">
            Welcome to your Dashboard!
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              This is a simplified dashboard page to test if the route is
              working.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-100 p-4 rounded">
                <h3 className="text-blue-800 font-medium mb-2">Quick Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Quests:</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed:</span>
                    <span className="font-bold">0</span>
                  </div>
                </div>
              </div>
              <div className="bg-green-100 p-4 rounded">
                <h3 className="text-green-800 font-medium mb-2">
                  Recent Activity
                </h3>
                <p className="text-gray-600">Dashboard is working correctly!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
