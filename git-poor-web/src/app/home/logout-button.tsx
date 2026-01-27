'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/'); // 로그아웃 후 로그인 페이지로 이동
    router.refresh(); // 라우터 캐시 비우기
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-danger text-white px-4 py-2 rounded hover:bg-red-600"
    >
      로그아웃
    </button>
  );
}
