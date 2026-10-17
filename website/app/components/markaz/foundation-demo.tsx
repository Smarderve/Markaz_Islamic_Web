import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslation } from "react-i18next";
import type { i18n } from "i18next";
import { Button } from "~/components/ui/button";

export function FoundationDemo({ localeI18n }: { localeI18n: i18n }) {
  const { t } = useTranslation(undefined, { i18n: localeI18n });
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const [activated, setActivated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setEntered(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setEntered(true);
        observer.disconnect();
      }
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="motion-demo"
      aria-labelledby="motion-demo-title"
      initial={false}
      animate={{ opacity: 1, y: reduceMotion || entered ? 0 : 12 }}
      transition={{ duration: reduceMotion ? 0 : 0.48, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <h2 id="motion-demo-title">{t("motionHeading")}</h2>
      <p>{t("motionCopy")}</p>
      <Button type="button" onClick={() => setActivated(true)}>
        {t("action")}
      </Button>
      <p className="interaction-status" role="status" aria-live="polite">
        {activated ? t("actionDone") : ""}
      </p>
    </motion.section>
  );
}
