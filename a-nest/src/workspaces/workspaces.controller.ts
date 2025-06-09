import { Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';

@Controller('api/workspaces')
export class WorkspacesController {

  constructor(
    private workspacesService: WorkspacesService
  ) {

  }

  @Get()
  getMyWorkspace(@User() user: Users) {
    return this.workspacesService.findMyWorspaces(user.id);
  }

  @Post()
  createWorkspace() {}

  @Get(':url/members')
  getAllMembersFromWorkspace() {}

  @Post(':url/members')
  inviteMembersToWorkspace() {}

  @Delete(':url/members/:id')
  kickMemberFromWorkspace() {}

  @Get(':url/members/:id')
  getMemberInfoWorkspace() {}
}
