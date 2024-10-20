import VerificationTable from "@/components/ui/admin/VerifyTableRow";

const VerificationPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          User Verification Requests
        </h1>
        <p className="text-gray-600">
          Review and manage user verification statuses
        </p>
      </header>

      <VerificationTable />
    </div>
  );
};

export default VerificationPage;
