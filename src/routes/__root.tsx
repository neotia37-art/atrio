import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

import { asset } from "@/data/guides";

const APP_NAME = "주식회사 아트리오";
const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "https://neotia37-art.github.io/atrio").replace(
  /\/$/,
  "",
);
const DESCRIPTION =
  "주식회사 아트리오(Atrio Co., Ltd.)는 도시형생활주택 등 소형 주택을 임대·관리하는 주택임대 회사입니다. 임차인을 위한 계약 전 확인 가이드를 제공합니다.";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#1e3a32" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ko_KR" },
      { property: "og:site_name", content: APP_NAME },
      { property: "og:title", content: APP_NAME },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}/og.jpg` },
      { property: "og:image:alt", content: "주식회사 아트리오" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: APP_NAME },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: `${SITE_URL}/og.jpg` },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: asset("/favicon.svg") },
      { rel: "stylesheet", href: appCss },
      { rel: "apple-touch-icon", href: asset("/__grok/icon-180.png") },
      ...(import.meta.env.VITE_STATIC_SITE === "1"
        ? []
        : [{ rel: "manifest", href: "/__grok/manifest.webmanifest" }]),
    ],
  }),
  component: () => (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
