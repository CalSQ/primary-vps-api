import { SessionDoc } from 'src/schemas/Session.schema';
import { UserSession } from 'src/user/types/user';

export interface ISessionService {
  serialize(request: Request, userSession: UserSession): Promise<SessionDoc>;
  deleteSession(sessionId: string): Promise<boolean>;
}
