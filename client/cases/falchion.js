const blue = [
    {
        weaponName: "UMP-45",
        skinName: "Riot",
        prices: [0.33, 0.40, 0.34, 0.41, 0.78, 0.35, 0.46, 0.48, 1.15, 2.16],
        priceRange: "$0.33 - $0.78",
        statRange: "$0.35 - $2.16",
        rarity: "blue",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ump45_cu_ump45_uproar_light_large.04cd84320c4370bced14a3989b0e141cff67ec88.png"
    },
    {
        weaponName: "Nova",
        skinName: "Ranger",
        prices: [0.35, 0.33, 0.40, 0.40, 1.07, 0.42, 0.44, 0.53, 1.17, 4.25],
        priceRange: "$0.33 - $1.07",
        statRange: "$0.42 - $4.25",
        rarity: "blue",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_nova_cu_nova_ranger_light_large.e3e9d3d47d5707092223a268ef59adb53ce76278.png"
    },
    {
        weaponName: "P90",
        skinName: "Elite Build",
        prices: [0.31, 0.35, 0.35, 0.41, 2.15, 0.37, 0.40, 0.64, 1.76, 11.85],
        priceRange: "$0.31 - $2.15",
        statRange: "$0.37 - $11.85",
        rarity: "blue",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_p90_cu_p90_mastery_light_large.f58ff489c92ffa8c6e4c42814bad01c352df0ab6.png"
    },
    {
        weaponName: "Glock-18",
        skinName: "Bunsen Burner",
        prices: [0.46, 0.56, 0.37, 0.71, 2.80, 1.94, 3.72, 1.58, 2.77, 11.20],
        priceRange: "$0.37 - $2.80",
        statRange: "$1.58 - $11.20",
        rarity: "blue",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_glock_aq_glock18_flames_blue_light_large.5fed23d5a32793c25914eeb99b45f1a2b0cb9d6c.png"
    },
    {
        weaponName: "USP-S",
        skinName: "Torque",
        prices: [3.18, 1.31, 1.15, 1.84, 2.58, 5.41, 4.59, 3.32, 5.10, 7.53],
        priceRange: "$1.15 - $2.58",
        statRange: "$3.32 - $7.53",
        rarity: "blue",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_usp_silencer_cu_usp_progressiv_light_large.91cde781cd0c8502bbbb66f37cc7f1baf2a10c05.png"
    },
    {
        weaponName: "Galil AR",
        skinName: "Rocket Pop",
        prices: [0.51, 0.78, 1.29, 3.00, 10.00, 1.15, 1.33, 2.37, 6.04, 29.46],
        priceRange: "$0.51 - $10.00",
        statRange: "$1.15 - $29.46",
        rarity: "blue",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_galilar_cu_galilar_particles_light_large.8732f64d53dbc9b0c732641655d4f99124d8cacc.png"
    }
];

const purple = [
    {
        weaponName: "MP9",
        skinName: "Ruby Poison Dart",
        prices: [1.28, 0.97, 1.00, 1.68, 2.87, 2.73, 2.80, 2.69, 5.09, 8.63],
        priceRange: "$0.97 - $2.87",
        statRange: "$2.69 - $8.63",
        rarity: "purple",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_mp9_am_mp9_nitrogen_light_large.3a0b5a7cd31a7cfd5f0d90b9a0a1dbfcdb642cca.png"
    },
    {
        weaponName: "FAMAS",
        skinName: "Neural Net",
        prices: [0.99, 1.32, 0.97, 1.66, 2.71, 2.56, 3.85, 2.58, 5.07, 8.88],
        priceRange: "$0.97 - $2.71",
        statRange: "$2.56 - $8.88",
        rarity: "purple",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_famas_am_famas_dots_light_large.dc6f19278bac52ea06b8e3576fa324624f2f82b4.png"
    },
    {
        weaponName: "P2000",
        skinName: "Handgun",
        prices: [0.75, 0.89, 1.26, 2.55, 8.76, 2.33, 2.66, 3.38, 9.27, 26.81],
        priceRange: "$0.75 - $8.76",
        statRange: "$2.33 - $26.81",
        rarity: "purple",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_hkp2000_aq_p2000_boom_light_large.39f01b0b86b795bea56300432fecfbf93415ee58.png"
    },
    {
        weaponName: "Negev",
        skinName: "Loudmouth",
        prices: [1.03, 0.95, 0.84, 9.52, 0, 2.64, 2.85, 2.23, 48.30, 0],
        priceRange: "$0.84 - $9.52",
        statRange: "$2.23 - $48.30",
        rarity: "purple",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_negev_cu_negev_annihilator_light_large.421039357ccbbcb9ba1456caa1ed2ae4829b5495.png"
    },
    {
        weaponName: "M4A4",
        skinName: "Evil Daimyo",
        prices: [2.91, 4.34, 3.11, 4.67, 8.25, 11.64, 12.25, 8.03, 15.45, 31.74],
        priceRange: "$2.91 - $8.25",
        statRange: "$8.03 - $31.74",
        rarity: "purple",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_m4a1_cu_m4a4_evil_daimyo_light_large.c208ba252c0d8902caa973a634cbfa945508a716.png"
    }
];

const pink = [
    {
        weaponName: "CZ75-Auto",
        skinName: "Yellow Jacket",
        prices: [5.10, 5.97, 7.13, 11.15, 21.91, 14.14, 15.65, 17.67, 28.01, 70.53],
        priceRange: "$5.10 - $21.91",
        statRange: "$14.14 - $70.53",
        rarity: "pink",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_cz75a_cu_cz75a_chastizer_light_large.d3234c712c3c068adbbfd5718c468c778f2351dd.png"
    },
    {
        weaponName: "MP7",
        skinName: "Nemesis",
        prices: [0, 0, 7.93, 10.82, 21.10, 0, 0, 20.09, 26.91, 51.17],
        priceRange: "$7.93 - $21.10",
        statRange: "$20.09 - $51.17",
        rarity: "pink",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_mp7_cu_mp7_nemsis_light_large.72074e71a27827f41dc5d6f511d2f003c1b60d8a.png"
    },
    {
        weaponName: "SG 553",
        skinName: "Cyrex",
        prices: [6.25, 6.90, 6.91, 12.33, 29.32, 14.29, 16.63, 20.34, 34.46, 94.22],
        priceRange: "$6.25 - $29.32",
        statRange: "$14.29 - $94.22",
        rarity: "pink",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_sg556_cu_sg553_cyrex_light_large.ef2fb1e4d88e8eb7c0efe12e231a773ca1792a4d.png"
    }
];

const red = [
    {
        weaponName: "AK-47",
        skinName: "Aquamarine Revenge",
        prices: [29.27, 33.42, 46.78, 87.15, 166.65, 79.67, 91.06, 142.43, 271.40, 575.88],
        priceRange: "$29.27 - $166.65",
        statRange: "$79.67 - $575.88",
        rarity: "red",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ak47_cu_ak47_courage_alt_light_large.27e4e7d38dc2ce36ffe86bd6ec65d6f525751eaa.png"
    },
    {
        weaponName: "AWP",
        skinName: "Hyper Beast",
        prices: [34.86, 41.59, 55.92, 92.96, 169.51, 80.51, 99.78, 140.00, 257.96, 678.04],
        priceRange: "$34.86 - $169.51",
        statRange: "$80.51 - $678.04",
        rarity: "red",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_awp_cu_awp_hyper_beast_light_large.55efa5e3094af71ca6a56b6eac96cb022f7ecd8b.png"
    }
];

const knife = [
    {
        weaponName: "Falchion Knife",
        skinName: "Urban Masked",
        prices: [200.85, 198.78, 175.41, 219.47, 259.90, 207.02, 274.16, 202.90, 269.57, 445.36],
        priceRange: "$175.41 - $259.90",
        statRange: "$202.90 - $445.36",
        rarity: "yellow",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_knife_falchion_sp_tape_urban_light_large.c3904e816bfc30cd130a7a1865ef37a32ed03434.png"
    },
    {
        weaponName: "Falchion Knife",
        skinName: "Safari Mesh",
        prices: [186.44, 189.12, 176.65, 204.45, 403.03, 207.98, 143.86, 199.44, 269.81, 200.00],
        priceRange: "$176.65 - $403.03",
        statRange: "$143.86 - $269.81",
        rarity: "yellow",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_knife_falchion_sp_mesh_tan_light_large.eccb7999f574f5e1080dfef159c3903c4e6db0de.png"
    },
    {
        weaponName: "Falchion Knife",
        skinName: "Night",
        prices: [195.12, 241.52, 219.44, 271.36, 432.14, 213.73, 185.00, 288.14, 263.00, 0],
        priceRange: "$195.12 - $432.14",
        statRange: "$185.00 - $288.14",
        rarity: "yellow",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_knife_falchion_so_night_light_large.535e93982805360eacc5969e1b28fe64f15216fe.png"
    },
    {
        weaponName: "Falchion Knife",
        skinName: "Boreal Forest",
        prices: [182.00, 219.02, 189.54, 230.87, 593.28, 213.37, 317.43, 235.79, 243.38, 115.00],
        priceRange: "$182.00 - $593.28",
        statRange: "$115.00 - $317.43",
        rarity: "yellow",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_knife_falchion_hy_forest_boreal_light_large.9bf4abd73deee0ae82ce0a8670e1056d3a546107.png"
    },
    {
        weaponName: "Falchion Knife",
        skinName: "Stained",
        prices: [198.58, 218.46, 222.01, 256.21, 434.48, 220.82, 193.48, 241.42, 286.80, 484.08],
        priceRange: "$198.58 - $434.48",
        statRange: "$1932.48 - $484.08",
        rarity: "yellow",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_knife_falchion_aq_forced_light_large.3b986dfc395e6607d1f05fcd1f3e6b8c2c2c1f59.png"
    },
    {
        weaponName: "Falchion Knife",
        skinName: "Forest DDPAT",
        prices: [195.48, 205.25, 182.00, 222.20, 546.40, 115.12, 413.03, 214.11, 257.50, 0],
        priceRange: "$182.00 - $546.40",
        statRange: "$115.12 - $413.03",
        rarity: "yellow",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_knife_falchion_hy_ddpat_light_large.3b2857b99bb2aa1b1337248d8a1ae24aae1bf450.png"
    },
    {
        weaponName: "Falchion Knife",
        skinName: "Scorched",
        prices: [203.39, 193.91, 173.91, 203.39, 810.68, 121.87, 371.79, 221.10, 271.19, 275.76],
        priceRange: "$173.91 - $810.68",
        statRange: "$121.87 - $371.79",
        rarity: "yellow",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_knife_falchion_sp_dapple_light_large.072bd4143a0c769f2d78835eaee88de49c849bd3.png"
    },
    {
        weaponName: "Falchion Knife",
        skinName: "Crimson Web",
        prices: [266.24, 371.45, 359.68, 552.06, 1318.53, 353.01, 332.39, 397.17, 325.00, 0],
        priceRange: "$266.24 - $1318.53",
        statRange: "$325.00 - $397.17",
        rarity: "yellow",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_knife_falchion_hy_webs_light_large.9c355c7819b8fd993b543bceec976e798e6e8633.png"
    },
    {
        weaponName: "Falchion Knife",
        skinName: "★ (Vanilla)",
        prices: [371.82, 371.82, 371.82, 371.82, 371.82, 394.66, 394.66, 394.66, 394.66, 394.66],
        priceRange: "$371.82 - $371.82",
        statRange: "$394.66 - $394.66",
        rarity: "yellow",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapons/base_weapons/weapon_knife_falchion.adcc43a018fd4fe315dbdbc7960cfc52c5d63e3e.png"
    },
    {
        weaponName: "Falchion Knife",
        skinName: "Blue Steel",
        prices: [261.37, 278.44, 281.52, 313.40, 847.50, 346.43, 325.45, 325.32, 483.03, 375.91],
        priceRange: "$261.37 - $847.50",
        statRange: "$325.32 - $483.03",
        rarity: "yellow",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_knife_falchion_aq_blued_light_large.ead09a065b115e707a59aa49689af0ed3dd8d1f3.png"
    },
    {
        weaponName: "Falchion Knife",
        skinName: "Case Hardened",
        prices: [316.97, 338.86, 346.40, 500.46, 760.83, 399.26, 426.01, 464.31, 589.58, 534.52],
        priceRange: "$316.97 - $760.83",
        statRange: "$399.26 - $589.58",
        rarity: "yellow",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_knife_falchion_aq_oiled_light_large.ddcd8f4a87e08ab50fe3241e6791896125c48e03.png"
    },
    {
        weaponName: "Falchion Knife",
        skinName: "Slaughter",
        prices: [0, 0, 482.43, 490.76, 593.75, 0, 0, 331.69, 511.93, 628.85],
        priceRange: "$482.43 - $593.75",
        statRange: "$331.69 - $628.85",
        rarity: "yellow",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_knife_falchion_am_zebra_light_large.3cbce2191d2a20b88e610d8180c2f4a9ee0066ca.png"
    },
    {
        weaponName: "Falchion Knife",
        skinName: "Fade",
        prices: [0, 0, 0, 723.65, 785.19, 0, 0, 0, 275.68, 912.62],
        priceRange: "$723.65 - $785.19",
        statRange: "$275.68 - $912.62",
        rarity: "yellow",
        case: "falchion",
        imageUrl: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_knife_falchion_aa_fade_light_large.1db6bc12f4b49677b330382c3e5af21f46d0c124.png"
    }
];

module.exports = {blue, purple, pink, red, knife};