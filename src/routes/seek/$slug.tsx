import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-header";
import { PostArticle } from "@/components/post-article";
import { SEEK_NOTE, getSeek, seeks } from "@/data/board";

export const Route = createFileRoute("/seek/$slug")({
  loader: ({ params }) => {
    const post = getSeek(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} · 임차인 구함` },
          { name: "description", content: loaderData.post.dek },
        ]
      : [{ title: "글을 찾을 수 없습니다" }],
  }),
  notFoundComponent: MissingSeek,
  component: SeekArticle,
});

function SeekArticle() {
  const { post } = Route.useLoaderData();

  return (
    <SiteShell>
      <PostArticle
        crumbs={[
          { label: "홈", to: "/" },
          { label: "임차인 구함", to: "/seek" },
        ]}
        kicker={post.category}
        post={post}
        note={SEEK_NOTE}
        moreTitle="다른 구함"
        more={seeks
          .filter((item) => item.slug !== post.slug)
          .map((item) => ({
            title: item.title,
            category: item.category,
            to: "/seek/$slug" as const,
            slug: item.slug,
          }))}
      />
    </SiteShell>
  );
}

function MissingSeek() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl px-5 py-20">
        <h1 className="font-serif text-3xl font-semibold">이 구함 글은 없습니다</h1>
        <Link to="/seek" className="mt-6 inline-flex text-forest">
          임차인 구함으로 돌아가기
        </Link>
      </main>
    </SiteShell>
  );
}
