const SpannerRepository = require('./SpannerRepository');
const FirestoreRepository = require('./FirestoreRepository');
const MemoryRepository = require('./MemoryRepository');

/**
 * RepositoryFactory
 * The "Switch" Logic for the Dual-Engine Architecture.
 * 
 * Logic:
 * - Reads process.env.DATABASE_MODE
 * - Returns the correct Singleton instance of the Repository.
 */
class RepositoryFactory {
    static getInstance() {
        if (!this.instance) {
            const mode = process.env.DATABASE_MODE || 'firestore_prod';

            switch (mode) {
                case 'spanner_trial':
                    this.instance = new SpannerRepository();
                    break;
                case 'firestore_prod':
                    this.instance = new FirestoreRepository();
                    break;
                case 'memory':
                    this.instance = new MemoryRepository();
                    break;
                default:
                    console.warn(`Unknown DATABASE_MODE '${mode}', falling back to Firestore.`);
                    this.instance = new FirestoreRepository();
            }
        }
        return this.instance;
    }
}

module.exports = RepositoryFactory;
