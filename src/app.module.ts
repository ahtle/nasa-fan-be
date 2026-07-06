import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { HealthModule } from "./health/health.module";
import { MissionsModule } from "./missions/missions.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule, AuthModule, HealthModule, MissionsModule],
})
export class AppModule {}
