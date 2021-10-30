module.exports = {
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-sass",
    "gatsby-plugin-flow",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "img",
        path: `${__dirname}/src/img/payments/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "photoview",
        path: `${__dirname}/src/img/photoview/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "background",
        path: `${__dirname}/src/img/top/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "logo",
        path: `${__dirname}/src/img/logo/`,
      },
    },
  ],
};
