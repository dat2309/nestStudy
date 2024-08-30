import { ApiProperty } from "@nestjs/swagger";

export class IdDto {
    @ApiProperty({
        description: 'The ID of the user to be removed',
        type: String,
        example: '12345',
    })
    id: string;
}

export class AvatarDto {
    @ApiProperty({
        description: 'The ID of the user to be removed',
        type: String,
        example: '12345',
    })
    avatar: string;
}