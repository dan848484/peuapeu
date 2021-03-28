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
                name:"background",
                path: `${__dirname}/src/img/top/`
            }
        },


    ]
}