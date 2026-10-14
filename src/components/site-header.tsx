import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { DISCLAIMER_SHORT, OFFICE, asset } from "@/data/guides";

const routeLinks = [
  { to: "/", label: "홈", exact: true },
  { to: "/notices", label: "공지사항", exact: false },
  { to: "/seek", label: "임차인 구함", exact: false },
  { to: "/papers", label: "법인대표 서류", exact: false },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link
          to="/"
          className="flex items-center"
          aria-label={`${OFFICE.name} 홈`}
          onClick={() => setOpen(false)}
        >
          <img src={asset("/logo-full.jpg")} alt={OFFICE.name} className="h-10 w-auto" />
        </Link>

        <nav aria-label="주 메뉴" className="hidden items-center gap-8 text-sm font-medium text-muted lg:flex">
          {routeLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              activeOptions={{ exact: link.exact }}
              className="text-muted hover:text-ink"
              activeProps={{ className: "text-forest" }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/" hash="office" className="text-muted hover:text-ink">
            회사 소개
          </Link>
          <Link to="/guides" className="rounded-full bg-forest px-4 py-2 text-paper hover:opacity-90">
            임차 가이드
          </Link>
        </nav>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-lg border border-line lg:hidden"
          aria-expanded={open}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav aria-label="주 메뉴" className="border-t border-line px-5 py-3 lg:hidden">
          <div className="flex flex-col">
            {routeLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="border-b border-line py-3 text-base"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/"
              hash="office"
              className="border-b border-line py-3 text-base"
              onClick={() => setOpen(false)}
            >
              회사 소개
            </Link>
            <Link to="/guides" className="py-3 text-base" onClick={() => setOpen(false)}>
              임차 가이드
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  const rows: [string, string][] = [
    ["상호", `${OFFICE.name} (${OFFICE.nameEn})`],
    ["대표이사", OFFICE.ceo],
    ["사업자등록번호", OFFICE.bizNo],
    ["본점 소재지", OFFICE.address],
    ["대표전화", OFFICE.tel],
    ["이메일", OFFICE.email],
  ];
  return (
    <footer className="border-t border-line bg-card text-ink">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3">
        <div>
          <img src={asset("/logo-full.jpg")} alt={OFFICE.name} className="h-12 w-auto" />
          <p className="mt-2 text-sm text-muted">{OFFICE.works.join(" · ")}</p>
          <nav aria-label="하단 메뉴" className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
            <Link to="/notices" className="hover:text-ink">
              공지사항
            </Link>
            <Link to="/guides" className="hover:text-ink">
              임차 가이드
            </Link>
            <Link to="/papers" className="hover:text-ink">
              법인대표 서류
            </Link>
            <Link to="/seek" className="hover:text-ink">
              임차인 구함
            </Link>
          </nav>
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm leading-relaxed text-muted">
          {rows.map(([label, value]) => (
            <div key={label} className="contents">
              <dt>{label}</dt>
              <dd className="text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="text-sm leading-relaxed text-muted">{DISCLAIMER_SHORT}</p>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-muted">
          © {new Date().getFullYear()} {OFFICE.nameEn}
        </p>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-forest focus:px-4 focus:py-2 focus:text-paper"
      >
        본문 바로가기
      </a>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
