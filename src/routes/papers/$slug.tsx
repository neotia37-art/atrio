import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-header";
import { PostArticle } from "@/components/post-article";
import { PAPER_NOTE, getPaper, papers } from "@/data/board";

export const Route = createFileRoute("/papers/$slug")({
  loader: ({ params }) => {
    const post = getPaper(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} · 법인대표 서류` },
          { name: "description", content: loaderData.post.dek },
        ]
      : [{ title: "서류를 찾을 수 없습니다" }],
  }),
  notFoundComponent: MissingPaper,
  component: PaperArticle,
});

function PaperArticle() {
  const { post } = Route.useLoaderData();
  const index = papers.findIndex((item) => item.slug === post.slug);

  return (
    <SiteShell>
      <PostArticle
        crumbs={[
          { label: "홈", to: "/" },
          { label: "법인대표 서류", to: "/papers" },
        ]}
        kicker={`${post.category} · ${String(index + 1).padStart(2, "0")} / 04`}
        post={post}
        note={PAPER_NOTE}
        moreTitle="같은 보관철"
        more={papers
          .filter((item) => item.slug !== post.slug)
          .map((item) => ({
            title: item.title,
            category: item.category,
            to: "/papers/$slug" as const,
            slug: item.slug,
          }))}
      />
    </SiteShell>
  );
}

function MissingPaper() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl px-5 py-20">
        <h1 className="font-serif text-3xl font-semibold">이 서류 안내는 없습니다</h1>
        <Link to="/papers" className="mt-6 inline-flex text-forest">
          서류 목록으로 돌아가기
        </Link>
      </main>
    </SiteShell>
  );
}
