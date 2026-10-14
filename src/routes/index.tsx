import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { SiteShell } from "@/components/site-header";
import { OFFICE, guides } from "@/data/guides";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "주식회사 아트리오 · 주택 임차 가이드" },
      {
        name: "description",
        content: "계약 전에 읽는 주택 임차 주의사항. 등기부, 깡통전세, 특약, 전입신고, 계약갱신.",
      },
    ],
  }),
});

function Home() {
  const [lead, ...rest] = guides;

  return (
    <SiteShell>
      <main>
        <section className="mx-auto grid max-w-6xl items-end gap-10 px-5 py-12 md:grid-cols-12 md:py-16">
          <div className="md:col-span-6">
            <p className="text-sm font-medium tracking-wide text-brass">세종 · 주택 임대</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight font-semibold md:text-5xl">
              계약서에 사인하기 전에 읽어 두세요
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {OFFICE.name}는 주택과 건물을 임대하고 관리합니다. 임차하시는 분이 계약 전에 확인하실
              등기부, 선순위 채권, 특약, 전입과 확정일자를 다섯 편으로 올려 두었습니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/guides"
                className="inline-flex h-12 items-center rounded-full bg-forest px-5 text-sm font-medium text-paper"
              >
                임차 가이드 읽기
              </Link>
              <a
                href="#office"
                className="inline-flex h-12 items-center rounded-full border border-line bg-card px-5 text-sm font-medium"
              >
                회사 소개
              </a>
            </div>
          </div>
          <figure className="md:col-span-6">
            <img
              src="/photos/living.jpg"
              alt="아침 빛이 드는 거실"
              className="aspect-video w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-3 text-sm text-muted">
              집을 고르기 전에, 그 집의 권리부터 봅니다.
            </figcaption>
          </figure>
        </section>

        <section className="border-t border-line bg-card">
          <div className="mx-auto max-w-6xl px-5 py-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-brass">카테고리</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold">임차 가이드</h2>
                <p className="mt-3 max-w-xl text-muted">
                  주택을 빌릴 때 빠지기 쉬운 순서를, 계약 전부터 만기까지 다섯 편으로 정리했습니다.
                </p>
              </div>
              <Link to="/guides" className="inline-flex items-center gap-1 text-sm font-medium text-forest">
                다섯 편 모두 보기
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <article className="mt-8 grid overflow-hidden rounded-2xl border border-line bg-paper md:grid-cols-2">
              <Link to="/guides/$slug" params={{ slug: lead.slug }} className="block">
                <img src={lead.cover} alt={lead.coverAlt} className="h-full max-h-80 w-full object-cover md:max-h-none" />
              </Link>
              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <p className="text-sm text-brass">
                    {lead.category} · {lead.published}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl font-semibold md:text-3xl">
                    <Link to="/guides/$slug" params={{ slug: lead.slug }}>
                      {lead.title}
                    </Link>
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">{lead.dek}</p>
                </div>
                <Link
                  to="/guides/$slug"
                  params={{ slug: lead.slug }}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest"
                >
                  <Clock3 className="size-4" />
                  {lead.minutes}분 읽기
                </Link>
              </div>
            </article>

            <ol className="mt-4 divide-y divide-line border-y border-line">
              {rest.map((guide, index) => (
                <li key={guide.slug}>
                  <Link
                    to="/guides/$slug"
                    params={{ slug: guide.slug }}
                    className="grid grid-cols-12 items-center gap-3 py-5 hover:bg-paper md:gap-6"
                  >
                    <span className="col-span-2 font-serif text-xl text-brass tabular-nums md:col-span-1">
                      0{index + 2}
                    </span>
                    <span className="col-span-10 md:col-span-3 text-sm text-muted">{guide.category}</span>
                    <span className="col-span-12 font-serif text-lg font-semibold md:col-span-6">{guide.title}</span>
                    <span className="col-span-12 text-sm text-muted md:col-span-2 md:text-right">
                      {guide.minutes}분 · {guide.published.slice(5)}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="office" className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-sm font-medium text-brass">회사</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold">집을 임대하고, 권리를 먼저 말합니다</h2>
            <p className="mt-4 leading-relaxed text-muted">
              {OFFICE.name}는 영문으로 {OFFICE.nameEn}입니다. 주택과 비주거용 건물을 임대하고, 임대주택을
              관리합니다. 중개사무소가 아니라 임대 회사입니다. 본점은 {OFFICE.area}에 둡니다.
            </p>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-forest" />
                <div>
                  <dt className="font-medium">본점</dt>
                  <dd className="text-muted">{OFFICE.address}</dd>
                </div>
              </div>
              <div>
                <dt className="font-medium">하는 일</dt>
                <dd className="mt-1 text-muted">{OFFICE.works.join(" · ")}</dd>
              </div>
              <div>
                <dt className="font-medium">공고</dt>
                <dd className="mt-1 text-muted">현재 게시된 회사 공고는 없습니다. 공고는 이 홈페이지에 올립니다.</dd>
              </div>
            </dl>
          </div>
          <div className="overflow-hidden rounded-2xl md:col-span-7">
            <img
              src="/photos/street.jpg"
              alt="주택가 골목"
              className="aspect-photo w-full object-cover"
            />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
