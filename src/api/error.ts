export type HttpErrorCode = 400 | 401 | 403 | 404 | 500;

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UserNotAuthenticatedError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UserForbiddenError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}
