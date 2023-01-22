// webpack.mix.js
let mix = require('laravel-mix');

// mix.js('resources/js/app.js', 'public/js/app.js').setPublicPath('dist');
mix.js('resources/js/script.js', 'public/js/script.js').sass('resources/scss/app.scss','public/css/mystyle.css');