const config = {
    brand: "Mylaw Conference",
    fullname: "Victor Ekemam",
    imgName: "mez.jpg", //insure to paste the image in the public/images folder
    aboutme: `I am one of the most amazing developers you are likely to find out there. Doesn't hurt to believe in you now does it? I have built applications for multiple platforms.
    I have applications that run on the web, on mobile and on computers as well. I'm I not great?`,

    //project url must start with http:// or https://
    projects: [
        {
            title: "College Portal",
            description: "A university portal deployed for various universities across Nigeria and Africa",
            url: "https://portal.copem.edu.ng/"
        },
        {
            title: "Quicklendr",
            description: "A REST API which powers Quicklendr, a peer-to-peer lending platform",
            url: "http://portal.quicklendr.com"
        },
        {
            title: "Merchant Doodle",
            description: "A business website. Not much to say. Just check it out",
            url: "http://merchantdoodle.com"
        },
        {
            title: "Schoolplus",
            description: "A wholesome high school portal. Powers a number of school across NIgeria",
            url: "http://lwa.schoolpl.com"
        },
    ],
    phone: "+2349055748949",
    email: "ekemammezez@gmail.com",
    socials: [
        {
            name: 'Github',
            url: 'https://github.com/mezez', //must start with http:// or https://
        },
        {
            name: 'Twitter',
            url: 'https://twitter.com/mezez_john_doe', //must start with http:// or https://
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/chimezirim-ekemam-5a5926b6' //must start with http:// or https://
        },
        {
            name: 'Resume',
            url: 'https://drive.google.com/file/d/1oYBLSYjSRXXz6sJDV6gwE1Fao8ml0fvC/view'
        }
    ],
}

export default config;