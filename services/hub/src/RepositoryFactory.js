/**
 * RepositoryFactory.js
 * 
 * THE FACTORY (Switch)
 * Initializes the correct engine based on environment variables.
 */

const FirestoreRepository = require('./adapters/db/FirestoreRepository');
const SpannerRepository = require('./adapters/db/SpannerRepository');

class RepositoryFactory {
    static getRepository() {
        const mode = process.env.DATABASE_MODE || 'FIRESTORE';

        console.log(`[FACTORY] Detecting Engine Mode: ${mode}`);

        if (mode === 'SPANNER') {
            return new SpannerRepository();
        } else {
            return new FirestoreRepository();
        }
    }
}

module.exports = RepositoryFactory;
