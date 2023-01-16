import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { DateTime } from 'luxon';

class PictureValidators {
    public getPictures = [
        check('from').notEmpty().withMessage('From is required').bail(),
        check('from')
            .matches(/^\d{4}-\d{2}-\d{2}$/g)
            .withMessage('Please use correct date format: YYYY-MM-DD')
            .bail(),
        check('to')
            .custom((value, { req }) => {
                const from = req.query?.from;
                return this.isFromDateBeforeToDate(from, value);
            })
            .bail(),
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        },
    ];

    private isFromDateBeforeToDate = (from: string, to?: string): boolean => {
        if (to !== undefined) {
            const start = DateTime.fromISO(from).startOf('day');
            const end = DateTime.fromISO(to).startOf('day');

            const isBefore = start.toMillis() <= end.toMillis();

            if (!isBefore) {
                throw new Error('From date should be before To date');
            }
        }
        return true;
    };
}

export default PictureValidators;
