import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LinkService } from '../../services/link/link.sercice';
import { LinkType } from '../../dto/link/link.type';

@Resolver(() => LinkType)
export class LinkResolver {
  constructor(private readonly linkService: LinkService) {}

  @Query(() => LinkType, { nullable: true })
  getOriginalUrl(
    @Args('url', { type: () => String }) url: string,
  ): Promise<LinkType> {
    return this.linkService.findOne(url);
  }

  @Query(() => [LinkType])
  topOneHundred(): Promise<LinkType[]> {
    return this.linkService.topOneHundred();
  }

  @Mutation(() => LinkType)
  reducedUrl(
    @Args('originalUrl', { type: () => String }) originalUrl: string,
  ): Promise<LinkType> {
    return this.linkService.reduceLink(originalUrl);
  }
}
