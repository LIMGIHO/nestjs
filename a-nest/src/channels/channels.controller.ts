import { Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('api/workspaces/:url/channels')
export class ChannelsController {
  @Get()
  getAllChannels() {}

  @Post()
  createChannels() {}

  @Get()
  getSpecificChannel() {}

  @Get(':name/chats')
  getChats(@Query() queryObjects, @Param() param) {
    // console.log(query.perPage, queryObjects.page);
    // console.log(param.id, param.url);
  }
}
