import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Headers } from '@/components/common/headers';
import GroupListSection from './_components/group/group-list';
import MyProfileSection from './_components/profile/my-profile-section'; // 👈 분리한 컴포넌트
import { MOCK_TODAY_SUMMARY_NO_COMMIT } from '@/mocks/today_commit';

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  // TODO: DB 조회 초기화 로직 연결
  const initialData = MOCK_TODAY_SUMMARY_NO_COMMIT;

  // 탭 로직
  const params = await searchParams;
  const view = params.view;
  const isGroupView = view === 'group';

  const GroupSection = () => (
    <main className="max-w-4xl mx-auto">
      <GroupListSection />
    </main>
  );

  return (
    <div className="min-h-screen bg-background text-white p-8">
      <Headers user={user} />

      {/* 모바일 */}
      <div className="block md:hidden">
        {isGroupView ? (
          <GroupSection />
        ) : (
          <MyProfileSection user={user} initialCommit={initialData} />
        )}
      </div>

      {/* 데스크탑 */}
      <div className="hidden md:grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <MyProfileSection user={user} initialCommit={initialData} />
        </div>

        <div className="col-span-12 lg:col-span-7 space-y-6">
          <h2 className="text-2xl font-bold mb-2">그룹 현황</h2>
          <GroupSection />
        </div>
      </div>
    </div>
  );
}
