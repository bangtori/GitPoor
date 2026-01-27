'use client';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const supabase = createClient();

  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-8">GitPoor 로그인</h1>
      <button
        onClick={handleGitHubLogin}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        GitHub으로 계속하기
      </button>
    </div>
  );
}
