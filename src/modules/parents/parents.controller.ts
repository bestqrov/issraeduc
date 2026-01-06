import { Request, Response, NextFunction } from 'express';
import * as parentsService from './parents.service';

export const getAllParents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parents = await parentsService.getAllParents();
        res.status(200).json({
            success: true,
            data: parents,
        });
    } catch (error) {
        next(error);
    }
};

export const getParentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const parent = await parentsService.getParentById(id);
        res.status(200).json({
            success: true,
            data: parent,
        });
    } catch (error) {
        next(error);
    }
};

export const createParent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parent = await parentsService.createParent(req.body);
        res.status(201).json({
            success: true,
            data: parent,
        });
    } catch (error) {
        next(error);
    }
};

export const updateParent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const parent = await parentsService.updateParent(id, req.body);
        res.status(200).json({
            success: true,
            data: parent,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteParent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await parentsService.deleteParent(id);
        res.status(200).json({
            success: true,
            message: 'Parent deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

export const getParentByLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { link } = req.params;
        const parent = await parentsService.getParentByLink(link);
        res.status(200).json({
            success: true,
            data: parent,
        });
    } catch (error) {
        next(error);
    }
};
