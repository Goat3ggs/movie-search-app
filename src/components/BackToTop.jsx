import { useEffect, useState } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 600);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleBackToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className="back-to-top"
      type="button"
      onClick={handleBackToTop}
      aria-label="Back to top"
      title="Back to top"
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
