import { ErrorRequestHandler } from "express";
import { ErrorMessage } from "../../types/error";
import mongoose from "mongoose";
import {ZodError} from 'zod'
import { StatusCodes } from 'http-status-codes';

const globalErrorHandler:ErrorRequestHandler = (err, req, res, next) => {
    let status=500;
    let message="Something went wrong!";
    let errorMessages:ErrorMessage =[];

    if(err instanceof mongoose.Error.ValidationError){

    }else if(err instanceof mongoose.Error.CastError){

    }else if(err instanceof ZodError){

    }else if (err.code === 11000) {
        // Handle MongoDB duplicate key error
        statusCode = StatusCodes.CONFLICT;
        message = 'Duplicate key error';
        errorMessages = [{ path: '', message: 'Duplicate key found' }];
      }
};

export default globalErrorHandler;
