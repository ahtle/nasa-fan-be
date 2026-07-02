import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Controller("missions")
export class MissionsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll() {
    const missions = await this.prisma.mission.findMany({
      orderBy: { launchDate: "desc" },
    });

    return { missions };
  }
}
