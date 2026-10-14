import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-header";
import { OFFICE, asset } from "@/data/guides";

const entries = [
  {
    to: "/notices",
    title: "공지사항",
    text: "문을 열었다는 소식, 그리고 장기주택임대 등록을 신고했다는 소식입니다.",
  },
  {
    to: "/guides",
    title: "임차 가이드",
    text: "계약서에 사인하기 전에 읽어 두시면 좋은 글 다섯 편입니다.",
  },
  {
    to: "/papers",
    title: "법인대표 서류",
    text: "회사가 집을 빌릴 때, 대표님만 쓰시고 보관하시는 서류입니다.",
  },
  {
    to: "/seek",
    title: "임차인 구함",
    text: "직접 사실 분과, 사택이 필요하신 회사를 찾습니다. 금액은 만나서 말씀드립니다.",
  },
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
        <section className="mx-auto max-w-6xl px-5 pt-16 pb-8 md:pt-28">
          <h1 className="max-w-3xl text-4xl leading-tight font-bold tracking-tight text-ink md:text-6xl">
            계약 전에
            <br />
            권리를 먼저 말합니다
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            {OFFICE.name}입니다. 소형 주택을 빌려 드리고, 그 집을 관리합니다. 필요하신 글은 아래에서 고르세요.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/guides"
              className="inline-flex h-12 items-center rounded-full bg-forest px-5 text-sm font-semibold text-paper"
            >
              임차 가이드
            </Link>
            <Link
              to="/notices"
              className="inline-flex h-12 items-center rounded-full bg-card px-5 text-sm font-semibold text-ink"
            >
              공지 보기
            </Link>
          </div>
          <img
            src={asset("/photos/courtyard.jpg")}
            alt="주택 안의 중정. 나무 한 그루와 자갈, 아침 빛"
            className="mt-14 aspect-video w-full rounded-3xl object-cover"
          />
        </section>

        <section className="bg-card">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">무엇을 보시겠어요</h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {entries.map((entry) => (
                <li key={entry.to}>
                  <Link
                    to={entry.to}
                    className="flex h-full flex-col rounded-3xl bg-paper p-8 hover:bg-forest-soft"
                  >
                    <span className="text-2xl font-bold tracking-tight">{entry.title}</span>
                    <span className="mt-3 leading-relaxed text-muted">{entry.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="office" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            중개하지 않습니다.
            <br />
            임대합니다.
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-muted">
            {OFFICE.name}({OFFICE.nameEn})는 도시형생활주택 등 소형 주택을 임대하고 운영합니다.{" "}
            {OFFICE.outlook}
          </p>
          <dl className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-3">
            <div>
              <dt className="text-sm text-muted">주요 사업</dt>
              <dd className="mt-2 font-medium">{OFFICE.works.join(" · ")}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">본점</dt>
              <dd className="mt-2 font-medium">{OFFICE.address}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">공고</dt>
              <dd className="mt-2 font-medium">
                <Link to="/notices/$slug" params={{ slug: "opening" }} className="hover:text-forest">
                  개업 소식
                </Link>
                <span className="text-muted"> · </span>
                <Link
                  to="/notices/$slug"
                  params={{ slug: "long-term-registration" }}
                  className="hover:text-forest"
                >
                  등록 신고
                </Link>
              </dd>
            </div>
          </dl>
        </section>
      </main>
    </SiteShell>
  );
}
