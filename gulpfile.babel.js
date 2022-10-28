import gulp from "gulp";
import { deleteSync } from "del";
import minify from "gulp-csso";
import gulpSass from "gulp-sass";
import sass2 from "sass";
import autoprefixer from "gulp-autoprefixer";

const sass = gulpSass(sass2);

const routes = {
    css: {
        watch: "src/PaintBox/*",
        src: "src/PaintBox/styles.scss",
        dest: "dist/css",
        //폴더이름으로 바꾸기
    },
};

const styles = () =>
    gulp
        .src(routes.css.src)
        .pipe(sass().on("error", sass.logError))
        .pipe(
            autoprefixer({
                flexbox: true,
                grid: "autoplace",
            })
        )
        .pipe(minify())
        .pipe(gulp.dest(routes.css.dest));

const watch = () => {
    gulp.watch(routes.css.watch, styles);
};

const clean = async () => await deleteSync(["dist/"]);

const prepare = gulp.series([clean]);

const assets = gulp.series([styles]);

const live = gulp.parallel([watch]);

export const dev = gulp.series([prepare, assets, live]);
