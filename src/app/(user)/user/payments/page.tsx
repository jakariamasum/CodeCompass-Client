/* eslint-disable react/no-unescaped-entities */
"use client";

import Pagination from "@/components/Pagination";
import { useUser } from "@/context/user.provider";
import { useUserPayments } from "@/hooks/payment.hook";
import { IPayment } from "@/types";
import Link from "next/link";
import React, { useState, useMemo } from "react";

const displayFields: (keyof IPayment)[] = [
  "_id",
  "amount",
  "currency",
  "customerEmail",
  "status",
  "subscriptionId",
  "productId",
];

export default function PaymentManagement() {
  const { user } = useUser();
  const { data: payments } = useUserPayments(user?.email as string);
  const [sortField, setSortField] = useState<keyof IPayment>("_id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentPerPage] = useState(10);
  const totalPages = payments
    ? Math.ceil(payments?.length / paymentPerPage)
    : 0;

  const sortedAndFilteredPayments = useMemo(() => {
    return payments
      ?.filter((payment: IPayment) =>
        Object.values(payment).some((value) =>
          value.toString().toLowerCase().includes(filter.toLowerCase())
        )
      )
      ?.sort((a: any, b: any) => {
        if (a[sortField] < b[sortField])
          return sortDirection === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField])
          return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [sortField, sortDirection, filter]);

  const handleSort = (field: keyof IPayment) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Filter payments..."
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <span className="text-gray-500">
                Total Payments: {sortedAndFilteredPayments?.length}
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {displayFields?.map((key) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort(key)}
                    >
                      {key}
                      {sortField === key && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedAndFilteredPayments?.map((payment: IPayment) => (
                  <tr key={payment._id} className="hover:bg-gray-50">
                    {displayFields?.map((field) => (
                      <td
                        key={field}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {field === "amount" ? (
                          `$${((payment[field] as number) / 100).toFixed(2)}`
                        ) : field === "productId" ? (
                          <Link
                            href={`/posts/${payment[field]}`}
                            className="underline text-gray-500 hover:text-[#009CA6]"
                          >
                            See Post
                          </Link>
                        ) : (
                          payment[field].toString()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
