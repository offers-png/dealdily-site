module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("*.html");

  // Date formatter filter
  eleventyConfig.addFilter("date", function(dateVal, format) {
    const d = dateVal instanceof Date ? dateVal : new Date(dateVal);
    if (isNaN(d)) return "";
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const monthsShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return format
      .replace("MMMM", months[d.getUTCMonth()])
      .replace("MMM", monthsShort[d.getUTCMonth()])
      .replace("MM", String(d.getUTCMonth()+1).padStart(2,"0"))
      .replace("d", d.getUTCDate())
      .replace("yyyy", d.getUTCFullYear());
  });

  // Posts collection — newest first
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/**/*.md").reverse();
  });

  // Category filter for Nunjucks
  eleventyConfig.addFilter("categoryLabel", function(cat) {
    const map = {
      "electronics": "Electronics",
      "kitchen": "Kitchen",
      "home": "Home",
      "fitness": "Fitness",
      "outdoor": "Outdoor",
      "pets": "Pets",
      "tools": "Tools",
      "smart-home": "Smart Home",
      "robot-vacuums": "Robot Vacuums",
      "cleaning": "Cleaning",
      "audio": "Audio",
      "computers": "Computers",
      "home-cleaning": "Home Cleaning",
      "baby": "Baby",
      "fashion": "Fashion",
      "beauty": "Beauty",
      "gaming": "Gaming",
      "office": "Office"
    };
    return map[cat] || cat;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "../_data"
    }
  };
};
