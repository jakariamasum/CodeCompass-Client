/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useRef, useState } from "react";

type ActivityLog = {
  id: string;
  userName: string;
  email: string;
  role: string;
  action: string;
  timestamp: string;
};

type MonthlyData = {
  month: string;
  payments: number;
  posts: number;
  userActivity: number;
};

const mockActivityLogs: ActivityLog[] = [
  {
    id: "1",
    userName: "John Doe",
    email: "john@example.com",
    role: "User",
    action: "Login",
    timestamp: "2023-06-15 10:30:00",
  },
  {
    id: "2",
    userName: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    action: "View Dashboard",
    timestamp: "2023-06-15 11:15:00",
  },
  {
    id: "3",
    userName: "Bob Johnson",
    email: "bob@example.com",
    role: "Editor",
    action: "Edit Post",
    timestamp: "2023-06-15 12:00:00",
  },
  {
    id: "4",
    userName: "Alice Brown",
    email: "alice@example.com",
    role: "User",
    action: "Comment",
    timestamp: "2023-06-15 13:45:00",
  },
  {
    id: "5",
    userName: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Moderator",
    action: "Delete Comment",
    timestamp: "2023-06-15 14:30:00",
  },
];

const mockMonthlyData: MonthlyData[] = [
  { month: "Jan", payments: 1000, posts: 50, userActivity: 5000 },
  { month: "Feb", payments: 1200, posts: 60, userActivity: 5500 },
  { month: "Mar", payments: 1100, posts: 55, userActivity: 5200 },
  { month: "Apr", payments: 1300, posts: 65, userActivity: 5800 },
  { month: "May", payments: 1500, posts: 70, userActivity: 6000 },
  { month: "Jun", payments: 1400, posts: 68, userActivity: 5900 },
];

const SecurityFeatures: React.FC = () => {
  const [activityLogs, setActivityLogs] =
    useState<ActivityLog[]>(mockActivityLogs);
  const [monthlyData, setMonthlyData] =
    useState<MonthlyData[]>(mockMonthlyData);

  const graphRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const drawGraph = () => {
      const canvas = graphRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const padding = 40;
      const graphWidth = width - padding * 2;
      const graphHeight = height - padding * 2;

      ctx.clearRect(0, 0, width, height);

      // Draw axes
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, height - padding);
      ctx.lineTo(width - padding, height - padding);
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();

      // Draw data lines
      const drawLine = (data: number[], color: string) => {
        const max = Math.max(...data);
        ctx.beginPath();
        ctx.strokeStyle = color;
        data.forEach((value, index) => {
          const x = padding + (index / (data.length - 1)) * graphWidth;
          const y = height - padding - (value / max) * graphHeight;
          if (index === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
      };

      drawLine(
        monthlyData.map((d) => d.payments),
        "#4ade80"
      );
      drawLine(
        monthlyData.map((d) => d.posts),
        "#3b82f6"
      );
      drawLine(
        monthlyData.map((d) => d.userActivity),
        "#ec4899"
      );

      // Draw x-axis labels
      ctx.fillStyle = "#ffffff";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      monthlyData.forEach((data, index) => {
        const x = padding + (index / (monthlyData.length - 1)) * graphWidth;
        ctx.fillText(data.month, x, height - padding + 20);
      });
    };

    drawGraph();
  }, [monthlyData]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Security Features Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Activity Logs</h2>
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Action</th>
                <th className="p-3 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {activityLogs.map((log) => (
                <tr key={log.id} className="border-b border-gray-700">
                  <td className="p-3">{log.userName}</td>
                  <td className="p-3">{log.email}</td>
                  <td className="p-3">{log.role}</td>
                  <td className="p-3">{log.action}</td>
                  <td className="p-3">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Monthly Statistics</h2>
        <div className="bg-gray-800 p-4 rounded-lg">
          <canvas ref={graphRef} width={800} height={400} className="w-full" />
          <div className="flex justify-center mt-4 space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-400 mr-2"></div>
              <span>Payments</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 mr-2"></div>
              <span>Posts</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-pink-500 mr-2"></div>
              <span>User Activity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;
