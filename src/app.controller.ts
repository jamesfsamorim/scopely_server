import {Controller, Post, Body} from "@nestjs/common";
import {AuthService} from "./auth/auth.service";
import {LoginDto} from "./auth/dto/login.dto";

@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

    @Post('auth/login')
    async login(@Body() {email, password}: LoginDto) {
        return this.authService.login(email, password);
    }
}