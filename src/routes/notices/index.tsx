import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-header";
import { notices } from "@/data/board";

export const Route = createFileRoute("/notices/")({
  component: NoticeIndex,
  head: () => ({
    meta: [
      { title: "공지사항 · 주식회사 아트리오" },
      {
        name: "description",
        content: "개업 소식과 장기일반민간임대주택 등록 신고 소식.",
      },
    ],
  }),
});

function NoticeIndex() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-sm font-medium text-brass">공지사항</p>
        <h1 className="mt-2 max-w-2xl font-serif text-4xl font-semibold">회사가 올리는 소식</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          개업과 장기주택임대 등록 신고를 먼저 올립니다. 등록번호와 대상 주택은 본점의 등록증명서로
          확인합니다. 이 목록이 증명서를 대신하지 않습니다.
        </p>
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {notices.map((post) => (
            <li key={post.slug}>
              <Link
                to="/notices/$slug"
                params={{ slug: post.slug }}
                className="grid gap-3 py-6 md:grid-cols-12 md:items-center"
              >
                <span className="text-sm text-brass md:col-span-2">{post.category}</span>
                <span className="font-serif text-2xl font-semibold md:col-span-7">{post.title}</span>
                <span className="text-sm text-muted md:col-span-3 md:text-right">{post.published}</span>
                <span className="leading-relaxed text-muted md:col-span-9 md:col-start-3">{post.dek}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </SiteShell>
  );
}
