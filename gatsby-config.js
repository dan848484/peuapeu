module.exports = {
    plugins:[
        "gatsby-plugin-typescript",
        "gatsby-plugin-sass",
        {
            resolve: "gatsby-source-filesystem",
            options:{
                name:"img",
                path: `${__dirname}/src/img/payments/`
            }
        },
        {
            resolve: "gatsby-source-filesystem",
            options:{
                name:"photoview",
                path: `${__dirname}/src/img/photoview/`
            }
        },
        {
            resolve: "gatsby-source-filesystem",
            options:{
                name:"background",
                path: `${__dirname}/src/img/top/`
            }
        },


    ]
}