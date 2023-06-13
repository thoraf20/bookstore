import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

type Data = any | null;

abstract class ResponseObject {
  constructor(
    public success: boolean,
    public message: string,
    public data: Data = null,
  ) {}
}

export class PaginatedResponseObject extends ResponseObject {
  constructor(
    message: string,
    data: Data = null,
    perPage: number,
    page: number,
    pages?: number,
    total?: number,
  ) {
    super(true, message, {
      ...data,
      total,
      page: Number(page),
      per_page: Number(perPage),
      totoal_pages: Number(pages),
    });
  }
}

export class SuccessResponseObject extends ResponseObject {
  constructor(message: string, data: Data = null) {
    super(true, message, data);
  }
}

export const ErrorResponseObject = (error) => {
  if (error instanceof ConflictException) {
    throw new ConflictException(error.message);
  }
  if (error instanceof BadRequestException) {
    throw new BadRequestException(error.message);
  }
  if (error instanceof NotFoundException) {
    throw new NotFoundException(error.message);
  }
  if (error instanceof UnprocessableEntityException) {
    throw new UnprocessableEntityException(error.message);
  }

  throw new InternalServerErrorException(error.message);
};
