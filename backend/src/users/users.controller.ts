import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Patch,
  Param,
  SerializeOptions,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { JwtGuard } from 'src/auth/jwt.guard';

import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { GROUP_USER } from 'src/utils/constants';
import { RequestWithUser } from 'src/utils/request-with-user';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @SerializeOptions({ groups: [GROUP_USER] })
  getUser(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Patch('me')
  @SerializeOptions({ groups: [GROUP_USER] })
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: RequestWithUser,
  ) {
    return this.usersService.updateOne(req.user.id, updateUserDto);
  }

  @Get('me/wishes')
  getMyWishes(@Req() req: RequestWithUser) {
    return this.usersService.getUserWishes(req.user.id);
  }

  @Get(':username')
  getByUsername(@Param('username') username: string) {
    return this.usersService.getByUsername(username);
  }

  @Get(':username/wishes')
  getUserWishes(@Param('username') username: string) {
    return this.usersService.getAnotherUserWishes(username);
  }

  @Post('find')
  findByUserNameOrEmail(@Body() findUserDto: FindUserDto) {
    const { query } = findUserDto;
    return this.usersService.findByUsernameOrEmail(query);
  }
}
