import type { ResponseDto } from "../../../common/ResponseDto";
import type { UserPublicDto } from "./UserPublicDto";

interface ProfileResponseDto extends ResponseDto<UserPublicDto> {
}