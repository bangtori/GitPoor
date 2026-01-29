// src/app/api/sync-commits/route.ts
import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';

// UTC + 4시간 = GitPoor 기준 날짜
const getGitPoorDate = (isoString: string) => {
  const date = new Date(isoString);
  date.setHours(date.getHours() + 4);
  return date.toISOString().split('T')[0];
};

const inferLanguage = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  const map: Record<string, string> = {
    ts: 'TypeScript',
    tsx: 'TypeScript',
    js: 'JavaScript',
    jsx: 'JavaScript',
    swift: 'Swift',
    py: 'Python',
    java: 'Java',
    kt: 'Kotlin',
    go: 'Go',
    c: 'C',
    cpp: 'C++',
    css: 'CSS',
    html: 'HTML',
    vue: 'Vue',
    svelte: 'Svelte',
  };
  return map[ext || ''] || 'Other';
};

export async function POST() {
  try {
    const token = process.env.GITHUB_ACCESS_TOKEN;
    const octokit = new Octokit({ auth: token });
    const { data: user } = await octokit.rest.users.getAuthenticated();

    const now = new Date();
    const todayTarget = new Date(now.getTime() + 4 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const { data: events } =
      await octokit.rest.activity.listEventsForAuthenticatedUser({
        username: user.login,
        per_page: 30,
      });

    // 오늘자 푸시이벤트 필터링
    const todayPushEvents = events.filter(
      (event) =>
        event.type === 'PushEvent' &&
        getGitPoorDate(event.created_at!) === todayTarget,
    );

    // 커밋이 없으면 null 대신 비워진 데이터 반환
    if (todayPushEvents.length === 0) {
      return NextResponse.json({
        success: true,
        message: '오늘의 커밋이 없습니다.',
        data: {
          date: todayTarget,
          commit_count: 0,
          total_changes: 0,
          languages: [],
          is_success: false,
        },
      });
    }

    let totalAdditions = 0;
    let totalDeletions = 0;
    const languageSet = new Set<string>();
    const processedShas = new Set<string>();

    // 모든 푸시 이벤트에 대해 작업을 동시에 시작 -> 병렬 처리
    const eventPromises = todayPushEvents.map(async (event) => {
      const repoName = event.repo.name;
      const [owner, repo] = repoName.split('/');
      const payload = event.payload as any;

      // Organization 비상 로직
      let targetCommits: string[] =
        payload.commits?.map((c: any) => c.sha) || [];

      if (targetCommits.length === 0 && payload.head) {
        targetCommits = [payload.head];
      }

      // 한 이벤트 내의 커밋들도 병렬로 조회
      const commitPromises = targetCommits.map(async (sha) => {
        if (processedShas.has(sha)) return;

        try {
          const { data: commitDetail } = await octokit.rest.repos.getCommit({
            owner,
            repo,
            ref: sha,
          });

          // 날짜 재확인 (Head 추적 시 필수)
          const commitDate = commitDetail.commit.author?.date;
          if (commitDate && getGitPoorDate(commitDate) === todayTarget) {
            if (!processedShas.has(sha)) {
              // 이중 체크
              processedShas.add(sha);
              totalAdditions += commitDetail.stats?.additions || 0;
              totalDeletions += commitDetail.stats?.deletions || 0;

              commitDetail.files?.forEach((file) => {
                if (file.filename) {
                  const lang = inferLanguage(file.filename);
                  if (lang !== 'Other') languageSet.add(lang);
                }
              });
            }
          }
        } catch (err) {
          console.error(`❌ 조회 실패 (${sha}):`, err);
        }
      });

      await Promise.all(commitPromises);
    });

    await Promise.all(eventPromises);

    const resultData = {
      date: todayTarget,
      commit_count: processedShas.size,
      total_changes: totalAdditions + totalDeletions,
      languages: Array.from(languageSet),
      is_success: processedShas.size > 0,
    };

    console.log('[서버] 최종 결과:', resultData);

    // ==========================================
    // TODO: Supabase DB 저장 로직이 들어갈 자리
    // ==========================================

    return NextResponse.json({
      success: true,
      message: '분석 완료',
      data: resultData,
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
