# Tridge Simulator Hub — 배포 가이드

## 1. 프로젝트 구조

```
tridge-simulator-hub/
├── index.html              # Vite 엔트리 HTML
├── package.json            # 의존성 (React, Recharts, Lucide, Tailwind)
├── vite.config.js          # Vite 빌드 설정
├── tailwind.config.js      # Tailwind CSS 설정
├── postcss.config.js       # PostCSS 플러그인
├── vercel.json             # Vercel SPA 라우팅
├── .env.example            # 환경변수 템플릿
├── .gitignore
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx            # React 마운트 포인트
    ├── index.css           # Tailwind 지시자
    └── App.jsx             # 메인 앱 (원본에서 API키→환경변수 변환 완료)
```

## 2. 로컬 개발 환경 세팅

### 사전 요구사항
- Node.js 18+ (https://nodejs.org)
- Git

### 초기 세팅
```bash
# 1) 프로젝트 폴더 이동
cd tridge-simulator-hub

# 2) 의존성 설치
npm install

# 3) 환경변수 설정
cp .env.example .env
# .env 파일을 열어 Gemini API 키 입력:
# VITE_GEMINI_API_KEY=your_actual_key_here

# 4) 개발 서버 실행
npm run dev
# → http://localhost:5173 에서 확인
```

## 3. Vercel 배포 (추천 — 무료, 가장 빠름)

### Step 1: GitHub 저장소 생성 & 푸시
```bash
cd tridge-simulator-hub
git init
git add .
git commit -m "initial commit"

# GitHub에서 새 repo 생성 후:
git remote add origin https://github.com/YOUR_USERNAME/tridge-simulator-hub.git
git branch -M main
git push -u origin main
```

### Step 2: Vercel 연결
1. https://vercel.com 접속 → GitHub 계정으로 로그인
2. "New Project" → 방금 만든 GitHub repo 선택
3. Framework Preset: **Vite** 자동 감지됨
4. Build Settings 확인:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Environment Variables** 섹션에서 추가:
   - Key: `VITE_GEMINI_API_KEY`
   - Value: 실제 Gemini API 키
6. "Deploy" 클릭

### Step 3: 배포 완료
- 자동으로 `https://tridge-simulator-hub.vercel.app` 같은 URL 할당
- 이후 `git push`만 하면 자동 재배포 (CI/CD 내장)

### 커스텀 도메인 연결 (선택)
- Vercel 대시보드 → Settings → Domains → 도메인 추가
- DNS에 CNAME 레코드 설정

## 4. 보안 주의사항

### ⚠️ 현재 알려진 이슈

| 항목 | 현재 상태 | 권장 조치 |
|------|-----------|-----------|
| 비밀번호 | 프론트엔드 하드코딩 (`tptridge@20260318`) | 백엔드 인증으로 전환 또는 Vercel Password Protection 사용 |
| Gemini API 키 | `VITE_` 접두사 → 빌드 시 번들에 포함됨 | 프록시 API Route로 전환 (아래 참고) |
| sessionStorage | 브라우저 탭 닫으면 초기화 | 현재 용도엔 적합 |

### Gemini API 키 보호 방법 (프로덕션 권장)

`VITE_` 접두사 환경변수는 클라이언트 번들에 포함되므로, 브라우저 개발자 도구로 노출 가능합니다.

**해결: Vercel Serverless Function으로 프록시 생성**

```
tridge-simulator-hub/
└── api/
    └── gemini.js          ← 새로 추가
```

```javascript
// api/gemini.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY; // VITE_ 없이!

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
```

그런 다음 App.jsx의 `callGeminiAPI`에서 호출 URL을 `/api/gemini`로 변경하면 API 키가 서버에만 존재하게 됩니다.

## 5. 비밀번호 보호 대안

### 옵션 A: Vercel Password Protection (Pro 플랜)
- Vercel 대시보드 → Settings → Password Protection 활성화
- 앱 자체 비밀번호 로직 제거 가능

### 옵션 B: Vercel Auth (무료)
- Vercel 대시보드에서 특정 이메일/팀만 접근 허용

### 옵션 C: 현행 유지
- 내부 도구이고 URL이 비공개면 현재 수준으로도 운용 가능
- 단, 비밀번호 변경 시 코드 수정 + 재배포 필요

## 6. 빠른 체크리스트

- [ ] Node.js 18+ 설치 확인
- [ ] `npm install` 완료
- [ ] `.env`에 Gemini API 키 설정
- [ ] `npm run dev`로 로컬 테스트
- [ ] GitHub repo 생성 & 푸시
- [ ] Vercel에서 repo 연결
- [ ] Vercel Environment Variables에 `VITE_GEMINI_API_KEY` 추가
- [ ] Deploy → URL 확인
- [ ] (선택) API 프록시로 전환하여 키 보호
- [ ] (선택) 커스텀 도메인 연결
