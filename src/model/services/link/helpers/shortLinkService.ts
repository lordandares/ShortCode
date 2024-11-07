import { Injectable } from '@nestjs/common';

export interface IResultshortLink {
  url: string;
  shortId: string;
}

@Injectable()
export class ShortLinkService {
  private characters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  private encodeBase62(num: number): string {
    let encoded = '';
    while (num > 0) {
      encoded = this.characters[num % 62] + encoded;
      num = Math.floor(num / 62);
    }
    return encoded || '0'; // Handles the case for id 0
  }

  public shortenUrl(id: number): IResultshortLink {
    const shortId = this.encodeBase62(id);
    return {
      url: `http://localhost:3000/${shortId}`,
      shortId,
    };
  }

  public extractShortId(url: string): string | null {
    if (url === 'http://localhost:3000/') return null;
    const parts = url.split('/').filter((part) => part);
    return parts.length ? parts[parts.length - 1] : null;
  }
}
