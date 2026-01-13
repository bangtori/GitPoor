import type { User } from "@supabase/supabase-js";

interface UserProfileCardProps {
  user: User;
}

const UserProfileCard = ({ user }: UserProfileCardProps) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-gray-200">내 프로필</h2>
      <div className="flex items-center gap-4">
        <img
          src={user.user_metadata?.avatar_url || ""}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-emerald-500"
        />
        <div>
          <p className="font-bold text-lg">
            {user.user_metadata?.full_name || user.email}
          </p>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
