const brands = {
  "food-for-me": {
    name: "Food for Me",
    slug: "food-for-me",
    scheme: "foodforme",
    bundleIdentifier: "com.keith-kurak.food-for-me",
    package: "com.keithkurak.foodforme",
    assets: "./assets/brands/food-for-me",
    easProjectId: "2f5bdb5c-168e-4320-b66d-f085e55ac69e",
  },
  "food-for-my-pet": {
    name: "Food for My Pet",
    slug: "food-for-my-pet",
    scheme: "foodformypet",
    bundleIdentifier: "com.keith-kurak.food-for-my-pet",
    package: "com.keithkurak.foodformypet",
    assets: "./assets/brands/food-for-my-pet",
    easProjectId: "7b29b5e4-1ac9-41b8-b9d9-09e59f05a146",
  },
};

const fs = require("fs");
const path = require("path");

const brand = process.env.EXPO_PUBLIC_BRAND || "food-for-me";
const brandConfig = brands[brand] ?? brands["food-for-me"];

let criticalIndex = 0;
try {
  const raw = fs.readFileSync(path.join(__dirname, ".criticalIndex"), "utf-8");
  criticalIndex = parseInt(raw, 10) || 0;
} catch {}

export default {
  expo: {
    name: brandConfig.name,
    slug: brandConfig.slug,
    scheme: brandConfig.scheme,
    version: "1.0.0",
    orientation: "portrait",
    icon: `${brandConfig.assets}/icon.png`,
    userInterfaceStyle: "automatic",
    ios: {
      icon: `${brandConfig.assets}/expo.icon`,
      bundleIdentifier: brandConfig.bundleIdentifier,
    },
    android: {
      package: brandConfig.package,
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: `${brandConfig.assets}/android-icon-foreground.png`,
        backgroundImage: `${brandConfig.assets}/android-icon-background.png`,
        monochromeImage: `${brandConfig.assets}/android-icon-monochrome.png`,
      },
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: "static",
      favicon: `${brandConfig.assets}/favicon.png`,
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#208AEF",
          android: {
            image: `${brandConfig.assets}/splash-icon.png`,
            imageWidth: 76,
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      criticalIndex,
      eas: {
        projectId: brandConfig.easProjectId,
      },
    },
    updates: {
      url: `https://u.expo.dev/${brandConfig.easProjectId}`,
      runtimeVersion: { policy: "appVersion" },
      checkAutomatically: "NEVER",
    },
  },
};
