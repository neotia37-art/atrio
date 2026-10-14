import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { OFFICE } from "@/data/guides";

const routeLinks = [{ to: "/", label: "홈", exact: true }] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-lg bg-forest font-serif text-lg text-paper">
            아
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-base font-semibold tracking-tight">{OFFICE.name}</span>
            <span className="block text-xs text-muted">{OFFICE.nameEn}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
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
          <a href="/#office" className="text-muted hover:text-ink">
            회사
          </a>
          <Link
            to="/guides"
            className="rounded-full bg-forest px-4 py-2 text-paper hover:opacity-90"
          >
            임차 가이드
          </Link>
        </nav>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-lg border border-line md:hidden"
          aria-expanded={open}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-line px-5 py-3 md:hidden">
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
            <a href="/#office" className="border-b border-line py-3 text-base" onClick={() => setOpen(false)}>
              회사
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-forest text-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl">{OFFICE.name}</p>
          <p className="mt-2 text-sm text-forest-soft">주택 임대 · 부동산 관리</p>
        </div>
        <div className="text-sm leading-relaxed text-forest-soft">
          <p>본점 {OFFICE.address}</p>
          <p className="mt-1">{OFFICE.works.join(" · ")}</p>
        </div>
        <p className="text-sm leading-relaxed text-forest-soft">
          임차 가이드는 집을 빌리기 전에 읽어 보시라고 정리한 일반 안내입니다. 회사 공고도 이 홈페이지에
          올립니다. 개별 계약은 등기부와 계약서로 판단합니다.
        </p>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
