import type { AuthProps } from "../../types";

const Headers = ({ user, onLogout }: AuthProps) => {
  return (
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
  );
};

export default Headers;
