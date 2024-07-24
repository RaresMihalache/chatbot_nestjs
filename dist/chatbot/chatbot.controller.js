"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotController = void 0;
const common_1 = require("@nestjs/common");
const chatbot_service_1 = require("./chatbot.service");
let ChatbotController = class ChatbotController {
    constructor(chatbotService) {
        this.chatbotService = chatbotService;
    }
    handleMessage(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const userMessage = body.message;
            const botResponse = yield this.chatbotService.getBotResponse(userMessage);
            return { response: botResponse };
        });
    }
};
exports.ChatbotController = ChatbotController;
__decorate([
    (0, common_1.Post)('message'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatbotController.prototype, "handleMessage", null);
exports.ChatbotController = ChatbotController = __decorate([
    (0, common_1.Controller)('chatbot'),
    __metadata("design:paramtypes", [chatbot_service_1.ChatbotService])
], ChatbotController);
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
//# sourceMappingURL=chatbot.controller.js.map