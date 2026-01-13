import type { User } from "@supabase/supabase-js";

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* 상단 헤더 */}
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            GitPoor
          </h1>
          <p className="text-gray-400 mt-1">
            <span className="text-emerald-400 font-semibold">
              {user.user_metadata.user_name}
            </span>
            님의 벌금 장부 💸
          </p>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition border border-gray-700"
        >
          로그아웃
        </button>
      </header>

      {/* 메인 컨텐츠 영역 */}
      <main className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
        {/* 1. 오늘의 상태 카드 */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-gray-200">
            오늘의 커밋 🌿
          </h2>
          <div className="flex flex-col items-center justify-center py-8 bg-gray-900/50 rounded-xl border border-dashed border-gray-700">
            <span className="text-5xl mb-4">😴</span>
            <p className="text-gray-400">아직 커밋이 감지되지 않았습니다.</p>
            <p className="text-rose-500 font-bold mt-2">현재 벌금: 1,000원</p>
          </div>
          <button className="w-full mt-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold transition">
            커밋 확인하기 (새로고침)
          </button>
        </div>

        {/* 2. 내 정보 카드 */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-gray-200">내 프로필</h2>
          <div className="flex items-center gap-4">
            <img
              src={user.user_metadata.avatar_url}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-emerald-500"
            />
            <div>
              <p className="font-bold text-lg">
                {user.user_metadata.full_name}
              </p>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
