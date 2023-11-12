const blue = [
    {
        weaponName: "G3SG1",
        skinName: "Ventilator",
        prices: [0, 0.13, 0.14, 0.19, 0.44, 0, 0.31, 0.22, 0.52, 1.69],
        priceRange: "$0.13 - $0.44",
        statRange: "$0.22 - $1.69",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_g3sg1_gs_g3sg1_ventilator_light_large.5cd3643d4d9cd0599e25a1302e788611bd9a0023.png"
    },
    {
        weaponName: "UMP-45",
        skinName: "Briefing",
        prices: [0.11, 0.11, 0.14, 0.22, 0.46, 0.20, 0.20, 0.20, 0.96, 2.59],
        priceRange: "$0.11 - $0.46",
        statRange: "$0.20 - $2.59",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ump45_cu_ump45_metritera_light_large.46ac4388a9651c555ec6849358b85f60a87c328d.png"
    },
    {
        weaponName: "Negev",
        skinName: "Dazzle",
        prices: [0.11, 0.14, 0.14, 0.46, 0, 0.20, 0.57, 0.20, 2.40, 0],
        priceRange: "$0.11 - $0.46",
        statRange: "$0.20 - $2.40",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_negev_hy_negev_dazzle_light_large.3558ece2a70252dcaa8ea9e324539ae1a4fc1bc0.png"
    },
    {
        weaponName: "CZ75-Auto",
        skinName: "Imprint",
        prices: [0.11, 0.13, 0.15, 0.17, 0.56, 0.20, 0.20, 0.24, 0.56, 3.06],
        priceRange: "$0.11 - $0.56",
        statRange: "$0.20 - $3.06",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_cz75a_gs_cz75_tread_light_large.8c276db730bb33477aaa52f7a23825f295e14364.png"
    },
    {
        weaponName: "Five-SeveN",
        skinName: "Scumbria",
        prices: [0.11, 0.11, 0.14, 0.19, 0.57, 0.20, 0.20, 0.23, 0.49, 3.45],
        priceRange: "$0.11 - $0.57",
        statRange: "$0.20 - $3.45",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_fiveseven_aq_five_seven_scumbria_light_large.bc05fc6435b84525a0ab140bc72e032a98dab710.png"
    },
    {
        weaponName: "XM1014",
        skinName: "Slipstream",
        prices: [0.15, 0.17, 0.14, 0.26, 0.48, 0.55, 0.55, 0.48, 1.21, 2.01],
        priceRange: "$0.14 - $0.48",
        statRange: "$0.48 - $2.01",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_xm1014_hy_xm1014_fractal_blue_light_large.e9720fb7b5928db8bcf79d62850af5bf475b9ec5.png"
    },
    {
        weaponName: "P90",
        skinName: "Grim",
        prices: [0.14, 0.27, 0.17, 0.34, 1.22, 0.42, 2.22, 0.49, 1.50, 5.31],
        priceRange: "$0.14 - $1.22",
        statRange: "$0.42 - $5.31",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_p90_cu_p90_grimm_light_large.59514d7b54f637f314329bb3fef1c7ffd1b153ba.png"
    }
];

const purple = [
    {
        weaponName: "SCAR-20",
        skinName: "Powercore",
        prices: [0.38, 0.51, 0.48, 0.86, 2.48, 0.86, 0.75, 0.82, 2.18, 6.18],
        priceRange: "$0.38 - $2.48",
        statRange: "$0.75 - $6.18",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_scar20_gs_scar20_powercore_light_large.74bcd65b1a4a52dd397ede5aa59b860ca4c38939.png"
    },
    {
        weaponName: "MAG-7",
        skinName: "Petroglyph",
        prices: [0, 0.84, 0.55, 0.88, 2.11, 0, 1.02, 1.06, 2.22, 5.98],
        priceRange: "$0.55 - $2.11",
        statRange: "$1.02 - $5.98",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_mag7_cu_mag7_tribal_light_large.c226728af447f07808ea5954eb9a24528092d972.png"
    },
    {
        weaponName: "SG 553",
        skinName: "Triarch",
        prices: [0.44, 0.44, 0.49, 0.89, 3.50, 0.84, 0.78, 0.89, 2.23, 9.64],
        priceRange: "$0.44 - $3.50",
        statRange: "$0.78 - $9.64",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_sg556_cu_sg556_triarch_light_large.3ea74bea530adda100d25911372ca313ea99453a.png"
    },
    {
        weaponName: "Glock-18",
        skinName: "Weasel",
        prices: [0.46, 0.46, 0.52, 1.06, 3.69, 1.43, 1.51, 1.90, 5.23, 22.62],
        priceRange: "$0.46 - $3.69",
        statRange: "$1.43 - $22.62",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_glock_cu_glock18_weasel_light_large.e02e6e5196ebdee47c595799ff011dd645147505.png"
    },
    {
        weaponName: "Desert Eagle",
        skinName: "Directive",
        prices: [0.49, 0.56, 0.64, 2.34, 18.30, 2.62, 2.80, 2.95, 11.34, 68.30],
        priceRange: "$0.49 - $18.30",
        statRange: "$2.62 - $68.30",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_deagle_aq_desert_eagle_constable_light_large.fb2f2673dd3997a21bff9129e0d2e294c03095e8.png"
    }
];

const pink = [
    {
        weaponName: "MP9",
        skinName: "Airlock",
        prices: [2.22, 2.30, 2.64, 6.27, 16.63, 5.94, 6.12, 6.47, 14.60, 39.80],
        priceRange: "$2.22 - $16.63",
        statRange: "$5.94 - $39.80",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_mp9_cu_mp9_narcis_light_large.c63eaf3fab8c65ec3ab22da8205cbe3c51366d7a.png"
    },
    {
        weaponName: "AUG",
        skinName: "Syd Mead",
        prices: [2.45, 4.91, 2.66, 6.08, 14.00, 5.46, 7.85, 5.98, 15.31, 39.30],
        priceRange: "$2.45 - $14.00",
        statRange: "$5.46 - $39.30",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_aug_gs_aug_syd_mead_light_large.333597e0555639f5d77541c363a9bb38d95055f3.png"
    },
    {
        weaponName: "Tec-9",
        skinName: "Fuel Injector",
        prices: [2.78, 2.95, 3.90, 7.24, 22.93, 7.57, 8.41, 10.22, 23.57, 66.24],
        priceRange: "$2.78 - $22.93",
        statRange: "$7.57 - $66.24",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_tec9_gs_tec9_supercharged_light_large.e3ebc20f10eae02790fe95703b6099acca1d1809.png"
    }
];

const red = [
    {
        weaponName: "FAMAS",
        skinName: "Roll Cage",
        prices: [3.74, 4.00, 4.91, 8.61, 29.46, 11.53, 11.78, 14.29, 28.58, 138.77],
        priceRange: "$3.74 - $29.46",
        statRange: "$11.53 - $138.77",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_famas_gs_famas_rally_light_large.538baee44eb772de95029e4267ea9c41101bbc94.png"
    },
    {
        weaponName: "AK-47",
        skinName: "Neon Revolution",
        prices: [20.84, 33.28, 24.34, 39.67, 107.14, 63.37, 91.31, 75.17, 118.63, 306.60],
        priceRange: "$20.84 - $107.14",
        statRange: "$63.37 - $306.60",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ak47_cu_ak47_anarchy_light_large.6e98f0c6fcb81aaeca03c56eed68962f50c9ef94.png"
    }
];

module.exports = {blue, purple, pink, red};