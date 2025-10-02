import { NextFunction, Request, Response } from 'express';
import { getPharmacyClaims } from '../services/claimsService';
import { PharmacyClaimsResponse } from '../models/PharmacyClaims';
import logger from '../logger';

// GET /pharmacyclaims with caching capability
export async function getClaims(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { query } = req;
    const { membershipId } = req.params;
    const { startDate, endDate } = query;
    const pharmacyClaims: PharmacyClaimsResponse = await getPharmacyClaims(
      membershipId,
      startDate as string,
      endDate as string
    );

    logger.info({
      message: '/cvs/v1/memberships/:membershipId/pharmacyclaims Response',
      data: pharmacyClaims,
    });

    res.json(pharmacyClaims);
  } catch (error) {
    next(error);
  }
}