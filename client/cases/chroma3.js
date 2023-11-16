const blue = [
    {
        weaponName: "Sawed-Off",
        skinName: "Fubar",
        prices: [0.10, 0.14, 0.14, 0.14, 0.14, 0.20, 0.48, 0.48, 0.48, 0.48],
        rarity: "blue",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_sawedoff_gs_sawedoff_fubar_light_large.0673d87171fccc0fc98e77806da7259e283283ea.png"
    },
    {
        weaponName: "M249",
        skinName: "Spectre",
        prices: [0.14, 0.13, 0.13, 0.20, 0.35, 0.27, 0.26, 0.23, 0.67, 1.43],
        rarity: "blue",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_m249_cu_m249_spectre_light_large.b0a23c44e56390b4bbdc2c389911f6cc2b42da3d.png"
    },
    {
        weaponName: "G3SG1",
        skinName: "Orange Crash",
        prices: [0.11, 0.11, 0.11, 0.19, 0.46, 0.24, 0.33, 0.26, 0.69, 1.51],
        rarity: "blue",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_g3sg1_sp_g3sg1_militiaorange_light_large.215d54d5c86185e61d65694899bf029f6e070cab.png"
    },
    {
        weaponName: "SG 553",
        skinName: "Atlas",
        prices: [0.10, 0.15, 0.11, 0.20, 0.40, 0.20, 0.33, 0.26, 0.70, 1.97],
        rarity: "blue",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_sg556_cu_sg553_atlas_light_large.536218f8160485fa927e19fa06fedae43d9c04e6.png"
    },
    {
        weaponName: "P2000",
        skinName: "Oceanic",
        prices: [0.13, 0.15, 0.13, 0.22, 0.44, 0.27, 0.51, 0.27, 0.86, 2.00],
        rarity: "blue",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_hkp2000_hy_p2000_oceani_light_large.8f64654c5964975c85201b1dbbdf7b8ffab768be.png"
    },
    {
        weaponName: "Dual Berettas",
        skinName: "Ventilators",
        prices: [0.13, 0.15, 0.13, 0.22, 0.38, 0.40, 0.57, 0.40, 0.80, 1.69],
        rarity: "blue",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_elite_gs_dualberettas_ventilators_light_large.45cb1ffd25de1ed5b90ba104b1f8e0a8eb2eb255.png"
    },
    {
        weaponName: "MP9",
        skinName: "Bioleak",
        prices: [0.13, 0.17, 0.13, 0.23, 0.44, 0.52, 0.71, 0.38, 1.07, 1.90],
        rarity: "blue",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_mp9_am_mp9_bioleak_light_large.d9b0d0e9fea2104871e0510bd704bfa03cdd6056.png"
    }
];

const purple = [
    {
        weaponName: "CZ75-Auto",
        skinName: "Red Astor",
        prices: [0.48, 0.51, 0.57, 1.00, 2.37, 0.75, 1.00, 1.17, 3.03, 8.17],
        rarity: "purple",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_cz75a_gs_cz75a_redastor_light_large.e00e688986c50877a103fe66d70fdf1fc13bbe8b.png"
    },
    {
        weaponName: "Tec-9",
        skinName: "Re-Entry",
        prices: [0.52, 0.52, 0.57, 0.86, 2.27, 1.18, 2.22, 1.18, 2.53, 7.10],
        rarity: "purple",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_tec9_am_tec9_redblast_light_large.0f8de75737cc35ac1d14cf74924838da4d7ab849.png"
    },
    {
        weaponName: "Galil AR",
        skinName: "Firefight",
        prices: [0.48, 0.49, 0.63, 1.21, 3.68, 1.17, 1.18, 1.62, 4.05, 12.00],
        rarity: "purple",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_galilar_gs_galilar_incenerator_light_large.669901b842361b46108ced0a555f5575839d093e.png"
    },
    {
        weaponName: "XM1014",
        skinName: "Black Tie",
        prices: [0.51, 0.70, 0.64, 1.68, 4.14, 1.65, 3.36, 1.86, 7.32, 25.32],
        rarity: "purple",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_xm1014_cu_xm1014_spectrum_light_large.6318ee51c405fb5e8a40aedfc3d98d530f789a5b.png"
    },
    {
        weaponName: "SSG 08",
        skinName: "Ghost Crusader",
        prices: [0.46, 0.53, 0.78, 1.83, 5.09, 1.83, 1.84, 2.95, 8.06, 24.29],
        rarity: "purple",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ssg08_gs_ssg08_armacore_light_large.043342869c64e1a08107055a4e1b332ad9c763c0.png"
    }
];

const pink = [
    {
        weaponName: "UMP-45",
        skinName: "Primal Saber",
        prices: [2.56, 4.72, 3.05, 7.37, 16.13, 6.84, 7.77, 7.14, 16.61, 44.22],
        rarity: "pink",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ump45_cu_ump45_primalsaber_light_large.67bef91a43734d654516f65c4288711b257d2049.png"
    },
    {
        weaponName: "AUG",
        skinName: "Fleet Flock",
        prices: [2.48, 2.59, 3.03, 6.99, 16.61, 5.74, 5.72, 8.28, 16.56, 48.76],
        rarity: "pink",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_aug_cu_aug_swallows_light_large.29e48baa4086b20e4a5f714b5f8cc6350de7c758.png"
    },
    {
        weaponName: "P250",
        skinName: "Asiimov",
        prices: [2.66, 3.90, 5.58, 28.96, 28.96, 7.42, 14.02, 19.37, 116.36, 116.36],
        rarity: "pink",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_p250_cu_p250_asiimov_light_large.7ccf465f7dc55d2d960465d404c10cbc8c442cee.png"
    }
];

const red = [
    {
        weaponName: "PP-Bizon",
        skinName: "Judgement of Anubis",
        prices: [8.14, 7.96, 7.30, 9.88, 15.98, 21.97, 19.00, 19.90, 40.47, 76.11],
        rarity: "red",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_bizon_cu_bizon_curse_light_large.c19cf584d3e28db4914d1559cd387999457944d8.png"
    },
    {
        weaponName: "M4A1-S",
        skinName: "Chantico's Fire",
        prices: [24.69, 28.45, 36.98, 80.04, 198.20, 64.78, 71.53, 91.06, 193.22, 574.87],
        rarity: "red",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_cu_m4a1s_soultaker_light_large.4939d69bd691d421ca9c7d6558b46088c8ac5317.png"
    }
];

module.exports = {blue, purple, pink, red};