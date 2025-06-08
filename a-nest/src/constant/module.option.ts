import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { ChannelsModule } from "src/channels/channels.module";
import { DmsModule } from "src/dms/dms.module";
import { ChannelChats } from "src/entities/ChannelChats";
import { ChannelMembers } from "src/entities/ChannelMembers";
import { Channels } from "src/entities/Channels";
import { DMs } from "src/entities/DMs";
import { Mentions } from "src/entities/Mentions";
import { Users } from "src/entities/Users";
import { WorkspaceMembers } from "src/entities/WorkspaceMembers";
import { Workspaces } from "src/entities/Workspaces";
import { UsersModule } from "src/users/users.module";
import { WorkspacesModule } from "../workspaces/workspaces.module";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { HttpExceptionFilter } from "src/httpException.filter";
import { ValidationPipe } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";

export const module = {
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        ChannelChats,
        ChannelMembers,
        Channels,
        DMs,
        Mentions,
        Users,
        WorkspaceMembers,
        Workspaces,
      ],
      // autoLoadEntities: true,
      synchronize: false,
      logging: true,
      charset: 'utf8mb4'
    }),
    AuthModule,
    UsersModule,
    WorkspacesModule,
    DmsModule,
    ChannelsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,  // 전역 예외 필터로 등록
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,  // 혹은 CustomValidationPipe
    },
  ],
};