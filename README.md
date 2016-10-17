# SnapChat - Mobile Computing Systems Programming

# Technologies
Mobile Client - React Native v0.34.1 (EcmaScript 2016/2017, JSX)
[https://facebook.github.io/react-native/](https://facebook.github.io/react-native/)

Backend Service - Firebase (Real-time backend as a service)
[https://firebase.google.com/](https://firebase.google.com/)

# Project System Requirements
OSX/MacOS installed with Xcode v8.0 or greater

#Installation
Requires nodejs and the react-native CLI to be installed globally.

```
brew install node
npm install -g react-native-cli
```

You can verify you have successfully installed the following by running react-native -v in the terminal aftwards.

# Running Locally

Project is located in 'SnapChat' - index.ios.js is the entry point, everything else is in the 'App' folder.

```
cd SnapChat
```

You will need to first all the javascript dependencies via NPM, and after that link that to the native IOS modules that are used within the project. This can be acheived by running the following command:

```
npm install && react-native link
```

#Running the app
```
$ npm start
```
This will run the react-native global cli 'react-native run-ios', which will boot up the emulator for IOS.
Also performs linting on file save for consistent code style/bug catching, using standardjs style for simplicity - http://standardjs.com/


#Debugging
(If chrome doesn't automatically open with the debug page open)

When the IOS emulator starts press CMD + D and press 'start remote JS debugging', which opens Chrome, open up dev tools to see console.logs.
You can also place the word debugger in the function you want to pause in, and then press CMD + R in the emulator with chrome dev tools open, and it will allow you to step through the code.
