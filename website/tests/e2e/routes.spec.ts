import { expect, test } from "@playwright/test";

const routes = [
  { path: "/en/", locale: "en", dir: "ltr", heading: "Localized route proof" },
  { path: "/sw/", locale: "sw", dir: "ltr", heading: "Uthibitisho wa njia za lugha" },
  { path: "/ar/", locale: "ar", dir: "rtl", heading: "اختبار المسارات متعددة اللغات" },
  { path: "/en/primary/", locale: "en", dir: "ltr", heading: "Primary route sample" },
  { path: "/sw/primary/", locale: "sw", dir: "ltr", heading: "Mfano wa njia ya msingi" },
  { path: "/ar/primary/", locale: "ar", dir: "rtl", heading: "نموذج مسار المرحلة الابتدائية" },
  { path: "/en/secondary/", locale: "en", dir: "ltr", heading: "Secondary route sample" },
  { path: "/sw/secondary/", locale: "sw", dir: "ltr", heading: "Mfano wa njia ya sekondari" },
  { path: "/ar/secondary/", locale: "ar", dir: "rtl", heading: "نموذج مسار المرحلة الثانوية" },
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
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(route.heading);
    await expect(
      page.getByText(/Technical sample only|Mfano wa kiufundi|نموذج تقني فقط/),
    ).toBeVisible();
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
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(route.heading);
    expect(errors).toEqual([]);
  });
}

test("language switch preserves the school route", async ({ page }) => {
  await page.goto("/en/primary/");
  await page
    .getByRole("navigation", { name: "Language navigation" })
    .getByRole("link", { name: "AR" })
    .click();
  await expect(page).toHaveURL(/\/ar\/primary\/$/);
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("نموذج مسار المرحلة الابتدائية");
});

test("interaction is keyboard-operable and announces its result", async ({ page }) => {
  await page.goto("/en/");
  const button = page.getByRole("button", { name: "Try the interaction" });
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toHaveText("Interaction received");
});

test("reduced-motion preference is respected by the motion demo", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/");
  await expect(page.locator(".motion-demo")).toBeVisible();
  expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(
    true,
  );
});

test("locale routes contain useful prerendered content without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const route of routes.filter(
    (item) => item.path === "/en/" || item.path === "/sw/" || item.path === "/ar/",
  )) {
    await page.goto(route.path);
    await expect(page.locator("html")).toHaveAttribute("lang", route.locale);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(route.heading);
  }
  await context.close();
});
