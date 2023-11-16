const blue = [
    {
        weaponName: "Negev",
        skinName: "Man-o'-war",
        prices: [0.15, 0.15, 0.15, 0.20, 0.20, 0.46, 0.46, 0.46, 0.67, 0.67],
        rarity: "blue",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_negev_am_negev_glory_light_large.11ebbe525e92bd0a56dd4d3a7795a31a01823ba7.png"
    },
    {
        weaponName: "MP7",
        skinName: "Armor Core",
        prices: [0.17, 0.14, 0.14, 0.22, 0.35, 0.41, 0.44, 0.40, 0.69, 1.35],
        rarity: "blue",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_mp7_aq_mp7_ultramodern_light_large.5351e1926e4a9599d149c4941a8603f4143ff999.png"
    },
    {
        weaponName: "Sawed-Off",
        skinName: "Origami",
        prices: [0.14, 0.17, 0.14, 0.20, 0.35, 0.66, 0.44, 0.38, 0.66, 1.44],
        rarity: "blue",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_sawedoff_cu_sawedoff_origami_light_large.5f1b3cef6d518cda69daafddd9b2c240a29cf0cc.png"
    },
    {
        weaponName: "P250",
        skinName: "Valence",
        prices: [0.17, 0.27, 0.15, 0.31, 1.21, 0.38, 1.22, 0.42, 1.36, 4.76],
        rarity: "blue",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_p250_aq_p250_contour_light_large.faf5b305c68d8ea23814163b0a69dafa7318b818.png"
    },
    {
        weaponName: "Desert Eagle",
        skinName: "Bronze Deco",
        prices: [1.17, 0.35, 0.31, 0.86, 1.65, 6.94, 1.69, 1.26, 2.38, 4.19],
        rarity: "blue",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_deagle_am_bronze_sparkle_light_large.42dc1d2bae9e586f75d6425f94a195014891533b.png"
    },
    {
        weaponName: "AK-47",
        skinName: "Elite Build",
        prices: [1.31, 1.47, 1.94, 3.21, 8.98, 5.00, 5.27, 7.01, 11.51, 44.16],
        rarity: "blue",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ak47_cu_ak47_mastery_light_large.4305c0ba4b02ce531fc08c275fa6a9d87da2cf7e.png"
    }
];

const purple = [
    {
        weaponName: "UMP-45",
        skinName: "Grand Prix",
        prices: [0.52, 0.52, 0.52, 0.52, 0.52, 1.04, 1.04, 1.04, 1.04, 1.04],
        rarity: "purple",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ump45_am_ump_racer_light_large.6d935bf0d33ca90994b1dd9aec78a8938dcd94a2.png"
    },
    {
        weaponName: "CZ75-Auto",
        skinName: "Pole Position",
        prices: [0.48, 0.56, 0.57, 1.31, 2.89, 0.82, 1.62, 1.11, 2.53, 7.94],
        rarity: "purple",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_cz75a_cu_cz75_precision_light_large.a0d0ea9d92ff9c535cbdaa9c07a1a95a5181a82b.png"
    },
    {
        weaponName: "MAG-7",
        skinName: "Heat",
        prices: [0.44, 0.51, 0.59, 1.13, 4.12, 0.86, 0.89, 1.10, 2.69, 15.67],
        rarity: "purple",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_mag7_cu_mag7_redhot_light_large.76087a836e8c98fd10765a4b56dca946ba5acb4d.png"
    },
    {
        weaponName: "AWP",
        skinName: "Worm God",
        prices: [2.44, 2.44, 2.29, 2.88, 4.01, 7.08, 10.40, 7.08, 7.71, 12.69],
        rarity: "purple",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_awp_aq_awp_twine_light_large.f976c41b8f978d2b8d13734f14f6586982d859f1.png"
    }
];

const pink = [
    {
        weaponName: "FAMAS",
        skinName: "Djinn",
        prices: [2.76, 2.81, 3.39, 7.74, 20.19, 7.16, 7.14, 9.12, 19.36, 53.10],
        rarity: "pink",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_famas_aq_famas_jinn_light_large.a0e1b8e2a572c5e3d6472181d4a0d6ce7f51139f.png"
    },
    {
        weaponName: "Five-SeveN",
        skinName: "Monkey Business",
        prices: [3.05, 3.35, 3.85, 21.21, 21.21, 6.47, 8.08, 10.48, 61.09, 61.09],
        rarity: "pink",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_fiveseven_cu_fiveseven_banana_light_large.2d78a6614cb329ada893c8d028eb5c2b485f26f0.png"
    },
    {
        weaponName: "Galil AR",
        skinName: "Eco",
        prices: [3.45, 4.36, 6.41, 51.59, 51.59, 9.10, 9.96, 14.54, 110.41, 110.41],
        rarity: "pink",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_galilar_cu_galil_eco_light_large.7f64e2d77423b3c4263a74caeda18383c2e487d5.png"
    }
];

const red = [
    {
        weaponName: "MAC-10",
        skinName: "Neon Rider",
        prices: [9.39, 9.67, 9.39, 11.96, 18.53, 0 ,26.05, 25.79, 38.94, 63.37],
        rarity: "red",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_mac10_cu_mac10_neonrider_light_large.4ba82cf2ba2d9fdc694d707b563421bbcc20b174.png"
    },
    {
        weaponName: "M4A1-S",
        skinName: "Hyper Beast",
        prices: [24.13, 28.01, 39.61, 84.18, 264.75, 61.05, 74.52, 129.58, 266.36, 762.79],
        rarity: "red",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_cu_m4a1_hyper_beast_light_large.31850937661935a062d5f6faf5a1f02fdb90b861.png"
    }
];

module.exports = {blue, purple, pink, red};