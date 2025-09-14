import { useRouter } from 'next/navigation';

export const useScrollToSection = () => {
  const router = useRouter();

  const scrollToSection = (sectionId: string, offset: number = 120) => {
    // If we're on a different page, navigate to home first
    if (window.location.pathname !== '/') {
      router.push(`/#${sectionId}`);
      return;
    }

    // If we're already on the home page, scroll directly
    const scrollWithRetry = (retryCount = 0) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop - offset;

        window.scrollTo({
          top: sectionTop,
          behavior: "smooth",
        });

        // If this is the news section and content might still be loading, retry after a delay
        if (sectionId === 'news' && retryCount < 3) {
          setTimeout(() => {
            const newSection = document.getElementById(sectionId);
            if (newSection && Math.abs(newSection.offsetTop - section.offsetTop) > 50) {
              // Content height changed significantly, retry scroll
              scrollWithRetry(retryCount + 1);
            }
          }, 800); // Wait for potential content loading
        }
      }
    };

    scrollWithRetry();
  };

  return { scrollToSection };
};