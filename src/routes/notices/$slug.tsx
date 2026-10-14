import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-header";
import { PostArticle } from "@/components/post-article";
import { NOTICE_NOTE, getNotice, notices } from "@/data/board";

export const Route = createFileRoute("/notices/$slug")({
  loader: ({ params }) => {
    const post = getNotice(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} · 공지사항` },
          { name: "description", content: loaderData.post.dek },
        ]
      : [{ title: "공지를 찾을 수 없습니다" }],
  }),
  notFoundComponent: MissingNotice,
  component: NoticeArticle,
});

function NoticeArticle() {
  const { post } = Route.useLoaderData();
  const index = notices.findIndex((item) => item.slug === post.slug);

  return (
    <SiteShell>
      <PostArticle
        crumbs={[
          { label: "홈", to: "/" },
          { label: "공지사항", to: "/notices" },
        ]}
        kicker={`${post.category} · ${String(index + 1).padStart(2, "0")} / 02`}
        post={post}
        note={NOTICE_NOTE}
        moreTitle="다른 공지"
        more={notices
          .filter((item) => item.slug !== post.slug)
          .map((item) => ({
            title: item.title,
            category: item.category,
            to: "/notices/$slug" as const,
            slug: item.slug,
          }))}
      />
    </SiteShell>
  );
}

function MissingNotice() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl px-5 py-20">
        <h1 className="font-serif text-3xl font-semibold">이 공지는 없습니다</h1>
        <Link to="/notices" className="mt-6 inline-flex text-forest">
          공지사항으로 돌아가기
        </Link>
      </main>
    </SiteShell>
  );
}
