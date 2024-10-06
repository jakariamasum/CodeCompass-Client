"use client";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart as ChartComponent } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const staticUserData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Sam Wilson",
      email: "sam@example.com",
      role: "User",
      status: "Active",
    },
  ];

  const staticPaymentData = [
    { user: "John Doe", amount: 150, date: "2024-10-01", status: "Completed" },
    { user: "Jane Smith", amount: 200, date: "2024-10-02", status: "Pending" },
    {
      user: "Sam Wilson",
      amount: 250,
      date: "2024-10-03",
      status: "Completed",
    },
  ];

  const staticPostData = [
    {
      id: 1,
      title: "Tech Trends in 2024",
      author: "John Doe",
      status: "Published",
    },
    { id: 2, title: "Understanding AI", author: "Jane Smith", status: "Draft" },
    {
      id: 3,
      title: "Best Practices in Software Development",
      author: "Sam Wilson",
      status: "Published",
    },
  ];

  const paymentChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Monthly Payments",
        data: [120, 150, 180, 220, 300, 200, 250],
        borderColor: "rgba(0, 156, 166, 1)",
        backgroundColor: "rgba(0, 156, 166, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  const postChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Posts Created",
        data: [10, 12, 15, 20, 25, 30, 35],
        borderColor: "rgba(37, 99, 235, 1)",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex">
      <main className="w-3/4 p-5">
        <h2 className="text-2xl font-semibold mb-5">Dashboard Overview</h2>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Monthly Payments</h3>
            <ChartComponent type="line" data={paymentChartData} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Posts Over Time</h3>
            <ChartComponent type="line" data={postChartData} />
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow mb-5">
          <h3 className="font-semibold">User Management</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staticUserData.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment History Table */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Payment History</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staticPaymentData.map((payment, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
