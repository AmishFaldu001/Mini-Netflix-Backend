import { ExpandedMovieDto } from "../../../movies/dtos/expanded-movie.dto";

export interface OGDBMovieIdResponseDto extends ExpandedMovieDto{
    Response: string;
}