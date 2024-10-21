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
import { useUser } from "@/context/user.provider";
import { useSingleUser } from "@/hooks/user.hook";
import { useUserPosts } from "@/hooks/post.hook";
import { useUserPayments } from "@/hooks/payment.hook";
import { IPayment } from "@/types";

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

const UserDashboard: React.FC = () => {
  const { user } = useUser();
  const { data: userData } = useSingleUser(user?.email as string);
  const { data: posts = [] } = useUserPosts(user?._id as string);
  const { data: payments = [] } = useUserPayments(user?.email as string);
  console.log(payments);
  payments?.map((p: IPayment) => console.log(p.createdAt));

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
                (p: { createdAt: Date }) =>
                  new Date(p.createdAt).getMonth() === i
              ).length
          ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const postEngagementData = {
    labels: ["Likes", "Dislikes", "Comments"],
    datasets: [
      {
        data: [
          posts?.reduce(
            (sum: any, post: { likes: number }) => sum + post.likes,
            0
          ),
          posts?.reduce(
            (sum: any, post: { dislikes: number }) => sum + post.dislikes,
            0
          ),
          posts?.reduce(
            (sum: any, post: { comments: string | any[] }) =>
              sum + post.comments.length,
            0
          ),
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
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
              Post Engagement
            </h2>
            <Doughnut
              data={postEngagementData}
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
            <div className="space-y-4">
              {[...payments, ...posts]
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
                        : "Nothing"}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Account Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">
                Followers: {userData?.followers.length}
              </p>
              <p className="text-gray-600">
                Following: {userData?.following.length}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Verified: {userData?.verified}</p>
              <p className="text-gray-600">
                Account Status: {userData?.active ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
