import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ConfigModule } from '@nestjs/config';
import { ChatbotService } from './chatbot.service';

@Module({
  imports: [ConfigModule],
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class ChatbotModule {}
