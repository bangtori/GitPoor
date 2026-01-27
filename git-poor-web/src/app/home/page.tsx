import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import LogoutButton from './logout-button'; // 아래에서 만들 컴포넌트

export default async function HomePage() {
  console.log('HomePage');
  const supabase = await createClient();

  // 서버에서 유저 정보 가져오기 (보안상 안전함)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 만약 유저가 없으면 로그인 페이지로 튕겨내기 (이중 보안)
  if (!user) {
    console.log('User 정보가 없습니다.');
    redirect('/');
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">메인 대시보드</h1>
      <p className="mb-4">환영합니다! {user.email}님 👋</p>
      <p>여기는 로그인한 유저만 들어올 수 있는 보호된 페이지입니다.</p>

      <div className="mt-8">
        <LogoutButton />
      </div>
    </div>
  );
}
