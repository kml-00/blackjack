var gulp = require('gulp');
var concat = require('gulp-concat')
var uglify = require('gulp-uglify-es').default;
 
gulp.task("concat", function(){
  return gulp.src(['src/player.js','src/cpu.js','src/gameview.js','src/gamecontroler.js'])
  .pipe(concat('blackjack.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
})