import type { AuthProps } from "../types";
import Headers from "../components/layout/Headers";
import TodayCommitCard from "../components/layout/TodayCommitCard";
import UserProfileCard from "../components/layout/UserProfileCard";

const Dashboard = ({ user, onLogout }: AuthProps) => {
  const handleRefresh = () => {
    // TODO: 커밋 확인 로직 구현
    console.log("커밋 확인 중...");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* 상단 헤더 */}
      <Headers user={user} onLogout={onLogout} />

      {/* 메인 컨텐츠 영역 */}
      <main className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
        {/* 1. 오늘의 커밋 카드 */}
        <TodayCommitCard onRefresh={handleRefresh} />

        {/* 2. 내 프로필 카드 */}
        <UserProfileCard user={user} />
      </main>
    </div>
  );
};

export default Dashboard;
