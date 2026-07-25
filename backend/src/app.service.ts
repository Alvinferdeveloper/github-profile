import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getUserProfile(username: string): Promise<any> {
    const url = `https://api.github.com/users/${username}`;
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'NestJS-GitHub-Profile-Challenge',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new HttpException('User not found in GitHub', HttpStatus.NOT_FOUND);
        }
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new HttpException(
          `GitHub API responded with status ${response.status}: ${errorText}`,
          response.status,
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error instanceof Error ? error.message : 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
