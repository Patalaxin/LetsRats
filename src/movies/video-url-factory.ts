export interface VideoUrlFactory {
  createUrl(key: string): string;
}

export class YouTubeUrlFactory implements VideoUrlFactory {
  createUrl(key: string): string {
    return `https://www.youtube.com/watch?v=${key}`;
  }
}

export class VimeoUrlFactory implements VideoUrlFactory {
  createUrl(key: string): string {
    return `https://vimeo.com/${key}`;
  }
}

export class VideoUrlFactoryProvider {
  private factories: { [key: string]: VideoUrlFactory } = {
    YouTube: new YouTubeUrlFactory(),
    Vimeo: new VimeoUrlFactory(),
  };

  getFactory(site: string): VideoUrlFactory | undefined {
    return this.factories[site];
  }
}
