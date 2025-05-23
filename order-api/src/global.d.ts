declare module 'cache-manager-ioredis' {
    import { Store, Config } from 'cache-manager';
    
    interface RedisConfig extends Config {
        host?: string;
        port?: number;
        password?: string;
        db?: number;
    }

    const redisStore: Store;
    export = redisStore;
}