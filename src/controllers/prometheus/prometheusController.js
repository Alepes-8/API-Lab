
import { register } from '../../middleware/metrics.js';

export const metrics = async (req, res) => {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (error) {
        res.status(500).end(error.message);
    }
};

export default { 
    metrics
};