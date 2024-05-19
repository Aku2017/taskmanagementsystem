/* eslint-disable prettier/prettier */
import { Controller, Patch, Body, Param, Res } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateNotificationFrequencyDto } from '../notification/dto/update-notification-frequency.dto'
import { Response } from 'express';
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Patch(':id/notification-frequency')
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
