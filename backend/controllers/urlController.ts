import { Request, Response } from 'express';
import * as Url from "../models/urlModel";
import { IUrl } from '../models/types';

export const createUrl = (req: Request, res: Response) => {
    const newUrl: Omit<IUrl, 'id'> = {
        originalUrl: req.body.originalUrl,
    };

    Url.createUrl(newUrl, (err: Error | null, url: IUrl) => {
        if (err) {
            res.status(500).json({ error: 'Error creating url' });
        } else {
            res.status(201).json({ message: 'Url created successfully', url });
        }
    });
};