import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatbotService } from './chatbot.service';

interface ChatMessage {
  message: string;
}

interface ChatResponse {
  response: string;
}

@Controller('chatbot')
export class ChatbotController {
  constructor(private chatbotService: ChatbotService) {}

  @Post('message')
  async handleMessage(@Body() body: ChatMessage): Promise<ChatResponse> {
    const userMessage = body.message;
    const botResponse = await this.chatbotService.getBotResponse(userMessage);
    return { response: botResponse };
  }
}

// @Controller('chatbot')
// export class ChatbotController {
//   constructor(private configService: ConfigService) {}

//   @Post('message')
//   async handleMessage(@Body() body: ChatMessage): Promise<ChatResponse> {
//     const userMessage = body.message;
//     const apiKey = this.configService.get<string>('OPENAI_API_KEY');

//     if (!apiKey) {
//       throw new Error('API key is not defined');
//     }

//     console.log('API Key:', apiKey); // Log the API key to verify it's being read correctly

//     const botResponse = await this.getBotResponse(userMessage, apiKey);
//     return { response: botResponse };
//   }

//   async getBotResponse(userMessage: string, apiKey: string): Promise<string> {
//     // Make a request to OpenAI's API using the apiKey
//     // For now, let's return a hardcoded response
//     if (userMessage.toLowerCase().includes('hello')) {
//       return 'Hi there! How can I assist you today?';
//     } else if (userMessage.toLowerCase().includes('bye')) {
//       return 'Goodbye! Have a great day!';
//     } else {
//       return "I'm not sure how to respond to that.";
//     }
//   }
// }
