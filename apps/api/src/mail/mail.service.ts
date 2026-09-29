import { Injectable, Logger } from '@nestjs/common';

/**
 * Fronteira p/ envio de e-mail. Em dev apenas loga o link (ADR-0010).
 * Trocar por Resend (ou similar) quando houver provedor, sem tocar no AuthService.
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  async sendPasswordReset(email: string, resetUrl: string): Promise<void> {
    this.logger.log(`[DEV] Recuperação de senha para ${email}: ${resetUrl}`);
  }

  async sendEmailVerification(email: string, verifyUrl: string): Promise<void> {
    this.logger.log(`[DEV] Verificação de e-mail para ${email}: ${verifyUrl}`);
  }
}
