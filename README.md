# Expo Demo Stores

Some small stories from the field about using various parts of EAS

## OTA Updates

### 1. EAS Workflows / Release branch automation / release to multiple versions

Let's suppose that we do trunk-based development and we release based on tagging commits. We'll tag releases in the format "release-1.2.0".

To semantically differentiate native builds from updates, we'll use patch version:

- 1.2.0 - native version / app store build
- 1.2.1 - OTA update

Thus, our runtime version will be x.y.0. An update must only change the patch number to be compatible.

#### On binary/store release

1. tag `release-x.y.0`
2. **production-build.yaml** workflow will run, creating/submitting builds to stores
3. create `build-x.y.0` branch, this will be the workspace for cherry-picking commits for future updates

#### On update

1. Cherry pick desired commits to `build-x.y.0` branch
2. **check-native-build.yaml** will run, confirm that new JS is still runtime-compatible
3. Tag `release-x.y.1` (or higher)
4. **ota-update.yaml** will run, publishing OTA update (after one more runtime check)
5. Repeat for any other builds that should be updated.

### 2. Normal vs critical updates
