import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-header";
import { OFFICE, asset } from "@/data/guides";

const tabs = [
  { to: "/notices", label: "공지사항" },
  { to: "/guides", label: "임차 가이드" },
  { to: "/papers", label: "법인대표 서류" },
  { to: "/seek", label: "임차인 구함" },
] as const;

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "주식회사 아트리오 | 주택임대" },
      {
        name: "description",
        content:
          "주식회사 아트리오는 도시형생활주택 등 소형 주택을 임대·관리합니다. 공지, 임차 가이드, 법인대표 보관 서류, 임차인 구함을 올립니다.",
      },
    ],
  }),
});

function Home() {
  return (
    <SiteShell>
      <main id="main">
        <section className="relative min-h-screen">
          <img
            src={asset("/photos/courtyard.jpg")}
            alt="주택 안의 중정. 나무 한 그루와 자갈, 아침 빛"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/55" />
          <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-end px-5 pt-24 pb-12">
            <p className="text-sm font-medium tracking-wide text-paper">주택 임대</p>
            <h1 className="mt-3 max-w-xl font-serif text-4xl leading-tight font-semibold text-paper md:text-6xl">
              {OFFICE.name}
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-paper md:text-lg">
              주택을 임대하고, 계약 전에 권리를 먼저 말합니다.
            </p>
            <nav className="mt-8 flex flex-wrap gap-2" aria-label="내용">
              {tabs.map((tab) => (
                <Link
                  key={tab.to}
                  to={tab.to}
                  className="inline-flex h-12 items-center rounded-full bg-paper px-5 text-sm font-medium text-ink"
                >
                  {tab.label}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <section
          id="office"
          className="mx-auto grid max-w-6xl scroll-mt-20 gap-8 px-5 py-16 md:grid-cols-12"
        >
          <div className="md:col-span-5">
            <p className="text-sm font-medium text-brass">회사 소개</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold">
              권리관계를 먼저 설명하는 임대 회사
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              {OFFICE.name}({OFFICE.nameEn})는 도시형생활주택 등 소형 주택을 임대하고 운영·관리하는
              주택임대 회사입니다. 부동산 중개업을 하지 않으며, 임대인으로서 계약 조건과 권리관계를
              투명하게 안내하는 것을 원칙으로 합니다. {OFFICE.outlook}
            </p>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-medium">주요 사업</dt>
                <dd className="mt-1 text-muted">{OFFICE.works.join(" · ")}</dd>
              </div>
              <div>
                <dt className="font-medium">본점 소재지</dt>
                <dd className="mt-1 text-muted">{OFFICE.address}</dd>
              </div>
              <div>
                <dt className="font-medium">공고</dt>
                <dd className="mt-1 text-muted">
                  <Link to="/notices/$slug" params={{ slug: "opening" }} className="text-forest">
                    개업 소식
                  </Link>
                  {" · "}
                  <Link
                    to="/notices/$slug"
                    params={{ slug: "long-term-registration" }}
                    className="text-forest"
                  >
                    장기주택임대 등록 신고
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
          <div className="overflow-hidden rounded-2xl md:col-span-7">
            <img
              src={asset("/photos/street.jpg")}
              alt="주택가 골목 풍경"
              loading="lazy"
              className="aspect-photo w-full object-cover"
            />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
