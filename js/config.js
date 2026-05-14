"use strict";

/* ==========================================================
   GARVOX — Global Website Config
   All editable brand, contact, service, SEO, legal, FAQ,
   asset, CTA, and repeated content values live here.
   ========================================================== */

window.SITE_CONFIG = {
    companyName: "GARVOX",
    companyId: "GARVOX Provider Matching LLC",

    brand: {
        shortName: "GARVOX",
        tagline: "Compare local garage door provider options with clarity.",
        logoLabel: "GARVOX home",
        logoText: "GARVOX",
        logoIcon: "./assets/icons/logo-bearing.svg"
    },

    phone: "(888) 432-1098",
    phoneHref: "tel:+18884321098",
    phoneLabel: "Call (888) 432-1098",

    email: "contact@garvox.com",
    emailHref: "mailto:contact@garvox.com",
    emailLabel: "Write GARVOX",

    address: {
        line1: "1209 Orange Street",
        city: "Wilmington",
        state: "DE",
        zip: "19801",
        country: "USA",
        full: "1209 Orange Street, Wilmington, DE 19801, USA"
    },

    serviceArea: "Garage door provider matching across the USA",

    footerText:
        "GARVOX helps homeowners compare independent local garage door provider options across service categories, project scopes, quote details, and availability questions.",

    disclaimer:
        "Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.",

    legalNotice:
        "GARVOX is an independent provider-matching platform. GARVOX does not perform garage door installation, replacement, repair, opener, or related garage door services directly. Provider availability, pricing, licenses, insurance, warranties, response windows, and project details must be verified directly with the provider before hiring.",

    assets: {
        faviconSvg: "./assets/icons/favicon.svg",
        logoBearing: "./assets/icons/logo-bearing.svg",

        hero: {
            homeSlides: [
                "./assets/images/home-hero-01.jpg",
                "./assets/images/home-hero-02.jpg",
                "./assets/images/home-hero-03.jpg",
                "./assets/images/home-hero-04.jpg"
            ],
            services: "./assets/images/hero-services.jpg",
            about: "./assets/images/hero-about.jpg",
            contact: "./assets/images/hero-contact.jpg",
            installation: "./assets/images/hero-installation.jpg",
            replacement: "./assets/images/hero-replacement.jpg",
            repair: "./assets/images/hero-repair.jpg",
            openers: "./assets/images/hero-openers.jpg",
            legal: "./assets/images/cta-garage-door.jpg"
        },

        images: {
            garageAnatomy: "./assets/images/garage-anatomy.jpg",
            cta: "./assets/images/cta-garage-door.jpg",
            modernGarageDoor: "./assets/images/material-glass.jpg",
            traditionalGarageDoor: "./assets/images/traditional-garage-door.jpg",
            beforeDoor: "./assets/images/before-door.jpg",
            afterDoor: "./assets/images/after-door.jpg",

            services: {
                installation: "./assets/images/service-installation.jpg",
                replacement: "./assets/images/service-replacement.jpg",
                repair: "./assets/images/service-repair.jpg",
                openers: "./assets/images/service-openers.jpg"
            },

            materials: {
                steel: "./assets/images/material-steel.jpg",
                wood: "./assets/images/material-wood.jpg",
                aluminum: "./assets/images/material-aluminum.jpg",
                glass: "./assets/images/material-glass.jpg"
            },

            styles: {
                flushPanel: "./assets/images/style-flush-panel.jpg",
                raisedPanel: "./assets/images/style-raised-panel.jpg",
                carriageHouse: "./assets/images/style-carriage-house.jpg",
                modernGlass: "./assets/images/style-modern-glass.jpg",
                woodLook: "./assets/images/style-wood-look.jpg",
                insulatedSteel: "./assets/images/style-insulated-steel.jpg"
            },

            tabs: {
                sectional: "./assets/images/tab-sectional.jpg",
                rollUp: "./assets/images/tab-roll-up.jpg",
                carriage: "./assets/images/tab-carriage.jpg",
                glass: "./assets/images/tab-glass.jpg",
                insulated: "./assets/images/tab-insulated.jpg"
            }
        }
    },

    navigation: [
        {
            label: "Home",
            href: "index.html"
        },
        {
            label: "Services",
            href: "services.html",
            hasDropdown: true
        },
        {
            label: "About",
            href: "about.html"
        },
        {
            label: "Contact",
            href: "contact.html"
        }
    ],

    legalLinks: [
        {
            label: "Privacy Policy",
            href: "privacy-policy.html"
        },
        {
            label: "Cookie Policy",
            href: "cookie-policy.html"
        },
        {
            label: "Terms of Service",
            href: "terms-of-service.html"
        }
    ],

    services: [
        {
            id: "installation",
            title: "Garage Door Installation",
            shortTitle: "Installation",
            href: "garage-door-installation.html",
            icon: "door-open",
            image: "./assets/images/service-installation.jpg",
            heroImage: "./assets/images/hero-installation.jpg",
            summary:
                "Compare independent providers for new garage door installation projects, including door type, material, opener compatibility, insulation, and quote scope.",
            cardText:
                "Review provider options for new garage door projects and ask about materials, measurements, hardware, warranty, and timeline before choosing.",
            heroTitle: "Compare garage door installation provider options.",
            heroText:
                "GARVOX helps homeowners explore local provider options for installation-style garage door projects without presenting itself as a direct installer.",
            pageKicker: "Installation comparison",
            pageIntro:
                "A new garage door project can involve door style, track fit, opener compatibility, insulation, measurements, hardware, and warranty details. GARVOX helps you compare provider options so you can ask better questions before moving forward.",
            evaluationPoints: [
                "Door type and material options",
                "Opening measurements and fit requirements",
                "Opener and sensor compatibility",
                "Insulation and weather seal details",
                "Itemized quote scope",
                "Warranty and timeline questions"
            ],
            questions: [
                "Is the quote itemized by door, hardware, opener, and labor?",
                "What warranty terms are included by the provider?",
                "Does the provider evaluate opener compatibility?",
                "What material and insulation options are available?",
                "What details could affect the installation timeline?"
            ]
        },
        {
            id: "replacement",
            title: "Garage Door Replacement",
            shortTitle: "Replacement",
            href: "garage-door-replacement.html",
            icon: "replace",
            image: "./assets/images/service-replacement.jpg",
            heroImage: "./assets/images/hero-replacement.jpg",
            summary:
                "Compare provider options for replacement-style garage door projects, including removal, material selection, insulation, opener fit, and quote details.",
            cardText:
                "Explore provider options for replacing an older or damaged garage door and compare material, style, disposal, warranty, and fit questions.",
            heroTitle: "Compare garage door replacement provider options.",
            heroText:
                "GARVOX helps homeowners review local provider options for replacement-style projects while keeping final provider verification in the homeowner’s hands.",
            pageKicker: "Replacement comparison",
            pageIntro:
                "Garage door replacement decisions often involve old system removal, material selection, insulation, opener compatibility, hardware, disposal, and warranty details. GARVOX helps organize the comparison process.",
            evaluationPoints: [
                "Old door and hardware removal",
                "Material and style selection",
                "Insulation and weather protection",
                "Opener compatibility",
                "Disposal or haul-away details",
                "Warranty and quote scope"
            ],
            questions: [
                "Does the quote include removal of the old door?",
                "Are disposal or haul-away details included?",
                "Which materials are available for the replacement?",
                "Is the existing opener compatible with the new door?",
                "What warranty applies to the replacement project?"
            ]
        },
        {
            id: "repair",
            title: "Garage Door Repair",
            shortTitle: "Repair",
            href: "garage-door-repair.html",
            icon: "wrench",
            image: "./assets/images/service-repair.jpg",
            heroImage: "./assets/images/hero-repair.jpg",
            summary:
                "Compare independent provider options for repair-related requests such as stuck doors, noisy operation, damaged panels, springs, tracks, rollers, and openers.",
            cardText:
                "Review provider options for garage door repair-related requests and verify availability, issue scope, parts, quote details, and warranty directly.",
            heroTitle: "Compare garage door repair provider options.",
            heroText:
                "GARVOX helps homeowners explore provider options for repair-related garage door requests. Availability, timing, and project details must be confirmed directly with providers.",
            pageKicker: "Repair comparison",
            pageIntro:
                "Repair-related garage door requests can involve springs, rollers, tracks, panels, opener issues, sensors, cables, noise, or stuck-door conditions. GARVOX helps you compare provider options and understand what to ask.",
            evaluationPoints: [
                "Issue type and visible damage",
                "Response window and area availability",
                "Parts and hardware details",
                "Quote scope and diagnostic fees",
                "Warranty on repair-related work",
                "Safety and access considerations"
            ],
            questions: [
                "What type of garage door issue should be described first?",
                "Does the provider serve the homeowner’s area?",
                "Are parts, labor, and diagnostic fees separated?",
                "What warranty applies to repair-related work?",
                "What response window can the provider offer?"
            ]
        },
        {
            id: "openers",
            title: "Garage Door Openers",
            shortTitle: "Openers",
            href: "garage-door-openers.html",
            icon: "radio-tower",
            image: "./assets/images/service-openers.jpg",
            heroImage: "./assets/images/hero-openers.jpg",
            summary:
                "Compare provider options for garage door opener projects, including motor type, smart features, remotes, sensors, quiet operation, and compatibility.",
            cardText:
                "Explore provider options for opener-related projects and compare motor type, compatibility, warranty, sensor setup, and smart feature questions.",
            heroTitle: "Compare garage door opener provider options.",
            heroText:
                "GARVOX helps homeowners review local provider options for opener-related garage door projects, from quiet operation to smart control compatibility.",
            pageKicker: "Opener comparison",
            pageIntro:
                "Garage door opener projects can involve motor type, smart controls, remotes, wall buttons, safety sensors, rails, horsepower, noise level, and compatibility with the existing door system.",
            evaluationPoints: [
                "Motor type and horsepower",
                "Quiet operation needs",
                "Smart control compatibility",
                "Sensor and remote setup",
                "Door weight and track compatibility",
                "Warranty and quote details"
            ],
            questions: [
                "Which opener type fits the existing door system?",
                "Are smart controls or app features included?",
                "Does the quote include sensors and remotes?",
                "What noise level should be expected?",
                "What warranty applies to the opener system?"
            ]
        }
    ],

    quickNav: [
        {
            label: "Installation",
            href: "garage-door-installation.html"
        },
        {
            label: "Replacement",
            href: "garage-door-replacement.html"
        },
        {
            label: "Repair",
            href: "garage-door-repair.html"
        },
        {
            label: "Openers",
            href: "garage-door-openers.html"
        },
        {
            label: "Compare Providers",
            href: "services.html"
        },
        {
            label: "Contact",
            href: "contact.html"
        }
    ],

    home: {
        hero: {
            eyebrow: "Garage door provider matching",
            title: "Compare garage door provider options with confidence.",
            text:
                "GARVOX helps homeowners explore independent local garage door companies, compare project details, and contact providers directly before making a decision.",
            primaryCta: {
                label: "Explore Services",
                href: "services.html"
            },
            secondaryCta: {
                label: "Start a Request",
                href: "contact.html"
            },
            chips: ["Installation", "Replacement", "Repair", "Openers"]
        },

        iconRail: [
            {
                label: "Door",
                icon: "door-open"
            },
            {
                label: "Spring",
                icon: "rotate-cw"
            },
            {
                label: "Track",
                icon: "rail-symbol"
            },
            {
                label: "Opener",
                icon: "radio-tower"
            },
            {
                label: "Sensor",
                icon: "scan-line"
            },
            {
                label: "Seal",
                icon: "shield-check"
            }
        ],

        howItWorks: {
            eyebrow: "How GARVOX works",
            title: "A clearer way to compare garage door providers.",
            text:
                "GARVOX is built to help homeowners organize provider options before choosing who to contact. You review categories, compare quote factors, and verify provider details directly.",
            items: [
                {
                    number: "01",
                    title: "Choose a service category",
                    text:
                        "Select installation, replacement, repair, or opener-related provider options."
                },
                {
                    number: "02",
                    title: "Review comparison factors",
                    text:
                        "Look at quote scope, materials, warranty questions, availability, and compatibility."
                },
                {
                    number: "03",
                    title: "Contact providers directly",
                    text:
                        "Confirm license, insurance, pricing, warranty, and schedule before hiring."
                }
            ]
        },

        problemFinder: {
            eyebrow: "Problem finder",
            title: "What’s Going Wrong?",
            text:
                "Use these common issue types as a starting point when comparing providers for garage door requests.",
            items: [
                "Door won’t open",
                "Broken spring",
                "Noisy operation",
                "Damaged panels",
                "Remote not working",
                "Door off track"
            ],
            hoverText: "Compare providers who may handle this type of request."
        },

        anatomy: {
            eyebrow: "Garage system overview",
            title: "Know the parts before comparing provider options.",
            text:
                "A garage door system includes several connected components. Understanding the basic parts can help homeowners ask providers clearer questions.",
            image: "./assets/images/garage-anatomy.jpg"
        },

        process: {
            eyebrow: "Provider match flow",
            title: "From project need to provider comparison.",
            items: [
                {
                    number: "01",
                    title: "Tell us what you need",
                    text:
                        "Start with the project type, issue, or door category you want to compare."
                },
                {
                    number: "02",
                    title: "Review provider options",
                    text:
                        "Explore service categories and comparison factors without direct contractor claims."
                },
                {
                    number: "03",
                    title: "Compare quote details",
                    text:
                        "Ask about scope, parts, warranty, timing, and availability before selecting."
                },
                {
                    number: "04",
                    title: "Contact providers directly",
                    text:
                        "Verify license, insurance, pricing, and schedule directly with the provider."
                }
            ]
        }
    },

    servicesPage: {
        hero: {
            eyebrow: "Garage door service categories",
            title: "Compare providers across 4 garage door project types.",
            text:
                "GARVOX organizes garage door provider options into four clear categories so homeowners can compare project scope, quote factors, and provider questions."
        },

        beforeCompare: {
            eyebrow: "Before you compare",
            title: "Details worth checking before choosing a provider.",
            items: [
                "License & insurance",
                "Warranty terms",
                "Door material",
                "Opener compatibility",
                "Emergency availability",
                "Quote details"
            ]
        },

        styleGallery: [
            {
                title: "Flush Panel",
                text: "A clean modern look often used for simple, minimal garage designs.",
                image: "./assets/images/style-flush-panel.jpg"
            },
            {
                title: "Raised Panel",
                text: "A classic residential style with familiar panel depth and structure.",
                image: "./assets/images/style-raised-panel.jpg"
            },
            {
                title: "Carriage House",
                text: "Traditional visual character with swing-door inspired details.",
                image: "./assets/images/style-carriage-house.jpg"
            },
            {
                title: "Modern Glass",
                text: "A sharper contemporary look with glass and aluminum styling.",
                image: "./assets/images/style-modern-glass.jpg"
            },
            {
                title: "Wood-Look",
                text: "Warm visual texture with modern material options to compare.",
                image: "./assets/images/style-wood-look.jpg"
            },
            {
                title: "Insulated Steel",
                text: "A durable option where insulation and strength are comparison points.",
                image: "./assets/images/style-insulated-steel.jpg"
            }
        ],

        providerMatrix: {
            title: "Provider Fit Matrix",
            columns: ["Project Type", "What to Ask", "What to Compare"],
            rows: [
                {
                    project: "Installation",
                    ask: "Materials, measurements, opener fit",
                    compare: "Warranty, quote scope, timeline"
                },
                {
                    project: "Repair",
                    ask: "Issue type, parts, urgency",
                    compare: "Service area, response window, warranty"
                },
                {
                    project: "Replacement",
                    ask: "Door size, old system, disposal",
                    compare: "Removal, materials, opener fit"
                },
                {
                    project: "Openers",
                    ask: "Motor type, smart features, sensors",
                    compare: "Compatibility, noise level, warranty"
                }
            ]
        }
    },

    aboutPage: {
        hero: {
            eyebrow: "About GARVOX",
            title: "A provider-comparison platform built for garage door projects.",
            text:
                "GARVOX helps homeowners compare independent local garage door provider options while keeping provider verification direct, clear, and homeowner-controlled."
        },

        story: {
            eyebrow: "Why GARVOX exists",
            title: "Garage door projects are mechanical, local, and detail-heavy.",
            text:
                "Homeowners often need to compare materials, opener compatibility, quote scope, warranty terms, and availability before contacting a company. GARVOX gives that comparison process a cleaner structure."
        },

        aggregatorModel: {
            eyebrow: "Aggregator model",
            title: "GARVOX is not a garage door service company.",
            text:
                "GARVOX does not install, repair, replace, inspect, or service garage doors directly. The platform helps homeowners explore categories, compare provider options, and verify details directly before hiring."
        },

        doesDoesnt: {
            title: "What GARVOX Does — And What It Doesn’t Do",
            helps: [
                "Compare service categories",
                "Explore provider options",
                "Review quote factors",
                "Ask availability questions"
            ],
            verify: [
                "License",
                "Insurance",
                "Pricing",
                "Warranty",
                "Schedule"
            ]
        },

        marquee: {
            label: "Explore GARVOX services",
            items: [
                {
                    label: "Garage Door Installation",
                    href: "garage-door-installation.html"
                },
                {
                    label: "Garage Door Replacement",
                    href: "garage-door-replacement.html"
                },
                {
                    label: "Garage Door Repair",
                    href: "garage-door-repair.html"
                },
                {
                    label: "Garage Door Openers",
                    href: "garage-door-openers.html"
                }
            ]
        }
    },

    contactPage: {
        hero: {
            eyebrow: "Contact GARVOX",
            title: "Start a garage door provider comparison request.",
            text:
                "Share the project category and a few details. GARVOX helps organize the request so you can compare provider options and verify information directly."
        },

        confidence: [
            {
                title: "No direct contractor claims",
                text:
                    "GARVOX does not present itself as a garage door service company."
            },
            {
                title: "Independent providers",
                text:
                    "Providers are independent, and availability may vary by location."
            },
            {
                title: "You verify before hiring",
                text:
                    "Confirm license, insurance, quote scope, pricing, warranty, and timing directly."
            }
        ],

        nextSteps: {
            eyebrow: "What happens next",
            title: "A simple request. Clear next steps.",
            items: [
                {
                    number: "01",
                    title: "Send your request",
                    text:
                        "Tell us which garage door category you want to compare."
                },
                {
                    number: "02",
                    title: "Review provider options",
                    text:
                        "Use the comparison details to understand what to ask."
                },
                {
                    number: "03",
                    title: "Verify directly",
                    text:
                        "Confirm all service, license, insurance, pricing, and schedule details with providers."
                }
            ]
        },

        trustBlock: {
            title: "GARVOX keeps the model clear.",
            text:
                "GARVOX is an independent provider-matching platform. It does not perform garage door services directly and does not guarantee provider work."
        }
    },

    forms: {
        contact: {
            id: "contact",
            title: "Request provider comparison details",
            text:
                "Use this form to share the garage door category and basic project details. No backend is required for this static build.",
            submitLabel: "Submit Request",
            successTitle: "Request prepared",
            successMessage:
                "Your request details have been captured on this page. Connect with providers directly and verify all license, insurance, pricing, warranty, and schedule details before hiring.",
            errorMessage:
                "Please complete the required fields before submitting.",
            fields: [
                {
                    name: "fullName",
                    label: "Full name",
                    type: "text",
                    placeholder: "Your name",
                    required: true
                },
                {
                    name: "phone",
                    label: "Phone",
                    type: "tel",
                    placeholder: "(555) 000-0000",
                    required: true
                },
                {
                    name: "email",
                    label: "Email",
                    type: "email",
                    placeholder: "you@example.com",
                    required: true
                },
                {
                    name: "service",
                    label: "Service category",
                    type: "select",
                    required: true,
                    options: [
                        "Garage Door Installation",
                        "Garage Door Replacement",
                        "Garage Door Repair",
                        "Garage Door Openers"
                    ]
                },
                {
                    name: "message",
                    label: "Project details",
                    type: "textarea",
                    placeholder: "Briefly describe the garage door project or issue.",
                    required: true
                }
            ]
        }
    },

    policyBanner: {
        storageKey: "garvox_policy_choice",
        title: "GARVOX uses policy confirmation",
        text:
            "This site uses basic local storage for policy confirmation and may include links to privacy, cookie, and terms information.",
        acceptLabel: "Accept",
        declineLabel: "Decline",
        links: [
            {
                label: "Privacy Policy",
                href: "privacy-policy.html"
            },
            {
                label: "Cookie Policy",
                href: "cookie-policy.html"
            },
            {
                label: "Terms of Service",
                href: "terms-of-service.html"
            }
        ]
    },

    cta: {
        default: {
            eyebrow: "Compare with confidence",
            title: "Compare garage door provider options with confidence.",
            text:
                "Explore service categories, review quote factors, and verify all provider details directly before hiring.",
            primary: {
                label: "Explore Services",
                href: "services.html"
            },
            secondary: {
                label: "Contact GARVOX",
                href: "contact.html"
            },
            image: "./assets/images/cta-garage-door.jpg"
        },

        urgency: {
            title: "Need help with a stuck or damaged garage door?",
            text:
                "Same-day requests may vary by provider and service area. Verify timing, scope, pricing, and availability directly.",
            indicators: [
                "Same-day requests may vary",
                "Provider availability depends on area",
                "Verify details directly"
            ],
            button: {
                label: "Compare Providers",
                href: "services.html"
            }
        }
    },

    materials: [
        {
            id: "steel",
            title: "Steel",
            image: "./assets/images/material-steel.jpg",
            text:
                "Often compared for durability, insulation options, maintenance level, and value.",
            points: ["Durability", "Maintenance", "Insulation", "Price range"]
        },
        {
            id: "wood",
            title: "Wood",
            image: "./assets/images/material-wood.jpg",
            text:
                "Often compared for visual warmth, upkeep, customization, and long-term care.",
            points: ["Style", "Maintenance", "Weight", "Price range"]
        },
        {
            id: "aluminum",
            title: "Aluminum",
            image: "./assets/images/material-aluminum.jpg",
            text:
                "Often compared for lightweight structure, modern looks, and corrosion considerations.",
            points: ["Weight", "Style", "Maintenance", "Compatibility"]
        },
        {
            id: "glass",
            title: "Glass",
            image: "./assets/images/material-glass.jpg",
            text:
                "Often compared for modern design, privacy, frame style, and insulation choices.",
            points: ["Style", "Privacy", "Insulation", "Frame type"]
        }
    ],

    anatomyParts: [
        {
            label: "Panels",
            text: "Ask providers about material, insulation, and replacement compatibility."
        },
        {
            label: "Tracks",
            text: "Track condition can affect movement, fit, and repair scope."
        },
        {
            label: "Springs",
            text: "Spring-related work should be discussed carefully with qualified providers."
        },
        {
            label: "Rollers",
            text: "Roller type and condition can affect noise and smooth operation."
        },
        {
            label: "Opener",
            text: "Compare motor type, controls, smart features, and compatibility."
        },
        {
            label: "Sensors",
            text: "Safety sensor setup should be verified directly with providers."
        },
        {
            label: "Weather seal",
            text: "Ask about sealing, drafts, and bottom-edge condition."
        }
    ],

    doorTabs: [
        {
            id: "sectional",
            label: "Sectional",
            image: "./assets/images/tab-sectional.jpg",
            title: "Sectional garage doors",
            text:
                "Sectional doors are common in residential settings. Compare providers familiar with material, insulation, panel style, track condition, opener fit, and warranty questions.",
            compare: [
                "Panel material",
                "Insulation level",
                "Track compatibility",
                "Opener fit",
                "Warranty terms"
            ]
        },
        {
            id: "roll-up",
            label: "Roll-Up",
            image: "./assets/images/tab-roll-up.jpg",
            title: "Roll-up garage doors",
            text:
                "Roll-up door projects may require specific hardware, clearance, and provider familiarity. Ask providers about fit, material, operation, and maintenance considerations.",
            compare: [
                "Clearance needs",
                "Door weight",
                "Hardware type",
                "Operation style",
                "Service availability"
            ]
        },
        {
            id: "carriage",
            label: "Carriage Style",
            image: "./assets/images/tab-carriage.jpg",
            title: "Carriage style garage doors",
            text:
                "Carriage style doors are often compared for visual character, panel design, hardware details, insulation, and opener compatibility.",
            compare: [
                "Visual style",
                "Decorative hardware",
                "Material options",
                "Opener compatibility",
                "Quote scope"
            ]
        },
        {
            id: "glass",
            label: "Glass Garage Doors",
            image: "./assets/images/tab-glass.jpg",
            title: "Glass garage doors",
            text:
                "Glass garage door projects can involve frame finish, privacy, insulation, panel type, and maintenance questions. Compare providers before choosing a direction.",
            compare: [
                "Frame material",
                "Privacy level",
                "Glass type",
                "Insulation",
                "Warranty"
            ]
        },
        {
            id: "insulated",
            label: "Insulated Doors",
            image: "./assets/images/tab-insulated.jpg",
            title: "Insulated garage doors",
            text:
                "Insulated door options are often compared for thermal performance, noise reduction, door weight, opener fit, and material durability.",
            compare: [
                "Insulation rating",
                "Door weight",
                "Noise reduction",
                "Opener fit",
                "Material durability"
            ]
        }
    ],

    soundSelector: {
        title: "Sound Level Selector",
        text:
            "Compare opener-related provider questions by operation preference.",
        options: [
            {
                id: "quiet",
                label: "Quiet",
                title: "Quiet operation",
                text:
                    "Ask providers about belt-drive options, roller condition, door balance, insulation, and vibration control.",
                compare: [
                    "Belt-drive options",
                    "Roller quality",
                    "Door balance",
                    "Vibration control"
                ]
            },
            {
                id: "balanced",
                label: "Balanced",
                title: "Balanced everyday use",
                text:
                    "Compare opener type, warranty, remote setup, sensor configuration, and compatibility with the existing door.",
                compare: [
                    "Motor type",
                    "Remote setup",
                    "Sensor configuration",
                    "Warranty"
                ]
            },
            {
                id: "heavy-duty",
                label: "Heavy Duty",
                title: "Heavy-duty operation",
                text:
                    "Ask providers about motor strength, door weight, hardware condition, rail system, and long-term compatibility.",
                compare: [
                    "Motor strength",
                    "Door weight",
                    "Rail system",
                    "Hardware condition"
                ]
            }
        ]
    },

    faqs: {
        global: [
            {
                question: "Does GARVOX perform garage door services directly?",
                answer:
                    "No. GARVOX is an independent provider-matching platform. It helps homeowners compare local garage door provider options, but it does not install, repair, replace, inspect, or service garage doors directly."
            },
            {
                question: "How do I compare local garage door providers?",
                answer:
                    "Compare provider service categories, quote scope, availability, warranty terms, license and insurance details, opener compatibility, and project timelines directly with each provider."
            },
            {
                question: "How do I know if a provider serves my area?",
                answer:
                    "Provider availability may vary by ZIP code, city, service category, and schedule. Homeowners should confirm service area details directly with providers."
            }
        ],

        services: [
            {
                question: "Can I compare providers for all garage door categories?",
                answer:
                    "GARVOX organizes provider comparison around four categories: installation, replacement, repair, and garage door openers."
            },
            {
                question: "What should I ask before choosing a garage door company?",
                answer:
                    "Ask about license, insurance, quote details, warranty, service area, project timeline, materials, opener compatibility, and any factors that could affect pricing."
            },
            {
                question: "Are quotes from providers usually free?",
                answer:
                    "Quote practices can vary by provider and location. Homeowners should ask each provider directly whether estimates, diagnostics, or service calls have fees."
            }
        ],

        contact: [
            {
                question: "What happens after I submit a request?",
                answer:
                    "Your request information helps frame the provider comparison. You should still verify license, insurance, pricing, warranty, service area, and schedule directly with providers."
            },
            {
                question: "Can GARVOX guarantee provider availability?",
                answer:
                    "No. Provider availability depends on location, category, schedule, and provider capacity. Availability should be confirmed directly with the provider."
            },
            {
                question: "Is GARVOX a contractor?",
                answer:
                    "No. GARVOX is not a contractor and does not perform garage door services directly."
            }
        ]
    },

    pageMeta: {
        "index.html": {
            title: "GARVOX | Compare Garage Door Provider Options",
            description:
                "GARVOX helps homeowners compare independent local garage door provider options for installation, replacement, repair, and openers."
        },
        "services.html": {
            title: "Garage Door Services | GARVOX",
            description:
                "Explore GARVOX garage door provider matching categories: installation, replacement, repair, and garage door openers."
        },
        "about.html": {
            title: "About GARVOX | Garage Door Provider Matching",
            description:
                "Learn how GARVOX helps homeowners compare independent garage door provider options while staying clear about its aggregator model."
        },
        "contact.html": {
            title: "Contact GARVOX | Start a Provider Comparison Request",
            description:
                "Contact GARVOX to begin a garage door provider comparison request for installation, replacement, repair, or opener-related projects."
        },
        "garage-door-installation.html": {
            title: "Garage Door Installation Provider Comparison | GARVOX",
            description:
                "Compare independent provider options for garage door installation projects, including materials, fit, opener compatibility, and warranty questions."
        },
        "garage-door-replacement.html": {
            title: "Garage Door Replacement Provider Comparison | GARVOX",
            description:
                "Compare garage door replacement provider options and review material, insulation, removal, opener fit, quote scope, and warranty questions."
        },
        "garage-door-repair.html": {
            title: "Garage Door Repair Provider Comparison | GARVOX",
            description:
                "Compare provider options for garage door repair-related requests, including springs, tracks, rollers, panels, openers, and noisy operation."
        },
        "garage-door-openers.html": {
            title: "Garage Door Opener Provider Comparison | GARVOX",
            description:
                "Compare garage door opener provider options, including motor type, quiet operation, smart features, sensors, compatibility, and warranty."
        },
        "privacy-policy.html": {
            title: "Privacy Policy | GARVOX",
            description:
                "Read the GARVOX Privacy Policy for the garage door provider matching website."
        },
        "cookie-policy.html": {
            title: "Cookie Policy | GARVOX",
            description:
                "Read the GARVOX Cookie Policy and learn how policy confirmation is handled on this website."
        },
        "terms-of-service.html": {
            title: "Terms of Service | GARVOX",
            description:
                "Read the GARVOX Terms of Service for using the garage door provider matching website."
        }
    },

    legacyReplace: {
        brandNames: [
            "Old Brand",
            "Solar",
            "Solar Advisor",
            "AquaStep",
            "Skylin",
            "Airlynx"
        ],
        phones: [
            "(000) 000-0000",
            "000-000-0000"
        ],
        emails: [
            "hello@example.com",
            "contact@example.com"
        ],
        addresses: [
            "123 Main Street",
            "Example Address"
        ]
    }
};