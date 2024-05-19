/* eslint-disable prettier/prettier */
import { IsBoolean, IsEnum, /*IsUUID,*/ IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
    PENDING = 'pending',
    NOT_STARTED = 'not_started',
    STARTED = 'started',
    COMPLETED = 'completed',
    IN_PROGRESS = 'in_progress'
}

export class CreateTaskDto {
@ApiProperty({ description: 'The title of the task' })
@IsString()
title: string;

@ApiProperty({ description: 'The description of the task', required: false })
@IsOptional()
@IsString()
description?: string;
  
@ApiProperty({ description: 'The completion status of the task', default: false })
@IsBoolean()
@IsOptional()
isCompleted?: boolean;  
    
@ApiProperty({ description: 'The status of the task', enum: TaskStatus, default: TaskStatus.PENDING })
@IsEnum(TaskStatus)
@IsOptional()
status?: TaskStatus; 
    
/*@ApiProperty({ description: 'The ID of the user who owns the task' })
@IsUUID()
userId: string;*/ //I am not exposing the userId, since I am passing it as a param
    
@ApiProperty()
@IsNotEmpty()
@IsDateString()
startDate: Date;

@ApiProperty()
@IsNotEmpty()
@IsDateString()
endDate: Date;    
}
