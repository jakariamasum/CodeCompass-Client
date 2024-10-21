"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { useGetPayments } from "@/hooks/payment.hook";
import { useGetPosts } from "@/hooks/post.hook";
import { useGetUsers } from "@/hooks/user.hook";
import { IPayment, IPost, IUser } from "@/types";

// Register the chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard: React.FC = () => {
  const { data: payments = [] } = useGetPayments() || {};
  const { data: posts = [] } = useGetPosts() || {};
  const { data: users = [] } = useGetUsers() || {};

  const monthlyPaymentsData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Payments",
        data: Array(12)
          ?.fill(0)
          ?.map((_, i) =>
            payments
              ?.filter((p: IPayment) => new Date(p.createdAt).getMonth() === i)
              ?.reduce((sum: number, p: IPayment) => sum + p.amount, 0)
          ),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const postActivityData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Posts Created",
        data: Array(12)
          ?.fill(0)
          ?.map(
            (_, i) =>
              posts?.filter(
                (p: IPost) => new Date(p.createdAt as string).getMonth() === i
              ).length
          ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const userStatusData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [
          users?.filter((u: IUser) => u.active).length,
          users?.filter((u: IUser) => !u.active).length,
        ],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className="bg-white p-6 rounded-lg shadow-lg"
          style={{ height: "350px" }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Monthly Payments
          </h2>
          <Line
            data={monthlyPaymentsData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
        <div
          className="bg-white p-6 rounded-lg shadow-lg"
          style={{ height: "350px" }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Post Activity
          </h2>
          <Bar
            data={postActivityData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
        <div
          className="bg-white p-6 rounded-lg shadow-lg"
          style={{ height: "350px" }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            User Status
          </h2>
          <Doughnut
            data={userStatusData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
        <div
          className="bg-white p-6 rounded-lg shadow-lg"
          style={{ height: "350px" }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Recent Activity
          </h2>
          <div className="space-y-4 overflow-y-auto max-h-64">
            {[...payments, ...posts, ...users]
              ?.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              ?.slice(0, 5)
              ?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <span className="text-gray-600">
                    {"amount" in item
                      ? `Payment: $${item.amount / 100}`
                      : "title" in item
                      ? `New Post: ${item.title}`
                      : `New User: ${item.fname} ${item.lname}`}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
