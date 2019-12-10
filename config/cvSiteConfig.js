module.exports = {
  siteTitle: 'Curriculum Vitae',
  siteDescription: `Curriculum Vitae`,
  keyWords: ['devops', 'react', 'nodejs', 'elasticsearch'],
  authorName: 'Mike Polinowski',
  twitterUsername: 'MikePolinowski',
  githubUsername: 'mpolinowski',
  authorAvatar: '/assets/images/angular_momentum.png',
  authorDescription: `As a Ms.Sc. in <strong>for Chemistry & Physics</strong> I started out working in the field of environmental analysis as a laboratory technician. <br /> <br />
    The implied experience in PC administration, networking, <strong>web development</strong> and data analysis lead to my first job abroad in the development department of a network surveillance company. <br /> <br />
    I am currently working as a <strong>LINUX administrator</strong> and <strong>IoT</strong> product development for MQTT sensor networks.`,
  skills: [
    {
      name: 'Laboratory Technician',
      level: 80
    },
    {
      name: 'DevOps',
      level: 60
    },
    {
      name: 'Web Development',
      level: 65
    },
    {
      name: 'Product Development',
      level: 40
    },
    {
      name: 'Customer Service',
      level: 60
    },
    {
      name: 'Quality Assurance',
      level: 40
    },
    {
      name: 'Print Design',
      level: 40
    }
  ],
  jobs: [
    {
      company: "Waletech (INSTAR) Shenzhen, China",
      begin: {
        month: 'Mar',
        year: '2015'
      },
      duration: 'present',
      occupation: "Chief Technology Officer",
      description: "Expanding the target for INSTAR products to the smarthome sector by the integration IoT standards."
    }, {
      company: "INSTAR Deutschland GmbH Guangzhou, China",
      begin: {
        month: 'Apr',
        year: '2012'
      },
      duration: '3 yrs',
      occupation: "General Manager",
      description: "Leading a team in the development and maintenance of a customer online knowledge base (Wiki), based Node.js and React.js on a CentOS and Elasticsearch backend. Integration of this online help platform into all in-house software products. As well as setting up internal training programs for the customer service team. New product development and quality assurance in cooperation with the production line."
  
    }, {
      company: "INSTAR Deutschland GmbH Guangzhou, China",
      begin: {
        month: 'Mar',
        year: '2011'
      },
      duration: '1 yrs',
      occupation: "Support Technician",
      description: "First and second tier technical support for end customers and on-site quality assurance for the production cycle. Creation of print and online documentation for customers and trainings material for new employees. Enabling the system integration into third-party software and hardware products."
  
    }, {
      company: "University Cologne, Germany",
      begin: {
        month: 'Oct',
        year: '2004'
      },
      duration: '5 yrs',
      occupation: "Laboratory Technician",
      description: "Mass spectrometry and Terahertz spectroscopy for the detection of iron compounds in high energy and low pressure plasmas (Ms.Sc.) for the department of physics and astro science. Combined with a teaching position for laboratory courses for the department of inorganic chemistry."
  
    }, {
      company: "University Wuppertal, Germany",
      begin: {
        month: 'Mar',
        year: '2002'
      },
      duration: '4 semester',
      occupation: "Scientific Assistant",
      description: "Development of new spectroscopic methods in atmospheric analysis for the department of physical chemistry."
  
    }, {
      company: "University Wuppertal, Germany",
      begin: {
        month: 'Apr',
        year: '2001'
      },
      duration: '2 semester',
      occupation: "Scientific Assistant",
      description: "Teaching position for laboratory courses in inorganic chemistry and instrumental analysis."
  
    },
    /* ... */
  ],
  social: {
    twitter: "https://twitter.com/MikePolinowski",
    linkedin: "https://www.linkedin.com/in/mike-polinowski-6396ba121/",
    github: "https://github.com/mpolinowski",
    email: "mpolinowski@gmail.com"
  },
  siteUrl: 'https://mpolinowski.github.io/curriculum-vitae/',
  pathPrefix: '/curriculum-vitae', // Note: it must *not* have a trailing slash.
  siteCover: '/assets/images/worldmap.png',
  background_color: '#24292e',
  theme_color: '#1a8f6e',
  display: 'minimal-ui',
  icon: 'src/assets/gatsby-icon.png',
  headerLinks: [
    {
      label: 'Mike Polinowski',
      url: '/',
    }
  ]
}