# Typed Content Contract — No CMS

This is the proposed shape for build-time public data; adapt to existing repository conventions and keep TypeScript/Zod authoritative once implemented.

```ts
type Locale = 'en' | 'sw' | 'ar';
type School = 'primary' | 'secondary' | 'both';
type Evidence = 'officially-verified' | 'school-account-reported'
  | 'partially-verified' | 'historical-notice' | 'unknown';
type Approval = 'draft' | 'internal-review' | 'approved' | 'rejected';
type TranslationState = 'draft' | 'reviewed' | 'approved';

type Translation = {
  title: string; summary?: string; body?: string;
  seoTitle?: string; seoDescription?: string;
  status: TranslationState; reviewedBy?: string; reviewedOn?: string;
};
interface BaseContent {
  id: string; school: School; slug: string; sourceIds: string[];
  evidence: Evidence; approval: Approval;
  translations: Partial<Record<Locale, Translation>>;
  mediaIds: string[]; lastReviewedOn?: string;
}
interface NewsRecord extends BaseContent {
  kind: 'news'; publishedAt: string; categories: string[];
  status: 'announcement' | 'report' | 'archive';
}
interface EventRecord extends BaseContent {
  kind: 'event'; announcedAt?: string; scheduledStart: string;
  scheduledEnd?: string; occurred?: boolean; outcomeVerifiedOn?: string;
  status: 'announced' | 'outcome-confirmed' | 'cancelled' | 'unknown';
}
interface ExamRecord {
  exam: 'CSEE'|'FTNA'|'EDK'; year: number; school: School;
  centreId?: string; candidates: number; divisions: Record<string,number>;
  sourceIds: string[]; evidence: Evidence; approval: Approval;
}
interface MediaRecord {
  id: string; school: School; srcOriginal: string; srcWeb?: string;
  sourceUrl?: string; sourcePostId?: string; width: number; height: number;
  rightsApproved: boolean; childSafeguardingApproved: boolean;
  locationVerified: boolean; mediaApproval: Approval;
  isPosterCrop: boolean; isInterpolated: boolean;
  alt: Partial<Record<Locale,string>>;
}
```

## Validators
- All selected public records require `approval==='approved'` and source links sufficient for their factual scope.
- Every locale route requires `translations[locale].status==='approved'` and valid translated headings/body/SEO, not empty strings.
- Any publishable media requires both rights and safeguarding criteria, correct attribution, web variant existence and localized alt text.
- All pages use unique stable `id` and human-friendly `slug`; dynamic details map across locales by `id` not title string.
- For events, scheduled date does **not** set `occurred=true`; state changes only on verified outcome.
- Exam division counts must sum to candidate totals where complete. Never infer undisclosed division counts or proportions as outcomes.
- Do not include raw unpublished news/event/photo records in client search indexes, public JSON, static generation artifacts, sitemap or build logs.
- `unknown` data is allowed in private development but must never generate confident public language.

## Build-time conversion
Separate one-time evidence review from ongoing site content. Preserve private sources separately; website content is an editorial layer with documented source and approval links. Implement test fixtures from synthetic anonymous data, not students.
