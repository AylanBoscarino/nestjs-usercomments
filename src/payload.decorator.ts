import { createParamDecorator } from '@nestjs/common';

export const Payload = createParamDecorator((data, req) => req.payload);
