import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { Container, Inject, Service } from 'typedi';
import { getPictureParams } from '../../domain/models/getPicturesParams.js';
import { NasaService } from '../../infrastructure/services/nasa.service.js';

@Service()
class PicturesController {
    private readonly _nasaService: NasaService;

    constructor(@Inject() nasaService: NasaService) {
        this._nasaService = nasaService;
    }

    getPictures = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { from, to } = req.query as getPictureParams;

            const response = await this._nasaService.fetchPictures(from, to);

            res.json(response);
            next();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.status);
                if (error.response?.status === 429) {
                    res.status(429).json({
                        error: error.response?.data.error.message,
                    });
                } else if (error.response?.status === 400) {
                    res.status(400).json({
                        error: error.response?.data.msg,
                    });
                } else {
                    res.status(400).json({ error });
                }
                next();
            } else {
                res.status(500).json({ error });
                next();
            }
        }
    };
}

export default Container.get(PicturesController);
