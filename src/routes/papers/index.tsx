import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-header";
import { PAPER_NOTE, papers } from "@/data/board";

export const Route = createFileRoute("/papers/")({
  component: PaperIndex,
  head: () => ({
    meta: [
      { title: "법인대표 보관 서류 · 주식회사 아트리오" },
      {
        name: "description",
        content: "임차인이 법인일 때 대표만 작성하고 대표가 보관하는 서류.",
      },
    ],
  }),
});

function PaperIndex() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-sm font-medium text-brass">카테고리 · 작성·보관</p>
        <h1 className="mt-2 max-w-3xl font-serif text-4xl font-semibold">
          임차인 법인대표만 작성하고 보관하는 서류
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          사택 계약에서 임차인은 법인이고, 아래 네 가지는 그 대표만 씁니다. 임대인에게 내는 등기사항증명서나
          인감증명서와 다릅니다. 작성한 원본은 대표 보관철에 두고, 이 사이트에는 올리지 않습니다.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {papers.map((post, index) => (
            <li key={post.slug}>
              <Link
                to="/papers/$slug"
                params={{ slug: post.slug }}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card"
              >
                <img src={post.cover} alt={post.coverAlt} className="aspect-photo w-full object-cover" />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm text-brass">
                    {String(index + 1).padStart(2, "0")} · {post.category}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold">{post.title}</h2>
                  <p className="mt-3 flex-1 leading-relaxed text-muted">{post.dek}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">{PAPER_NOTE}</p>
      </main>
    </SiteShell>
  );
}
