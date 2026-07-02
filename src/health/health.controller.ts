import { Controller, Get, ServiceUnavailableException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Controller("health")
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async check() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      const missionCount = await this.prisma.mission.count();

      return {
        status: "ok",
        database: "connected",
        missionCount,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";

      throw new ServiceUnavailableException({
        status: "error",
        database: "disconnected",
        error: message,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
