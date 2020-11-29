This project uses Gulp 4 and Sass.

The source files can be found in `/src/` folder. Javascript files are concatenated during build, the partials that will be concatenated must be located in `/src/js/` and added to `filesToConcat` array in `gulpfile.js`.

# How to use:

1. `npm i` to install all plugins
2. `gulp watch` or `gulp` to launch local server and edit the site live
3. `gulp build` to build the frontend

---

**Don't put anything in `/build/` folder, it will be deleted automatically. Throw everything in `/src/`**
