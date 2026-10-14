# 주식회사 아트리오

Atrio Co., Ltd. 홈페이지. 도시형생활주택 등 소형 주택을 임대·관리하는 주택임대 회사이며, 임차인이 계약 전에 읽는 가이드 다섯 편을 제공합니다.

- 개발: `npm run dev`
- 정적 빌드(GitHub Pages): `STATIC_SITE=1 npx vite build` → `.output/public`
- 배포: `main` 브랜치 푸시 시 `.github/workflows/pages.yml`이 GitHub Pages로 배포합니다.

회사 정보(대표이사, 사업자등록번호, 본점 소재지, 연락처)는 법인 설립 후 `src/data/guides.ts`의 `OFFICE`에 입력합니다.
