export default function ProfileTrustCard() {
  return (
    <div
      className="
        mt-8 
        p-5 
        rounded-xl 
        border border-green-500/30 
        bg-green-500/10 
        dark:bg-green-500/10
        flex items-center justify-between 
        transition-colors
      "
    >
      <div className="flex items-center gap-4">
        <div className="text-3xl">
          🛡️
        </div>

        <div>
          <h3 className="font-semibold text-green-600 dark:text-green-400">
            Verified Safe Creator
          </h3>

          <p className="text-sm text-muted-foreground">
            All 1,243 posts passed Savezo's AI nude + deepfake safety checks.
            Zero violations.
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
          100%
        </p>

        <p className="text-xs text-muted-foreground">
          Clean Record
        </p>
      </div>
    </div>
  );
}