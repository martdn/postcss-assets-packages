const functions = require('postcss-functions');
const postcss   = require('postcss');
const _         = require('lodash');

function plugin(options) {
    const params = options || {};
    const packages = params.packages;

    return postcss()
        .use(functions({
            functions: {
                "asset": function asset(path, packageName) {

                    if (!packages[packageName]) {
                        throw 'There is no pacakge "' + packageName + '" in registered packages in "postcss-assets-packages" configuration'
                    }

                    return "url(\"" + packages[packageName] + "/" + _.trim(path, '"\'') + "\")";
                }
            }
        }));
}

module.exports = postcss.plugin('postcss-assets-packages', plugin);