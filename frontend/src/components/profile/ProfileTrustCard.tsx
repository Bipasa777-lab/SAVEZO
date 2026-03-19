export default function ProfileTrustCard() {
  return (
    <div className="mt-8 p-5 rounded-xl border border-green-700 bg-green-900/20 flex items-center justify-between">
      
      <div className="flex items-center gap-4">
        <div className="text-3xl">🛡️</div>
        <div>
          <h3 className="font-semibold text-green-400">
            Verified Safe Creator
          </h3>
          <p className="text-sm text-gray-300">
            All 1,243 posts passed Savezo's AI nude + deepfake safety checks. Zero violations.
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-3xl font-bold text-green-400">100%</p>
        <p className="text-xs text-gray-400">Clean Record</p>
      </div>
    </div>
  );
}