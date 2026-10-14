import { Link } from "@tanstack/react-router";
import type { Post } from "@/data/board";

type Crumb = {
  label: string;
  to: "/" | "/notices" | "/papers" | "/seek";
};

type More = {
  title: string;
  category: string;
  to: "/notices/$slug" | "/papers/$slug" | "/seek/$slug";
  slug: string;
};

export function PostArticle({
  crumbs,
  kicker,
  post,
  note,
  moreTitle,
  more,
}: {
  crumbs: Crumb[];
  kicker: string;
  post: Post;
  note: string;
  moreTitle: string;
  more: More[];
}) {
  return (
    <>
      <article className="mx-auto max-w-3xl px-5 py-10">
        <p className="text-sm text-muted">
          {crumbs.map((crumb, index) => (
            <span key={crumb.to}>
              {index > 0 ? <span aria-hidden="true"> / </span> : null}
              <Link to={crumb.to} className="hover:text-ink">
                {crumb.label}
              </Link>
            </span>
          ))}
          <span aria-hidden="true"> / </span>
          <span>{post.category}</span>
        </p>
        <p className="mt-6 text-sm font-medium text-brass">{kicker}</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight font-semibold">{post.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{post.dek}</p>
        <p className="mt-4 text-sm text-muted">
          {post.published} · {post.minutes}분
        </p>
        <img src={post.cover} alt={post.coverAlt} className="mt-8 aspect-photo w-full rounded-2xl object-cover" />

        <div className="mt-10 space-y-10">
          {post.sections.map((section) => (
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
                    <li key={point} className="leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <aside className="mt-12 rounded-2xl bg-forest-soft p-6">
          <h2 className="font-serif text-xl font-semibold">적어 둘 것</h2>
          <ul className="mt-4 space-y-2">
            {post.takeaway.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </aside>
        <p className="mt-8 text-sm leading-relaxed text-muted">{note}</p>
      </article>

      {more.length > 0 ? (
        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-5 py-12">
            <h2 className="font-serif text-2xl font-semibold">{moreTitle}</h2>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {more.map((item) => (
                <li key={item.slug}>
                  <Link to={item.to} params={{ slug: item.slug }} className="block py-4 hover:text-forest">
                    <span className="text-sm text-brass">{item.category}</span>
                    <span className="mt-1 block font-serif text-lg font-semibold">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
