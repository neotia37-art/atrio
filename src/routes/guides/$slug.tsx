import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-header";
import { DISCLAIMER, getGuide, guides, relatedGuides } from "@/data/guides";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.guide.title} · 임차 가이드` },
          { name: "description", content: loaderData.guide.dek },
        ]
      : [{ title: "글을 찾을 수 없습니다" }],
  }),
  notFoundComponent: MissingGuide,
  component: GuideArticle,
});

function GuideArticle() {
  const { guide } = Route.useLoaderData();
  const more = relatedGuides(guide.slug);
  const index = guides.findIndex((item) => item.slug === guide.slug);

  return (
    <SiteShell>
      <main id="main">
        <article className="mx-auto max-w-3xl px-5 py-10">
          <nav aria-label="현재 위치" className="text-sm text-muted">
            <Link to="/" className="hover:text-ink">
              홈
            </Link>
            <span aria-hidden="true"> / </span>
            <Link to="/guides" className="hover:text-ink">
              임차 가이드
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{guide.category}</span>
          </nav>
          <p className="mt-6 text-sm font-medium text-brass">
            {guide.category} · {String(index + 1).padStart(2, "0")} /{" "}
            {String(guides.length).padStart(2, "0")}
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight font-semibold">{guide.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{guide.dek}</p>
          <p className="mt-4 text-sm text-muted">
            {guide.published} · {guide.minutes}분 · {guide.sections.length}개 항목
          </p>
          <img
            src={guide.cover}
            alt={guide.coverAlt}
            className="mt-8 aspect-photo w-full rounded-2xl object-cover"
          />

          <div className="mt-10 space-y-10">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-serif text-2xl font-semibold">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {section.points ? (
                  <ul className="mt-4 space-y-3 border-l-2 border-brass pl-4">
                    {section.points.map((point) => (
                      <li key={point} className="leading-relaxed text-ink">
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <aside className="mt-12 rounded-2xl bg-forest-soft p-6">
            <h2 className="font-serif text-xl font-semibold">이 글에서 가져갈 것</h2>
            <ul className="mt-4 space-y-2">
              {guide.takeaway.map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </aside>

          <p className="mt-8 text-sm leading-relaxed text-muted">{DISCLAIMER}</p>
        </article>

        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-5 py-12">
            <h2 className="font-serif text-2xl font-semibold">이어서 읽기</h2>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {more.map((item) => (
                <li key={item.slug}>
                  <Link
                    to="/guides/$slug"
                    params={{ slug: item.slug }}
                    className="block py-4 hover:text-forest"
                  >
                    <span className="text-sm text-brass">{item.category}</span>
                    <span className="mt-1 block font-serif text-lg font-semibold">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

function MissingGuide() {
  return (
    <SiteShell>
      <main id="main" className="mx-auto max-w-3xl px-5 py-20">
        <h1 className="font-serif text-3xl font-semibold">이 글은 없습니다</h1>
        <p className="mt-3 text-muted">주소가 바뀌었거나, 아직 발행하지 않은 글입니다.</p>
        <Link to="/guides" className="mt-6 inline-flex text-forest">
          임차 가이드로 돌아가기
        </Link>
      </main>
    </SiteShell>
  );
}
