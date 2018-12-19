# React-Native-Catalog-app
An e-commerce app built with React-Native and Redux for state management

## Installation for Release Build

###Requirements

* Android Device running >= Android 4.1 (API 16) or
* Android Emulator e.g. Android Studio

Copy the apk file from android/app/build/outputs/apk/release/app-release.apk and install it on the Android device.

If using an Emulator:

1. Open the Emulator and wait for it to start up
2. Go to your sdk installation folder then go to platform-tools (you should see an executable called adb.exe)
3. Copy the apk file into the same folder
4. Create a new file called run.bat and add CMD to the file
5. Open run.bat and type
```bash
adb install app-release.apk
```
6. Wait until installation is complete.

## Instalation for development Build

###Requirements
* NodeJS, Python 2, JDK 8
* React-Native

More information can be found at https://facebook.github.io/react-native/docs/getting-started

###Installation

Open terminal and go to the project folder and type
```bash
npm install
```

This will install all dependencies that the project requires.

## Usage

To run the app in dvelopment build:

1. Run an android emulator or an android device in USB debugging mode
2. Then open terminal and type
```bash
cd React-Native-Catalog-app	
react-native run-android
```

To run the app in release build:
```bash
react-native run-android variant=release
```

