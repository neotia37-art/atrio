import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site-header";
import { categories, guides } from "@/data/guides";

export const Route = createFileRoute("/guides/")({
  component: GuideIndex,
  head: () => ({
    meta: [
      { title: "임차 가이드 · 주식회사 아트리오" },
      {
        name: "description",
        content: "주택 임차 시 주의할 점. 등기부, 깡통전세, 특약, 전입·확정일자, 갱신 요구.",
      },
    ],
  }),
});

function GuideIndex() {
  const [category, setCategory] = useState("전체");
  const visible =
    category === "전체" ? guides : guides.filter((guide) => guide.category === category);

  return (
    <SiteShell>
      <main id="main" className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-sm font-medium text-brass">카테고리 · 다섯 편</p>
        <h1 className="mt-2 max-w-2xl font-serif text-4xl font-semibold">
          주택을 빌리기 전에 읽는 글
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          계약금, 잔금, 전입, 만기에는 순서가 있습니다. 아래 글은 그 순서대로 정리했습니다. 개별
          주택의 권리관계는 계약 전에 등기부와 함께 직접 확인하시고, 필요하면 전문가의 도움을
          받으시기 바랍니다.
        </p>

        <div
          role="group"
          aria-label="카테고리 선택"
          className="mt-8 flex gap-2 overflow-x-auto pb-1"
        >
          {categories.map((item) => {
            const selected = item === category;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => setCategory(item)}
                className={
                  selected
                    ? "h-11 shrink-0 rounded-full bg-forest px-4 text-sm text-paper"
                    : "h-11 shrink-0 rounded-full border border-line bg-card px-4 text-sm"
                }
              >
                {item}
              </button>
            );
          })}
        </div>

        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {visible.map((guide) => (
            <li key={guide.slug}>
              <Link
                to="/guides/$slug"
                params={{ slug: guide.slug }}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card"
              >
                <img
                  src={guide.cover}
                  alt={guide.coverAlt}
                  loading="lazy"
                  className="aspect-photo w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm text-brass">
                    {guide.category} · {guide.published}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold">{guide.title}</h2>
                  <p className="mt-3 flex-1 leading-relaxed text-muted">{guide.dek}</p>
                  <p className="mt-4 text-sm font-medium text-forest">{guide.minutes}분 읽기</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </SiteShell>
  );
}
