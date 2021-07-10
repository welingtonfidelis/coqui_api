import { AppError } from "../errors/AppError";

class ResponseClientService {
  errorResponse(error: Error): ResponseClientInterface {
    if (error instanceof AppError) {
      const code = error.code >= 100 && error.code <= 511 ? error.code : 500;
      const message = error.message || "Internal server error.";

      return {
        status_code: code,
        message,
        data: {},
      };
    }

    return {
      status_code: 500,
      message: `Internal server error: ${error.message}`,
      data: {},
    };
  }

  successResponse(
    data: any,
    code = 200,
    message = "Success"
  ): ResponseClientInterface {
    const statusCode = code >= 100 && code <= 511 ? code : 200;

    return {
      status_code: statusCode,
      message,
      data,
    };
  }
}

export { ResponseClientService };
