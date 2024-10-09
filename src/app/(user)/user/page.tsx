"use client";

import React, { useEffect, useRef } from "react";

type AnalyticsData = {
  views: number;
  shares: number;
  comments: number;
  readersSummary: number[];
  reactionsSummary: { likes: number; loves: number; wows: number }[];
  commentsSummary: number[];
};

const mockData: AnalyticsData = {
  views: 172957,
  shares: 384,
  comments: 41,
  readersSummary: Array(30)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10000)),
  reactionsSummary: Array(30)
    .fill(0)
    .map(() => ({
      likes: Math.floor(Math.random() * 100),
      loves: Math.floor(Math.random() * 50),
      wows: Math.floor(Math.random() * 25),
    })),
  commentsSummary: Array(30)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10)),
};

const ContentAnalyticsDashboard: React.FC = () => {
  const readersSummaryRef = useRef<HTMLCanvasElement>(null);
  const reactionsSummaryRef = useRef<HTMLCanvasElement>(null);
  const commentsSummaryRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const drawGraph = (
      canvas: HTMLCanvasElement,
      data: number[],
      color: string,
      fillColor: string
    ) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const max = Math.max(...data);

      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(0, height);

      data.forEach((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - (value / max) * height;
        ctx.lineTo(x, y);
      });

      ctx.lineTo(width, height);
      ctx.closePath();

      ctx.fillStyle = fillColor;
      ctx.fill();

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawMultiLineGraph = (
      canvas: HTMLCanvasElement,
      data: { likes: number; loves: number; wows: number }[]
    ) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const max = Math.max(...data.flatMap((d) => [d.likes, d.loves, d.wows]));

      ctx.clearRect(0, 0, width, height);

      const drawLine = (values: number[], color: string) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        values.forEach((value, index) => {
          const x = (index / (values.length - 1)) * width;
          const y = height - (value / max) * height;
          if (index === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });

        ctx.stroke();
      };

      drawLine(
        data.map((d) => d.likes),
        "#8b5cf6"
      );
      drawLine(
        data.map((d) => d.loves),
        "#ec4899"
      );
      drawLine(
        data.map((d) => d.wows),
        "#3b82f6"
      );
    };

    if (readersSummaryRef.current) {
      drawGraph(
        readersSummaryRef.current,
        mockData.readersSummary,
        "#8b5cf6",
        "rgba(139, 92, 246, 0.1)"
      );
    }

    if (reactionsSummaryRef.current) {
      drawMultiLineGraph(
        reactionsSummaryRef.current,
        mockData.reactionsSummary
      );
    }

    if (commentsSummaryRef.current) {
      drawGraph(
        commentsSummaryRef.current,
        mockData.commentsSummary,
        "#10b981",
        "rgba(16, 185, 129, 0.1)"
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-500 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Content Analytics Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Views</h2>
          <p className="text-4xl font-bold">
            {mockData.views.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Shares</h2>
          <p className="text-4xl font-bold">
            {mockData.shares.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Comments</h2>
          <p className="text-4xl font-bold">
            {mockData.comments.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="space-y-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Readers Summary</h2>
          <canvas
            ref={readersSummaryRef}
            width={800}
            height={200}
            className="w-full"
          />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Reactions Summary</h2>
          <canvas
            ref={reactionsSummaryRef}
            width={800}
            height={200}
            className="w-full"
          />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Comments Summary</h2>
          <canvas
            ref={commentsSummaryRef}
            width={800}
            height={200}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ContentAnalyticsDashboard;
