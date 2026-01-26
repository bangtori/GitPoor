import DefaultCard from "../common/DefaultCard";
import FilledButton from "../common/FilledButton";

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
    <DefaultCard title="오늘의 커밋 🌿">
      <div className="flex flex-col items-center justify-center py-8 bg-background-input rounded-xl border border-dashed border-gray-700">
        <span className="text-5xl mb-4">😴</span>
        <p className="text-gray-400">아직 커밋이 감지되지 않았습니다.</p>
        <p className="text-rose-500 font-bold mt-2">
          현재 벌금: {currentFine.toLocaleString()}원
        </p>
      </div>
      <FilledButton onClick={onRefresh}>
        "커밋 확인하기 (새로고침)"
      </FilledButton>
    </DefaultCard>
  );
};

export default TodayCommitCard;
