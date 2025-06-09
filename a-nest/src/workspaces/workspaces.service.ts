import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'diagnostics_channel';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { Workspaces } from 'src/entities/Workspaces';
import { Repository } from 'typeorm';

@Injectable()
export class WorkspacesService {
    constructor(
        @InjectRepository(Workspaces)
        private workspacesRepository: Repository<Workspaces>,
        @InjectRepository(Channel)
        private channelRepository: Repository<Channel>,
        @InjectRepository(WorkspaceMembers)
        private workspacesMemberRepository: Repository<WorkspaceMembers>,
        @InjectRepository(ChannelMembers)
        private channelMembersRepository: Repository<Workspaces>,
        @InjectRepository(Users)
        private usersRepository: Repository<Workspaces>
    ) {}

    async findById(id: number) {
        // return this.workspacesRepository.findOne({where:{id} });
        return this.workspacesRepository.findByIds([id]);
    }

    async findMyWorspaces(myId: number) {
        return this.workspacesRepository.find({
            where: {
                WorkspaceMembers: [{UserId: myId}],
            },
        })
    }

    async createWorkspace(name: string, url: string, myId: number) {
        const workspace = this.workspacesRepository.create({
            name,
            url,
            OwnerId: myId
        });

        const returned = await this.workspacesRepository.save(workspace);

        const workspaceMembers = new WorkspaceMembers();
        workspaceMembers.UserId = myId;
        workspaceMembers.WorkspaceId = returned.id;
        await this.workspacesMemberRepository.save(workspaceMembers);

        const channel = new Channels();
        channel.name = '일반';
        channel.WorkspaceId = returned.id;
        const channelReturnd = await this.channelRepository.save(channel);

        const channelMember = new ChannelMembers();
        channelMember.UserId = myId;
        channelMember.ChannelId = channelReturnd.id;
        await this.channelMembersRepository.save(channelMember);
    }

    async getWorkspaceMembers(url: string, id: number) {
        return this.usersRepository.createQueryBuilder('u')
            .where('u.id = :id', {id})
            .innerJoin('u.Workspaces', 'w', 'workspaces.url = :url', {url})
            .getOne();

    }
}
