"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    port: {
        gateway: process.env.PORT_GATEWAY || 4000,
        accounts: process.env.PORT_ACCOUNTS || 4001,
        tickets: process.env.PORT_TICKETS || 4002,
    },
    apollo: {
        introspection: process.env.APOLLO_INTROSPECTION === 'true',
        playground: process.env.APOLLO_PLAYGROUND === 'true',
    },
};
//# sourceMappingURL=environment.js.map