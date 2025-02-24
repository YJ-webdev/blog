'use server';

export async function getPreview(url: string) {
  const fetchWithRetry = async (url: string, retries: number = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          redirect: 'follow',
        });

        if (!response) {
          throw new Error('Response is undefined or invalid');
        }

        if (response.ok) {
          return response;
        }

        // If response is not ok, throw an error to retry
        throw new Error(`Failed to fetch: ${response.status}`);
      } catch (error) {
        // Enhanced network error logging
        if (error instanceof Error && error.message.includes('ECONNRESET')) {
          console.error(
            `Attempt ${attempt} failed due to network reset issues (ECONNRESET):`,
            error,
          );
        } else {
          console.error(`Attempt ${attempt} failed:`, error);
        }

        // Try to provide more detail on the failure
        if (error instanceof Error) {
          console.log('Error details:', error.message);
          if (error.stack) {
            console.log('Stack trace:', error.stack);
          }
        }

        if (attempt === retries) {
          throw error; // Re-throw after all retries
        }
      }
    }
  };

  try {
    // Dynamically import jsdom to avoid client-side bundling issues
    const { JSDOM } = await import('jsdom');

    // Fetch with retry
    const response = await fetchWithRetry(url);
    if (!response) {
      throw new Error('Response is undefined after retries');
    }

    const finalUrl = response.url;
    console.log('Resolved URL:', finalUrl);

    // Fetch the final page content
    const pageResponse = await fetch(finalUrl);
    const html = await pageResponse.text();

    // Parse HTML and extract Open Graph meta tags
    const dom = new JSDOM(html);
    const metaTags = dom.window.document.querySelectorAll('meta');

    const metadata: Record<string, string> = {
      url: finalUrl, // Save the resolved URL
    };

    metaTags.forEach((tag) => {
      const property = tag.getAttribute('property');
      const content = tag.getAttribute('content');
      if (property && content) {
        metadata[property] = content;
      }
    });

    return {
      title: metadata['og:title'] || null,
      description: metadata['og:description'] || null,
      image: metadata['og:image'] || metadata['twitter:image'] || null,
      url: finalUrl,
      siteName: metadata['og:site_name'] || null,
      favicon: `https://www.google.com/s2/favicons?domain=${new URL(finalUrl).hostname}`,
    };
  } catch (error) {
    console.error('Error fetching preview:', error);
    return 'Failed to fetch metadata';
  }
}
