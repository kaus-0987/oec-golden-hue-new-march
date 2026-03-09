const { default: axios } = require("axios");

module.exports = {
  siteUrl: "https://oecdubai.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  exclude: [
    "/server-sitemap.xml",
    "/crm-launcher",
    "/oeccrm",
    "/",
    "/blog",
    "/about-us",
    "/contact-us",
    "/community",
    "/events",
    "/country-guides",
    "/faqs",
    "/finance",
    "/popular-courses",
    "/services",
    "/resources",
    "/ai-college-finder",
    "/universities",
    "/test-preparation",
    "/add-course",
  ],

  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: "daily",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    };
  },

  additionalPaths: async () => {
    try {
      const staticPaths = [
        { loc: "/", priority: 1.0 },
        { loc: "/blog", priority: 0.9 },
        { loc: "/contact-us", priority: 0.8 },
        { loc: "/about-us", priority: 0.8 },
        { loc: "/community", priority: 0.8 },
        { loc: "/events", priority: 0.8 },
        { loc: "/country-guides", priority: 0.8 },
        { loc: "/faqs", priority: 0.8 },
        { loc: "/finance", priority: 0.8 },
        { loc: "/popular-courses", priority: 0.8 },
        { loc: "/services", priority: 0.8 },
        { loc: "/resources", priority: 0.8 },
        { loc: "/ai-college-finder", priority: 0.8 },
        { loc: "/universities", priority: 0.8 },
        { loc: "/test-preparation", priority: 0.8 },
        { loc: "/add-course", priority: 0.8 },
      ];

      const [blogResponse, countryResponse] = await Promise.all([
        axios.get("https://sweekarme.in/oecweb/api/blog/blog/posts/"),
        axios.get(
          "https://sweekarme.in/oecweb/api/academics/academics/countries/"
        ),
      ]);

      const blogPosts = blogResponse.data.results;
      const countries = countryResponse.data.results;

      const blogPaths = blogPosts.map((post) => ({
        loc: `/blog/${encodeURIComponent(post.slug)}`,
        priority: 0.9,
      }));

      const countryPaths = countries.map((country) => ({
        loc: `/country-guides/${encodeURIComponent(
          country.name.toLowerCase().replace(/\s+/g, "-")
        )}`,
        priority: 0.9,
      }));

      const allPaths = [...staticPaths, ...blogPaths, ...countryPaths];

      const processedPaths = allPaths
        .map((path) => ({
          ...path,
          lastmod: new Date().toISOString(),
          changefreq: "daily",
        }))
        .sort((a, b) => b.priority - a.priority);

      return processedPaths;
    } catch (error) {
      console.error(
        "Error generating additionalPaths for sitemap:",
        error.message
      );
      return [];
    }
  },

  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
