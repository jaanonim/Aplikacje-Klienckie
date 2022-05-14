class Middleware {
    static async use(ctx) {
        return false;
    }
}

module.exports = Middleware;
