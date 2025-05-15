import { RESPONSE_MSG_KEY } from '@common/enums';
import { SetMetadata } from '@nestjs/common';

export const ResponseMessage = (message: string) =>
  SetMetadata(RESPONSE_MSG_KEY, message);
