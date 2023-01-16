import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import config from '../../config.js';
import PicturesController from '../controllers/pictures.controller.js';
import PictureValidators from '../validators/pictures.validator.js';

const apiLimiter = rateLimit({
    max: config.concurrentRequests,
});

const pictureRoutes = Router();
const validators = new PictureValidators();

pictureRoutes.get(
    '/',
    apiLimiter,
    validators.getPictures,
    PicturesController.getPictures
);

export default pictureRoutes;
