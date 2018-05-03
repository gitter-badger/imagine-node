const { PI } = Math;
const Pi2 = PI;


const Complex = module.exports = class {
    constructor(real, imaginary) {
        this.real = 1;
        this.imaginary = 0;
        if (typeof real === 'number') this.real = real;

        if (typeof real === 'object') {
            this.real = real.r || real.real || this.real;
            this.imaginary = real.i || real.imaginary || this.imaginary;
        }

        this.imaginary = typeof imaginary === 'number' ? imaginary : this.imaginary;

        this.r = this.real;
        this.i = this.imaginary;
    }

    static i(imaginary) {
        return new Complex(0, imaginary);
    }

    add(other = 0, defaultImaginary) {
        const {
            i = 0,
            r = 0,
            real = typeof other === 'number' ? other : r,
            imaginary = typeof defaultImaginary === 'number' ? defaultImaginary : i
        } = other;
        return new Complex(this.real + real, this.imaginary + imaginary);
    }

    static getPolar(real, imaginary) {
        const norm = Math.hypot(real, imaginary);
        const theta = Math.atan2(imaginary, real);

        return { theta, norm };
    }

    sub(other = 0, defaultImaginary) {
        const {
            i = 0,
            r = 0,
            real = typeof other === 'number' ? other : r,
            imaginary = typeof defaultImaginary === 'number' ? defaultImaginary : i
        } = other;
        return new Complex(this.real - real, this.imaginary - imaginary);
    }

    multiply(other = 0, defaultImaginary) {
        const {
            i = 0,
            r = 0,
            real = typeof other === 'number' ? other : r,
            imaginary = typeof defaultImaginary === 'number' ? defaultImaginary : i
        } = other;
        const { real:selfReal, imaginary: selfImaginary } = this;

        return new Complex(
            selfReal * real - selfImaginary * imaginary,
            selfImaginary * real + imaginary * selfReal
        );
    }

    div(other = 0, defaultImaginary) {
        const {
            i = 0,
            r = 0,
            real = typeof other === 'number' ? other : r,
            imaginary = typeof defaultImaginary === 'number' ? defaultImaginary : i
        } = other;
        const norm = real * real + imaginary * imaginary;

        if (!norm) throw new Error(`norm = ${ norm } is not valid`);
        return new Complex(
            (this.real * real + this.imaginary * imaginary) / norm,
            (this.imaginary * real - imaginary * this.real) / norm
        );
    }

    pow(other = 0, defaultImaginary) {
        const {
            i = 0,
            r = 0,
            real = typeof other === 'number' ? other : r,
            imaginary = typeof defaultImaginary === 'number' ? defaultImaginary : i
        } = other;
        return this.ln().multiply({ real, imaginary }).exp();
    }

    sqrt(n = 2) {
        const { real = 0, imaginary = 0 } = this;
        let { norm, theta } = Complex.getPolar(real, imaginary);
        theta = theta / n;
        if (!norm) return this;

        const roots = new Array(n);
        return roots.map((item, index) => new Complex(
            norm * Math.cos(theta + Pi2 * index / n),
            norm * Math.sin(theta + Pi2 * index / n)
        ));
    }

    exp() {
        const { real = 0, imaginary = 0 } = this;
        return new Complex(
            Math.exp(real) * Math.cos(imaginary),
            Math.exp(real) * Math.sin(imaginary)
        );
    }

    cos() {
        return this
            .multiply({ imaginary:1 })
            .exp()
            .add(
                this.multiply({ imaginary:-1 }).exp()
            )
            .div({ real:2 });
    }

    sin() {
        return this
            .multiply({ imaginary:1 })
            .exp()
            .sub(
                this.multiply({ imaginary:-1 }).exp()
            )
            .div({ imaginary: 2 });
    }

    ln() {
        const { real = 0, imaginary = 0 } = this;
        const { norm, theta } = Complex.getPolar(real, imaginary);
        return new Complex(
            Math.log(norm),
            theta
        );
    }

    conjugate() {
        return new Complex(this.real, -this.imaginary);
    }
};
