const postcss = require('postcss');
const plugin  = require('./');

describe("CDN preview postcss plugin", () => {
    it('resolves urls', () => {
        assertIsValidOutput(
            'a { background: asset("image.png", cdn) };',
            'a { background: url("https://example.cdn.ru/image.png") };',
            {
                packages: {
                    'cdn': 'https://example.cdn.ru'
                }
            });
    });

    it('handles quotes and escaped characters', () => {
        assertIsValidOutput(
            'a { ' +
                "background: asset('image.png', static); " +
                'background: asset("image.png", static); ' +
            '}',
            'a { ' +
                'background: url("https://example.static.ru/image.png"); ' +
                'background: url("https://example.static.ru/image.png"); ' +
            '}',
            {
                packages: {
                    'static': 'https://example.static.ru',
                    'cdn': 'https://example.cdn.ru'
                }
            });
    });

    it("throws when invalid package name", (done) => {
        process(
            'a { background: asset("image.png", invalid) };',
            'a { background: url("https://example.cdn.ru/image.png") };',
            {
                packages: {
                    'cdn': 'https://example.cdn.ru'
                }
            }).catch(e => {

            expect(e).toBe('There is no pacakge "invalid" in registered packages in "postcss-assets-packages" configuration');
            done();
        });
    })

});

const process = (input, output, opts) => postcss([ plugin(opts) ]).process(input);

const assertIsValidOutput = (input, output, opts) => process(input, output, opts)
    .then(result => {
        expect(result.css).toEqual(output);
        expect(result.warnings().length).toBe(0);
    });
