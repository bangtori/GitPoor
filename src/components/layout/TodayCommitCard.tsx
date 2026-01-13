interface TodayCommitCardProps {
  currentFine?: number;
  hasCommit?: boolean;
  onRefresh?: () => void;
}

const TodayCommitCard = ({
  currentFine = 1000,
  hasCommit = false,
  onRefresh,
}: TodayCommitCardProps) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-gray-200">오늘의 커밋 🌿</h2>
      <div className="flex flex-col items-center justify-center py-8 bg-gray-900/50 rounded-xl border border-dashed border-gray-700">
        <span className="text-5xl mb-4">😴</span>
        <p className="text-gray-400">아직 커밋이 감지되지 않았습니다.</p>
        <p className="text-rose-500 font-bold mt-2">
          현재 벌금: {currentFine.toLocaleString()}원
        </p>
      </div>
      <button
        onClick={onRefresh}
        className="w-full mt-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold transition"
      >
        커밋 확인하기 (새로고침)
      </button>
    </div>
  );
};

export default TodayCommitCard;
