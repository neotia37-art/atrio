import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-header";
import { SEEK_NOTE, seeks } from "@/data/board";

export const Route = createFileRoute("/seek/")({
  component: SeekIndex,
  head: () => ({
    meta: [
      { title: "임차인 구함 · 주식회사 아트리오" },
      {
        name: "description",
        content: "실거주 임차인과 사택이 필요한 법인 임차인을 찾습니다.",
      },
    ],
  }),
});

function SeekIndex() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-sm font-medium text-brass">임차인 구함</p>
        <h1 className="mt-2 max-w-2xl font-serif text-4xl font-semibold">들어올 분을 찾습니다</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          임대인인 아트리오가 주택의 임차인을 구합니다. 개인이 직접 거주하는 계약과, 법인이 사택으로 빌리는
          계약을 나눕니다. 호실과 금액은 공개 매물처럼 적지 않고, 본점에서 등기부와 함께 안내합니다.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {seeks.map((post) => (
            <li key={post.slug}>
              <Link
                to="/seek/$slug"
                params={{ slug: post.slug }}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card"
              >
                <img src={post.cover} alt={post.coverAlt} className="aspect-photo w-full object-cover" />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm text-brass">
                    {post.category} · {post.published}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold">{post.title}</h2>
                  <p className="mt-3 flex-1 leading-relaxed text-muted">{post.dek}</p>
                  <p className="mt-4 text-sm font-medium text-forest">조건 읽기</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">{SEEK_NOTE}</p>
      </main>
    </SiteShell>
  );
}
