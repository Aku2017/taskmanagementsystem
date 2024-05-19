/* eslint-disable prettier/prettier */
import { Controller,  Body, Param, Res, Put } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateNotificationFrequencyDto } from '../notification/dto/update-notification-frequency.dto'
import { Response } from 'express';
import { ApiTags, ApiBody, ApiResponse, ApiOperation} from '@nestjs/swagger';

@ApiTags('Settings')
@Controller('Settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

@ApiOperation({ summary: 'Update notification frequency for a user' })
@ApiBody({ type: UpdateNotificationFrequencyDto, description: 'Update notification frequency data' })
@ApiResponse({ status: 200, description: 'Notification frequency updated successfully' })
@ApiResponse({ status: 400, description: 'Invalid data' })
@Put(':id')
  async updateNotificationFrequency(
    @Param('id') id: string,
    @Body() updateNotificationFrequencyDto: UpdateNotificationFrequencyDto,
    @Res() response: Response,
  ) {
    try {
      const updatedUser = await this.settingsService.updateNotificationFrequency(id, updateNotificationFrequencyDto.frequency);
      return response.status(200).json({
        status: 'ok',
        message: 'Notification frequency updated successfully',
        result: updatedUser,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
}
    
}
