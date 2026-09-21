import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { Request, Response } from 'express';
import type { Env } from '../config/env.validation';
import { AuthService, type RequestMeta } from './auth.service';
import { clearAuthCookies, type CookieConfig, REFRESH_COOKIE, setAuthCookies } from './cookies';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CsrfGuard } from './guards/csrf.guard';
import type { AuthUser } from './types';

type ReqWithCookies = Request & { cookies?: Record<string, string> };

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  private cookieCfg(): CookieConfig {
    return {
      isProd: this.config.get('NODE_ENV', { infer: true }) === 'production',
      domain: this.config.get('COOKIE_DOMAIN', { infer: true }),
      accessTtl: this.config.get('JWT_ACCESS_TTL', { infer: true }),
      refreshTtl: this.config.get('JWT_REFRESH_TTL', { infer: true }),
    };
  }

  private meta(req: Request): RequestMeta {
    const ua = req.headers['user-agent'];
    return { userAgent: typeof ua === 'string' ? ua : undefined, ip: req.ip };
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Cria conta e inicia sessão' })
  async register(
    @Body() dto: RegisterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.auth.register(dto.email, dto.password, dto.name, this.meta(req));
    const csrfToken = this.auth.generateCsrfToken();
    setAuthCookies(res, result, csrfToken, this.cookieCfg());
    return { user: result.user, csrfToken };
  }

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Autentica e inicia sessão' })
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.auth.login(dto.email, dto.password, this.meta(req));
    const csrfToken = this.auth.generateCsrfToken();
    setAuthCookies(res, result, csrfToken, this.cookieCfg());
    return { user: result.user, csrfToken };
  }

  @Public()
  @UseGuards(CsrfGuard)
  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({ summary: 'Rotaciona os tokens da sessão' })
  async refresh(@Req() req: ReqWithCookies, @Res({ passthrough: true }) res: Response) {
    const result = await this.auth.refresh(req.cookies?.[REFRESH_COOKIE], this.meta(req));
    const csrfToken = this.auth.generateCsrfToken();
    setAuthCookies(res, result, csrfToken, this.cookieCfg());
    return { user: result.user, csrfToken };
  }

  @Public()
  @UseGuards(CsrfGuard)
  @Post('logout')
  @HttpCode(200)
  @ApiOperation({ summary: 'Encerra a sessão atual' })
  async logout(@Req() req: ReqWithCookies, @Res({ passthrough: true }) res: Response) {
    await this.auth.logout(req.cookies?.[REFRESH_COOKIE]);
    clearAuthCookies(res, this.cookieCfg());
    return { ok: true };
  }

  @UseGuards(CsrfGuard)
  @Post('logout-all')
  @HttpCode(200)
  @ApiOperation({ summary: 'Encerra todas as sessões do usuário' })
  async logoutAll(@CurrentUser() user: AuthUser, @Res({ passthrough: true }) res: Response) {
    await this.auth.logoutAll(user.id);
    clearAuthCookies(res, this.cookieCfg());
    return { ok: true };
  }

  @Public()
  @Throttle({ default: { limit: 3, ttl: 60_000 } })
  @Post('forgot-password')
  @HttpCode(202)
  @ApiOperation({ summary: 'Solicita recuperação de senha (sempre 202)' })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.auth.forgotPassword(dto.email);
    return { ok: true };
  }

  @Public()
  @Post('reset-password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Redefine a senha e invalida sessões' })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.auth.resetPassword(dto.token, dto.password);
    return { ok: true };
  }

  @Get('me')
  @ApiOperation({ summary: 'Dados do usuário autenticado' })
  me(@CurrentUser() user: AuthUser) {
    return this.auth.me(user.id);
  }
}
