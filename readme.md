HTML Base Project
Author: Maynemer Brizuela

*Software Dependencies*

Please install this apps before using the Base Project:

- NodeJs. --> https://nodejs.org/en/
- Ruby. --> http://rubyinstaller.org/
- Sass. --> http://sass-lang.com/ 
- Gulp. --> http://gulpjs.com/
- Git for Windows. --> https://git-for-windows.github.io/
- Brackets (optional). --> http://brackets.io/

After installing the software above, go to the root folder, open CMD and run:

*npm install*

This will install all the DEV and GULP dependencies on your folder based on the package.json configuration.

*-----------------------------------------------------------------------------------*

Or Manually download the following files:

*Gulp Dependencies*

- gulp --> npm install --save-dev gulp
- gulp-concat --> npm install --save-dev gulp-concat
- gulp-connect --> npm install --save-dev gulp-connect
- gulp-sass --> npm install gulp-sass --save-dev
- gulp-jshint --> npm install jshint gulp-jshint --save-dev
- gulp-uglify --> npm install --save-dev gulp-uglify
- gulp-clean-css --> npm install gulp-clean-css --save-dev
- gulp-dest --> npm i gulp-dest --save

*Dev Dependencies*

- pump --> npm install pump --save
- jshint-stylish --> npm install --save-dev jshint-stylish
- del --> npm install --save del

- bootstrap-css --> npm install bootstrap@3 --save
- normalize-css --> npm install --save normalize.css
- jquery --> npm install jquery --save

*-----------------------------------------------------------------------------------*

*Folder Structure*
 
- + node_modules
  -- (Gulp files)  
- + dev
-   -- css  
-  -- fonts  
-  -- html  
-  -- img  
-  -- js  
-  -- sass  
-  -- video  
-  -- index.html  
- + dist
-  -- (Automaticaly generated files and folders based on DEV)
- + gulpfile.js (required)
- + package.json (required)
- + readme.md

*-----------------------------------------------------------------------------------*

*Files Usage*

*CSS*

For user generated CSS files please use the Sass Folder.

- Partials --> Use this folder to create the _partials.scss files (examples: _vars.scss, _media.scss and any other files you need to create).
- Components --> Use this folder to crete the scss file for any new component needed.
- styles.scss --> Use this file to import the partials and components scss files and also to host global CSS styles.

********Do not modify any file under the CSS folder, it will be replaced by grunt.********

*JS*

For user generated JS files please use the Components and Global folders.

- Components --> Use this js folder to add any js individual component code.
- Global --> Use this folder to add the main js code of your project.

********Do not modify the bundle.js and the main.js files, they will be replaced by grunt.********

*Dist Folder*

Use this folder only for Production Deployment.

********Do not modify any files or folders in here, they will get deleted and  replaced by grunt.********

*-----------------------------------------------------------------------------------*

*Gulp Commands*

On CMD or in Grunt for Brackets use the following:

*gulp devBuild*

Runs: 

- sassCSS --> Processes Sass Files.
- copyBSFonts --> Copy Bootstrap Fonts.
- concatBundleCSS --> Copy Normalize and Bootstrap CSS files.
- concatJS --> Concatenates user generated JS files.
- concatBundleJS --> Copy jQuery and Bootstrap JS files.
- jsHint --> Validates JS files.
- connectDev --> Creates a local server https://localhost/3010
- watchDev --> Watches for changes on DEV and reloads server.

*gulp distBuild*

Runs:

- cleanDist --> Cleans the dist folder.
- sassCSS --> Processes Sass Files.
- concatBundleCSS --> Copy Normalize and Bootstrap CSS files.
- concatJS --> Concatenates user generated JS files.
- concatBundleJS --> Copy jQuery and Bootstrap JS files.
- minifyJS --> Minifies JS files.
- minifyBundleJS --> Minifies JS vendor files.
- minifyCSS --> Minifies CSS files.
- minifyBundleCSS --> Minifies CSS vendor files.
- copyHTML --> Copy HTML Files to dist foldeer.
- copyIMG --> Copy IMG Files to dist foldeer.
- copyMedia --> Copy Media Files to dist foldeer.
- copyFonts --> Copy Font Files to dist foldeer.
- connectDist --> Creates a local server https://localhost/3010
- watchDist --> Watches for changes on DEV and reloads server.
