import { expect, test } from "@playwright/test";
import { normalizeArabicForSearch } from "../../app/i18n/arabic-search";

const routes = [
  { path: "/en/", locale: "en", dir: "ltr", heading: "Markaz Islamic Schools" },
  { path: "/sw/", locale: "sw", dir: "ltr", heading: "Shule za Kiislamu za Markaz" },
  { path: "/ar/", locale: "ar", dir: "rtl", heading: "مَدَارِسُ مَرْكَز الْإِسْلَامِيَّةُ" },
  { path: "/en/primary/", locale: "en", dir: "ltr", heading: "Primary Education" },
  {
    path: "/sw/primary/",
    locale: "sw",
    dir: "ltr",
    heading: "Elimu ya Msingi",
  },
  { path: "/ar/primary/", locale: "ar", dir: "rtl", heading: "التَّعْلِيمُ الِابْتِدَائِيُّ" },
  {
    path: "/en/secondary/",
    locale: "en",
    dir: "ltr",
    heading: "Secondary Education",
  },
  {
    path: "/sw/secondary/",
    locale: "sw",
    dir: "ltr",
    heading: "Elimu ya Sekondari",
  },
  { path: "/ar/secondary/", locale: "ar", dir: "rtl", heading: "التَّعْلِيمُ الثَّانَوِيُّ" },
];

for (const route of routes) {
  test(`static route ${route.path} renders and refreshes`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    const response = await page.goto(route.path);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("html")).toHaveAttribute("lang", route.locale);
    await expect(page.locator("html")).toHaveAttribute("dir", route.dir);
    const headingText = await page.getByRole("heading", { level: 1 }).innerText();
    expect(normalizeArabicForSearch(headingText)).toContain(
      normalizeArabicForSearch(route.heading),
    );
    const ribbonText = await page.locator(".preview-ribbon").innerText();
    expect(normalizeArabicForSearch(ribbonText)).toMatch(
      /Unofficial design preview|Muhtasari wa usanifu usio rasmi|معاينة تصميم غير رسمية/i,
    );
    await expect(page.locator("main")).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    if (route.path === "/en/" || route.path === "/sw/" || route.path === "/ar/") {
      await page.screenshot({
        path: `test-results/screenshots/${route.locale}-home-${testInfo.project.name}.png`,
        fullPage: true,
      });
    }
    await page.reload();
    const refreshedHeading = await page.getByRole("heading", { level: 1 }).innerText();
    expect(normalizeArabicForSearch(refreshedHeading)).toContain(
      normalizeArabicForSearch(route.heading),
    );
    expect(errors).toEqual([]);
  });
}

test("locale selection preserves the current school route", async ({ page }) => {
  await page.goto("/en/primary/");
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.getByRole("button", { name: "Language navigation" }).click();
  await page.locator('.locale-menu a[lang="ar"]').click();
  await expect(page).toHaveURL(/\/ar\/primary\/$/);
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  expect(normalizeArabicForSearch(await page.getByRole("heading", { level: 1 }).innerText())).toBe(
    normalizeArabicForSearch("التَّعْلِيمُ الِابْتِدَائِيُّ"),
  );
});

test("Academics menu opens from the keyboard and level links fit inside the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.goto("/en/");
  const trigger = page.getByRole("button", { name: "Academics" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const menu = page.locator(".academics-menu-grid");
  const primary = menu.getByRole("link", { name: /PRIMARY EDUCATION/ });
  const secondary = menu.getByRole("link", { name: /SECONDARY EDUCATION/ });
  await expect(primary).toBeVisible();
  await expect(secondary).toBeVisible();
  for (const link of [primary, secondary]) {
    const geometry = await link.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const clip = { left: 0, top: 0, right: innerWidth, bottom: innerHeight };
      for (let parent = element.parentElement; parent; parent = parent.parentElement) {
        const style = getComputedStyle(parent);
        const parentRect = parent.getBoundingClientRect();
        if (style.overflowX !== "visible") {
          clip.left = Math.max(clip.left, parentRect.left);
          clip.right = Math.min(clip.right, parentRect.right);
        }
        if (style.overflowY !== "visible") {
          clip.top = Math.max(clip.top, parentRect.top);
          clip.bottom = Math.min(clip.bottom, parentRect.bottom);
        }
      }
      return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        visibleWidth: Math.max(
          0,
          Math.min(rect.right, clip.right) - Math.max(rect.left, clip.left),
        ),
        visibleHeight: Math.max(
          0,
          Math.min(rect.bottom, clip.bottom) - Math.max(rect.top, clip.top),
        ),
      };
    });
    expect(geometry.x).toBeGreaterThanOrEqual(0);
    expect(geometry.y).toBeGreaterThanOrEqual(0);
    expect(geometry.x + geometry.width).toBeLessThanOrEqual(1200);
    expect(geometry.y + geometry.height).toBeLessThanOrEqual(900);
    expect(geometry.visibleWidth).toBeCloseTo(geometry.width, 0);
    expect(geometry.visibleHeight).toBeCloseTo(geometry.height, 0);
  }
  await expect(menu).toBeInViewport();
});

test("Arabic academics dropdown stays fully visible in RTL", async ({ page }) => {
  await page.setViewportSize({ width: 1100, height: 900 });
  await page.goto("/ar/");
  await page.locator('.desktop-nav [data-slot="navigation-menu-trigger"]').first().click();
  const menu = page.locator(".academics-menu-grid");
  await expect(menu).toBeVisible();
  const box = await menu.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(1100);
  for (const link of await menu.getByRole("link").all()) {
    const linkBox = await link.boundingBox();
    expect(linkBox).not.toBeNull();
    expect(linkBox!.x).toBeGreaterThanOrEqual(0);
    expect(linkBox!.x + linkBox!.width).toBeLessThanOrEqual(1100);
  }
});

test("one institutional navigation exposes live destinations and labels pending sections", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.goto("/en/");
  await expect(page.locator(".brand-wordmark")).toHaveText("MARKAZ");
  await expect(
    page.getByRole("heading", { level: 1, name: "Markaz Islamic Schools" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Academics" }).click();
  const academics = page.locator(".academics-menu-grid");
  await expect(academics.getByRole("link", { name: /PRIMARY EDUCATION/ })).toHaveAttribute(
    "href",
    "/en/primary/",
  );
  await expect(academics.getByRole("link", { name: /SECONDARY EDUCATION/ })).toHaveAttribute(
    "href",
    "/en/secondary/",
  );
  await expect(academics.getByRole("link", { name: /Academic Results/ })).toHaveAttribute(
    "href",
    "/en/#results",
  );
  await page.keyboard.press("Escape");
  const moreButton = page.getByRole("button", { name: "More" });
  await moreButton.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".more-menu-content")).toBeVisible();
  await expect(page.locator(".more-menu-item")).toHaveCount(5);
  await expect(page.locator(".more-menu-item").first()).toContainText("In preparation");
  await expect(page.locator(".more-menu-item").first()).toHaveAttribute("aria-disabled", "true");
});

test("mobile menu opens, closes with Escape and returns focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ar/");
  const trigger = page.locator(".mobile-menu-trigger");
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator('.mobile-nav a[href="/ar/primary/"]')).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("no horizontal overflow at supported viewport widths", async ({ page }) => {
  await page.goto("/ar/");
  for (const width of [360, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(resolve)));
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      `width ${width}`,
    ).toBe(true);
  }
});

test("prefers-reduced-motion keeps all essential content visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Markaz Islamic Schools" })).toBeVisible();
  const visibility = await page.locator(".school-hero-title").evaluate((element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return {
      opacity: Number(style.opacity),
      visibility: style.visibility,
      rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
    };
  });
  expect(visibility.opacity).toBeGreaterThan(0.95);
  expect(visibility.visibility).toBe("visible");
  expect(visibility.rect.width).toBeGreaterThan(0);
  expect(visibility.rect.height).toBeGreaterThan(0);
});

test("English and Arabic hero headings settle within 1.5 seconds", async ({ page }) => {
  for (const locale of ["en", "ar"]) {
    await page.goto(`/${locale}/`, { waitUntil: "domcontentloaded" });
    await page.locator(".school-hero-title .blur-text").waitFor();
    const started = await page.evaluate(() => performance.now());
    const words = page.locator('.school-hero-title .blur-text [data-animated-word="true"]');
    await expect
      .poll(
        async () =>
          words.evaluateAll((elements) =>
            elements.every((element) => Number(getComputedStyle(element).opacity) >= 0.98),
          ),
        { timeout: 1500, intervals: [30, 60, 100] },
      )
      .toBe(true);
    const elapsed = await page.evaluate((start) => performance.now() - start, started);
    expect(elapsed).toBeLessThan(1500);
  }
});

test("Arabic directional links mirror and stay within the visible layout", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ar/");
  const hero = await page.locator(".school-hero").boundingBox();
  expect(hero).not.toBeNull();
  expect(hero!.x).toBeGreaterThanOrEqual(0);
  expect(hero!.x + hero!.width).toBeLessThanOrEqual(390);
});

test("Arabic mobile drawer opens on the inline-start edge and mirrors its arrows", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ar/");
  await page.locator(".mobile-menu-trigger").click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.waitForTimeout(250);
  const box = await dialog.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeLessThanOrEqual(1);
  const arrowTransform = await dialog
    .locator(".mobile-nav a svg")
    .first()
    .evaluate((element) => getComputedStyle(element).transform);
  expect(arrowTransform).toContain("matrix(-1");
});

test("homepage introduces Markaz and keeps Primary and Secondary within Academics", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.goto("/en/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Markaz Islamic Schools" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Our Educational Levels" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "A closer look at Markaz" })).toBeVisible();
  await expect(page.locator(".school-introduction-areas")).toContainText("Islamic Education");
  await expect(page.locator(".school-introduction-areas")).toContainText("School Life");
  await page.getByRole("button", { name: "Academics" }).click();
  const menu = page.locator(".academics-menu-grid");
  await expect(menu.getByRole("link", { name: /PRIMARY EDUCATION/ })).toHaveAttribute(
    "href",
    "/en/primary/",
  );
  await expect(menu.getByRole("link", { name: /SECONDARY EDUCATION/ })).toHaveAttribute(
    "href",
    "/en/secondary/",
  );
});

test("Arabic school homepage reads in RTL without a level selector", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ar/");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(normalizeArabicForSearch(await page.locator(".school-hero-index").innerText())).toContain(
    normalizeArabicForSearch("التَّعَلُّمُ فِي مَرْكَز"),
  );
  await expect(page.getByRole("tab")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("reduced motion keeps the complete school introduction visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Markaz Islamic Schools" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "A closer look at Markaz" })).toBeVisible();
  await expect(page.locator(".school-introduction-areas")).toContainText("Academics");
  await expect(
    page.getByRole("heading", { name: "One published examination record." }),
  ).toBeVisible();
  await expect(page.locator(".result-subject-value")).toHaveText("31 / 31");
  const opacity = await page
    .locator(".school-introduction-areas li")
    .first()
    .evaluate((element) => Number(getComputedStyle(element).opacity));
  expect(opacity).toBeGreaterThan(0.95);
});

test("Arabic education-level page keeps home and language navigation available on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ar/primary/");
  await expect(page.locator(".site-header .brand-lockup")).toBeVisible();
  expect(normalizeArabicForSearch(await page.getByRole("heading", { level: 1 }).innerText())).toBe(
    normalizeArabicForSearch("التَّعْلِيمُ الِابْتِدَائِيُّ"),
  );
  await page.locator(".mobile-menu-trigger").click();
  await page.locator(".mobile-sheet").getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(/\/en\/primary\/$/);
});

test("locale content remains available without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const route of routes.slice(0, 3)) {
    await page.goto(route.path);
    const headingText = await page.getByRole("heading", { level: 1 }).innerText();
    expect(normalizeArabicForSearch(headingText)).toContain(
      normalizeArabicForSearch(route.heading),
    );
  }
  await context.close();
});

test("Arabic draft uses Amiri, visible tashkīl and named interactive controls", async ({
  page,
}) => {
  await page.goto("/ar/");
  await page.evaluate(() => document.fonts.ready);
  const audit = await page.evaluate(() => {
    const text = document.querySelector("main")?.textContent ?? "";
    const markCount = [...text].filter((character) =>
      /[\u064B-\u0652\u0670]/u.test(character),
    ).length;
    const unnamedControls = [...document.querySelectorAll("a, button")]
      .filter((element) => {
        const visible = element.getClientRects().length > 0;
        return (
          visible &&
          !element.getAttribute("aria-label") &&
          !element.textContent?.trim() &&
          !element.getAttribute("title")
        );
      })
      .map((element) => element.outerHTML);
    const trackedArabicText = [...document.querySelectorAll("main *")]
      .filter((element) => {
        const style = getComputedStyle(element);
        const letterSpacing = Number.parseFloat(style.letterSpacing);
        return /[\u0600-\u06FF]/u.test(element.textContent ?? "") && letterSpacing > 0;
      })
      .map(
        (element) =>
          `${element.tagName}.${String(element.className)}: ${getComputedStyle(element).letterSpacing}`,
      );
    return {
      fontLoaded: document.fonts.check('28px "Amiri"'),
      markCount,
      reviewStatus: document.documentElement.dataset.arabicTranslationReview,
      unnamedControls,
      trackedArabicText,
    };
  });
  expect(audit.fontLoaded).toBe(true);
  expect(audit.markCount).toBeGreaterThan(30);
  expect(audit.reviewStatus).toBe("draft");
  expect(audit.unnamedControls).toEqual([]);
  expect(audit.trackedArabicText).toEqual([]);
});
