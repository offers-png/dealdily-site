module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("*.html");

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "../_data"
    }
  };
};
